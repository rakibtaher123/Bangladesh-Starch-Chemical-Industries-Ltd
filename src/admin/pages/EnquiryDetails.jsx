import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { adminApi } from '../services/adminApi'

export default function EnquiryDetails() {
  const { id } = useParams()
  const [enquiry, setEnquiry] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [loading, setLoading] = useState(true)

  const loadEnquiry = async () => {
    setLoading(true)
    try {
      const data = await adminApi.getEnquiry(id)
      setEnquiry(data.enquiry)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEnquiry()
  }, [id])

  const handleReply = async () => {
    if (!replyText.trim()) return
    try {
      await adminApi.replyToEnquiry(id, replyText)
      setReplyText('')
      loadEnquiry()
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <div className="admin-page-loading">Loading enquiry...</div>
  if (!enquiry) return <div className="empty-state">Enquiry not found.</div>

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Enquiry Details" />

        <div className="detail-card">
          <div className="detail-card__header">
            <div>
              <div className="detail-card__eyebrow">Customer enquiry</div>
              <h2>{enquiry.subject}</h2>
            </div>
            <Link to="/admin/enquiries" className="table-btn table-btn--primary">Back to list</Link>
          </div>

          <div className="detail-grid">
            <div><strong>Name:</strong> {enquiry.name}</div>
            <div><strong>Company:</strong> {enquiry.company || 'N/A'}</div>
            <div><strong>Email:</strong> {enquiry.email}</div>
            <div><strong>Phone:</strong> {enquiry.phone || 'N/A'}</div>
            <div><strong>Status:</strong> <span className={`status-badge status-badge--${enquiry.status}`}>{enquiry.status}</span></div>
            <div><strong>Date:</strong> {new Date(enquiry.createdAt).toLocaleString()}</div>
          </div>

          <div className="detail-message">
            <h3>Message</h3>
            <p>{enquiry.message}</p>
          </div>

          <div className="reply-box">
            <h3>Reply to customer</h3>
            <textarea rows="5" value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Write a professional reply..." />
            <button type="button" className="admin-submit" onClick={handleReply}>Send Reply</button>
          </div>
        </div>
      </div>
    </div>
  )
}
