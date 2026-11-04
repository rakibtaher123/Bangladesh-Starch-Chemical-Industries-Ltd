import Product from '../models/Product.js'

export const getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 })
  res.status(200).json({ products })
}

export const createProduct = async (req, res) => {
  const { name, shortDesc, description, category, image, alt } = req.body

  if (!name || !String(name).trim()) {
    return res.status(400).json({ message: 'Product name is required.' })
  }

  const product = await Product.create({
    name: String(name).trim(),
    shortDesc: String(shortDesc || '').trim(),
    description: String(description || '').trim(),
    category: String(category || 'Industrial').trim(),
    image: String(image || '').trim(),
    alt: String(alt || '').trim(),
    isActive: true,
  })

  res.status(201).json({ message: 'Product created successfully.', product })
}

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(404).json({ message: 'Product not found.' })
  }

  const updates = req.body
  Object.keys(updates).forEach(key => {
    if (updates[key] !== undefined) product[key] = updates[key]
  })

  await product.save()
  res.status(200).json({ message: 'Product updated successfully.', product })
}

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) {
    return res.status(404).json({ message: 'Product not found.' })
  }

  res.status(200).json({ message: 'Product deleted successfully.' })
}
