import { useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { useAuth } from '../context/AuthContext'
import { adminApi } from '../services/adminApi'

export default function Settings() {
  const { user } = useAuth()
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' })
  const [message, setMessage] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const data = await adminApi.changePassword(form.currentPassword, form.newPassword)
      setMessage(data.message)
      setForm({ currentPassword: '', newPassword: '' })
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Admin Settings" />

        <div className="panel-card settings-card">
          <h2>Profile</h2>
          <div className="profile-box">
            <div><strong>Name:</strong> {user?.name || 'Director'}</div>
            <div><strong>Email:</strong> {user?.email || ''}</div>
          </div>

          <form onSubmit={handleSubmit} className="admin-form">
            <input type="password" value={form.currentPassword} onChange={e => setForm({ ...form, currentPassword: e.target.value })} placeholder="Current password" required />
            <input type="password" value={form.newPassword} onChange={e => setForm({ ...form, newPassword: e.target.value })} placeholder="New password" required />
            <button type="submit" className="admin-submit">Change Password</button>
            {message ? <div className="admin-success">{message}</div> : null}
          </form>
        </div>
      </div>
    </div>
  )
}
