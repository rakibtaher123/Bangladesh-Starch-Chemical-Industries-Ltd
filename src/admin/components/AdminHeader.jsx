import { LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AdminHeader({ title }) {
  const { user, logout } = useAuth()

  return (
    <header className="admin-header">
      <div>
        <p className="admin-header__eyebrow">Bangladesh Starch &amp; Chemical Industries</p>
        <h1>{title}</h1>
      </div>
      <div className="admin-header__user">
        <span>{user?.name || 'Director'}</span>
        <button type="button" onClick={logout} className="admin-header__logout">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  )
}
