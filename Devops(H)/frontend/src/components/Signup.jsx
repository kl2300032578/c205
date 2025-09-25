import React, { useState } from "react";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password and confirm password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/api/customers/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Signup failed");
      }

      const result = await response.json();
      alert("Signup successful!");
      console.log(result);

      // clear form after success
      setFormData({ email: "", password: "", confirmPassword: "" });
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />

        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />

        {error && <p className="error">{error}</p>}

        <div className="services-buttons">
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
