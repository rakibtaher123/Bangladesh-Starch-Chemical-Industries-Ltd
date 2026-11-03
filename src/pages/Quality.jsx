import { ClipboardCheck, Search, FileText, Package, Edit3 } from 'lucide-react'
import './Quality.css'

const qaItems = [
  {
    icon: ClipboardCheck,
    title: 'Quality Management Practices',
    content: `[Placeholder — to be completed by the company]

This section will describe the quality management practices and standards followed by Bangladesh Starch & Chemical Industries (PVT.) Ltd. in its manufacturing and distribution operations. Please provide details of your internal quality management approach for this section.`,
  },
  {
    icon: Search,
    title: 'Product Inspection',
    content: `[Placeholder — to be completed by the company]

This section will describe the product inspection procedures followed before despatch and delivery. Please provide information on your inspection process, sampling methods, and acceptance criteria for this section.`,
  },
  {
    icon: FileText,
    title: 'Quality Documentation',
    content: `[Placeholder — to be completed by the company]

This section will describe the quality documentation maintained by the company, including any test certificates, batch records, or product documentation provided to buyers. Please supply the relevant content.`,
  },
  {
    icon: Package,
    title: 'Packaging & Handling Standards',
    content: `[Placeholder — to be completed by the company]

This section will describe the packaging and handling standards applied to finished products, including safety measures for hazardous materials. Please provide the relevant details for this section.`,
  },
]

export default function Quality() {
  return (
    <div className="quality-page">
      {/* Page Hero */}
      <section className="page-hero" aria-labelledby="qa-hero-heading">
        <div className="container">
          <span className="page-hero-label">Our Standards</span>
          <h1 id="qa-hero-heading">Quality Assurance</h1>
          <p>Bangladesh Starch &amp; Chemical Industries is committed to delivering products that meet the expectations of our industrial buyers.</p>
        </div>
      </section>

      {/* Intro */}
      <section className="section qa-intro" aria-labelledby="qa-intro-heading">
        <div className="container container-sm">
          <div className="section-header">
            <span className="section-label">Our Commitment</span>
            <h2 id="qa-intro-heading" className="section-title">Quality at Every Stage</h2>
            <p className="section-subtitle">
              We maintain quality practices across our manufacturing and supply operations. The sections below will be completed by the company with verified details.
            </p>
            <div className="divider" />
          </div>
        </div>
      </section>

      {/* QA Sections */}
      <section className="section qa-sections" aria-label="Quality assurance details">
        <div className="container container-sm">
          <div className="qa-grid">
            {qaItems.map((item, i) => (
              <div key={i} className="qa-card">
                <div className="qa-card__header">
                  <div className="qa-card__icon">
                    <item.icon size={24} />
                  </div>
                  <h3 className="qa-card__title">{item.title}</h3>
                  <div className="qa-card__edit-badge">
                    <Edit3 size={12} />
                    Editable
                  </div>
                </div>
                <div className="qa-card__content">
                  {item.content.split('\n').map((line, j) => (
                    line.trim() ? <p key={j} className={line.startsWith('[') ? 'qa-placeholder' : ''}>{line}</p> : null
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ paddingBottom: 'var(--space-12)' }}>
        <div className="container container-sm">
          <div className="about-disclaimer__box">
            <strong>Important:</strong> No ISO certification or other third-party quality certification is claimed on this website. Quality content sections above are placeholder templates provided for the company to populate with verified and accurate information. No specific quality standards, certifications, or regulated processes are implied.
          </div>
        </div>
      </section>
    </div>
  )
}
