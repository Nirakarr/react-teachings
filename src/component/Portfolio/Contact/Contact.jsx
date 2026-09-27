import React, { useState } from "react";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("Sending...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_API_KEY,

          subject: "New Contact Form Submission",

          from_name: formData.name,

          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Failed to send message. Please try again.");
    }
  };
  return (
    <div>
      <section className="contact" id="contact">
        <div className="contact-info">
          <p className="section-title">Contact Me</p>

          <h2>Let's Connect</h2>

          <p>If you have a project in mind, send me a message.</p>

          <p>
            <strong>Email:</strong> nirakar@example.com
          </p>

          <p>
            <strong>Phone:</strong> +977 9814329566
          </p>

          <p>
            <strong>Address:</strong> Kathmandu, Nepal
          </p>

          <div className="social-links">
            <a
              href="https://web.facebook.com/sanjib.rijal.7"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>

            <a
              href="https://www.instagram.com/nirakar_adhikari/"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a
              href="https://www.linkedin.com/in/nirakar-adhikari/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="primary-button">
            Send Message
          </button>

          {status && <p>{status}</p>}
        </form>
      </section>
    </div>
  );
};

export default Contact;
