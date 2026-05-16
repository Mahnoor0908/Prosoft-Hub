import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';
import "./App.css";
import img1 from './assets/images/image.jpg';
import img2 from './assets/images/1image.jpg';
import img3 from './assets/images/2image.jpg';
import img4 from './assets/images/3image.jpg';
import logo from './assets/images/logo.png';
import wafa from './assets/images/wafa.JPG';
import aden from './assets/images/aden.JPG';
import aqib from './assets/images/aqib.jpeg';

// Universally safe online avatar fallbacks for production stability
const avatarMale = "https://avatar.iran.liara.run/public/32";
const avatarFemale = "https://avatar.iran.liara.run/public/65";
const avatarGeneric = "https://avatar.iran.liara.run/public/25";

const sliderImages = [img1, img2, img3, img4];

function App() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Scroll function
  const scrollToModules = () => {
    const section = document.querySelector(".modules-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Form submission handler
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setFormError("Kindly fill all fields before submitting! ⚠️");
      return;
    }
    setFormError("");
    setIsSubmitted(true);
    setFormData({ name: "", phone: "", message: "" });
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  // Open modal
  const openModal = (team) => {
    setSelectedTeam(team);
  };

  // Close modal
  const closeModal = () => {
    setSelectedTeam(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animation for modules section
  useEffect(() => {
    const moduleItems = document.querySelectorAll(".module-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("active");
            }, idx * 150);
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.3 }
    );
    moduleItems.forEach((item) => observer.observe(item));
    return () => moduleItems.forEach((item) => observer.unobserve(item));
  }, []);

  // Animation for stats section
  useEffect(() => {
    const statItems = document.querySelectorAll(".stat-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("active");
            }, idx * 200);
          }
        });
      },
      { threshold: 0.5 }
    );
    statItems.forEach((item) => observer.observe(item));
    return () => statItems.forEach((item) => observer.unobserve(item));
  }, []);

  const modules = [
    { 
      title: "Technicians", 
      img: "techtitans.jpg",
      members: [
        { name: "Wafa Abbas", role: "Lead Developer", image: wafa, social: { instagram: "#", linkedin: "#", github: "#" } },
        { name: "Ahsan Zaman", role: "Backend Developer", image: avatarMale, social: { instagram: "#", linkedin: "#", github: "#" } },
        { name: "Roman Fatima", role: "Frontend Developer", image: avatarFemale, social: { instagram: "#", linkedin: "#", github: "#" } }
      ]
    },
    { 
      title: "Design Forge", 
      img: "Designer-UI.jpg",
      members: [
        { name: "Muhammad Abdullah", role: "UI/UX Lead", image: avatarGeneric, social: { instagram: "#", linkedin: "#", behance: "#" } },
        { name: "Ali Khan", role: "Graphic Designer", image: avatarMale, social: { instagram: "#", linkedin: "#", behance: "#" } },
        { name: "Rejab Zahra", role: "Visual Designer", image: avatarFemale, social: { instagram: "#", linkedin: "#", behance: "#" } }
      ]
    },
    { 
      title: "Creative Studio", 
      img: "CreativeStudio.jpg",
      members: [
        { name: "Roha Ejaz", role: "Content Head", image: avatarFemale, social: { instagram: "#", linkedin: "#", twitter: "#" } },
        { name: "Asma Fatima", role: "Content Writer", image: avatarFemale, social: { instagram: "#", linkedin: "#", twitter: "#" } },
        { name: "Aden Butt", role: "Creative Designer", image: aden, social: { instagram: "#", linkedin: "#", twitter: "#" } }
      ]
    },
    { 
      title: "Event Architects", 
      img: "EventArchitects.jpg",
      members: [
        { name: "Aqib Ali", role: "Event Manager", image: aqib, social: { instagram: "#", linkedin: "#", facebook: "#" } },
        { name: "Muhammad Shehryar", role: "Event Coordinator", image: avatarGeneric, social: { instagram: "#", linkedin: "#", facebook: "#" } },
        { name: "Urwa Munawar", role: "Event Planner", image: avatarFemale, social: { instagram: "#", linkedin: "#", facebook: "#" } }
      ]
    },
    { 
      title: "Media Mavericks", 
      img: "Media.jpg",
      members: [
        { name: "Abdul Rehman", role: "Social Media Lead", image: avatarGeneric, social: { instagram: "#", linkedin: "#", twitter: "#" } },
        { name: "Muhammad Zaman", role: "Content Manager", image: avatarMale, social: { instagram: "#", linkedin: "#", twitter: "#" } },
        { name: "Rimsha Jannat", role: "Digital Marketer", image: avatarFemale, social: { instagram: "#", linkedin: "#", twitter: "#" } }
      ]
    },
  ];

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Prosoft Hub Logo" className="logo-image" />
          <h1>Prosoft Hub</h1>
        </div>
        <ul className="nav-links">
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/about')}>About</li>  
          <li onClick={() => navigate('/events')}>Events</li>
          <li onClick={() => navigate('/membership')}>Membership</li>
          <li onClick={() => navigate('/gallery')}>Gallery</li>
          <li onClick={() => navigate('/signin')}>Sign In</li>
          <li onClick={() => navigate('/signup')}>Sign Up</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div
          className="hero-image"
          style={{
            backgroundImage: `url(${sliderImages[index]})`,
            transition: "background-image 1s ease-in-out",
          }}
        >
          <div className="overlay">
            <h2>Explore Prosoft Hub 🌟</h2>
            <p>"Experience creativity and technology like never before."</p>
            <button className="prosoft-btn" onClick={scrollToModules}>Discover Now</button>
          </div>
        </div>
      </div>

      {/* Modules Section */}
      <div className="modules-section">
        <h2>Meet Our Teams</h2>
        <p className="modules-subtitle">Discover the talented people behind Prosoft Hub</p>
        <div className="modules-row">
          {modules.map((module, idx) => (
            <div className="module-item" key={idx}>
              <div className="module-circle">
                <img src={`images/${module.img}`} alt={module.title} />
              </div>
              <div className="module-title">{module.title}</div>
              <button className="small-btn" onClick={() => openModal(module)}>View Details</button>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <h2>Our Achievements</h2>
        <p className="stats-subtitle">Making a difference in the tech community</p>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon">👥</div>
            <div className="stat-number">500+</div>
            <div className="stat-label">Active Members</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🎉</div>
            <div className="stat-number">50+</div>
            <div className="stat-label">Events Organized</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🎓</div>
            <div className="stat-number">30+</div>
            <div className="stat-label">Workshops Conducted</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🏆</div>
            <div className="stat-number">15+</div>
            <div className="stat-label">Awards Won</div>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Join Prosoft Hub Today! 🚀</h2>
          <p className="cta-subtitle">Be part of the most innovative tech community</p>
          <div className="cta-benefits">
            <div className="benefit-item"><span>✨</span><span>Access to exclusive workshops</span></div>
            <div className="benefit-item"><span>🤝</span><span>Network with industry professionals</span></div>
            <div className="benefit-item"><span>📚</span><span>Learn cutting-edge technologies</span></div>
            <div className="benefit-item"><span>🎯</span><span>Build your portfolio with real projects</span></div>
          </div>
          <button className="cta-button" onClick={() => navigate('/signup')}>
            Join Now - It's Free! 🎉
          </button>
          <p className="cta-note">Already a member? <span onClick={() => navigate('/signin')} className="signin-link">Sign In</span></p>
        </div>
      </div>

      {/* Team Modal */}
      {selectedTeam && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2 className="modal-title">{selectedTeam.title} Team</h2>
            <div className="team-members-grid">
              {selectedTeam.members.map((member, idx) => (
                <div className="member-card" key={idx}>
                  <div className="member-image">
                    <img 
                      src={typeof member.image === 'string' && !member.image.startsWith('http') && !member.image.startsWith('/') ? `images/${member.image}` : member.image} 
                      alt={member.name} 
                    />
                  </div>
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <div className="member-socials">
                    {member.social.instagram && <a href={member.social.instagram} target="_blank" rel="noopener noreferrer"><i className="social-icon">📷</i></a>}
                    {member.social.linkedin && <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"><i className="social-icon">💼</i></a>}
                    {member.social.github && <a href={member.social.github} target="_blank" rel="noopener noreferrer"><i className="social-icon">💻</i></a>}
                    {member.social.behance && <a href={member.social.behance} target="_blank" rel="noopener noreferrer"><i className="social-icon">🎨</i></a>}
                    {member.social.twitter && <a href={member.social.twitter} target="_blank" rel="noopener noreferrer"><i className="social-icon">🐦</i></a>}
                    {member.social.facebook && <a href={member.social.facebook} target="_blank" rel="noopener noreferrer"><i className="social-icon">👥</i></a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact Us Section */}
      <div className="contact-section">
        <p className="contact-label">CONTACT US</p>
        <h2>Get in Touch</h2>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Send us a message 📧</h3>
            <p className="contact-description">
              Feel free to reach out through contact form or find our contact information below.
            </p>
            <div className="contact-details">
              <div className="contact-item"><span>📧</span><span>prosoft@university.edu</span></div>
              <div className="contact-item"><span>📞</span><span>+92 123-456-7890</span></div>
              <div className="contact-item"><span>📍</span><span>University Campus, Gujranwala, Punjab, Pakistan</span></div>
            </div>
          </div>

          <div className="contact-form">
            {isSubmitted && (
              <div className="success-message" style={{ color: "#2ecc71", fontWeight: "bold", marginBottom: "15px", padding: "10px", backgroundColor: "#e8f8f5", borderRadius: "5px", textAlign: "center" }}>
                Form Submitted Successfully! 🎉
              </div>
            )}
            {formError && (
              <div className="error-message" style={{ color: "#e74c3c", fontWeight: "bold", marginBottom: "15px", padding: "10px", backgroundColor: "#fceae9", borderRadius: "5px", textAlign: "center" }}>
                {formError}
              </div>
            )}
            <div className="form-group">
              <label>Your name</label>
              <input type="text" placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="Enter your mobile number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Write your messages here</label>
              <textarea placeholder="Enter your message" rows="5" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
            </div>
            <button className="submit-btn" onClick={handleContactSubmit}>Submit now →</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;