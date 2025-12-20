import React, { useState, useEffect } from "react";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    status: "upcoming",
    image: "",
    capacity: 50,
    organizer: "",
    registered: 0,
  });

  const API_URL = "http://localhost:5000/api/events";

  // Fetch Events
  const fetchEvents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // CREATE + UPDATE EVENT
  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.date ||
      !formData.time ||
      !formData.venue ||
      !formData.description
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (editingEvent) {
  const res = await fetch(`${API_URL}/${editingEvent.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const updatedEvent = await res.json();

  // Update local state
  setEvents(events.map((e) => (Number(e.id) === Number(updatedEvent.id) ? updatedEvent : e)));
} else {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...formData, registered: 0 }),
  });
  const newEvent = await res.json();

  setEvents([...events, newEvent]);
}

      resetForm();
    } catch (err) {
      console.error("Error submitting event:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      venue: "",
      description: "",
      status: "upcoming",
      image: "",
      capacity: 50,
      organizer: "",
      registered: 0,
    });
    setEditingEvent(null);
    setShowModal(false);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData(event);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setEvents(events.filter((e) => Number(e.id) !== Number(id))); // remove deleted event locally
  };

  const handlePostpone = async (id) => {
    const res = await fetch(`${API_URL}/${id}/postpone`, { method: "PUT" });
    const postponedEvent = await res.json();

    // Update local state
    setEvents(events.map((e) => (Number(e.id) === Number(postponedEvent.id) ? postponedEvent : e)));
  };

  const getStatusClass = (status) => `status-${status}`;
  const getStatIconClass = (status) => `stat-${status}`;

  return (
    <div className="events-container">
      {/* Header */}
      <div className="events-header">
        <div className="header-content">
          <div className="header-text">
            <h1>Events Management</h1>
            <p>Manage all ProSoft Hub events</p>
          </div>
          <button onClick={() => setShowModal(true)} className="add-event-btn">
            ➕ Add New Event
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-container">
        {["upcoming", "ongoing", "completed", "postponed"].map((status) => (
          <div key={status} className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p>{status}</p>
                <h3>{events.filter((e) => e.status === status).length}</h3>
              </div>

              <div className={`stat-icon ${getStatIconClass(status)}`}>
                {status === "upcoming" && "📅"}
                {status === "ongoing" && "⚡"}
                {status === "completed" && "✅"}
                {status === "postponed" && "⏸️"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Events Grid */}
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-image">
              <img
                src={
                  event.image ||
                  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500"
                }
                alt="event"
              />
              <div className={`event-status ${getStatusClass(event.status)}`}>
                {event.status}
              </div>
            </div>

            <div className="event-content">
              <h3 className="event-title">{event.title}</h3>

              <div className="event-details">
                <div>📅 {event.date}</div>

                <div>
                  ⏰{" "}
                  {new Date(`1970-01-01T${event.time}`).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>

                <div>📍 {event.venue}</div>
              </div>

              {/* Extra Fields */}
              <div className="event-extra">
                <p>
                  <b>Organizer:</b> {event.organizer || "Unknown"}
                </p>
                <p>
                  <b>Capacity:</b> {event.capacity}
                </p>
                <p>
                  <b>Registered:</b> {event.registered}
                </p>
              </div>

              <p className="event-description">{event.description}</p>

              <div className="event-actions">
                <button
                  onClick={() => handleEdit(event)}
                  className="event-btn btn-edit"
                >
                  ✏️ Edit
                </button>

                {event.status === "upcoming" && (
                  <button
                    onClick={() => handlePostpone(event.id)}
                    className="event-btn btn-postpone"
                  >
                    ⏸️ Postpone
                  </button>
                )}

                <button
                  onClick={() => handleDelete(event.id)}
                  className="event-btn btn-delete"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>{editingEvent ? "Edit Event" : "Add New Event"}</h2>
              <button onClick={resetForm} className="close-btn">
                ×
              </button>
            </div>

            <div className="modal-body">
              {/* Title */}
              <div className="form-group">
                <label>Event Title *</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              {/* Date + Time */}
              <div className="form-row">
                <div className="form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Venue */}
              <div className="form-group">
                <label>Venue *</label>
                <input
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                />
              </div>

              {/* Image */}
              <div className="form-group">
                <label>Image URL</label>
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                />
              </div>

              {/* Capacity */}
              <div className="form-group">
                <label>Capacity *</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                />
              </div>

              {/* Organizer */}
              <div className="form-group">
                <label>Organizer *</label>
                <input
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleInputChange}
                />
              </div>

              {/* Status */}
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="postponed">Postponed</option>
                </select>
              </div>

              {/* Description */}
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              {/* Buttons */}
              <div className="modal-actions">
                <button onClick={handleSubmit} className="submit-btn">
                  {editingEvent ? "Update Event" : "Create Event"}
                </button>

                <button onClick={resetForm} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;