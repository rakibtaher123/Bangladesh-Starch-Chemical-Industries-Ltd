import { useState } from 'react'
import { MapPin, Phone, Mail, Send, ExternalLink, CheckCircle } from 'lucide-react'
import { companyInfo } from '../data/companyData'
import './Contact.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', subject: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE}/enquiries/public`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to submit enquiry right now.')
      }

      setSubmitted(true)
      setFormData({ name: '', company: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      setError(err.message || 'Something went wrong while sending your enquiry.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-page">
      <section className="page-hero" aria-labelledby="contact-hero-heading">
        <div className="container">
          <span className="page-hero-label">Get In Touch</span>
          <h1 id="contact-hero-heading">Contact Us</h1>
          <p>Reach out to our team for product enquiries, procurement discussions, or general information.</p>
        </div>
      </section>

      <section className="section contact-main" aria-labelledby="contact-main-heading">
        <div className="container">
          <div className="contact-grid">
            <aside className="contact-info">
              <h2 id="contact-main-heading" className="contact-info__heading">Contact Information</h2>
              <p className="contact-info__intro">
                Contact us by phone, email, or using the enquiry form. We look forward to hearing from you.
              </p>

              <div className="contact-info-card">
                <div className="contact-info-card__icon"><MapPin size={20} /></div>
                <div>
                  <div className="contact-info-card__label">Corporate Office &amp; Factory</div>
                  <address className="contact-info-card__value" style={{ fontStyle: 'normal' }}>
                    Chuna Factory, 329/330 DIT Industrial Area,<br />
                    IRI Road, Tongi Bazar, Gazipur,<br />
                    Dhaka, Bangladesh
                  </address>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${companyInfo.mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-info-card__map-link"
                    id="contact-maps-link"
                  >
                    <ExternalLink size={13} />
                    Open in Google Maps
                  </a>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-card__icon"><MapPin size={20} /></div>
                <div>
                  <div className="contact-info-card__label">Registered Office</div>
                  <address className="contact-info-card__value" style={{ fontStyle: 'normal' }}>
                    5/9, Block-E, Lalmatia Housing Estate,<br />
                    Dhaka-7, Bangladesh
                  </address>
                </div>
              </div>

              {companyInfo.phones.map((phone, i) => (
                <div key={phone} className="contact-info-card">
                  <div className="contact-info-card__icon"><Phone size={20} /></div>
                  <div>
                    <div className="contact-info-card__label">Phone {i + 1}</div>
                    <a href={`tel:${phone}`} className="contact-info-card__value contact-info-card__link" id={`contact-phone-${i + 1}`}>
                      {phone}
                    </a>
                  </div>
                </div>
              ))}

              <div className="contact-info-card">
                <div className="contact-info-card__icon"><Mail size={20} /></div>
                <div>
                  <div className="contact-info-card__label">Email Address</div>
                  <a href={`mailto:${companyInfo.email}`} className="contact-info-card__value contact-info-card__link" id="contact-email-link">
                    {companyInfo.email}
                  </a>
                </div>
              </div>
            </aside>

            <div className="contact-form-wrap">
              <div className="contact-form-header">
                <h2 className="contact-form-header__title">Send an Enquiry</h2>
                <p className="contact-form-header__sub">Complete the form below and we will get back to you.</p>
              </div>

              {submitted ? (
                <div className="contact-success">
                  <CheckCircle size={48} className="contact-success__icon" />
                  <h3>Thank You!</h3>
                  <p>Your enquiry has been recorded successfully. Our team will respond soon.</p>
                  <button
                    className="btn btn-outline"
                    onClick={() => { setSubmitted(false); setError(''); setFormData({ name:'', company:'', email:'', phone:'', subject:'', message:'' }) }}
                    id="contact-reset-btn"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label htmlFor="contact-name" className="contact-form__label">Full Name *</label>
                      <input id="contact-name" type="text" name="name" value={formData.name} onChange={handleChange} className="contact-form__input" placeholder="Your full name" required />
                    </div>
                    <div className="contact-form__field">
                      <label htmlFor="contact-company" className="contact-form__label">Company / Organisation</label>
                      <input id="contact-company" type="text" name="company" value={formData.company} onChange={handleChange} className="contact-form__input" placeholder="Your company name" />
                    </div>
                  </div>
                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label htmlFor="contact-email" className="contact-form__label">Email Address *</label>
                      <input id="contact-email" type="email" name="email" value={formData.email} onChange={handleChange} className="contact-form__input" placeholder="your@email.com" required />
                    </div>
                    <div className="contact-form__field">
                      <label htmlFor="contact-phone" className="contact-form__label">Phone Number</label>
                      <input id="contact-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} className="contact-form__input" placeholder="+880 ..." />
                    </div>
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="contact-subject" className="contact-form__label">Subject *</label>
                    <input id="contact-subject" type="text" name="subject" value={formData.subject} onChange={handleChange} className="contact-form__input" placeholder="e.g. Product enquiry — Starch" required />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="contact-message" className="contact-form__label">Message *</label>
                    <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} className="contact-form__textarea" placeholder="Please describe your enquiry in detail..." rows={6} required />
                  </div>

                  {error ? <div className="contact-form__error">{error}</div> : null}

                  <button type="submit" className="btn btn-primary btn-lg contact-form__submit" id="contact-submit-btn" disabled={loading}>
                    <Send size={18} />
                    {loading ? 'Sending...' : 'Send Enquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-map-banner" aria-label="Factory location map">
        <div className="container">
          <div className="contact-map-banner__inner">
            <MapPin size={32} className="contact-map-banner__icon" />
            <div>
              <h3 className="contact-map-banner__title">Find Our Factory on Google Maps</h3>
              <p className="contact-map-banner__addr">
                Chuna Factory, 329/330 DIT Industrial Area, IRI Road, Tongi Bazar, Gazipur, Dhaka, Bangladesh
              </p>
            </div>
            <a href={`https://www.google.com/maps/search/?api=1&query=${companyInfo.mapsQuery}`} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg" id="contact-map-banner-btn">
              Open in Google Maps
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
