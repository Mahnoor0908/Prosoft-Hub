import React, { useState, useEffect } from "react";
import "./ManageGallery.css";

const BACKEND_URL = "http://localhost:5000";

const ManageGallery = () => {
  const categories = [
    "Upcoming Events",
    "Previous Events",
    "Community / Member Highlights",
    "Workshops",
  ];

  const [gallery, setGallery] = useState({
    "Upcoming Events": [],
    "Previous Events": [],
    "Community / Member Highlights": [],
    Workshops: [],
  });

  const [selectedCategory, setSelectedCategory] = useState("Upcoming Events");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  /* ================= HELPER: Show Success Message ================= */
  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  /* ================= HELPER: Show Error Message (Only for user input errors) ================= */
  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 5000);
  };

  /* ================= LOAD DATA FROM BACKEND ================= */
  useEffect(() => {
    const fetchGalleryFromBackend = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/gallery`);
        if (res.ok) {
          const data = await res.json();
          setGallery(data);
          localStorage.setItem("galleryData", JSON.stringify(data));
          console.log("✅ Gallery loaded from backend");
        } else {
          throw new Error("Backend fetch failed");
        }
      } catch (err) {
        console.log("⚠️ Using offline mode");
        // Fallback to localStorage silently
        const savedGallery = localStorage.getItem("galleryData");
        if (savedGallery) {
          setGallery(JSON.parse(savedGallery));
        }
      }
    };

    fetchGalleryFromBackend();
  }, []);

  const isValidImageURL = (url) => /^https?:\/\/.+/i.test(url);

  /* ================= ADD IMAGE ================= */
  const handleAddImage = async () => {
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (!imageURL.trim()) {
        showError("Please enter an image URL");
        setLoading(false);
        return;
      }

      if (!isValidImageURL(imageURL)) {
        showError("Invalid image URL. Must start with http:// or https://");
        setLoading(false);
        return;
      }

      // Try backend first
      try {
        const res = await fetch(`${BACKEND_URL}/api/gallery/add-url`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            category: selectedCategory, 
            imageUrl: imageURL 
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const newImage = { id: data.id, url: imageURL };

          setGallery((prev) => {
            const updated = {
              ...prev,
              [selectedCategory]: [...prev[selectedCategory], newImage],
            };
            localStorage.setItem("galleryData", JSON.stringify(updated));
            return updated;
          });

          setImageURL("");
          showSuccess("✅ Image added successfully!");
          setLoading(false);
          return;
        }
      } catch (backendError) {
        console.log("⚠️ Backend unavailable, saving locally");
      }

      // Fallback: save locally without showing error
      const localId = Date.now();
      setGallery((prev) => {
        const updated = {
          ...prev,
          [selectedCategory]: [
            ...prev[selectedCategory],
            { id: localId, url: imageURL },
          ],
        };
        localStorage.setItem("galleryData", JSON.stringify(updated));
        return updated;
      });

      setImageURL("");
      showSuccess("✅ Image added!");

    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE IMAGE (NO ERROR MESSAGES) ================= */
  const handleDeleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    setError("");
    setSuccessMessage("");

    // Always delete from local state immediately
    setGallery((prev) => {
      const updated = {
        ...prev,
        [selectedCategory]: prev[selectedCategory].filter((img) => img.id !== id),
      };
      localStorage.setItem("galleryData", JSON.stringify(updated));
      return updated;
    });

    // Try to delete from backend silently (no error if it fails)
    try {
      await fetch(`${BACKEND_URL}/api/gallery/${id}`, { 
        method: "DELETE" 
      });
      console.log("✅ Deleted from backend, ID:", id);
    } catch (err) {
      console.log("⚠️ Backend delete skipped (offline mode)");
      // Don't show any error - user already sees image removed
    }

    showSuccess("✅ Image deleted!");
  };

  /* ================= CLEAR CATEGORY (NO ERROR MESSAGES) ================= */
  const handleClearCategory = async () => {
    if (!window.confirm(`Clear all images from "${selectedCategory}"?`)) return;

    setError("");
    setSuccessMessage("");

    // Always clear from local state immediately
    setGallery((prev) => {
      const updated = { ...prev, [selectedCategory]: [] };
      localStorage.setItem("galleryData", JSON.stringify(updated));
      return updated;
    });

    // Try to clear from backend silently
    try {
      await fetch(
        `${BACKEND_URL}/api/gallery/category/${encodeURIComponent(selectedCategory)}`,
        { method: "DELETE" }
      );
      console.log("✅ Category cleared from backend");
    } catch (err) {
      console.log("⚠️ Backend clear skipped (offline mode)");
      // Don't show any error - user already sees images cleared
    }

    showSuccess(`✅ All images cleared!`);
  };

  /* ================= UI RENDER ================= */
  return (
    <div className="manage-gallery">
      <h1>Manage Gallery</h1>

      {/* Category Tabs */}
      <div className="category-select">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => {
              setSelectedCategory(cat);
              setError("");
              setSuccessMessage("");
            }}
          >
            {cat} <span>({gallery[cat].length})</span>
          </button>
        ))}
      </div>

      {/* Add Image Section */}
      <div className="add-image">
        <input
          type="text"
          placeholder={`Enter ${selectedCategory} Image URL`}
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddImage()}
          disabled={loading}
        />
        <button onClick={handleAddImage} disabled={loading}>
          {loading ? "Adding..." : "Add Image"}
        </button>

        {gallery[selectedCategory].length > 0 && (
          <button className="clear-btn" onClick={handleClearCategory}>
            Clear All
          </button>
        )}
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {/* Error Message - Only for input validation errors */}
      {error && <div className="error-message">{error}</div>}

      {/* Gallery Grid */}
      <div className="gallery-images">
        {gallery[selectedCategory].length === 0 ? (
          <p>No images added yet in this category</p>
        ) : (
          gallery[selectedCategory].map((img) => (
            <div key={img.id} className="image-card">
              <img
                src={img.url}
                alt="gallery"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                }}
              />
              <button
                className="delete-btn"
                onClick={() => handleDeleteImage(img.id)}
                title="Delete this image"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Image Count */}
      <div className="image-count">
        Total Images in {selectedCategory}: {gallery[selectedCategory].length}
      </div>
    </div>
  );
};

export default ManageGallery;