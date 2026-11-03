import { Link } from 'react-router-dom'
import {
  ArrowRight, ChevronDown, Factory, Award, Users, MapPin,
  FlaskConical, ShieldCheck, Layers, Phone
} from 'lucide-react'
import { products } from '../data/companyData'
import './Home.css'

const stats = [
  { label: 'Products', value: '4+', icon: FlaskConical },
  { label: 'Registration No.', value: 'C-4282', icon: Award },
  { label: 'Board Directors', value: '6', icon: Users },
  { label: 'Factory Location', value: 'Gazipur', icon: MapPin },
]

const highlights = [
  {
    icon: Factory,
    title: 'Industrial Manufacturing',
    desc: 'Our factory in Tongi Bazar, Gazipur operates as a dedicated production facility for our chemical product lines.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Commitment',
    desc: 'We maintain rigorous quality practices across our production and handling processes to meet buyer requirements.',
  },
  {
    icon: Layers,
    title: 'Diverse Product Range',
    desc: 'From Starch and Lime to Sulfuric Acid and Feras Liquid — our product range serves multiple industrial sectors.',
  },
]

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero" aria-label="Company introduction hero">
        <div className="hero__bg">
          <img
            src="/hero_factory.png"
            alt="Bangladesh Starch & Chemical Industries factory exterior"
            className="hero__bg-img"
          />
          <div className="hero__overlay" />
        </div>
        <div className="hero__content container">
          <div className="hero__brand-wrap">
            <img
              src="/companylogo.png"
              alt="Bangladesh Starch & Chemical Industries logo"
              className="hero__brand-mark"
            />
          </div>
          <div className="hero__badge">
            <span>Established Industrial Manufacturer</span>
          </div>
          <h1 className="hero__title">
            Bangladesh Starch &amp; Chemical
            <span className="hero__title-accent"> Industries</span>
          </h1>
          <p className="hero__subtitle">
            A trusted industrial chemical company based in Gazipur, Dhaka — supplying quality products including Starch, Lime, Sulfuric Acid, and Feras Liquid.
          </p>
          <div className="hero__actions">
            <Link to="/about" className="btn btn-gold btn-lg" id="hero-discover-btn">
              Discover Our Company
              <ArrowRight size={18} />
            </Link>
            <Link to="/products" className="btn btn-secondary btn-lg" id="hero-products-btn">
              Explore Products
            </Link>
          </div>
        </div>
        <a href="#overview" className="hero__scroll" aria-label="Scroll to overview">
          <ChevronDown size={22} />
        </a>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar" aria-label="Company statistics">
        <div className="container">
          <div className="stats-bar__grid">
            {stats.map((s) => (
              <div className="stats-bar__item" key={s.label}>
                <s.icon size={20} className="stats-bar__icon" />
                <div>
                  <div className="stats-bar__value">{s.value}</div>
                  <div className="stats-bar__label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section home-overview" id="overview" aria-labelledby="overview-heading">
        <div className="container">
          <div className="home-overview__grid">
            <div className="home-overview__text">
              <span className="section-label">Company Overview</span>
              <h2 id="overview-heading" className="section-title" style={{ textAlign: 'left' }}>
                An Industrial Legacy Built on Quality
              </h2>
              <div className="divider divider-left" />
              <p className="home-overview__para">
                Bangladesh Starch &amp; Chemical Industries (PVT.) Ltd. is a privately held industrial chemical company registered in Bangladesh under Registration No. C-4282. Our corporate office and primary factory are located at the DIT Industrial Area, IRI Road, Tongi Bazar, Gazipur, Dhaka.
              </p>
              <p className="home-overview__para">
                We supply a focused range of industrial products — Feras Liquid, Starch, Lime (Chuna), and Sulfuric Acid (H₂SO₄) — serving the needs of industrial buyers and commercial clients across Bangladesh.
              </p>
              <p className="home-overview__para">
                Our registered office is situated at 5/9, Block-E, Lalmatia Housing Estate, Dhaka-7.
              </p>
              <div className="home-overview__actions">
                <Link to="/about" className="btn btn-primary" id="overview-about-btn">
                  Learn More About Us
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn btn-outline" id="overview-contact-btn">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="home-overview__img-wrap">
              <img
                src="/manufacturing_interior.png"
                alt="Bangladesh Starch & Chemical Industries manufacturing facility interior"
                className="home-overview__img"
              />
              <div className="home-overview__img-badge">
                <Award size={20} />
                <span>Reg. No. C-4282</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section home-highlights" aria-labelledby="highlights-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Offer</span>
            <h2 id="highlights-heading" className="section-title">Our Core Strengths</h2>
            <p className="section-subtitle">
              Built on industrial manufacturing, quality commitment, and a diverse product portfolio.
            </p>
            <div className="divider" />
          </div>
          <div className="home-highlights__grid">
            {highlights.map((h, i) => (
              <div key={i} className="home-highlight-card">
                <div className="home-highlight-card__icon">
                  <h.icon size={28} />
                </div>
                <h3 className="home-highlight-card__title">{h.title}</h3>
                <p className="home-highlight-card__desc">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="section home-products" aria-labelledby="products-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Products</span>
            <h2 id="products-heading" className="section-title">Product Highlights</h2>
            <p className="section-subtitle">
              Industrial chemicals and materials for your business needs. Contact us for details and pricing.
            </p>
            <div className="divider" />
          </div>
          <div className="home-products__grid">
            {products.map(product => (
              <div className="home-product-card card" key={product.id}>
                <div className="home-product-card__img-wrap">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="home-product-card__img"
                    loading="lazy"
                  />
                  <span className="badge badge-blue home-product-card__badge">{product.category}</span>
                </div>
                <div className="home-product-card__body">
                  <h3 className="home-product-card__name">{product.name}</h3>
                  <p className="home-product-card__desc">{product.shortDesc}</p>
                  <Link to="/products" className="btn btn-outline home-product-card__btn" id={`home-product-${product.id}`}>
                    View Details
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Link to="/products" className="btn btn-primary btn-lg" id="home-all-products-btn">
              View All Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Management Preview */}
      <section className="section home-mgmt" aria-labelledby="mgmt-heading">
        <div className="container">
          <div className="home-mgmt__inner">
            <div className="home-mgmt__text">
              <span className="section-label" style={{ color: 'var(--cyan-light)' }}>Leadership</span>
              <h2 id="mgmt-heading" className="section-title" style={{ textAlign: 'left', color: 'var(--white)' }}>
                Experienced Board of Directors
              </h2>
              <div className="divider divider-left" />
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--text-lg)', lineHeight: 1.7, margin: 'var(--space-5) 0' }}>
                Led by Managing Director <strong style={{ color: 'var(--white)' }}>Md. Humayun Kabir</strong>, our Board of Directors guides the strategic direction and governance of the company.
              </p>
              <Link to="/management" className="btn btn-gold btn-lg" id="home-mgmt-btn">
                Meet the Board
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="home-mgmt__card">
              <div className="home-mgmt__avatar">
                <img
                  src="/humayun.png"
                  alt="Md. Humayun Kabir, Managing Director"
                  className="home-mgmt__avatar-image"
                />
              </div>
              <div className="home-mgmt__card-name">Md. Humayun Kabir</div>
              <div className="home-mgmt__card-title">Managing Director</div>
              <div className="home-mgmt__card-divider" />
              <p className="home-mgmt__card-note">
                Bangladesh Starch &amp; Chemical Industries (PVT.) Ltd.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Factory Location */}
      <section className="section home-location" aria-labelledby="location-heading">
        <div className="container">
          <div className="home-location__grid">
            <div className="home-location__map-placeholder">
              <MapPin size={48} />
              <span>Tongi Bazar, Gazipur</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Chuna+Factory+329+330+DIT+Industrial+Area+IRI+Road+Tongi+Bazar+Gazipur+Dhaka+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                id="home-maps-btn"
              >
                Open in Google Maps
                <ArrowRight size={16} />
              </a>
            </div>
            <div className="home-location__text">
              <span className="section-label">Factory Location</span>
              <h2 id="location-heading" className="section-title" style={{ textAlign: 'left' }}>
                Find Our Factory
              </h2>
              <div className="divider divider-left" />
              <div className="home-location__detail">
                <MapPin size={18} className="home-location__detail-icon" />
                <div>
                  <div className="home-location__detail-label">Corporate Office &amp; Factory</div>
                  <address className="home-location__detail-addr" style={{ fontStyle: 'normal' }}>
                    Chuna Factory, 329/330 DIT Industrial Area, IRI Road, Tongi Bazar, Gazipur, Dhaka, Bangladesh
                  </address>
                </div>
              </div>
              <div className="home-location__detail">
                <MapPin size={18} className="home-location__detail-icon" />
                <div>
                  <div className="home-location__detail-label">Registered Office</div>
                  <address className="home-location__detail-addr" style={{ fontStyle: 'normal' }}>
                    5/9, Block-E, Lalmatia Housing Estate, Dhaka-7
                  </address>
                </div>
              </div>
              <Link to="/contact" className="btn btn-primary" id="home-location-contact-btn">
                Get Directions &amp; Contact
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="home-cta" aria-labelledby="cta-heading">
        <div className="container home-cta__inner">
          <div>
            <h2 id="cta-heading" className="home-cta__title">Ready to Work With Us?</h2>
            <p className="home-cta__sub">Reach out to our team for product enquiries, pricing, or procurement discussions.</p>
          </div>
          <div className="home-cta__actions">
            <Link to="/contact" className="btn btn-gold btn-lg" id="cta-contact-btn">
              <Phone size={18} />
              Contact Our Team
            </Link>
            <Link to="/products" className="btn btn-secondary btn-lg" id="cta-products-btn">
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
