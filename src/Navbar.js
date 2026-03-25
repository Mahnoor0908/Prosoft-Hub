import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/images/prosoft-bg.jpg";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavClick = (route) => {
    navigate(route);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${navbarVisible ? "visible" : "hidden"}`}>
      <div className="logo" onClick={() => handleNavClick("/")}>
        <img src={logo} alt="Prosoft Hub Logo" className="logo-image" />
        <h1>Prosoft Hub</h1>
      </div>

      <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li onClick={() => handleNavClick("/")}>Home</li>
        <li onClick={() => handleNavClick("/about")}>About</li>
        <li onClick={() => handleNavClick("/events")}>Events</li>
        <li onClick={() => handleNavClick("/membership")}>Membership</li>
        <li onClick={() => handleNavClick("/gallery")}>Gallery</li>
        <li onClick={() => handleNavClick("/signin")}>Sign In</li>
        <li onClick={() => handleNavClick("/signup")}>Sign Up</li>
      </ul>
    </nav>
  );
}

export default Navbar;
