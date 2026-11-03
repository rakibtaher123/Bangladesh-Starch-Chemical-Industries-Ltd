import { Factory, MapPin, Truck, Settings } from 'lucide-react'
import './Manufacturing.css'

const highlights = [
  {
    icon: Factory,
    title: 'Production Facility',
    desc: 'Our Chuna Factory in Tongi Bazar, Gazipur serves as the primary production and operational hub for our industrial product lines.',
  },
  {
    icon: MapPin,
    title: 'Strategic Location',
    desc: 'Located within the DIT Industrial Area on IRI Road, Tongi Bazar, Gazipur — a key industrial zone well-connected to Dhaka city and major transport routes.',
  },
  {
    icon: Settings,
    title: 'Manufacturing Operations',
    desc: 'Our factory carries out manufacturing and processing operations to produce and handle the industrial products we supply to our customers.',
  },
  {
    icon: Truck,
    title: 'Supply & Distribution',
    desc: 'We facilitate supply and distribution of our products to industrial buyers. For volume, packaging, and logistics requirements, please contact us directly.',
  },
]

export default function Manufacturing() {
  return (
    <div className="mfg-page">
      {/* Page Hero */}
      <section className="page-hero" aria-labelledby="mfg-hero-heading">
        <div className="container">
          <span className="page-hero-label">Our Facility</span>
          <h1 id="mfg-hero-heading">Manufacturing &amp; Factory</h1>
          <p>An overview of our production facility and factory operations in Gazipur, Dhaka, Bangladesh.</p>
        </div>
      </section>

      {/* Factory Overview */}
      <section className="section mfg-overview" aria-labelledby="mfg-overview-heading">
        <div className="container">
          <div className="mfg-overview__grid">
            <div className="mfg-overview__img-wrap">
              <img
                src="/manufacturing_interior.png"
                alt="Bangladesh Starch & Chemical Industries factory interior"
                className="mfg-overview__img"
              />
              <div className="mfg-overview__img-label">
                <Factory size={18} />
                <span>Chuna Factory — Tongi Bazar, Gazipur</span>
              </div>
            </div>
            <div className="mfg-overview__text">
              <span className="section-label">Factory Overview</span>
              <h2 id="mfg-overview-heading" className="section-title" style={{ textAlign: 'left' }}>
                Our Production Facility
              </h2>
              <div className="divider divider-left" />
              <p className="mfg-overview__para">
                Bangladesh Starch &amp; Chemical Industries (PVT.) Ltd. operates its primary manufacturing and factory facility under the name <strong>Chuna Factory</strong>, located at 329/330 DIT Industrial Area, IRI Road, Tongi Bazar, Gazipur, Dhaka.
              </p>
              <p className="mfg-overview__para">
                The factory is the company's main production base for its product lines including Starch, Lime (Chuna), Sulfuric Acid, and Feras Liquid. Operations are managed to support the supply needs of our industrial customers.
              </p>
              <p className="mfg-overview__para">
                For enquiries regarding manufacturing capability, minimum order quantities, product specifications, or factory visits, please contact us through our Contact page.
              </p>
              <div className="mfg-overview__location">
                <MapPin size={16} className="mfg-overview__location-icon" />
                <address style={{ fontStyle: 'normal', fontSize: 'var(--text-sm)', color: 'var(--gray-600)' }}>
                  Chuna Factory, 329/330 DIT Industrial Area, IRI Road, Tongi Bazar, Gazipur, Dhaka, Bangladesh
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section mfg-highlights" aria-labelledby="mfg-highlights-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Facility Highlights</span>
            <h2 id="mfg-highlights-heading" className="section-title">Production &amp; Operations</h2>
            <p className="section-subtitle">
              Key facts about our factory location and manufacturing operations.
            </p>
            <div className="divider" />
          </div>
          <div className="mfg-highlights__grid">
            {highlights.map((h, i) => (
              <div key={i} className="mfg-highlight-card">
                <div className="mfg-highlight-card__icon">
                  <h.icon size={26} />
                </div>
                <h3 className="mfg-highlight-card__title">{h.title}</h3>
                <p className="mfg-highlight-card__desc">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ paddingBottom: 'var(--space-12)' }}>
        <div className="container">
          <div className="about-disclaimer__box">
            <strong>Note:</strong> Manufacturing details on this page are presented based on available company information. No specific machinery, production capacity figures, certifications, or detailed process claims are made. Contact us for verified technical information.
          </div>
        </div>
      </section>
    </div>
  )
}
