import React from 'react';
import './App.css';

function App() {
  return (
    <div className="about-container">
      <h1>About Prosoft Hub</h1>

      <section>
        <h2>Overview</h2>
        <p>
          Prosoft Hub is a web-based society management platform designed for the Prosoft Society of RCET.
          Members can register, view events, access announcements, and renew memberships online.
          Admins can efficiently manage content, events, and members in one centralized system.
        </p>
      </section>

      <section>
        <h2>Our Mission</h2>
        <p>
          To digitalize the society’s operations, making membership, events, and communication
          more organized, transparent, and easily accessible to all members.
        </p>
      </section>

      <section>
        <h2>Our Vision</h2>
        <p>
          To provide a modern, user-friendly platform for every member of the Prosoft Society,
          powered by React.js and Node.js.
        </p>
      </section>

      <section>
        <h2>Modules Included</h2>
        <ul>
          <li>User Authentication</li>
          <li>Home / About</li>
          <li>Events</li>
          <li>Membership</li>
          <li>Gallery (Photos)</li>
        </ul>
      </section>

      <a href="#" className="btn-primary">Explore Events</a>
    </div>
  );
}

export default App;
