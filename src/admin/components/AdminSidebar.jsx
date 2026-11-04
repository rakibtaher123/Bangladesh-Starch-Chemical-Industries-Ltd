import { BarChart3, Building2, Files, Layers3, Settings, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Overview', to: '/admin/dashboard', icon: BarChart3 },
  { label: 'Enquiries', to: '/admin/enquiries', icon: Files },
  { label: 'Products', to: '/admin/products', icon: Layers3 },
  { label: 'Customers', to: '/admin/customers', icon: UserRound },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <Building2 size={28} />
        <div>
          <strong>BSCI</strong>
          <span>Director Portal</span>
        </div>
      </div>

      <nav className="admin-sidebar__nav">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `admin-sidebar__link ${isActive ? 'is-active' : ''}`}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
