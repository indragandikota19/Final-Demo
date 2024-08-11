import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./nav.css";

export default function Navbar() {
  const location = useLocation();

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

        <div className="ml-auto">
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
          <Link
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            to="/"
          >
            Log Out
          </Link>
        </div>
      </div>
    </nav>
  );
}
