import { Star, User } from 'lucide-react'
import { directors } from '../data/companyData'
import './Management.css'

const md = directors.find(d => d.isMD)
const boardDirectors = directors.filter(d => !d.isMD)

function getInitials(name) {
  return name
    .split(' ')
    .filter(w => w.length > 1)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
}

export default function Management() {
  return (
    <div className="management-page">
      {/* Page Hero */}
      <section className="page-hero" aria-labelledby="mgmt-hero-heading">
        <div className="container">
          <span className="page-hero-label">Our Leadership</span>
          <h1 id="mgmt-hero-heading">Board of Directors</h1>
          <p>Meet the distinguished leadership of Bangladesh Starch &amp; Chemical Industries (PVT.) Ltd.</p>
        </div>
      </section>

      {/* Managing Director */}
      <section className="section mgmt-md" aria-labelledby="md-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Executive Leadership</span>
            <h2 id="md-heading" className="section-title">Managing Director</h2>
            <div className="divider" />
          </div>
          <div className="mgmt-md__card">
            <div className="mgmt-md__avatar">
              <img
                src={md.image}
                alt={`Portrait of ${md.name}, Managing Director`}
                className="mgmt-md__portrait"
              />
              <div className="mgmt-md__avatar-ring" aria-hidden="true" />
            </div>
            <div className="mgmt-md__info">
              <div className="mgmt-md__badge">
                <Star size={14} />
                Managing Director
              </div>
              <h3 className="mgmt-md__name">{md.name}</h3>
              <p className="mgmt-md__company">Bangladesh Starch &amp; Chemical Industries (PVT.) Ltd.</p>
              <div className="mgmt-md__divider" />
              <p className="mgmt-md__note">
                As Managing Director, {md.name.split(' ')[0]} {md.name.split(' ')[md.name.split(' ').length - 1]} leads the executive operations and strategic direction of the company.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="section mgmt-board" aria-labelledby="board-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Governance</span>
            <h2 id="board-heading" className="section-title">Directors</h2>
            <p className="section-subtitle">
              Our Board of Directors provides governance and oversight to the company's operations.
            </p>
            <div className="divider" />
          </div>
          <div className="mgmt-board__grid">
            {boardDirectors.map(director => (
              <div key={director.id} className="mgmt-director-card">
                <div className="mgmt-director-card__media">
                  {director.image ? (
                    <img
                      src={director.image}
                      alt={`Portrait of ${director.name}, ${director.title}`}
                      className="mgmt-director-card__portrait"
                    />
                  ) : (
                    <>
                      <span className="mgmt-director-card__initials">{getInitials(director.name)}</span>
                      <User size={16} className="mgmt-director-card__icon" aria-hidden="true" />
                    </>
                  )}
                </div>
                <h3 className="mgmt-director-card__name">{director.name}</h3>
                <div className="mgmt-director-card__title">{director.title}</div>
                <div className="mgmt-director-card__company">
                  Bangladesh Starch &amp; Chemical Industries (PVT.) Ltd.
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ paddingBottom: 'var(--space-12)' }}>
        <div className="container">
          <div className="about-disclaimer__box">
            <strong>Note:</strong> Names and designations on this page are transcribed from official company records and have been confirmed by the company. No biographies, qualifications, or photographs have been added. The company may update this information as required.
          </div>
        </div>
      </section>
    </div>
  )
}
