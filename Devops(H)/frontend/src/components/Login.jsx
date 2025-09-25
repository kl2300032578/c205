import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9090/api/customers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        setErrors({
          email: "Invalid email or password",
          password: "Invalid email or password",
        });
        return;
      }

      // ✅ Save login state
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("email", form.email);
      localStorage.setItem("role", result.role);

      // ✅ Redirect based on role
      if (result.role === "OWNER") {
        navigate("/owner-dashboard"); // Owner page
      } else if (result.role === "CUSTOMER") {
        navigate("/services"); // Customer page
      } else {
        // In case backend doesn’t return a valid role
        setErrors({
          email: "Unexpected role. Contact support.",
          password: "",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrors({
        email: "Server error. Please try again later.",
        password: "",
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: "#f39c12", fontWeight: "bold" }}>
          Create one
        </Link>
      </p>
    </div>
  );
}

export default Login;
