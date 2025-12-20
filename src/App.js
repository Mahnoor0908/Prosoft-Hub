import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./App.css";
import img1 from './assets/images/1image.jpg';
import img2 from './assets/images/2image.jpg';
import img3 from './assets/images/3image.jpg';
import img4 from './assets/images/4image.jpg';
import logo from './assets/images/logo.png';

const sliderImages = [img1, img2, img3, img4];

function App() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Scroll function
  const scrollToModules = () => {
    const section = document.querySelector(".modules-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
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
            }, idx * 150); // Staggered animation
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
        { name: "Wafa Abbas", role: "Lead Developer", image: "technicians.png", social: { instagram: "#", linkedin: "#", github: "#" } },
        { name: "Ahsan Zaman", role: "Backend Developer", image: "technicians.png", social: { instagram: "#", linkedin: "#", github: "#" } },
        { name: "Roman Fatima", role: "Frontend Developer", image: "technicians.png", social: { instagram: "#", linkedin: "#", github: "#" } }
      ]
    },
    { 
      title: "Design Forge", 
      img: "Designer-UI.jpg",
      members: [
        { name: "Muhammad Abdullah", role: "UI/UX Lead", image: "design-forge.png", social: { instagram: "#", linkedin: "#", behance: "#" } },
        { name: "Ali Khan", role: "Graphic Designer", image: "design-forge.png", social: { instagram: "#", linkedin: "#", behance: "#" } },
        { name: "Rejab Zahra", role: "Visual Designer", image: "design-forge.png", social: { instagram: "#", linkedin: "#", behance: "#" } }
      ]
    },
    { 
      title: "Creative Studio", 
      img: "CreativeStudio.jpg",
      members: [
        { name: "Roha Ejaz", role: "Content Head", image: "creative-studio.png", social: { instagram: "#", linkedin: "#", twitter: "#" } },
        { name: "Asma Fatima", role: "Content Writer", image: "creative-studio.png", social: { instagram: "#", linkedin: "#", twitter: "#" } },
        { name: "Aden Butt", role: "Creative Designer", image: "creative-studio.png", social: { instagram: "#", linkedin: "#", twitter: "#" } }
      ]
    },
    { 
      title: "Event Architects", 
      img: "EventArchitects.jpg",
      members: [
        { name: "Aqib Ali", role: "Event Manager", image: "event-architects.png", social: { instagram: "#", linkedin: "#", facebook: "#" } },
        { name: "Muhammad Shehryar", role: "Event Coordinator", image: "event-architects.png", social: { instagram: "#", linkedin: "#", facebook: "#" } },
        { name: "Urwa Munawar", role: "Event Planner", image: "event-architects.png", social: { instagram: "#", linkedin: "#", facebook: "#" } }
      ]
    },
    { 
      title: "Media Mavericks", 
      img: "Media.jpg",
      members: [
        { name: "Abdul Rehman", role: "Social Media Lead", image: "media-mavericks.png", social: { instagram: "#", linkedin: "#", twitter: "#" } },
        { name: "Muhammad Zaman", role: "Content Manager", image: "media-mavericks.png", social: { instagram: "#", linkedin: "#", twitter: "#" } },
        { name: "Ramiz Mehmood", role: "Media Strategist", image: "media-mavericks.png", social: { instagram: "#", linkedin: "#", twitter: "#" } },
        { name: "Rimsha Jannat", role: "Digital Marketer", image: "media-mavericks.png", social: { instagram: "#", linkedin: "#", twitter: "#" } }
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

      {/* Modules Section - Updated with 5 Teams */}
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

      {/* Stats/Achievements Section */}
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

      {/* Call-to-Action Banner */}
      <div className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Join Prosoft Hub Today! 🚀</h2>
          <p className="cta-subtitle">Be part of the most innovative tech community</p>
          
          <div className="cta-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">✨</span>
              <span>Access to exclusive workshops</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🤝</span>
              <span>Network with industry professionals</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📚</span>
              <span>Learn cutting-edge technologies</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🎯</span>
              <span>Build your portfolio with real projects</span>
            </div>
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
                    <img src={`images/${member.image}`} alt={member.name} />
                  </div>
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <div className="member-socials">
                    {member.social.instagram && (
                      <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                        <i className="social-icon">📷</i>
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <i className="social-icon">💼</i>
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                        <i className="social-icon">💻</i>
                      </a>
                    )}
                    {member.social.behance && (
                      <a href={member.social.behance} target="_blank" rel="noopener noreferrer">
                        <i className="social-icon">🎨</i>
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                        <i className="social-icon">🐦</i>
                      </a>
                    )}
                    {member.social.facebook && (
                      <a href={member.social.facebook} target="_blank" rel="noopener noreferrer">
                        <i className="social-icon">👥</i>
                      </a>
                    )}
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
          {/* Left Side - Contact Info */}
          <div className="contact-info">
            <h3>Send us a message 📧</h3>
            <p className="contact-description">
              Feel free to reach out through contact form or find our contact 
              information below. Your feedback, questions, and suggestions 
              are important to us as we strive to provide exceptional service 
              to our university community.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <span className="icon">📧</span>
                <span>prosoft@university.edu</span>
              </div>
              
              <div className="contact-item">
                <span className="icon">📞</span>
                <span>+92 123-456-7890</span>
              </div>
              
              <div className="contact-item">
                <span className="icon">📍</span>
                <span>University Campus, Gujranwala, Punjab, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact-form">
            <div className="form-group">
              <label>Your name</label>
              <input type="text" placeholder="Enter your name" />
            </div>
            
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="Enter your mobile number" />
            </div>
            
            <div className="form-group">
              <label>Write your messages here</label>
              <textarea placeholder="Enter your message" rows="5"></textarea>
            </div>
            
            <button className="submit-btn">Submit now →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;