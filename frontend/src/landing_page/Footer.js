import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.socialMedia}>
          <a href="https://facebook.com" style={styles.link} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a href="https://twitter.com" style={styles.link} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a href="https://instagram.com" style={styles.link} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="https://linkedin.com" style={styles.link} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
        </div>
        <div style={styles.links}>
          <a href="/terms" style={styles.link}>Terms and Conditions</a>
          <span style={styles.separator}>|</span>
          <a href="/privacy" style={styles.link}>Privacy Policy</a>
          <span style={styles.separator}>|</span>
          <a href="/contact" style={styles.link}>Contact Us</a> {/* Added Contact Us link */}
        </div>
        <div style={styles.copyRight}>
          <span>© {currentYear} EquiNex</span> {/* Copyright and year */}
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'black',
    color: 'white',
    padding: '5px 0', // Reduced padding
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    margin: '0 0 5px',
    fontSize: '20px',
  },
  socialMedia: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '5px',
  },
  links: {
    marginTop: '5px',
  },
  copyRight: {
    marginTop: '5px', // Add some space above the copyright text
    fontSize: '14px', // You can adjust the font size if needed
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
  separator: {
    color: 'white',
    margin: '0 5px',
  },
};

// Apply hover effect for links
const handleMouseEnter = (event) => {
  event.target.style.color = '#96e856';
};

const handleMouseLeave = (event) => {
  event.target.style.color = 'white';
};

const App = () => {
  return (
    <div>
      {/* Other components */}
      <Footer />
    </div>
  );
};

export default App;
