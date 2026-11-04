import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(formData.email, formData.password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-auth-page">
      <div className="admin-auth-card">
        <div className="admin-auth-card__header">
          <div className="admin-auth-card__badge">BSCI</div>
          <h1>Director Login</h1>
          <p>Secure administrative access</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-auth-form">
          <label className="admin-field">
            <span>Email</span>
            <div className="admin-field__input-wrap">
              <Mail size={16} />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="admin@email.com" required />
            </div>
          </label>

          <label className="admin-field">
            <span>Password</span>
            <div className="admin-field__input-wrap">
              <LockKeyhole size={16} />
              <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(prev => !prev)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {error ? <div className="admin-error">{error}</div> : null}

          <button type="submit" className="admin-submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}
