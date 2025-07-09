import React, { useState } from 'react';
import { FiMail, FiShield, FiBriefcase, FiInfo, FiChevronsRight, FiPhone } from 'react-icons/fi';
import { GoLaw } from 'react-icons/go';
import { FaInstagram, FaLinkedin, FaFacebookF } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

const GlobalStyles = () => (
  <style>{`
    .contact-input::placeholder,
    .contact-textarea::placeholder {
      color: #a0aec0;
      opacity: 1;
    }
    .social-icon {
      transition: transform 0.3s ease, color 0.3s ease;
    }
    .social-icon:hover {
      transform: scale(1.2);
      color: #FDBA74;
    }
  `}</style>
);


const FeedbackModal = ({
  status,
  title,
  message,
  onClose,
}: {
  status: 'success' | 'error';
  title: string;
  message: string;
  onClose: () => void;
}) => {
  const isSuccess = status === 'success';

  const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      maxWidth: '400px',
      width: '90%',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: '600',
      color: isSuccess ? '#0f2027' : '#c53030',
      marginBottom: '15px',
    },
    message: {
      fontSize: '1.1rem',
      color: '#4a5568',
      marginBottom: '30px',
      lineHeight: '1.6',
    },
    button: {
      padding: '12px 30px',
      backgroundColor: isSuccess ? '#F97316' : '#c53030',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.message}>{message}</p>
        <button
          style={styles.button}
          onClick={onClose}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = isSuccess ? '#EA580C' : '#a02323'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = isSuccess ? '#F97316' : '#c53030'}
        >
          Close
        </button>
      </div>
    </div>
  );
};


const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [modalInfo, setModalInfo] = useState<{
    isOpen: boolean;
    status: 'success' | 'error';
    title: string;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setModalInfo(null);

    const dataToSend = {
      ...formData,
      access_key: "5acc18f5-9498-4dfb-87bb-c8c85793258f"
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (result.success) {
        setModalInfo({
          isOpen: true,
          status: 'success',
          title: 'Thank You!',
          message: "Your message has been sent successfully. We'll reach out shortly."
        });
        setFormData({ name: '', email: '', message: '' }); // Reset form state
      } else {
        setModalInfo({
          isOpen: true,
          status: 'error',
          title: 'Submission Failed',
          message: result.message || "An unexpected error occurred. Please try again."
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setModalInfo({
        isOpen: true,
        status: 'error',
        title: 'Connection Error',
        message: "Could not submit the form. Please check your network connection and try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    { title: 'Support', email: 'Support@teacherjob.in', icon: <FiMail /> },
    { title: 'Legal', email: 'Legal@teacherjob.in', icon: <GoLaw /> },
    { title: 'Privacy', email: 'Privacy@teacherjob.in', icon: <FiShield /> },
    { title: 'Employer', email: 'Employer@teacherjob.in', icon: <FiBriefcase /> },
    { title: 'Info', email: 'Info@teacherjob.in', icon: <FiInfo /> },
  ];

  const styles: { [key: string]: React.CSSProperties } = {
    pageWrapper: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f7f9fc',
    },
    container: {
      fontFamily: "'Poppins', 'Segoe UI', 'Roboto', sans-serif",
      padding: '50px 20px',
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainWrapper: {
      width: '100%',
      maxWidth: '1200px',
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
    },
    infoSection: {
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #F97316 100%)',
      color: '#ffffff',
      padding: '60px 40px',
      flex: '1',
      minWidth: '350px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    infoHeader: {
      fontSize: '2.5rem',
      fontWeight: '600',
      marginBottom: '15px'
    },
    infoSubheader: {
      fontSize: '1.1rem',
      fontWeight: '300',
      lineHeight: '1.6',
      opacity: '0.9',
      marginBottom: '10px',
      maxWidth: '400px'
    },
    responseTime: {
      fontSize: '0.9rem',
      fontWeight: '300',
      opacity: '0.8',
      marginBottom: '40px',
    },
    contactList: {
      marginBottom: '40px',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '25px',
      transition: 'transform 0.3s ease',
      textDecoration: 'none',
      color: 'inherit'
    },
    contactIcon: {
      fontSize: '1.5rem',
      marginRight: '20px',
      color: '#FDBA74'
    },
    contactTextContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    contactTitle: {
      fontWeight: '500',
      fontSize: '1.1rem'
    },
    contactDetail: {
      color: '#cde2ee',
      fontSize: '1rem',
      opacity: '0.8'
    },
    socialSection: {
        marginTop: 'auto',
        paddingTop: '30px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    },
    socialIcons: {
        display: 'flex',
        gap: '25px'
    },
    socialLink: {
        color: 'white',
        fontSize: '1.5rem',
        textDecoration: 'none',
    },
    formSection: {
      padding: '60px 40px',
      flex: '1.5',
      minWidth: '350px'
    },
    formHeader: {
      fontSize: '2.5rem',
      fontWeight: '600',
      color: '#1a202c',
      marginBottom: '40px',
    },
    formGroup: {
      marginBottom: '25px',
      position: 'relative'
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      color: '#4a5568',
      fontSize: '0.9rem',
      fontWeight: '600',
    },
    input: {
      width: '100%',
      padding: '14px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '1rem',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      backgroundColor: '#f7fafc',
    },
    textarea: {
      width: '100%',
      padding: '14px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '1rem',
      minHeight: '130px',
      resize: 'vertical',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      backgroundColor: '#f7fafc',
    },
    button: {
      width: '100%',
      padding: '16px',
      backgroundColor: '#F97316',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background-color 0.3s ease, transform 0.2s ease, opacity 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      opacity: isSubmitting ? 0.7 : 1,
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#F97316';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.2)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#e2e8f0';
    e.currentTarget.style.boxShadow = 'none';
  };

  const handleButtonEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#EA580C';
    e.currentTarget.style.transform = 'translateY(-2px)';
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#F97316';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  return (
    <div style={styles.pageWrapper}>
      <GlobalStyles />
      <Header />
      <div style={styles.container}>
        <div style={styles.mainWrapper}>
          <div style={styles.infoSection}>
            <h2 style={styles.infoHeader}>Contact Information</h2>
            <p style={styles.infoSubheader}>Whether you're a teacher or a school — we're here to support you. Reach the right team by choosing the right email below!</p>
            <p style={styles.responseTime}>We typically respond within 24 hours.</p>

            <div style={styles.contactList}>
              <a href="tel:+910000000000" style={styles.contactItem}>
                <div style={styles.contactIcon}><FiPhone /></div>
                <div style={styles.contactTextContainer}>
                  <span style={styles.contactTitle}>Phone Support</span>
                  <span style={styles.contactDetail}>+91-00000-00000</span>
                </div>
              </a>
              {contactDetails.map((detail, index) => (
                <a href={`mailto:${detail.email}`} key={index} style={styles.contactItem}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateX(5px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  <div style={styles.contactIcon}>{detail.icon}</div>
                  <div style={styles.contactTextContainer}>
                    <span style={styles.contactTitle}>{detail.title}</span>
                    <span style={styles.contactDetail}>{detail.email}</span>
                  </div>
                </a>
              ))}
            </div>

            <div style={styles.socialSection}>
                <div style={styles.socialIcons}>
                    <a href="https://www.instagram.com/teacherjob.in" target="_blank" rel="noopener noreferrer" style={styles.socialLink} className="social-icon"><FaInstagram /></a>
                    <a href="https://www.linkedin.com/company/teacherjob-in/" target="_blank" rel="noopener noreferrer" style={styles.socialLink} className="social-icon"><FaLinkedin /></a>
                    <a href="https://www.facebook.com/profile.php?id=61578169764266" target="_blank" rel="noopener noreferrer" style={styles.socialLink} className="social-icon"><FaFacebookF /></a>
                </div>
            </div>
          </div>

          <div style={styles.formSection}>
            <h2 style={styles.formHeader}>Get in Touch</h2>
            <form onSubmit={onSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>Full Name</label>
                <input type="text" id="name" name="name" style={styles.input} className="contact-input" required placeholder="John Doe"
                  value={formData.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>Email Address</label>
                <input type="email" id="email" name="email" style={styles.input} className="contact-input" required placeholder="you@example.com"
                  value={formData.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="message" style={styles.label}>Message</label>
                <textarea id="message" name="message" style={styles.textarea} className="contact-textarea" required placeholder="How can we help you today?"
                  value={formData.message} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}></textarea>
              </div>
              <button type="submit" style={styles.button}
                onMouseEnter={handleButtonEnter}
                onMouseLeave={handleButtonLeave}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit Form'}
                {!isSubmitting && <FiChevronsRight />}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      {modalInfo?.isOpen && (
        <FeedbackModal
            status={modalInfo.status}
            title={modalInfo.title}
            message={modalInfo.message}
            onClose={() => setModalInfo(null)}
        />
      )}
    </div>
  );
};

export default ContactPage;
