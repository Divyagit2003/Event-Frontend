import { useState } from "react";
import { Link } from "react-router-dom";
import "../NavBarPagesCss/Contact.css";
import Footer from "../OtherPage/Footer";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // You can also log or reset form here if needed
    e.target.reset();
  };

  return (
    <>
      <div className="contact-container">
        <div className="text-center mb-5">
          <h1 className="contact-title">Contact Us</h1>
          <p className="lead text-muted">
            We'd love to hear from you! Please fill out the form below and we'll
            get back to you shortly.
          </p>
        </div>

        {submitted && (
          <div className="alert alert-success text-center w-75 mx-auto" role="alert">
            ✅ Your message has been sent successfully!
          </div>
        )}

        <div className="row justify-content-center">
          <div className="col-md-8">
            <form
              className="contact-form p-4 shadow rounded bg-light"
              action="https://formsubmit.co/your-email@example.com"
              method="POST"
              onSubmit={handleSubmit}
            >
              {/* Anti-bot */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://yourdomain.com/thank-you" />

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  placeholder="Enter subject"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows="5"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="contact-info mt-5 text-center">
          <h4>Reach Us At</h4>
          <p>📞 +91 98765 43210</p>
          <p>📧 occasioncrafteventmanagement@gmail.com</p>
          <p>📍 Pune, Maharashtra, India</p>
        </div>

        <footer className="footer-wrapper">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Contact;
