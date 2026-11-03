import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/management', label: 'Management' },
  { to: '/products', label: 'Products' },
  { to: '/manufacturing', label: 'Manufacturing' },
  { to: '/quality', label: 'Quality Assurance' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__container container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={closeMenu} aria-label="Bangladesh Starch & Chemical Industries — Home">
          <img
            src="/companylogo.png"
            alt="Bangladesh Starch & Chemical Industries logo"
            className="navbar__logo-image"
          />
          <div className="navbar__logo-text">
            <span className="navbar__logo-primary">Bangladesh Starch</span>
            <span className="navbar__logo-secondary">&amp; Chemical Industries (PVT.) Ltd.</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__nav" aria-label="Main navigation">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="navbar__actions">
          <Link to="/contact" className="navbar__cta btn btn-gold" id="navbar-contact-btn">
            <Phone size={16} />
            Contact Us
          </Link>
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            id="mobile-menu-toggle"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" className="navbar__mobile-cta btn btn-gold btn-lg" onClick={closeMenu} id="mobile-contact-btn">
            <Phone size={18} />
            Contact Us
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="navbar__overlay" onClick={closeMenu} aria-hidden="true" />
      )}
    </header>
  )
}
