import React, { useState, useEffect } from 'react';
import './Appointment.css';
import './Faruk.css'
import farulogo from './images/farulogo.png';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

function Appointment() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [showToast, setShowToast] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', gender: '', dob: '',
    date: '', time: '', type: '', caseType: '', description: '',
    city: '', zip: '', language: '', urgency: '', heardFrom: '', consent: false
  });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('ibbsbAf1ROp-hNWgc');
  }, []);

  // Handle preselected case type from navigation state
  useEffect(() => {
    if (location.state?.preselectedCaseType) {
      setFormData(prevData => ({
        ...prevData,
        caseType: location.state.preselectedCaseType
      }));
    }
  }, [location.state]);

  const steps = [
    { id: 1, title: 'Personal Details', icon: '👤', description: 'Your basic information' },
    { id: 2, title: 'Appointment Details', icon: '📅', description: 'When and how to meet' },
    { id: 3, title: 'Case Information', icon: '📋', description: 'Tell us about your case' },
    { id: 4, title: 'Review & Submit', icon: '✓', description: 'Confirm your details' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        break;
      case 2:
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.time) newErrors.time = 'Time is required';
        if (!formData.type) newErrors.type = 'Appointment type is required';
        if (!formData.caseType) newErrors.caseType = 'Case type is required';
        break;
      case 4:
        if (!formData.consent) newErrors.consent = 'You must agree to terms and conditions';
        break;
      default:
        // No validation needed for step 3 (optional fields)
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep || validateStep(currentStep)) {
      setCurrentStep(stepId);
    }
  };

  const sendEmailNotification = async (appointmentData) => {
    try {
      const serviceId = 'service_ue7bso8';
      const templateId = 'template_tu4is84';
      const publicKey = 'ibbsbAf1ROp-hNWgc';
      
      // Format the appointment data for email
      const emailMessage = `
NEW APPOINTMENT BOOKING

PERSONAL DETAILS:
Name: ${appointmentData.fullName}
Email: ${appointmentData.email}
Phone: ${appointmentData.phone}
Gender: ${appointmentData.gender}
Date of Birth: ${appointmentData.dob || 'Not provided'}

APPOINTMENT DETAILS:
Date: ${appointmentData.date}
Time: ${appointmentData.time}
Meeting Type: ${appointmentData.type}
Case Type: ${appointmentData.caseType}
Description: ${appointmentData.description || 'No description provided'}

ADDITIONAL INFORMATION:
City: ${appointmentData.city || 'Not provided'}
PIN Code: ${appointmentData.zip || 'Not provided'}
Preferred Language: ${appointmentData.language || 'Not specified'}
Urgency Level: ${appointmentData.urgency || 'Not specified'}
Heard From: ${appointmentData.heardFrom || 'Not specified'}

Please contact the client to confirm the appointment.
      `;
      
      const templateParams = {
        from_name: appointmentData.fullName,
        from_email: appointmentData.email,
        subject: `New Appointment Booking - ${appointmentData.fullName}`,
        message: emailMessage,
        to_email: 'farukrasulr2003@gmail.com'
      };

      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      
      if (result.status === 200) {
        console.log('Appointment email sent successfully');
        return true;
      } else {
        throw new Error('Email sending failed with status: ' + result.status);
      }
      
    } catch (error) {
      console.error('Email sending error:', error);
      // Still show success to user even if email fails
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    // Send email notification
    await sendEmailNotification(formData);
    
    // Simulate additional processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setShowToast(true);
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Reset form
    setFormData({
      fullName: '', email: '', phone: '', gender: '', dob: '',
      date: '', time: '', type: '', caseType: '', description: '',
      city: '', zip: '', language: '', urgency: '', heardFrom: '', consent: false
    });
    setCurrentStep(1);
    setErrors({});

    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return formData.fullName && formData.email && formData.phone && formData.gender;
      case 2:
        return formData.date && formData.time && formData.type && formData.caseType;
      case 3:
        // Step 3 is considered complete only if user has visited it and moved past it
        // OR if they have filled at least one optional field
        return currentStep > 3 || 
               (formData.city || formData.zip || formData.language || 
                formData.urgency || formData.heardFrom);
      case 4:
        return formData.consent;
      default:
        return false;
    }
  };

  const renderPersonalDetails = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="step-content"
    >
      <div className="step-header">
        <h3>Personal Details</h3>
        <p>Please provide your basic information</p>
      </div>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={errors.fullName ? 'error' : ''}
          />
          {errors.fullName && <span className="error-text">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Contact Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Gender *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={errors.gender ? 'error' : ''}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <span className="error-text">{errors.gender}</span>}
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
      </div>
    </motion.div>
  );

  const renderAppointmentDetails = () => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="step-content"
    >
      <div className="step-header">
        <h3>Appointment Details</h3>
        <p>Choose your preferred date, time, and meeting type</p>
        {/* Show notice if case type was preselected */}
        {location.state?.preselectedCaseType && (
          <div className="preselected-notice">
            ✅ Case type has been automatically selected based on your interest
          </div>
        )}
      </div>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Preferred Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className={errors.date ? 'error' : ''}
          />
          {errors.date && <span className="error-text">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label>Preferred Time *</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={errors.time ? 'error' : ''}
          />
          {errors.time && <span className="error-text">{errors.time}</span>}
        </div>

        <div className="form-group">
          <label>Meeting Type *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={errors.type ? 'error' : ''}
          >
            <option value="">Select meeting type</option>
            <option value="In-person">In-person Meeting</option>
            <option value="Phone">Phone Consultation</option>
            <option value="Video call">Video Call</option>
          </select>
          {errors.type && <span className="error-text">{errors.type}</span>}
        </div>

        <div className="form-group">
          <label>Case Type *</label>
          <select
            name="caseType"
            value={formData.caseType}
            onChange={handleChange}
            className={`${errors.caseType ? 'error' : ''} ${location.state?.preselectedCaseType ? 'preselected' : ''}`}
          >
            <option value="">Select case type</option>
            <option value="Family Law">Family Law</option>
            <option value="Civil Law">Civil Law</option>
            <option value="Criminal Law">Criminal Law</option>
            <option value="Property Disputes">Property Disputes</option>
            <option value="Contract Review">Contract Review</option>
            <option value="Legal Drafting">Legal Drafting</option>
            <option value="Others">Others</option>
          </select>
          {errors.caseType && <span className="error-text">{errors.caseType}</span>}
        </div>

        <div className="form-group full-width">
          <label>Brief Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please describe your legal issue briefly..."
            rows="4"
          />
        </div>
      </div>
    </motion.div>
  );

  const renderCaseInformation = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="step-content"
    >
      <div className="step-header">
        <h3>Additional Information</h3>
        <p>Help us serve you better (optional)</p>
      </div>
      
      <div className="form-grid">
        <div className="form-group">
          <label>City / Location</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
          />
        </div>

        <div className="form-group">
          <label>PIN Code</label>
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            placeholder="Enter PIN code"
          />
        </div>

        <div className="form-group">
          <label>Preferred Language</label>
          <select name="language" value={formData.language} onChange={handleChange}>
            <option value="">Select language</option>
            <option value="English">English</option>
            <option value="Tamil">Tamil</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        <div className="form-group">
          <label>Urgency Level</label>
          <select name="urgency" value={formData.urgency} onChange={handleChange}>
            <option value="">Select urgency</option>
            <option value="Low">Low - Within a month</option>
            <option value="Normal">Normal - Within a week</option>
            <option value="High">High - ASAP</option>
          </select>
        </div>

        <div className="form-group">
          <label>How did you hear about us?</label>
          <select name="heardFrom" value={formData.heardFrom} onChange={handleChange}>
            <option value="">Select source</option>
            <option value="Google">Google Search</option>
            <option value="Social Media">Social Media</option>
            <option value="Friend">Friend/Referral</option>
            <option value="Advertisement">Advertisement</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>
    </motion.div>
  );

  const renderReview = () => (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="step-content"
    >
      <div className="step-header">
        <h3>Review Your Information</h3>
        <p>Please review your details before submitting</p>
      </div>
      
      <div className="review-section">
        <div className="review-card">
          <h4>Personal Details</h4>
          <div className="review-item">
            <strong>Name:</strong> {formData.fullName}
          </div>
          <div className="review-item">
            <strong>Email:</strong> {formData.email}
          </div>
          <div className="review-item">
            <strong>Phone:</strong> {formData.phone}
          </div>
          <div className="review-item">
            <strong>Gender:</strong> {formData.gender}
          </div>
          {formData.dob && (
            <div className="review-item">
              <strong>Date of Birth:</strong> {formData.dob}
            </div>
          )}
        </div>

        <div className="review-card">
          <h4>Appointment Details</h4>
          <div className="review-item">
            <strong>Date:</strong> {formData.date}
          </div>
          <div className="review-item">
            <strong>Time:</strong> {formData.time}
          </div>
          <div className="review-item">
            <strong>Type:</strong> {formData.type}
          </div>
          <div className="review-item">
            <strong>Case:</strong> {formData.caseType}
          </div>
          {formData.description && (
            <div className="review-item">
              <strong>Description:</strong> {formData.description}
            </div>
          )}
        </div>

        {(formData.city || formData.zip || formData.language || formData.urgency || formData.heardFrom) && (
          <div className="review-card">
            <h4>Additional Information</h4>
            {formData.city && (
              <div className="review-item">
                <strong>City:</strong> {formData.city}
              </div>
            )}
            {formData.zip && (
              <div className="review-item">
                <strong>PIN Code:</strong> {formData.zip}
              </div>
            )}
            {formData.language && (
              <div className="review-item">
                <strong>Language:</strong> {formData.language}
              </div>
            )}
            {formData.urgency && (
              <div className="review-item">
                <strong>Urgency:</strong> {formData.urgency}
              </div>
            )}
            {formData.heardFrom && (
              <div className="review-item">
                <strong>Heard From:</strong> {formData.heardFrom}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="consent-section">
        <label className="consent-label">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className={errors.consent ? 'error' : ''}
          />
          <span className="checkmark"></span>
          I agree to the terms and conditions and privacy policy. I understand that this appointment is subject to confirmation.
        </label>
        {errors.consent && <span className="error-text">{errors.consent}</span>}
      </div>
    </motion.div>
  );

  return (
    <div className="enhanced-appointment">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="success-toast"
          >
            <div className="toast-icon">✨</div>
            <div className="toast-content">
              <strong>Success!</strong>
              <span>Your appointment has been submitted successfully</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="header-container">
        <div className="logo">
          <img src={farulogo} alt="Logo" />
        </div>
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/" className={currentPath === '/' ? 'active-link' : ''}>Home</Link></li>
            <li><Link to="/services" className={currentPath === '/services' ? 'active-link' : ''}>Services</Link></li>
            <li><Link to="/contact" className={currentPath === '/contact' ? 'active-link' : ''}>Contact</Link></li>
            <li><Link to="/appointment" className={currentPath === '/appointment' ? 'active-link' : ''}>Appointment</Link></li>
          </ul>
          <div className="hamburger" onClick={() => {
            const nav = document.querySelector('.nav-links');
            nav.classList.toggle('active');
          }}>
            <span></span><span></span><span></span>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-section"
      >
        <h1>Book Your Legal Consultation</h1>
        <p>Schedule a professional consultation with our experienced legal team</p>
      </motion.div>

      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="progress-container"
      >
        <div className="progress-steps">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`progress-step ${currentStep === step.id ? 'active' : ''} ${isStepComplete(step.id) ? 'completed' : ''}`}
                onClick={() => handleStepClick(step.id)}
              >
                <div className="step-icon">{step.icon}</div>
                <div className="step-info">
                  <div className="step-title">{step.title}</div>
                  <div className="step-description">{step.description}</div>
                </div>
              </motion.div>
              {index < steps.length - 1 && (
                <div className={`progress-line ${currentStep > step.id ? 'completed' : ''}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Main Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="form-container"
      >
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {currentStep === 1 && renderPersonalDetails()}
              {currentStep === 2 && renderAppointmentDetails()}
              {currentStep === 3 && renderCaseInformation()}
              {currentStep === 4 && renderReview()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="form-navigation">
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  onClick={handlePrevious}
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Previous
                </motion.button>
              )}
              
              {currentStep < 4 ? (
                <motion.button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next Step
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Appointment'
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Appointment;