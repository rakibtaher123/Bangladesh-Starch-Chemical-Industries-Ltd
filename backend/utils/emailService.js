import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config({ path: '../.env' })

const createTransport = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: Number(SMTP_PORT || 587) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })
}

export const sendEnquiryAlert = async ({ name, email, subject, message }) => {
  const transport = createTransport()
  if (!transport) return { sent: false, reason: 'SMTP not configured' }

  const adminEmail = process.env.ADMIN_EMAIL || 'bdstarchchemical1974@gmail.com'

  await transport.sendMail({
    from: process.env.SMTP_USER || adminEmail,
    to: adminEmail,
    subject: `New enquiry received: ${subject}`,
    text: `New customer enquiry received from ${name} (${email}).\n\nSubject: ${subject}\n\nMessage:\n${message}`,
  })

  return { sent: true }
}

export const sendReplyEmail = async ({ to, subject, message }) => {
  const transport = createTransport()
  if (!transport) return { sent: false, reason: 'SMTP not configured' }

  await transport.sendMail({
    from: process.env.SMTP_USER || process.env.ADMIN_EMAIL,
    to,
    subject,
    text: message,
  })

  return { sent: true }
}
