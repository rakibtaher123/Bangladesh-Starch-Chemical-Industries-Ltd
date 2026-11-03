import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, Phone, Mail } from 'lucide-react'
import { products, companyInfo } from '../data/companyData'
import './Products.css'

function ProductCard({ product }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="product-card card" id={`product-${product.id}`}>
      <div className="product-card__img-wrap">
        <img
          src={product.image}
          alt={product.alt}
          className="product-card__img"
          loading="lazy"
        />
        <span className="badge badge-blue product-card__badge">{product.category}</span>
      </div>
      <div className="product-card__body">
        <h2 className="product-card__name">{product.name}</h2>
        <p className="product-card__short">{product.shortDesc}</p>

        <button
          className="product-card__toggle"
          onClick={() => setExpanded(e => !e)}
          aria-expanded={expanded}
          id={`product-toggle-${product.id}`}
        >
          {expanded ? 'Hide Details' : 'View Details'}
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {expanded && (
          <div className="product-card__details">
            <p>{product.description}</p>
          </div>
        )}

        <div className="product-card__actions">
          <a
            href={`mailto:${companyInfo.email}?subject=Enquiry: ${product.name}`}
            className="btn btn-primary product-card__enquire"
            id={`product-enquire-${product.id}`}
          >
            <Mail size={16} />
            Send Enquiry
          </a>
          <a
            href={`tel:${companyInfo.phones[0]}`}
            className="btn btn-outline product-card__call"
            id={`product-call-${product.id}`}
          >
            <Phone size={16} />
            Call Us
          </a>
        </div>
      </div>
    </article>
  )
}

export default function Products() {
  return (
    <div className="products-page">
      {/* Page Hero */}
      <section className="page-hero" aria-labelledby="products-hero-heading">
        <div className="container">
          <span className="page-hero-label">Our Products</span>
          <h1 id="products-hero-heading">Product Catalogue</h1>
          <p>Industrial chemicals and materials supplied by Bangladesh Starch &amp; Chemical Industries. Contact us for specifications, pricing, and bulk enquiries.</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section products-grid-section" aria-labelledby="products-list-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Available Products</span>
            <h2 id="products-list-heading" className="section-title">Our Product Range</h2>
            <p className="section-subtitle">
              Contact our team for detailed technical information, grades, and pricing on any of our products.
            </p>
            <div className="divider" />
          </div>
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="products-cta">
        <div className="container products-cta__inner">
          <div>
            <h2 className="products-cta__title">Looking for a Specific Product?</h2>
            <p className="products-cta__sub">
              Contact our sales team directly for product availability, bulk pricing, and technical data sheets.
            </p>
          </div>
          <div className="products-cta__actions">
            <a href={`mailto:${companyInfo.email}`} className="btn btn-gold btn-lg" id="products-email-btn">
              <Mail size={18} />
              Email Us
            </a>
            <Link to="/contact" className="btn btn-secondary btn-lg" id="products-contact-btn">
              Contact Page
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ padding: 'var(--space-8) 0 var(--space-12)' }}>
        <div className="container">
          <div className="about-disclaimer__box">
            <strong>Important:</strong> Product descriptions on this page are provided for general information only. Technical specifications, grades, concentrations, certifications, and production capacity have not been verified and are not claimed on this website. All product details are subject to confirmation by the company prior to purchase.
          </div>
        </div>
      </section>
    </div>
  )
}
