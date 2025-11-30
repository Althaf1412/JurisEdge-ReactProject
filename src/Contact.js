import React, { useEffect, useRef, useState } from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaClock, FaPaperPlane, FaTimes, FaDirections, FaCopy, FaCheck } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import farulogo from './images/farulogo.png';
import './Faruk.css'
import './Contact.css';
import './Notification.css';
import './ContactModals.css'; // Add this new CSS file

const Contact = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: '',
    message: ''
  });

  // Modal states
  const [activeModal, setActiveModal] = useState(null);
  // const [modalData, setModalData] = useState({});
  const [copiedText, setCopiedText] = useState('');
  const [quickEmailData, setQuickEmailData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init('ibbsbAf1ROp-hNWgc');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuickEmailChange = (e) => {
    setQuickEmailData({
      ...quickEmailData,
      [e.target.name]: e.target.value
    });
  };

  const showNotification = (type, message) => {
    setNotification({
      show: true,
      type: type,
      message: message
    });
    
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showNotification('error', 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceId = 'service_ue7bso8';
      const templateId = 'template_tu4is84';
      const publicKey = 'ibbsbAf1ROp-hNWgc';
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'farukrasulr2003@gmail.com'
      };

      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      
      if (result.status === 200) {
        setFormData({ name: '', email: '', subject: '', message: '' });
        showNotification('success', 'Message sent successfully! We\'ll get back to you soon.');
      } else {
        throw new Error('Email sending failed with status: ' + result.status);
      }
      
    } catch (error) {
      console.error('Detailed error:', error);
      
      if (error.text) {
        showNotification('error', `Failed to send message: ${error.text}`);
      } else if (error.message) {
        showNotification('error', `Error: ${error.message}`);
      } else {
        showNotification('error', 'Failed to send message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!quickEmailData.name || !quickEmailData.email || !quickEmailData.message) {
      showNotification('error', 'Please fill in all fields.');
      return;
    }

    try {
      const serviceId = 'service_ue7bso8';
      const templateId = 'template_tu4is84';
      const publicKey = 'ibbsbAf1ROp-hNWgc';
      
      const templateParams = {
        from_name: quickEmailData.name,
        from_email: quickEmailData.email,
        subject: 'Quick Contact from Modal',
        message: quickEmailData.message,
        to_email: 'farukrasulr2003@gmail.com'
      };

      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      
      if (result.status === 200) {
        setQuickEmailData({ name: '', email: '', message: '' });
        showNotification('success', 'Quick message sent successfully!');
        setActiveModal(null);
      }
      
    } catch (error) {
      showNotification('error', 'Failed to send quick message. Please try again.');
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(type);
      setTimeout(() => setCopiedText(''), 2000);
    });
  };

  const openModal = (modalType, data = {}) => {
    setActiveModal(modalType);
    // setModalData(data);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    // setModalData({});
    document.body.style.overflow = 'unset';
  };

  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  };

  const isCurrentlyOpen = () => {
    const now = new Date();
    const currentDay = getCurrentDay();
    const currentHour = now.getHours();
    
    if (currentDay === 'Sunday') return false;
    if (currentDay === 'Saturday') return currentHour >= 10 && currentHour < 16;
    return currentHour >= 9 && currentHour < 18;
  };

  const socials = [
    { icon: <FaInstagram />, label: "Instagram", link: "https://www.instagram.com/_faruk_fn/", color: "#E4405F" },
    { icon: <FaFacebookF />, label: "Facebook", link: "https://facebook.com", color: "#1877F2" },
    { icon: <FaTwitter />, label: "Twitter", link: "https://x.com/farukrasulr2003/", color: "#1DA1F2" },
    { icon: <FaWhatsapp />, label: "WhatsApp", link: "https://wa.me/+917604941616", color: "#25D366" },
    { icon: <HiOutlineMail />, label: "Gmail", link: "mailto:farukrasulr2003@gmail.com", color: "#EA4335" },
    { icon: <FaPhoneAlt />, label: "Call", link: "tel:7604941616", color: "#34A853" },
  ];

  const renderModal = () => {
    if (!activeModal) return null;

    const modalContent = {
      location: (
        <div className="modal-container location-modal">
          <div className="modal-header">
            <h3><FaMapMarkerAlt /> Our Location</h3>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
          </div>
          <div className="modal-body">
            <div className="location-info">
              <div className="location-address">
                <strong>FaruTech Pvt Ltd</strong><br />
                123, Main Street<br />
                Tech City, Tamil Nadu - 600001<br />
                India
              </div>
              <div className="location-actions">
                <a 
                  href="https://www.google.com/maps/dir//Chennai+Central" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="action-btn"
                >
                  <FaDirections /> Get Directions
                </a>
                <button 
                  className="action-btn"
                  onClick={() => copyToClipboard('123, Main Street, Tech City, Tamil Nadu - 600001', 'address')}
                >
                  {copiedText === 'address' ? <FaCheck /> : <FaCopy />}
                  {copiedText === 'address' ? 'Copied!' : 'Copy Address'}
                </button>
              </div>
            </div>
            <div className="map-container">
              <iframe
                className="map-embed"
                title="Our Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.6682978134924!2d80.27836747496486!3d13.067439387252195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267d9436aa8c9%3A0x56a309a4c6a1765d!2sChennai%20Central!5e0!3m2!1sen!2sin!4v1693226358795!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      ),
      phone: (
        <div className="modal-container phone-modal">
          <div className="modal-header">
            <h3><FaPhoneAlt /> Call Us</h3>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
          </div>
          <div className="modal-body">
            <div className="phone-display">
              <div className="phone-number">
                +91 7604941616
                <button 
                  className={`copy-btn ${copiedText === 'phone' ? 'copied' : ''}`}
                  onClick={() => copyToClipboard('+917604941616', 'phone')}
                >
                  {copiedText === 'phone' ? <FaCheck /> : <FaCopy />}
                </button>
              </div>
              <p>Available Mon-Fri, 9 AM - 6 PM</p>
            </div>
            <div className="phone-actions">
              <a href="tel:+917604941616" className="actions-btn1">
                <FaPhoneAlt /> Call Now
              </a>
              <a href="https://wa.me/+917604941616" target="_blank" rel="noopener noreferrer" className="call-btn">
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      ),
      email: (
        <div className="modal-container email-modal">
          <div className="modal-header">
            <h3><FaEnvelope /> Email Us</h3>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
          </div>
          <div className="modal-body">
            <div className="email-info">
              <div className="email-address">
                farukrasulr2003@gmail.com
                <button 
                  className={`copy-btn ${copiedText === 'email' ? 'copied' : ''}`}
                  onClick={() => copyToClipboard('farukrasulr2003@gmail.com', 'email')}
                >
                  {copiedText === 'email' ? <FaCheck /> : <FaCopy />}
                </button>
              </div>
              <p>Send us a quick message below or open your email client</p>
            </div>
            
            <form className="quick-email-form" onSubmit={handleQuickEmailSubmit}>
              <div className="form-group-modal">
                <label htmlFor="quick-name">Your Name</label>
                <input
                  type="text"
                  id="quick-name"
                  name="name"
                  value={quickEmailData.name}
                  onChange={handleQuickEmailChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group-modal">
                <label htmlFor="quick-email">Your Email</label>
                <input
                  type="email"
                  id="quick-email"
                  name="email"
                  value={quickEmailData.email}
                  onChange={handleQuickEmailChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group-modal">
                <label htmlFor="quick-message">Message</label>
                <textarea
                  id="quick-message"
                  name="message"
                  value={quickEmailData.message}
                  onChange={handleQuickEmailChange}
                  placeholder="Your message..."
                  rows="4"
                  required
                />
              </div>
              <button type="submit" className="send-btn">
                <FaPaperPlane /> Send Quick Message
              </button>
            </form>
            
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <a href="mailto:farukrasulr2003@gmail.com" className="action-btn">
                <FaEnvelope /> Open Email Client
              </a>
            </div>
          </div>
        </div>
      ),
      hours: (
        <div className="modal-container hours-modal">
          <div className="modal-header">
            <h3><FaClock /> Office Hours</h3>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
          </div>
          <div className="modal-body">
            <div className="hours-grid">
              {[
                { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
                { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
                { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
                { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
                { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
                { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                { day: 'Sunday', hours: 'Closed' }
              ].map((schedule, index) => (
                <div 
                  key={index} 
                  className={`hours-day ${getCurrentDay() === schedule.day ? 'today' : ''}`}
                >
                  <span className="day-name">{schedule.day}</span>
                  <span className="day-hours">{schedule.hours}</span>
                </div>
              ))}
            </div>
            <div className={`status-badge ${isCurrentlyOpen() ? '' : 'closed'}`}>
              {isCurrentlyOpen() ? '🟢 Currently Open' : '🔴 Currently Closed'}
            </div>
          </div>
        </div>
      )
    };

    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div onClick={(e) => e.stopPropagation()}>
          {modalContent[activeModal]}
        </div>
      </div>
    );
  };

  return (
    <div className="contact-page" ref={containerRef}>
      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type} ${notification.show ? 'show' : ''}`}>
          <div className="notification-content">
            <span className="notification-message">{notification.message}</span>
            <button 
              className="notification-close" 
              onClick={() => setNotification({ show: false, type: '', message: '' })}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Floating Particles */}
      <div className="particle particle-1"></div>
      <div className="particle particle-2"></div>
      <div className="particle particle-3"></div>

      {/* Header */}
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

      <div className="contact-content">
        {/* Hero Section */}
        <div className="contact-hero animate-on-scroll">
          <h1>Get In Touch</h1>
          <p>Ready to take the next step? We're here to help you navigate your legal journey with expert guidance and personalized service.</p>
        </div>

        {/* Contact Form and Info Grid */}
        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form-section animate-on-scroll">
            <h2>Send us a Message</h2>
            <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="How can we help you?"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your legal needs..."
                  rows="5"
                  required
                />
              </div>
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          {/* Contact Info - Updated with enhanced hover effects */}
<div className="contact-info-section animate-on-scroll">
  <div className="info-card clickable-card" onClick={() => openModal('location')}>
    <h3><FaMapMarkerAlt /> Our Location</h3>
    <p>123, FaruTech Pvt Ltd</p>
    <p>Main Street, Tech City</p>
    <p>Tamil Nadu - 600001</p>
    <div className="hover-tooltip">✨ View on map</div>
  </div>
  
  <div className="info-card clickable-card" onClick={() => openModal('phone')}>
    <h3><FaPhoneAlt /> Call Us</h3>
    <p>+91 7604941616</p>
    <p>Available Mon-Fri, 9 AM - 6 PM</p>
    <div className="hover-tooltip">📞 Call options</div>
  </div>
  
  <div className="info-card clickable-card" onClick={() => openModal('email')}>
    <h3><FaEnvelope /> Email Us</h3>
    <p>farukrasulr2003@gmail.com</p>
    <p>We'll respond within 24 hours</p>
    <div className="hover-tooltip">💌 Quick email</div>
  </div>
  
  <div className="info-card clickable-card" onClick={() => openModal('hours')}>
    <h3><FaClock /> Office Hours</h3>
    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
    <p>Saturday: 10:00 AM - 4:00 PM</p>
    <p>Sunday: Closed</p>
    <div className="hover-tooltip">⏰ Full schedule</div>
  </div>
</div>
        </div>

        {/* Social Media Section */}
        <div className="social-section animate-on-scroll">
          <h2>Connect With Us</h2>
          <div className="social-grid">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
              >
                <div className="social-icon" style={{ color: social.color }}>
                  {social.icon}
                </div>
                <div className="social-label">{social.label}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section animate-on-scroll">
          <h2>Find Us on the Map</h2>
          <div className="map-container">
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.6682978134924!2d80.27836747496486!3d13.067439387252195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267d9436aa8c9%3A0x56a309a4c6a1765d!2sChennai%20Central!5e0!3m2!1sen!2sin!4v1693226358795!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Render Modal */}
      {renderModal()}
    </div>
  );
};

export default Contact;