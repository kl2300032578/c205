import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function WindowCleaning() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const services = [
    {
      title: "Glass Cleaning",
      image: "/glass cleaning.png",
      description: "Crystal-clear cleaning of all types of glass windows.",
    },
    {
      title: "Frame Cleaning",
      image: "/FrameCleaning.png",
      description: "Thorough cleaning of window frames and sills.",
    },
    {
      title: "Screen Cleaning",
      image: "/Screen Cleaning.png",
      description: "Removal of dust and debris from window screens.",
    },
    {
      title: "High-Rise Window Cleaning",
      image: "/High-Rise Window Cleaning.png",
      description: "Safe and professional cleaning for tall buildings.",
    },
    {
      title: "Water Spot Removal",
      image: "/waterspot.png",
      description: "Effective removal of water spots and stains.",
    },
  ];

  const handleBook = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const confirmBooking = () => {
    const userEmail = localStorage.getItem("email"); // ✅ same as Cleaning/Plumbing
    if (!userEmail) {
      navigate("/login");
      return;
    }

    if (!selectedService) {
      alert("No service selected!");
      return;
    }

    const newOrder = {
      email: userEmail,
      service: selectedService.title,
      date: selectedDate.toISOString(),
      description: selectedService.description,
      image: selectedService.image,
    };

    fetch("http://localhost:9090/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save order");
        return res.json();
      })
      .then(() => {
        setShowModal(false);
        navigate("/orders"); // ✅ go directly to Orders page
      })
      .catch((err) => {
        console.error("❌ Error saving order:", err);
        alert("Error saving order. Check console logs.");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Window Cleaning Services</h2>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
          justifyContent: "center",
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "16px",
              width: "220px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
              background: "#fff",
            }}
          >
            <img
              src={service.image}
              alt={service.title}
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            />
            <h3>{service.title}</h3>
            <p style={{ fontSize: "14px", color: "#555" }}>
              {service.description}
            </p>
            <button
              onClick={() => handleBook(service)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              width: "320px",
              textAlign: "center",
            }}
          >
            <h2>Book {selectedService?.title}</h2>
            <p>Select a date:</p>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
            />
            <div style={{ marginTop: "15px" }}>
              <button
                onClick={confirmBooking}
                style={{
                  padding: "8px 12px",
                  background: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "8px 12px",
                  background: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WindowCleaning;
