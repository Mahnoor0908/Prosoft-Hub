import React from "react";
import "./App.css";

function App() {
  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h1 className="logo">Prosoft Hub</h1>
        <ul className="nav-links">
          <li>Home</li>
          <li>About</li>
          <li>SignIn</li>
          <li>SignUp</li>
          
        </ul>
      </nav>

      {/* Hero Section with Background Image */}
      <div
  className="hero"
  style={{
    backgroundImage: 'url("images/prosoft-bg.jpg")',
  }}
  
>
      <div className="overlay">
  <h2>Welcome to Prosoft Society 🌟</h2>
  <p>"Empowering creativity and technology together."</p>
  <button className="prosoft-btn">Join Now</button>
</div>
      </div>
    </div>
  );
}

export default App;
