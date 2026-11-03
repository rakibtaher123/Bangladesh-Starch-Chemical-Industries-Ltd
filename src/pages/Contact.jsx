import { useState } from 'react'
import { MapPin, Phone, Mail, Send, ExternalLink, CheckCircle } from 'lucide-react'
import { companyInfo } from '../data/companyData'
import './Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', subject: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    // Build a mailto link with form data
    const body = encodeURIComponent(
      `Name: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:${companyInfo.email}?subject=${encodeURIComponent(formData.subject || 'Website Enquiry')}&body=${body}`
    setSubmitted(true)
  }

  return (
    <div className="contact-page">
      {/* Page Hero */}
      <section className="page-hero" aria-labelledby="contact-hero-heading">
        <div className="container">
          <span className="page-hero-label">Get In Touch</span>
          <h1 id="contact-hero-heading">Contact Us</h1>
          <p>Reach out to our team for product enquiries, procurement discussions, or general information.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-main" aria-labelledby="contact-main-heading">
        <div className="container">
          <div className="contact-grid">
            {/* Info Panel */}
            <aside className="contact-info">
              <h2 id="contact-main-heading" className="contact-info__heading">Contact Information</h2>
              <p className="contact-info__intro">
                Contact us by phone, email, or using the enquiry form. We look forward to hearing from you.
              </p>

              {/* Factory Address */}
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

              {/* Registered Office */}
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

              {/* Phones */}
              {companyInfo.phones.map((phone, i) => (
                <div key={phone} className="contact-info-card">
                  <div className="contact-info-card__icon"><Phone size={20} /></div>
                  <div>
                    <div className="contact-info-card__label">Phone {i + 1}</div>
                    <a
                      href={`tel:${phone}`}
                      className="contact-info-card__value contact-info-card__link"
                      id={`contact-phone-${i + 1}`}
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              ))}

              {/* Email */}
              <div className="contact-info-card">
                <div className="contact-info-card__icon"><Mail size={20} /></div>
                <div>
                  <div className="contact-info-card__label">Email Address</div>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="contact-info-card__value contact-info-card__link"
                    id="contact-email-link"
                  >
                    {companyInfo.email}
                  </a>
                </div>
              </div>
            </aside>

            {/* Form */}
            <div className="contact-form-wrap">
              <div className="contact-form-header">
                <h2 className="contact-form-header__title">Send an Enquiry</h2>
                <p className="contact-form-header__sub">
                  Complete the form below and we will get back to you.
                </p>
              </div>

              {submitted ? (
                <div className="contact-success">
                  <CheckCircle size={48} className="contact-success__icon" />
                  <h3>Thank You!</h3>
                  <p>Your email client has been opened with your enquiry. Please send the email to complete your submission.</p>
                  <button
                    className="btn btn-outline"
                    onClick={() => { setSubmitted(false); setFormData({ name:'', company:'', email:'', phone:'', subject:'', message:'' }) }}
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
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="contact-form__input"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="contact-form__field">
                      <label htmlFor="contact-company" className="contact-form__label">Company / Organisation</label>
                      <input
                        id="contact-company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="contact-form__input"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label htmlFor="contact-email" className="contact-form__label">Email Address *</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="contact-form__input"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="contact-form__field">
                      <label htmlFor="contact-phone" className="contact-form__label">Phone Number</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="contact-form__input"
                        placeholder="+880 ..."
                      />
                    </div>
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="contact-subject" className="contact-form__label">Subject *</label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="contact-form__input"
                      placeholder="e.g. Product enquiry — Starch"
                      required
                    />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="contact-message" className="contact-form__label">Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="contact-form__textarea"
                      placeholder="Please describe your enquiry in detail..."
                      rows={6}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg contact-form__submit" id="contact-submit-btn">
                    <Send size={18} />
                    Send Enquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Embed Banner */}
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
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${companyInfo.mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-lg"
              id="contact-map-banner-btn"
            >
              Open in Google Maps
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
