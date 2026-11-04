import express from 'express'
import { protect, requireAdmin } from '../middleware/authMiddleware.js'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js'

const router = express.Router()

router.get('/', protect, requireAdmin, getProducts)
router.post('/', protect, requireAdmin, createProduct)
router.put('/:id', protect, requireAdmin, updateProduct)
router.delete('/:id', protect, requireAdmin, deleteProduct)

export default router
