import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Cleaning from "./components/Cleaning";
import Plumbing from "./components/Plumbing";
import Electrical from "./components/Electrical";
import Services from "./components/Services";
import Washing from "./components/Washing";
import BathroomCleaning from "./components/BathroomCleaning";
import WindowCleaning from "./components/WindowCleaning";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Orders from "./components/Orders";
import Owner from "./components/Owner";
import Navbar from "./components/Navbar";


import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cleaning" element={<Cleaning />} />
          <Route path="/plumbing" element={<Plumbing />} />
          <Route path="/electrical" element={<Electrical />} />
          <Route path="/services" element={<Services />} />
          <Route path="/owner-dashboard" element={<Owner />} />
          <Route path="/washing" element={<Washing />} />
          <Route path="/bathroom-cleaning" element={<BathroomCleaning />} />
          <Route path="/window-cleaning" element={<WindowCleaning />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/orders" element={<Orders />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
