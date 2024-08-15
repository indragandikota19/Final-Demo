import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./nav.css"; // Ensure this file contains the necessary styles

export default function Navbar() {
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle the visibility of the Log Out dropdown
  const handleMenuClick = () => {
    setShowLogout(prev => !prev);
  };

  // Close the dropdown if clicked outside of it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowLogout(false);
    }
  };

  useEffect(() => {
    // Add event listener on mount
    document.addEventListener('mousedown', handleClickOutside);
    // Clean up event listener on unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav ml-auto">
            <Link
              className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
              to="/register"
            >
              Register
            </Link>
            <Link
              className={`nav-link ${location.pathname === '/logins' ? 'active' : ''}`}
              to="/logins"
            >
              Login
            </Link>
            
            {/* Dropdown Menu */}
            <div className="nav-item dropdown" ref={dropdownRef}>
              <button
                className="nav-link dropdown-toggle"
                style={{backgroundColor:"rgb(41, 41, 87)", border:"none"}}
                onClick={handleMenuClick}
                aria-expanded={showLogout}
                aria-haspopup="true"
              >
                <i className="bi bi-person-circle"></i> {/* User Icon */}
              </button>
              <div
                className={`dropdown-menu dropdown-menu-end ${showLogout ? 'show' : ''}`}
                aria-labelledby="navbarDropdown"
              >
                <Link
                  className="dropdown-item"
                  style={{padding:"0"}}
                  to="/"
                  onClick={() => setShowLogout(false)} // Hide dropdown after clicking
                >
                  Log Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
