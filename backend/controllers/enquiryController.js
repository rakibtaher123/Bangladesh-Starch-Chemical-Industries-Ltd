import Enquiry from '../models/Enquiry.js'
import Product from '../models/Product.js'

export const createPublicEnquiry = async (req, res) => {
  const { name, company, email, phone, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Name, email, subject and message are required.' })
  }

  const enquiry = await Enquiry.create({
    name: String(name).trim(),
    company: String(company || '').trim(),
    email: String(email).trim().toLowerCase(),
    phone: String(phone || '').trim(),
    subject: String(subject).trim(),
    message: String(message).trim(),
    status: 'new',
    isRead: false,
  })

  res.status(201).json({
    message: 'Enquiry submitted successfully.',
    enquiry,
  })
}

export const getDashboardStats = async (req, res) => {
  const [totalEnquiries, unreadEnquiries, repliedEnquiries, totalProducts, recentEnquiries] = await Promise.all([
    Enquiry.countDocuments(),
    Enquiry.countDocuments({ isRead: false }),
    Enquiry.countDocuments({ status: 'replied' }),
    Product.countDocuments({ isActive: true }),
    Enquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
  ])

  res.status(200).json({
    totalEnquiries,
    unreadEnquiries,
    repliedEnquiries,
    totalProducts,
    recentEnquiries,
    newEnquiries: unreadEnquiries,
    readEnquiries: totalEnquiries - unreadEnquiries,
  })
}

export const getEnquiries = async (req, res) => {
  const { status, search, startDate, endDate } = req.query
  const query = {}

  if (status && status !== 'all') query.status = status
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { subject: { $regex: search, $options: 'i' } },
    ]
  }

  if (startDate || endDate) {
    query.createdAt = {}
    if (startDate) query.createdAt.$gte = new Date(startDate)
    if (endDate) query.createdAt.$lte = new Date(endDate)
  }

  const enquiries = await Enquiry.find(query).sort({ createdAt: -1 })
  res.status(200).json({ enquiries })
}

export const getEnquiryById = async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id)
  if (!enquiry) {
    return res.status(404).json({ message: 'Enquiry not found.' })
  }

  res.status(200).json({ enquiry })
}

export const updateEnquiry = async (req, res) => {
  const { status, isRead } = req.body
  const enquiry = await Enquiry.findById(req.params.id)

  if (!enquiry) {
    return res.status(404).json({ message: 'Enquiry not found.' })
  }

  if (status) enquiry.status = status
  if (typeof isRead === 'boolean') enquiry.isRead = isRead

  if (status === 'replied') enquiry.hasReply = true
  if (status === 'read') enquiry.isRead = true
  if (status === 'new') enquiry.isRead = false

  await enquiry.save()
  res.status(200).json({ message: 'Enquiry updated.', enquiry })
}

export const deleteEnquiry = async (req, res) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id)
  if (!enquiry) {
    return res.status(404).json({ message: 'Enquiry not found.' })
  }

  res.status(200).json({ message: 'Enquiry deleted successfully.' })
}

export const replyToEnquiry = async (req, res) => {
  const { message } = req.body
  const enquiry = await Enquiry.findById(req.params.id)

  if (!enquiry) {
    return res.status(404).json({ message: 'Enquiry not found.' })
  }

  if (!message || !String(message).trim()) {
    return res.status(400).json({ message: 'Reply message is required.' })
  }

  enquiry.hasReply = true
  enquiry.status = 'replied'
  enquiry.isRead = true
  enquiry.repliedAt = new Date()
  enquiry.notes = enquiry.notes ? `${enquiry.notes}\n${String(message).trim()}` : String(message).trim()
  await enquiry.save()

  res.status(200).json({ message: 'Reply saved successfully.', enquiry })
}
