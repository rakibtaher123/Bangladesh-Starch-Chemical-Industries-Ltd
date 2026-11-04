import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const generateToken = user => jwt.sign(
  { id: user._id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '8h' }
)

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  const admin = await Admin.findOne({ email: String(email).trim().toLowerCase() })
  if (!admin) {
    return res.status(401).json({ message: 'Invalid email or password.' })
  }

  const isMatch = await admin.comparePassword(password)
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password.' })
  }

  const token = generateToken(admin)

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 8 * 60 * 60 * 1000,
  })

  res.status(200).json({
    message: 'Login successful.',
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  })
}

export const logoutAdmin = async (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'Logged out successfully.' })
}

export const getCurrentAdmin = async (req, res) => {
  const admin = await Admin.findById(req.user.id).select('-password')
  if (!admin) {
    return res.status(404).json({ message: 'Admin not found.' })
  }

  res.status(200).json({ admin })
}

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Current and new password are required.' })
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'New password must be at least 6 characters long.' })
  }

  const admin = await Admin.findById(req.user.id)
  if (!admin) {
    return res.status(404).json({ message: 'Admin not found.' })
  }

  const isMatch = await admin.comparePassword(currentPassword)
  if (!isMatch) {
    return res.status(401).json({ message: 'Current password is incorrect.' })
  }

  admin.password = newPassword
  await admin.save()

  res.status(200).json({ message: 'Password changed successfully.' })
}
