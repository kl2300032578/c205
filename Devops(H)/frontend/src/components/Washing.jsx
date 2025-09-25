import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Washing() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const services = [
    {
      title: "Clothes Washing",
      image: "/Clothes_Washing.png",
      description: "Professional washing and care for your everyday clothes.",
    },
    {
      title: "Dry Cleaning",
      image: "/Dry_Cleaning.png",
      description: "Gentle and thorough dry cleaning for delicate fabrics.",
    },
    {
      title: "Curtain Washing",
      image: "/Curtain_Washing.png",
      description: "Cleaning and refreshing curtains to brighten your rooms.",
    },
    {
      title: "Carpet Washing",
      image: "/Carpet_Washing.png",
      description: "Deep cleaning to remove dirt and stains from carpets.",
    },
    {
      title: "Bed Linen Washing",
      image: "/Bed_Linen_Washing.png",
      description: "Fresh and hygienic washing of bed sheets and pillow covers.",
    },
    {
      title: "Sofa Upholstery Cleaning",
      image: "/Sofa_Upholstery_Cleaning.png",
      description: "Expert cleaning of sofas to keep your living area fresh.",
    },
  ];

  const handleBook = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const confirmBooking = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")); // ✅ get current user
    if (!loggedInUser || !loggedInUser.email) {
      alert("You must log in to book a service.");
      return;
    }

    const newOrder = {
      service: selectedService.title,
      date: selectedDate.toDateString(),
      description: selectedService.description,
      image: selectedService.image,
    };

    // ✅ Store orders per user email
    const allOrders = JSON.parse(localStorage.getItem("orders")) || {};
    if (!allOrders[loggedInUser.email]) {
      allOrders[loggedInUser.email] = [];
    }
    allOrders[loggedInUser.email].push(newOrder);
    localStorage.setItem("orders", JSON.stringify(allOrders));

    setShowModal(false);
    navigate("/orders"); // redirect to Orders page
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Washing Services</h2>
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

export default Washing;
