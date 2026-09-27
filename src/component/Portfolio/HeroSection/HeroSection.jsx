import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <p className="intro">Hello, I'm</p>

          <h1>Nirakar Adhikari</h1>

          <h2>Full Stack Developer</h2>

          <p className="description">
            I build modern and user-friendly websites and web applications using
            HTML, CSS and JavaScript.
          </p>

          <div className="hero-buttons">
            <a href="#" className="primary-button">
              View My Work
            </a>
            <a href="#contact" className="secondary-button">
              Contact Me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
