// src/Components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './style.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    setMenuOpen(false); // auto close on route change
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  };

  const handleProtectedLink = (e) => {
    if (isLoggedIn) {
      e.preventDefault();
      alert("You're already logged in!");
    }
  };

  return (
    <header>
      <div className="logo">🌾 AgroVision</div>

      <div className={`nav-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={menuOpen ? 'active' : ''}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

        <Link
          to={isLoggedIn ? "#" : "/LoginSignup"}
          onClick={(e) => {
            handleProtectedLink(e);
            setMenuOpen(false);
          }}
        >
          Login as Farmer
        </Link>

        <Link
          to={isLoggedIn ? "#" : "/VendorSignup"}
          onClick={(e) => {
            handleProtectedLink(e);
            setMenuOpen(false);
          }}
        >
          Login as Vendor
        </Link>

        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("contact-section");
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigate("/contact");
            }
            setMenuOpen(false);
          }}
        >
          Contact
        </Link>

        {isLoggedIn && (
          <span
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            style={{ cursor: "pointer", color: "white", fontWeight: "bold", marginTop: "10px" }}
          >
            Logout
          </span>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
