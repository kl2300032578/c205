import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";

const services = [
  {
    title: "Home Cleaning",
    icon: "🏠",
    description: "Professional cleaning to keep your home spotless.",
    path: "/cleaning",
  },
  {
    title: "Washing",
    icon: "🧺",
    description: "Efficient laundry and washing services for your clothes.",
    path: "/washing",
  },
  {
    title: "Bathroom Cleaning",
    icon: "🚰",
    description: "Sanitization and deep cleaning for your bathroom.",
    path: "/bathroom-cleaning",
  },
  {
    title: "Electrical Repairs",
    icon: "🔌",
    description: "Reliable electrical repair and maintenance services.",
    path: "/electrical",
  },
  {
    title: "Plumbing",
    icon: "🔧",
    description: "Expert plumbing services to fix leaks and clogs.",
    path: "/plumbing",
  },
  {
    title: "Window Cleaning",
    icon: "🪟",
    description: "Crystal-clear window cleaning for a brighter home.",
    path: "/window-cleaning",
  },
];

function Services() {
  return (
    <section className="services-section">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <Link key={index} to={service.path} className="service-card">
            <div className="icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Services;
