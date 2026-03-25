import React, { useState, useEffect } from "react";
import "./Gallery.css";

const BACKEND_URL = "http://localhost:5000";

const categories = [
  { key: "Upcoming Events", icon: "🚀" },
  { key: "Previous Events", icon: "🎉" },
  { key: "Community / Member Highlights", icon: "🌟" },
  { key: "Workshops", icon: "🛠️" },
];

const Gallery = () => {
  const [gallery, setGallery] = useState({
    "Upcoming Events": [],
    "Previous Events": [],
    "Community / Member Highlights": [],
    Workshops: [],
  });

  const [selectedCategory, setSelectedCategory] = useState("Upcoming Events");
  const [lightbox, setLightbox] = useState(null); // { url, index }
  const [loaded, setLoaded] = useState(false);

  /* ── Load from backend, fallback to localStorage ── */
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/gallery`);
        if (res.ok) {
          const data = await res.json();
          setGallery(data);
          localStorage.setItem("galleryData", JSON.stringify(data));
        } else throw new Error();
      } catch {
        const saved = localStorage.getItem("galleryData");
        if (saved) setGallery(JSON.parse(saved));
      } finally {
        setLoaded(true);
      }
    };
    fetchGallery();
  }, []);

  /* ── Lightbox keyboard nav ── */
  useEffect(() => {
    if (!lightbox) return;
    const imgs = gallery[selectedCategory];
    const handler = (e) => {
      if (e.key === "ArrowRight")
        setLightbox({ url: imgs[(lightbox.index + 1) % imgs.length].url, index: (lightbox.index + 1) % imgs.length });
      if (e.key === "ArrowLeft")
        setLightbox({ url: imgs[(lightbox.index - 1 + imgs.length) % imgs.length].url, index: (lightbox.index - 1 + imgs.length) % imgs.length });
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, gallery, selectedCategory]);

  const currentImages = gallery[selectedCategory] || [];
  useEffect(() => {
  if (lightbox) {
    document.body.style.overflow = "hidden"; // stop background scroll
  } else {
    document.body.style.overflow = "auto";
  }
}, [lightbox]);

  return (
    <div className={`gallery-page ${loaded ? "gallery-loaded" : ""}`}>

      {/* ── Hero ── */}
      <div className="gallery-hero">
        <div className="gallery-hero-bg" />
        <div className="gallery-hero-content">
          <span className="gallery-eyebrow">Prosoft Hub</span>
          <h1 className="gallery-title">
            Our <span className="gallery-title-accent">Gallery</span>
          </h1>
          <p className="gallery-subtitle">
            Moments captured, memories preserved — explore our events and community highlights.
          </p>
        </div>
        <div className="gallery-hero-orb orb1" />
        <div className="gallery-hero-orb orb2" />
        <div className="gallery-hero-orb orb3" />
      </div>

      {/* ── Category Tabs ── */}
      <div className="gallery-tabs-wrapper">
        <div className="gallery-tabs">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`gallery-tab ${selectedCategory === cat.key ? "gallery-tab-active" : ""}`}
              onClick={() => setSelectedCategory(cat.key)}
            >
              <span className="tab-icon">{cat.icon}</span>
              <span className="tab-label">{cat.key}</span>
              <span className="tab-count">{gallery[cat.key]?.length || 0}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="gallery-grid-section">
        {!loaded ? (
          <div className="gallery-loading">
            <div className="loading-spinner" />
            <p>Loading gallery...</p>
          </div>
        ) : currentImages.length === 0 ? (
          <div className="gallery-empty">
            <div className="empty-icon">🖼️</div>
            <h3>No images yet</h3>
            <p>Images will appear here once the advisor adds them.</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {currentImages.map((img, idx) => (
              <div
                key={img.id}
                className="gallery-card"
                style={{ animationDelay: `${idx * 0.07}s` }}
                onClick={() => setLightbox({ url: img.url, index: idx })}
              >
                <div className="gallery-card-inner">
                  <img
                    src={img.url}
                    alt={`gallery-${idx}`}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=Image+Not+Found";
                    }}
                  />
                  <div className="gallery-card-overlay">
                    <span className="card-zoom-icon">🔍</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image count badge */}
        {currentImages.length > 0 && (
          <div className="gallery-count-badge">
            {currentImages.length} image{currentImages.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
<div
  className="lightbox-overlay"
  onClick={(e) => {
    if (e.target.classList.contains("lightbox-overlay")) {
      setLightbox(null);
    }
  }}
>          <div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <button
              className="lightbox-arrow lightbox-prev"
              onClick={() => {
                const imgs = gallery[selectedCategory];
                const prev = (lightbox.index - 1 + imgs.length) % imgs.length;
                setLightbox({ url: imgs[prev].url, index: prev });
              }}
            >‹</button>
            <img src={lightbox.url} alt="lightbox"
              onError={(e) => { e.target.src = "https://via.placeholder.com/800x600?text=Not+Found"; }} />
            <button
              className="lightbox-arrow lightbox-next"
              onClick={() => {
                const imgs = gallery[selectedCategory];
                const next = (lightbox.index + 1) % imgs.length;
                setLightbox({ url: imgs[next].url, index: next });
              }}
            >›</button>
            <div className="lightbox-counter">
              {lightbox.index + 1} / {gallery[selectedCategory].length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

