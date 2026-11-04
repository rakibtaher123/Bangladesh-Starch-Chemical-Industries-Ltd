import { useEffect, useState } from 'react'
import { AlertTriangle, ArrowUpRight, BellRing, Box, CheckCheck, Inbox } from 'lucide-react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import StatCard from '../components/StatCard'
import { adminApi } from '../services/adminApi'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalEnquiries: 0, unreadEnquiries: 0, repliedEnquiries: 0, totalProducts: 0, recentEnquiries: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await adminApi.getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  if (loading) {
    return <div className="admin-page-loading">Loading dashboard...</div>
  }

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Dashboard Overview" />

        <div className="stat-grid">
          <StatCard title="Total Enquiries" value={stats.totalEnquiries} subtitle="All submissions" tone="navy" />
          <StatCard title="New Enquiries" value={stats.unreadEnquiries} subtitle="Unread items" tone="blue" />
          <StatCard title="Read Enquiries" value={stats.readEnquiries || 0} subtitle="Reviewed" tone="green" />
          <StatCard title="Replied" value={stats.repliedEnquiries} subtitle="Customer replies" tone="gold" />
          <StatCard title="Products" value={stats.totalProducts} subtitle="Active listings" tone="teal" />
        </div>

        <div className="dashboard-panel">
          <h2>Recent Enquiries</h2>
          {stats.recentEnquiries.length ? (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentEnquiries.map(item => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.subject}</td>
                      <td><span className={`status-badge status-badge--${item.status}`}>{item.status}</span></td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">No enquiries yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}
