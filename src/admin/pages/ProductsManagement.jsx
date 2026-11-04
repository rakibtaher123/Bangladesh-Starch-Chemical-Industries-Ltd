import { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { adminApi } from '../services/adminApi'

const emptyForm = {
  name: '',
  shortDesc: '',
  description: '',
  category: 'Industrial',
  image: '',
  alt: '',
}

export default function ProductsManagement() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const loadProducts = async () => {
    setLoading(true)
    try {
      const data = await adminApi.getProducts()
      setProducts(data.products || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (editingId) {
        await adminApi.updateProduct(editingId, form)
      } else {
        await adminApi.createProduct(form)
      }

      setForm(emptyForm)
      setEditingId(null)
      loadProducts()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async id => {
    if (!window.confirm('Delete this product?')) return
    try {
      await adminApi.deleteProduct(id)
      loadProducts()
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = product => {
    setForm({
      name: product.name,
      shortDesc: product.shortDesc || '',
      description: product.description || '',
      category: product.category || 'Industrial',
      image: product.image || '',
      alt: product.alt || '',
    })
    setEditingId(product._id)
  }

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Product Management" />

        <div className="product-grid">
          <div className="panel-card">
            <h2>{editingId ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Product name" required />
              <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Category" />
              <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="Image path (/product_x.png)" />
              <input value={form.alt} onChange={e => setForm({ ...form, alt: e.target.value })} placeholder="Alt text" />
              <textarea value={form.shortDesc} onChange={e => setForm({ ...form, shortDesc: e.target.value })} placeholder="Short description" rows="3" />
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Detailed description" rows="5" />
              <div className="button-row">
                <button type="submit" className="admin-submit">{editingId ? 'Update Product' : 'Add Product'}</button>
                {editingId ? <button type="button" className="secondary-btn" onClick={() => { setEditingId(null); setForm(emptyForm) }}>Cancel</button> : null}
              </div>
            </form>
          </div>

          <div className="panel-card">
            <h2>Products</h2>
            {loading ? (
              <div className="admin-page-loading">Loading products...</div>
            ) : (
              <div className="stack-list">
                {products.map(product => (
                  <div key={product._id} className="stack-item">
                    <div>
                      <strong>{product.name}</strong>
                      <p>{product.category}</p>
                    </div>
                    <div className="stack-item__actions">
                      <button type="button" className="table-btn table-btn--primary" onClick={() => handleEdit(product)}>Edit</button>
                      <button type="button" className="table-btn table-btn--danger" onClick={() => handleDelete(product._id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
