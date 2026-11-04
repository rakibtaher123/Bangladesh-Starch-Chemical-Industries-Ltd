import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Management from './pages/Management'
import Products from './pages/Products'
import Manufacturing from './pages/Manufacturing'
import Quality from './pages/Quality'
import Contact from './pages/Contact'
import AdminLogin from './admin/pages/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import Enquiries from './admin/pages/Enquiries'
import EnquiryDetails from './admin/pages/EnquiryDetails'
import ProductsManagement from './admin/pages/ProductsManagement'
import Customers from './admin/pages/Customers'
import Settings from './admin/pages/Settings'
import { AuthProvider, useAuth } from './admin/context/AuthContext'
import './styles/index.css'
import './admin/styles/admin.css'

function ProtectedAdminRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="admin-page-loading">Checking admin session...</div>
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

function AppShell() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="app">
      {!isAdminRoute && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/management" element={<Management />} />
          <Route path="/products" element={<Products />} />
          <Route path="/manufacturing" element={<Manufacturing />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
          <Route path="/admin/enquiries" element={<ProtectedAdminRoute><Enquiries /></ProtectedAdminRoute>} />
          <Route path="/admin/enquiries/:id" element={<ProtectedAdminRoute><EnquiryDetails /></ProtectedAdminRoute>} />
          <Route path="/admin/products" element={<ProtectedAdminRoute><ProductsManagement /></ProtectedAdminRoute>} />
          <Route path="/admin/customers" element={<ProtectedAdminRoute><Customers /></ProtectedAdminRoute>} />
          <Route path="/admin/settings" element={<ProtectedAdminRoute><Settings /></ProtectedAdminRoute>} />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <AppShell />
      </AuthProvider>
    </Router>
  )
}

export default App
