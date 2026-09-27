import React from "react";
import "./About.css";
import profile from "../../../assets/profile.jpg";
const About = () => {
  return (
    <div>
      <section className="about" id="about">
        <div className="about-image">
          <img src={profile} alt="Profile photo" />
        </div>

        <div className="about-content">
          <p className="section-title">About Me</p>

          <h2>I'm a passionate Full Stack Developer</h2>

          <p>
            I am a passionate developer who enjoys creating modern and
            user-friendly web applications. I love learning new technologies and
            solving real-world problems through programming.
          </p>

          <p>
            I have experience working with HTML, CSS, JavaScript and various
            modern web technologies.
          </p>

          <a
            href="/Nirakar-Adhikari-CV.pdf"
            download="Nirakar-Adhikari-CV.pdf"
            classNameName="primary-button"
          >
            Download CV
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
