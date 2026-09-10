"use client";

import React, { useState, useEffect } from "react";

export default function FloatingActions() {
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    const heroEl = document.getElementById("hero") || document.querySelector(".hero-section");
    if (!heroEl) {
      setInHero(false);
      return;
    }

    const checkHeroVisibility = () => {
      const heroRect = heroEl.getBoundingClientRect();
      // If the bottom of the hero section is still well within or above the viewport,
      // user is still viewing the hero. When hero bottom is scrolled above viewport (<= 80px),
      // they have transitioned to the next section.
      setInHero(heroRect.bottom > 80);
    };

    // Run immediate check
    checkHeroVisibility();

    // IntersectionObserver for optimized tracking
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInHero(entry.isIntersecting && entry.intersectionRatio > 0.05);
      },
      {
        threshold: [0, 0.05, 0.2],
      }
    );

    observer.observe(heroEl);
    window.addEventListener("scroll", checkHeroVisibility, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkHeroVisibility);
    };
  }, []);

  const handleSearchClick = () => {
    const searchSection = document.getElementById("services");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth" });
      const searchInput = document.querySelector(
        ".search-capsule-input"
      ) as HTMLInputElement | null;
      if (searchInput) {
        setTimeout(() => {
          searchInput.focus();
        }, 500);
      }
    }
  };

  return (
    <aside
      className={`floating-actions ${inHero ? "is-hidden" : ""}`}
      aria-label="Quick Actions"
      aria-hidden={inHero}
    >
      {/* 1. Search */}
      <div className="floating-item">
        <button
          type="button"
          onClick={handleSearchClick}
          className="floating-btn floating-search-btn"
          aria-label="Search services"
        >
          <svg
            className="floating-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <span className="floating-tooltip" role="tooltip">
          Search
        </span>
      </div>

      {/* 2. WhatsApp */}
      <div className="floating-item">
        <a
          href="https://wa.me/971500000000?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn floating-whatsapp-btn"
          aria-label="Chat on WhatsApp"
        >
          <svg
            className="floating-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
        <span className="floating-tooltip" role="tooltip">
          WhatsApp
        </span>
      </div>

      {/* 3. Map */}
      <div className="floating-item">
        <a
          href="https://maps.app.goo.gl/Zfy3m3sPpGNJDLtr5"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn floating-map-btn"
          aria-label="View on Google Maps"
        >
          <svg
            className="floating-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </a>
        <span className="floating-tooltip" role="tooltip">
          Location
        </span>
      </div>
    </aside>
  );
}
