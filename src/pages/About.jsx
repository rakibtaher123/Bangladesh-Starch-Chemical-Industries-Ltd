import { Building2, MapPin, FileText, Clock } from 'lucide-react'
import './About.css'

export default function About() {
  return (
    <div className="about-page">
      {/* Page Hero */}
      <section className="page-hero" aria-labelledby="about-hero-heading">
        <div className="container">
          <span className="page-hero-label">Who We Are</span>
          <h1 id="about-hero-heading">About Our Company</h1>
          <p>Learn about Bangladesh Starch &amp; Chemical Industries (PVT.) Ltd. — our identity, our offices, and our industrial mission.</p>
        </div>
      </section>

      {/* About Content */}
      <section className="section about-intro" aria-labelledby="about-intro-heading">
        <div className="container">
          <div className="about-intro__grid">
            <div className="about-intro__text">
              <span className="section-label">Our Identity</span>
              <h2 id="about-intro-heading" className="section-title" style={{ textAlign: 'left' }}>
                Bangladesh Starch &amp; Chemical Industries (PVT.) Ltd.
              </h2>
              <div className="divider divider-left" />
              <p className="about-intro__para">
                Bangladesh Starch &amp; Chemical Industries (PVT.) Ltd. is a privately registered industrial chemical company operating in Bangladesh. The company is registered under Registration Number <strong>C-4282</strong>.
              </p>
              <p className="about-intro__para">
                Our primary factory and corporate operations are based at the DIT Industrial Area, Tongi Bazar, Gazipur — a key industrial zone in Dhaka, Bangladesh. Our product offering includes Feras Liquid, Starch, Lime (Chuna), and Sulfuric Acid (H₂SO₄), catering to the needs of industrial and commercial buyers.
              </p>
              <p className="about-intro__para">
                The company maintains its registered office at Lalmatia Housing Estate, Dhaka, while the primary production and commercial facility is located in Gazipur.
              </p>
              <p className="about-intro__para">
                Company records include a Board of Directors meeting held on 13 May 1974, reflecting the company's longstanding establishment in the industrial sector of Bangladesh.
              </p>
            </div>

            <div className="about-intro__cards">
              <div className="about-info-card">
                <div className="about-info-card__icon">
                  <FileText size={22} />
                </div>
                <div>
                  <div className="about-info-card__label">Registration Number</div>
                  <div className="about-info-card__value">C-4282</div>
                </div>
              </div>
              <div className="about-info-card">
                <div className="about-info-card__icon">
                  <Building2 size={22} />
                </div>
                <div>
                  <div className="about-info-card__label">Company Type</div>
                  <div className="about-info-card__value">Private Limited</div>
                </div>
              </div>
              <div className="about-info-card">
                <div className="about-info-card__icon">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="about-info-card__label">Registered Office</div>
                  <div className="about-info-card__value">5/9, Block-E, Lalmatia Housing Estate, Dhaka-7</div>
                </div>
              </div>
              <div className="about-info-card">
                <div className="about-info-card__icon">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="about-info-card__label">Corporate Office &amp; Factory</div>
                  <div className="about-info-card__value">Chuna Factory, 329/330 DIT Industrial Area, IRI Road, Tongi Bazar, Gazipur, Dhaka</div>
                </div>
              </div>
              <div className="about-info-card">
                <div className="about-info-card__icon">
                  <Clock size={22} />
                </div>
                <div>
                  <div className="about-info-card__label">Historical Record</div>
                  <div className="about-info-card__value">Board meeting on record: 13 May 1974</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="section about-offices" aria-labelledby="offices-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Offices</span>
            <h2 id="offices-heading" className="section-title">Office Locations</h2>
            <div className="divider" />
          </div>
          <div className="about-offices__grid">
            <div className="about-office-card">
              <div className="about-office-card__header">
                <div className="about-office-card__icon"><Building2 size={24} /></div>
                <h3 className="about-office-card__title">Registered Office</h3>
              </div>
              <address className="about-office-card__addr" style={{ fontStyle: 'normal' }}>
                5/9, Block-E, Lalmatia Housing Estate, Dhaka-7, Bangladesh
              </address>
            </div>
            <div className="about-office-card about-office-card--featured">
              <div className="about-office-card__header">
                <div className="about-office-card__icon about-office-card__icon--white"><Building2 size={24} /></div>
                <h3 className="about-office-card__title about-office-card__title--white">Corporate Office &amp; Factory</h3>
              </div>
              <address className="about-office-card__addr about-office-card__addr--white" style={{ fontStyle: 'normal' }}>
                Chuna Factory, 329/330 DIT Industrial Area, IRI Road, Tongi Bazar, Gazipur, Dhaka, Bangladesh
              </address>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="about-disclaimer">
        <div className="container">
          <div className="about-disclaimer__box">
            <p>
              <strong>Note:</strong> Information on this page is presented as provided by the company and its official records. The 13 May 1974 date references a Board of Directors resolution on file and does not necessarily represent the incorporation date of the company. All information is subject to update by the company.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
