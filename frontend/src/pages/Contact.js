function Contact() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you</p>
      </div>

      <div className="container">
        <div className="content-section">
          <h2>Get in Touch</h2>
          <p>
            Have questions about our products or services? Our team is here to help.
          </p>

          <div className="contact-info">
            <div className="info-item">
              <h3>📧 Email</h3>
              <p>info@opticalboutique.com</p>
            </div>
            <div className="info-item">
              <h3>📞 Phone</h3>
              <p>+91 1234567890</p>
            </div>
            <div className="info-item">
              <h3>📍 Location</h3>
              <p>123 Fashion Street, Mumbai, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
