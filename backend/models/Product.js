import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    shortDesc: { type: String, default: '', trim: true },
    description: { type: String, default: '', trim: true },
    category: { type: String, default: 'Industrial', trim: true },
    image: { type: String, default: '', trim: true },
    alt: { type: String, default: '', trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
