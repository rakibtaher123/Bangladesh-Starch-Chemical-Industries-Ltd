import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import { companyInfo } from '../data/companyData'
import './Footer.css'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/management', label: 'Management' },
  { to: '/products', label: 'Products' },
  { to: '/manufacturing', label: 'Manufacturing' },
  { to: '/quality', label: 'Quality Assurance' },
  { to: '/contact', label: 'Contact Us' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__brand">
              <Link to="/" className="footer__logo" aria-label="Bangladesh Starch & Chemical Industries — Home">
                <img
                  src="/companylogo.png"
                  alt="Bangladesh Starch & Chemical Industries logo"
                  className="footer__logo-image"
                />
                <div>
                  <div className="footer__logo-primary">Bangladesh Starch</div>
                  <div className="footer__logo-secondary">&amp; Chemical Industries</div>
                </div>
              </Link>
              <p className="footer__desc">
                A trusted industrial chemical manufacturer based in Gazipur, Dhaka, Bangladesh. Registered under No. {companyInfo.regNo}.
              </p>
              <div className="footer__offices">
                <div className="footer__office">
                  <span className="footer__office-label">Registered Office</span>
                  <span className="footer__office-addr">{companyInfo.registeredOffice}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer__col">
              <h3 className="footer__heading">Quick Links</h3>
              <ul className="footer__links">
                {quickLinks.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="footer__link">
                      <ArrowRight size={14} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer__col">
              <h3 className="footer__heading">Contact & Location</h3>
              <ul className="footer__contact-list">
                <li className="footer__contact-item">
                  <MapPin size={16} className="footer__contact-icon" />
                  <address className="footer__contact-text" style={{ fontStyle: 'normal' }}>
                    {companyInfo.factoryAddress}
                  </address>
                </li>
                {companyInfo.phones.map(phone => (
                  <li key={phone} className="footer__contact-item">
                    <Phone size={16} className="footer__contact-icon" />
                    <a href={`tel:${phone}`} className="footer__contact-link">
                      {phone}
                    </a>
                  </li>
                ))}
                <li className="footer__contact-item">
                  <Mail size={16} className="footer__contact-icon" />
                  <a href={`mailto:${companyInfo.email}`} className="footer__contact-link">
                    {companyInfo.email}
                  </a>
                </li>
              </ul>
              <Link
                to="/contact"
                className="btn btn-outline footer__contact-btn"
                id="footer-contact-btn"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            &copy; {year} Bangladesh Starch &amp; Chemical Industries (PVT.) Ltd. — Registration No. {companyInfo.regNo}. All rights reserved.
          </p>
          <p className="footer__legal">
            This website is for informational purposes only. All product details are subject to confirmation.
          </p>
        </div>
      </div>
    </footer>
  )
}
