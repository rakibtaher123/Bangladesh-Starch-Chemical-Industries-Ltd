import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { adminApi } from '../services/adminApi'

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const loadEnquiries = async () => {
    setLoading(true)
    try {
      const data = await adminApi.getEnquiries({ search, status })
      setEnquiries(data.enquiries || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEnquiries()
  }, [search, status])

  const markStatus = async (id, nextStatus) => {
    try {
      await adminApi.updateEnquiry(id, { status: nextStatus, isRead: true })
      loadEnquiries()
    } catch (error) {
      console.error(error)
    }
  }

  const removeEnquiry = async id => {
    if (!window.confirm('Delete this enquiry?')) return
    try {
      await adminApi.deleteEnquiry(id)
      loadEnquiries()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Enquiry Management" />

        <div className="toolbar">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by customer or subject" />
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {loading ? (
          <div className="admin-page-loading">Loading enquiries...</div>
        ) : enquiries.length ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map(item => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.subject}</td>
                    <td><span className={`status-badge status-badge--${item.status}`}>{item.status}</span></td>
                    <td className="table-actions">
                      <Link to={`/admin/enquiries/${item._id}`} className="table-btn table-btn--primary">Open</Link>
                      <button type="button" className="table-btn table-btn--secondary" onClick={() => markStatus(item._id, item.status === 'read' ? 'new' : 'read')}>{item.status === 'read' ? 'Unread' : 'Read'}</button>
                      <button type="button" className="table-btn table-btn--warning" onClick={() => markStatus(item._id, 'replied')}>Replied</button>
                      <button type="button" className="table-btn table-btn--danger" onClick={() => removeEnquiry(item._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">No enquiries found.</div>
        )}
      </div>
    </div>
  )
}
