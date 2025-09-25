import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleBookService = () => {
    navigate("/login"); // Changed from /services to /login
  };

  return (
    <section className="home" id="home">
      <h1>Welcome to HomeService</h1>
      <p>
        We provide reliable and affordable home services like cleaning, plumbing,
        electrical repairs, and more. Our professionals are verified and ready
        to serve you anytime.
      </p>
      <button className="btn" onClick={handleBookService}>
        Book a Service
      </button>
    </section>
  );
}

export default Home;