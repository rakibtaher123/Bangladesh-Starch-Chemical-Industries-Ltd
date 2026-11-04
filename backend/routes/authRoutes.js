import express from 'express'
import { protect, requireAdmin } from '../middleware/authMiddleware.js'
import { loginAdmin, logoutAdmin, getCurrentAdmin, changePassword } from '../controllers/authController.js'

const router = express.Router()

router.post('/login', loginAdmin)
router.post('/logout', logoutAdmin)
router.get('/me', protect, requireAdmin, getCurrentAdmin)
router.put('/change-password', protect, requireAdmin, changePassword)

export default router
