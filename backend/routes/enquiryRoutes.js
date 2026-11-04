import express from 'express'
import rateLimit from 'express-rate-limit'
import { protect, requireAdmin } from '../middleware/authMiddleware.js'
import { createPublicEnquiry, getDashboardStats, getEnquiries, getEnquiryById, updateEnquiry, deleteEnquiry, replyToEnquiry } from '../controllers/enquiryController.js'

const router = express.Router()

const publicEnquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many contact submissions. Please try again later.' },
})

router.post('/public', publicEnquiryLimiter, createPublicEnquiry)
router.get('/', protect, requireAdmin, getEnquiries)
router.get('/stats', protect, requireAdmin, getDashboardStats)
router.get('/:id', protect, requireAdmin, getEnquiryById)
router.put('/:id', protect, requireAdmin, updateEnquiry)
router.delete('/:id', protect, requireAdmin, deleteEnquiry)
router.post('/:id/reply', protect, requireAdmin, replyToEnquiry)

export default router
