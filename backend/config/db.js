import mongoose from 'mongoose'

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in backend/.env')
  }

  const mongoOptions = {
    serverSelectionTimeoutMS: 15000,
  }

  if (process.env.MONGODB_TLS === 'true' || process.env.MONGODB_TLS === '1') {
    mongoOptions.tls = true
  }

  if (process.env.MONGODB_TLS_ALLOW_INVALID_CERTIFICATES === 'true' || process.env.MONGODB_TLS_ALLOW_INVALID_CERTIFICATES === '1') {
    mongoOptions.tlsAllowInvalidCertificates = true
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, mongoOptions)
    console.log('MongoDB connected successfully.')
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    throw error
  }
}

export default connectDB