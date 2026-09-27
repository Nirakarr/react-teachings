import React from "react";
import "./Project.css";
const Project = () => {
  return (
    <div>
      <section className="portfolio" id="portfolio">
        <p className="section-title">My Work</p>
        <h2>Recent Projects</h2>

        <div className="project-grid">
          <article className="project-card">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80"
              alt="Team working together on an assignment web application"
            />
            <div className="project-content">
              <h3>Assignment Web Application</h3>
              <p>
                A simple place for students to submit assignments and track
                deadlines.
              </p>
              <a href="#" className="project-link">
                View Project
              </a>
            </div>
          </article>

          <article className="project-card">
            <img
              src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80"
              alt="Laptop showing a personal portfolio website"
            />
            <div className="project-content">
              <h3>Personal Portfolio Website</h3>
              <p>
                A clean website that introduces a developer, their skills, and
                their work.
              </p>
              <a href="#" className="project-link">
                View Project
              </a>
            </div>
          </article>

          <article className="project-card">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
              alt="Online shopping experience for an e-commerce website"
            />
            <div className="project-content">
              <h3>E-commerce Website Frontend</h3>
              <p>
                A product page with clear layouts, useful filters, and a smooth
                shopping experience.
              </p>
              <a href="#" className="project-link">
                View Project
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Project;
