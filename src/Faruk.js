import React from 'react'
import './Faruk.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import farulogo from './images/farulogo.png'
import farukpic from './images/farukpic.jpg'
import ambedkar from './images/ambedkar.jpg'
import { FaInstagram, FaWhatsapp, FaTwitter,  FaFacebook,FaQuoteLeft } from 'react-icons/fa6';
import  { useState, useEffect } from 'react';
import { FaGavel, FaUserFriends, FaFileContract, FaLandmark } from 'react-icons/fa';

const AreasOfExpertise = React.memo(({ onExpertiseClick }) => (
  <div className="expertise-section">
    <h2 className="expertise-title">Areas of Expertise</h2>

    <div className="expertise-grid">
      <div className="expertise-card" onClick={() => onExpertiseClick("Civil Law")}>
        <span role="img" aria-label="civil law">⚖️</span>
        <h3>Civil Law</h3>
        <p>Disputes related to contracts, property, and legal obligations.</p>
      </div>

      <div className="expertise-column">
        <div className="expertise-card" onClick={() => onExpertiseClick("Family Law")}>
          <span role="img" aria-label="family law">👨‍👩‍👧</span>
          <h3>Family Law</h3>
          <p>Support in divorce, custody, and domestic matters.</p>
        </div>
        <div className="expertise-card" onClick={() => onExpertiseClick("Legal Drafting")}>
          <span role="img" aria-label="legal drafting">📄</span>
          <h3>Legal Drafting</h3>
          <p>Professional documentation for agreements and contracts.</p>
        </div>
      </div>

      <div className="expertise-card" onClick={() => onExpertiseClick("Property Disputes")}>
        <span role="img" aria-label="property disputes">📑</span>
        <h3>Property Disputes</h3>
        <p>Legal help for ownership, partition, and land issues.</p>
      </div>
    </div>
  </div>
));

const expertiseDetails = {
  "Civil Law": {
    icon: <FaGavel className="modal-icon" />,
    description:
      "Civil law deals with disputes between individuals, organizations, or both. Common cases include property, contracts, and tort claims."
  },
  "Family Law": {
    icon: <FaUserFriends className="modal-icon" />,
    description:
      "Family law addresses legal issues like divorce, child custody, adoption, and other domestic matters."
  },
  "Legal Drafting": {
    icon: <FaFileContract className="modal-icon" />,
    description:
      "Legal drafting involves preparing legal documents such as contracts, petitions, and agreements using precise language."
  },
  "Property Disputes": {
    icon: <FaLandmark className="modal-icon" />,
    description:
      "Property disputes concern ownership, land boundaries, partition issues, and inheritance-related conflicts."
  }
};

function ExpertiseModal({ topic, onClose }) {
  const modalRef = React.useRef();
  const navigate = useNavigate();

  // Close modal if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleBookAppointment = () => {
    // Navigate to appointment page with case type as state
    navigate('/appointment', { 
      state: { 
        preselectedCaseType: topic 
      }
    });
    onClose(); // Close the modal
  };

  if (!topic) return null;

  const { icon, description } = expertiseDetails[topic];

  return (
    <div className="expertise-modal-overlay">
      <link rel="icon"  href="./images/farulogo.png"/>
      <div className="expertise-modal animated-modal" ref={modalRef}>
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <div className="modal-headerss">
          {icon}
          <h2>{topic}</h2>
        </div>
        <p>{description}</p>
        
        {/* Book Appointment Button */}
        <div className="modal-actions">
          <button 
            className="book-appointment-btn"
            onClick={handleBookAppointment}
          >
            📅 Book an Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

function Faruk() {

  const [hovered, setHovered] = useState(false);
  const [selectedExpertise, setSelectedExpertise] = useState(null);
  const location = useLocation();
  const currentPath = location.pathname;

  const LAW_QUOTES = [
  { text: "Justice too long delayed is justice denied.", author: "Martin Luther King Jr." },
  { text: "It is the spirit and not the form of law that keeps justice alive.", author: "Earl Warren" },
  { text: "Law and order are the medicine of the body politic...", author: "Dr. B.R. Ambedkar" },
  { text: "The law must be stable, but it must not stand still.", author: "Roscoe Pound" },
];

function RotatingLawQuotes({ interval = 2000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % LAW_QUOTES.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  const { text, author } = LAW_QUOTES[index];
  return <blockquote className="law-quote"><span>{text}</span><footer>— {author}</footer></blockquote>;
}

  return (
    <div className="page-container">
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
      
      <div className="layout-container">
        {/* Left Layout */}
        <div className="left-layout">
          <div className="profile-pic-container">
            <img src={farukpic} alt="Profile" />
            <h2 className="profile-name">Faruk <br/>Advocate</h2>
          </div>
          
          {/* Social Media Icons */}
          <div
            className={`follow-button ${hovered ? "hovered" : ""}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {!hovered ? (
              <span className="follow-text">FOLLOW ME</span>
            ) : (
              <div className="social-icons-1">
                <a href="https://x.com/farukrasulr2003/" className="icon twitter" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a href="https://wa.me/+917604941616" className="icon whatsapp" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                <a href="https://www.instagram.com/faru_kfn/" className="icon instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://www.facebook.com/Faruk R" className="icon facebook" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
              </div>
            )}
          </div>
          
          <div className="wildcard-container">
            <div className="wildcard">
              <FaQuoteLeft className="quote-icon" />
              <p className="wildcard-text">
                "Injustice anywhere is a threat to justice everywhere."
              </p>
              <p className="wildcard-author">— Martin Luther King Jr.</p>
            </div>
          </div>
        </div>

        {/* Right Layout */}
        <div className="right-layout">
          <div className="ambedkar-bg">
            <img src={ambedkar} alt="Profile" />
          </div>

          <div className="right-content">
            <div className="right-inner">
              <div className="quote-section-fixed">
                <RotatingLawQuotes />
                <AreasOfExpertise onExpertiseClick={setSelectedExpertise} />
                <ExpertiseModal topic={selectedExpertise} onClose={() => setSelectedExpertise(null)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Faruk