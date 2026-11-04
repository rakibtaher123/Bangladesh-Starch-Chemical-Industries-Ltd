import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import connectDB from './config/db.js'
import { protect, requireAdmin } from './middleware/authMiddleware.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import authRoutes from './routes/authRoutes.js'
import enquiryRoutes from './routes/enquiryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import { getDashboardStats } from './controllers/enquiryController.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet({ crossOriginResourcePolicy: false }))
const configuredOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map(value => value.trim())
  .filter(Boolean)

const allowedOrigins = [...new Set([
  ...configuredOrigins,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://localhost:4173',
])]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || /^http:\/\/localhost:\d+$/.test(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('CORS blocked for origin: ' + origin))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(generalLimiter)

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running.' })
})

app.use('/api/auth', authRoutes)
app.use('/api/enquiries', enquiryRoutes)
app.use('/api/products', productRoutes)
app.get('/api/dashboard/stats', protect, requireAdmin, getDashboardStats)

app.use(notFound)
app.use(errorHandler)

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()