import React, { useState } from 'react';
import './ViewEvents.css';

function ViewEvents() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample events data
  const eventsData = [
    {
      id: 1,
      title: "Web Development Workshop",
      date: "2024-12-15",
      time: "10:00 AM",
      venue: "Computer Lab A",
      description: "Learn modern web development with React and Tailwind CSS. This comprehensive workshop will cover everything from basics to advanced concepts including state management, routing, and deployment.",
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500",
      organizer: "ProSoft Hub",
      capacity: "50",
      registered: 32
    },
    {
      id: 2,
      title: "UI/UX Design Bootcamp",
      date: "2024-12-20",
      time: "2:00 PM",
      venue: "Design Studio",
      description: "Master the art of creating beautiful and functional user interfaces. Learn Figma, design principles, prototyping, user research, and creating stunning visual designs that users love.",
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500",
      organizer: "ProSoft Hub",
      capacity: "40",
      registered: 28
    },
    {
      id: 3,
      title: "Python Programming Masterclass",
      date: "2024-12-10",
      time: "9:00 AM",
      venue: "Main Auditorium",
      description: "Deep dive into Python programming from basics to advanced. Cover data structures, algorithms, web scraping, automation, and build real-world projects.",
      status: "ongoing",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500",
      organizer: "ProSoft Hub",
      capacity: "100",
      registered: 85
    },
    {
      id: 4,
      title: "Cybersecurity Fundamentals",
      date: "2024-11-25",
      time: "11:00 AM",
      venue: "Tech Lab B",
      description: "Understanding cybersecurity basics, ethical hacking, network security, and protecting systems from threats. Hands-on practical sessions included.",
      status: "completed",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500",
      organizer: "ProSoft Hub",
      capacity: "60",
      registered: 60
    }
  ];

  const filteredEvents = eventsData.filter(event => {
    const matchesFilter = filterStatus === 'all' || event.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch = event.title.toLowerCase().includes(q) ||
                          event.description.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const getHeroTitle = () => {
    if (filterStatus === 'all') return "All Skill-Enhancing Events";
    return `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Events`;
  };

  const shortText = (text, len = 90) => {
    if (text.length <= len) return text;
    return text.substring(0, len) + "...";
  };

  const handleRegister = (eventId) => {
    alert(`✅ Registration submitted for Event ID: ${eventId}`);
  };

  return (
    <div className="view-events-container">

      {/* HERO SECTION */}
      <div className="view-events-hero">
        <div className="hero-content">
          <h1 className="hero-title">{getHeroTitle()}</h1>
          <p className="hero-subtitle">Explore, Register & Level-Up Your Skills 🚀</p>
        </div>
      </div>

      {/* SEARCH + FILTER CONTROLS */}
      <div className="controls-section">

        {/* SEARCH BOX */}
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Type to search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* FILTER BUTTONS */}
        <div className="filter-buttons">
          {['all', 'upcoming', 'ongoing', 'completed'].map(status => (
            <button
              key={status}
              className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* EVENTS GRID */}
      <div className="view-events-grid">

        {filteredEvents.map((event) => {
          const capacityNum = parseInt(event.capacity.trim());
          const percent = Math.min((event.registered / capacityNum) * 100, 100);

          return (
            <div key={event.id} className="view-event-card">
              
              {/* IMAGE */}
              <div className="view-event-image">
                <img src={event.image} alt={event.title} loading="lazy" />
                <span className={`view-event-status status-${event.status}`}>
                  {event.status === 'upcoming' ? "Upcoming 🟢" :
                   event.status === 'ongoing' ? "Ongoing 🔵" :
                   "Completed ⚪"}
                </span>
              </div>

              {/* CONTENT */}
              <div className="view-event-content">
                <h3 className="view-event-title">{event.title}</h3>

                <div className="view-event-details">
                  <div className="view-detail-item"><span>📅</span> {event.date}</div>
                  <div className="view-detail-item"><span>⏰</span> {event.time}</div>
                  <div className="view-detail-item"><span>📍</span> {event.venue}</div>
                </div>

                <p className="view-event-description">
                  {selectedEvent?.id === event.id ? event.description : shortText(event.description)}
                  <span
                    className="read-more"
                    onClick={() => setSelectedEvent(event)}
                  >
                    {selectedEvent?.id === event.id ? " Show Less" : " Read More"}
                  </span>
                </p>

                {/* CAPACITY BAR */}
                {event.status === 'upcoming' && (
                  <div className="event-capacity">
                    <div className="capacity-bar">
                      <div
                        className="capacity-fill"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <small>{event.registered}/{capacityNum} Registered</small>
                  </div>
                )}

                {/* BUTTONS */}
                <div className="view-event-actions">
                  <button
                    className="view-details-btn"
                    onClick={() => setSelectedEvent(event)}
                  >
                    Details
                  </button>
                  {event.status === 'upcoming' && (
                    <button
                      className="register-btn"
                      onClick={() => handleRegister(event.id)}
                    >
                      Register
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {filteredEvents.length === 0 && (
        <div className="empty-state-view">
          📭 No events matched your search/filter!
        </div>
      )}

      {/* MODAL */}
      {selectedEvent && (
        <div className="view-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="view-modal-container" onClick={(e) => e.stopPropagation()}>
            
            <div className="view-modal-header">
              <h2>{selectedEvent.title}</h2>
              <button onClick={() => setSelectedEvent(null)} className="view-close-btn">×</button>
            </div>

            <div className="view-modal-body">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="modal-image" />
              
              <div className="modal-info-grid">
                <div><strong>📅 Date:</strong> {selectedEvent.date}</div>
                <div><strong>⏰ Time:</strong> {selectedEvent.time}</div>
                <div><strong>📍 Venue:</strong> {selectedEvent.venue}</div>
                <div><strong>👤 Organizer:</strong> {selectedEvent.organizer}</div>
              </div>

              <p className="modal-description">{selectedEvent.description}</p>

              {/* STATS */}
              {selectedEvent.status === 'upcoming' && (
                <div className="capacity-stats">
                  <span className="stat-item">👥 {selectedEvent.registered} Registered</span>
                  <span className="stat-item">🪑 {parseInt(selectedEvent.capacity.trim()) - selectedEvent.registered} Seats Left</span>
                </div>
              )}

              {/* REGISTER BUTTON */}
              {selectedEvent.status === 'upcoming' && (
                <button
                  className="modal-register-btn"
                  onClick={() => handleRegister(selectedEvent.id)}
                >
                  Confirm Registration ✅
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ViewEvents;
