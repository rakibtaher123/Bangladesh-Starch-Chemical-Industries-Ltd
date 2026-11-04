import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import Admin from '../models/Admin.js'
import connectDB from '../config/db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const seedAdmin = async () => {
  try {
    await connectDB()
    const email = process.env.ADMIN_EMAIL || 'bdstarchchemical1974@gmail.com'
    const password = process.env.ADMIN_PASSWORD

    if (!password) {
      console.error('ADMIN_PASSWORD is missing in backend/.env. Seed cancelled.')
      process.exit(1)
    }

    const existing = await Admin.findOne({ email })
    if (existing) {
      console.log('Admin account already exists.')
      process.exit(0)
    }

    const admin = await Admin.create({
      name: 'Director',
      email,
      password,
      role: 'admin',
    })

    console.log('Admin seeded successfully:', admin.email)
    process.exit(0)
  } catch (error) {
    console.error('Seed error:', error.message)
    process.exit(1)
  }
}

seedAdmin()
