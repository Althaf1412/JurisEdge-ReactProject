import React, { useState, useEffect } from 'react';
import farulogo from './images/farulogo.png'
import './Faruk.css'
import './Services.css' // This should include the enhanced modal styles
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaGavel, FaUserFriends, FaFileContract, FaLandmark, FaTimes } from "react-icons/fa";

const expertiseDetails = {
  "Civil Law": {
    icon: <FaGavel className="modal-icon" />,
    description: "Civil law deals with disputes between individuals, organizations, or both. Common cases include property, contracts, and tort claims.",
    services: [
      "Contract disputes",
      "Property litigation",
      "Tort claims",
      "Consumer protection cases",
      "Injunctions"
    ]
  },
  "Family Law": {
    icon: <FaUserFriends className="modal-icon" />,
    description: "Family law addresses legal issues like divorce, child custody, adoption, and other domestic matters.",
    services: [
      "Divorce filings",
      "Child custody arrangements",
      "Adoption services",
      "Alimony/maintenance cases",
      "Domestic violence"
    ]
  },
  "Legal Drafting": {
    icon: <FaFileContract className="modal-icon" />,
    description: "Legal drafting involves preparing legal documents such as contracts, petitions, and agreements using precise language.",
    services: [
      "Contract drafting",
      "Legal notices",
      "Property agreements",
      "Affidavits & declarations",
      "Partnership deeds"
    ]
  },
  "Property Disputes": {
    icon: <FaLandmark className="modal-icon" />,
    description: "Property disputes concern ownership, land boundaries, partition issues, and inheritance-related conflicts.",
    services: [
      "Boundary disputes",
      "Partition suits",
      "Encroachment matters",
      "Title verification",
      "Will/probate issues"
    ]
  }
};

const civilLawCategories = [
  {
    category: "Contract Law",
    services: [
      "Breach of contract claims",
      "Agreement disputes",
      "Employment contracts",
      "Service agreements"
    ]
  },
  {
    category: "Property Law",
    services: [
      "Ownership issues",
      "Title disputes",
      "Lease disagreements",
      "Transfer of property"
    ]
  },
  {
    category: "Tort Law",
    services: [
      "Negligence claims",
      "Defamation suits",
      "Personal injury cases",
      "Nuisance complaints"
    ]
  },
  {
    category: "Consumer Protection",
    services: [
      "Faulty product claims",
      "Misleading advertisements",
      "Unfair trade practices"
    ]
  },
  {
    category: "Family-related Civil Matters",
    services: [
      "Partition of family property",
      "Inheritance disputes",
      "Will execution & probate"
    ]
  }
];

function Services() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [showCivilLawModal, setShowCivilLawModal] = useState(false);
  const [showFamilyLawModal, setShowFamilyLawModal] = useState(false);
  const [showLegalDraftingModal, setShowLegalDraftingModal] = useState(false);
  const [showPropertyDisputesModal, setShowPropertyDisputesModal] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  // Trigger page animation on mount
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  // Handle escape key press to close modals
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowCivilLawModal(false);
        setShowFamilyLawModal(false);
        setShowLegalDraftingModal(false);
        setShowPropertyDisputesModal(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    const isAnyModalOpen = showCivilLawModal || showFamilyLawModal || 
                          showLegalDraftingModal || showPropertyDisputesModal;
    
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showCivilLawModal, showFamilyLawModal, showLegalDraftingModal, showPropertyDisputesModal]);

  return (
    <div className={pageLoaded ? 'page-animate' : ''}>
      <div className="header-container">
        <div className="logo">
          <img src={farulogo} alt="Logo" />
        </div>

        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/" className={currentPath === '/' ? 'active-link' : ''}>Home</Link>
            </li>
            <li>
              <Link to="/services" className={currentPath === '/services' ? 'active-link' : ''}>Services</Link>
            </li>
            <li>
              <Link to="/contact" className={currentPath === '/contact' ? 'active-link' : ''}>Contact</Link>
            </li>
            <li>
              <Link to="/appointment" className={currentPath === '/appointment' ? 'active-link' : ''}>Appointment</Link>
            </li>
          </ul>

          <div className="hamburger" onClick={() => {
            const nav = document.querySelector('.nav-links');
            nav.classList.toggle('active');
          }}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </div>

      <div className="services-section">
        <h2>Our Legal Services</h2>
        <p className="services-subtitle">
          Providing expert legal support in a wide range of practice areas.
        </p>
        
        <div className="services-grid">
          {Object.entries(expertiseDetails).map(([title, { icon, description, services }]) => (
            <div
              className="service-card"
              key={title}
              onClick={() => {
                if (title === "Civil Law") setShowCivilLawModal(true);
                if (title === "Family Law") setShowFamilyLawModal(true);
                if (title === "Legal Drafting") setShowLegalDraftingModal(true);
                if (title === "Property Disputes") setShowPropertyDisputesModal(true);
              }}
            >
              <div className="service-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{description}</p>

              <div className="service-popup">
                <h4>Services under {title}:</h4>
                <ul>
                  {services.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <h3>Need legal advice or support?</h3>
          <button className="appointment-btn" onClick={() => navigate('/appointment')}>
            Book an Appointment
          </button>
        </div>

        {/* Enhanced Civil Law Modal */}
        {showCivilLawModal && (
          <div className="civil-law-modal-overlay" onClick={() => setShowCivilLawModal(false)}>
            <div className="civil-law-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-closes-btn" onClick={() => setShowCivilLawModal(false)}>
                <FaTimes />
              </button>
              <h2>Civil Law Categories</h2>
              <div className="modal-body">
                <p>Explore our comprehensive civil law services designed to protect your rights and interests in various legal matters.</p>
                {civilLawCategories.map((cat, index) => (
                  <div key={index} className="civil-category">
                    <h4>{cat.category}</h4>
                    <ul>
                      {cat.services.map((srv, i) => (
                        <li key={i}>{srv}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <button className="close-btn" onClick={() => setShowCivilLawModal(false)}>
                <FaTimes />
                Close
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Family Law Modal */}
        {showFamilyLawModal && (
          <div className="civil-law-modal-overlay" onClick={() => setShowFamilyLawModal(false)}>
            <div className="civil-law-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-closes-btn" onClick={() => setShowFamilyLawModal(false)}>
                <FaTimes />
              </button>
              <h2>Family Law Services</h2>
              <div className="modal-body">
                <p>Comprehensive family law services to support you through personal and domestic legal matters with sensitivity and expertise.</p>

                <div className="civil-category">
                  <h4>Divorce & Separation</h4>
                  <ul>
                    <li>Mutual consent divorce</li>
                    <li>Contested divorce cases</li>
                    <li>Legal separation guidance</li>
                    <li>Maintenance and alimony claims</li>
                  </ul>
                </div>

                <div className="civil-category">
                  <h4>Child Custody & Guardianship</h4>
                  <ul>
                    <li>Custody arrangements</li>
                    <li>Visitation rights</li>
                    <li>Guardianship petitions</li>
                    <li>Parental relocation disputes</li>
                  </ul>
                </div>

                <div className="civil-category">
                  <h4>Adoption & Surrogacy</h4>
                  <ul>
                    <li>Domestic adoption procedures</li>
                    <li>International adoption compliance</li>
                    <li>Step-parent adoption</li>
                    <li>Surrogacy agreement consultation</li>
                  </ul>
                </div>

                <div className="civil-category">
                  <h4>Domestic Violence & Protection</h4>
                  <ul>
                    <li>Protection orders</li>
                    <li>Dowry harassment complaints</li>
                    <li>Emergency restraining orders</li>
                    <li>Police complaint guidance</li>
                  </ul>
                </div>

                <div className="civil-category">
                  <h4>Marriage Registration & Nullity</h4>
                  <ul>
                    <li>Marriage registration</li>
                    <li>Annulment of marriage</li>
                    <li>Bigamy-related legal aid</li>
                    <li>Inter-caste/inter-faith marriage help</li>
                  </ul>
                </div>
              </div>
              <button className="close-btn" onClick={() => setShowFamilyLawModal(false)}>
                <FaTimes />
                Close
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Legal Drafting Modal */}
        {showLegalDraftingModal && (
          <div className="civil-law-modal-overlay" onClick={() => setShowLegalDraftingModal(false)}>
            <div className="civil-law-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-closes-btn" onClick={() => setShowLegalDraftingModal(false)}>
                <FaTimes />
              </button>
              <h2>Legal Drafting Services</h2>
              <div className="modal-body">
                <p>Expert legal document preparation services ensuring your agreements and contracts are legally sound, clear, and enforceable.</p>

                <div className="civil-category">
                  <h4>Contracts & Agreements</h4>
                  <ul>
                    <li>Business contracts</li>
                    <li>Employment agreements</li>
                    <li>Freelance/service contracts</li>
                    <li>Non-disclosure agreements</li>
                  </ul>
                </div>

                <div className="civil-category">
                  <h4>Notices & Declarations</h4>
                  <ul>
                    <li>Legal notices (tenant/employee)</li>
                    <li>Affidavits</li>
                    <li>Sworn declarations</li>
                    <li>Power of attorney</li>
                  </ul>
                </div>

                <div className="civil-category">
                  <h4>Real Estate Documentation</h4>
                  <ul>
                    <li>Lease/rent agreements</li>
                    <li>Sale deeds</li>
                    <li>Gift deeds</li>
                    <li>Title transfer documents</li>
                  </ul>
                </div>

                <div className="civil-category">
                  <h4>Corporate Legal Drafting</h4>
                  <ul>
                    <li>Memorandum of Understanding (MoU)</li>
                    <li>Shareholder agreements</li>
                    <li>Partnership deeds</li>
                    <li>Company policies & disclaimers</li>
                  </ul>
                </div>
              </div>
              <button className="close-btn" onClick={() => setShowLegalDraftingModal(false)}>
                <FaTimes />
                Close
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Property Disputes Modal */}
        {showPropertyDisputesModal && (
          <div className="civil-law-modal-overlay" onClick={() => setShowPropertyDisputesModal(false)}>
            <div className="civil-law-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-closes-btn" onClick={() => setShowPropertyDisputesModal(false)}>
                <FaTimes />
              </button>
              <h2>Property Dispute Services</h2>
              <div className="modal-body">
                <p>Specialized assistance in resolving complex property matters including ownership disputes, boundary conflicts, and inheritance issues.</p>

                <div className="civil-category">
                  <h4>Ownership & Title Disputes</h4>
                  <ul>
                    <li>Title verification & correction</li>
                    <li>Fraudulent transfer cases</li>
                    <li>Illegal occupation matters</li>
                    <li>Land record rectification</li>
                  </ul>
                </div>

                <div className="civil-category">
                  <h4>Boundary & Encroachment Issues</h4>
                  <ul>
                    <li>Boundary wall conflicts</li>
                    <li>Illegal encroachment disputes</li>
                    <li>Survey verification guidance</li>
                    <li>Government land occupation issues</li>
                  </ul>
                </div>

                <div className="civil-category">
                  <h4>Partition & Inheritance</h4>
                  <ul>
                    <li>Partition suits among heirs</li>
                    <li>Will contesting & probate</li>
                    <li>Family property division</li>
                    <li>Succession certificate assistance</li>
                  </ul>
                </div>

                <div className="civil-category">
                  <h4>Builder & Developer Disputes</h4>
                  <ul>
                    <li>Delay in possession claims</li>
                    <li>RERA complaints</li>
                    <li>Undelivered promises by builders</li>
                    <li>Builder-buyer agreement disputes</li>
                  </ul>
                </div>
              </div>
              <button className="close-btn" onClick={() => setShowPropertyDisputesModal(false)}>
                <FaTimes />
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;