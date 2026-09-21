"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "../utils/whatsapp";

export default function HeroSection() {
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    identifier: string;
    name?: string;
  } | null>(null);

  // Carousel slide state: 0 = Liquidation & Closure, 1 = Business Setup
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  isHoveredRef.current = isHovered;

  const lastSlideTimeRef = useRef(Date.now());
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Check if user is logged in
    try {
      const stored = localStorage.getItem("abc_client_user");
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("abc_client_token");
    localStorage.removeItem("abc_client_user");
    setCurrentUser(null);

    // Trigger toast notification
    window.dispatchEvent(
      new CustomEvent("abc:toast", {
        detail: {
          title: "Logged Out",
          message: "You have been signed out successfully.",
        },
      })
    );
  };

  // Slide transitions with timestamp reset
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    lastSlideTimeRef.current = Date.now();
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 1 ? 0 : 1));
    lastSlideTimeRef.current = Date.now();
  }, []);

  // Jump directly to slide
  const goToSlide = useCallback((slideIndex: number) => {
    setCurrentSlide(slideIndex);
    lastSlideTimeRef.current = Date.now();
  }, []);

  // Continuous 3-second auto-slide loop (immune to iOS Safari timer throttling)
  useEffect(() => {
    lastSlideTimeRef.current = Date.now();
    let animId: number;

    const checkAutoSlide = () => {
      const now = Date.now();
      if (now - lastSlideTimeRef.current >= 3000) {
        // On mobile, isHoveredRef.current is ALWAYS false so it never pauses
        // On laptop/desktop, only pauses if hovered by a real mouse
        if (!isHoveredRef.current) {
          setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
        }
        lastSlideTimeRef.current = now;
      }
      animId = requestAnimationFrame(checkAutoSlide);
    };

    animId = requestAnimationFrame(checkAutoSlide);

    // Fallback interval
    const intervalId = setInterval(() => {
      const now = Date.now();
      if (now - lastSlideTimeRef.current >= 3000 && !isHoveredRef.current) {
        setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
        lastSlideTimeRef.current = now;
      }
    }, 1000);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        lastSlideTimeRef.current = Date.now();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Desktop-only hover pause: strictly guarded against touch screens
  const handleMouseEnter = () => {
    if (
      typeof window !== "undefined" &&
      window.innerWidth > 820 &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && window.innerWidth > 820) {
      setIsHovered(false);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  // Touch swipe support (distinguishes horizontal swipe from vertical scroll)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = touchStartPos.current.x - endX;
    const diffY = touchStartPos.current.y - endY;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        goToSlide(1);
      } else {
        goToSlide(0);
      }
    }
    touchStartPos.current = null;
  };

  return (
    <section
      className="hero-section"
      id="hero"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="ABC Typing Hero Services Carousel"
    >
      <div className="hero-carousel-container">
        {/* Sliding Track (200% width, translates horizontally between 0% and -50%) */}
        <div
          className="hero-carousel-track"
          style={{
            transform: `translate3d(-${currentSlide * 50}%, 0px, 0px)`,
            WebkitTransform: `translate3d(-${currentSlide * 50}%, 0px, 0px)`,
          }}
        >
          {/* =========================================================
              SLIDE 0: Original Home Hero (Liquidation & Closure)
              ========================================================= */}
          <div
            className={`hero-carousel-slide ${currentSlide === 0 ? "is-active" : ""}`}
            aria-hidden={currentSlide !== 0}
          >
            <div className="hero-box">
              {/* Background Hero Image */}
              <Image
                src="/hero.jpg"
                alt="ABC Typing Services"
                fill
                priority
                sizes="100vw"
                quality={95}
                className="hero-bg-img"
              />

              {/* Ambient Gradient Overlay */}
              <div className="hero-gradient-overlay" aria-hidden="true" />

              {/* Top Left: Brand Logo matching Footer */}
              <div className="hero-logo-box">
                <Link href="/" className="hero-logo-link" aria-label="ABC Typing Services Homepage">
                  <span className="hero-logo-text">abc</span>
                  <span className="hero-logo-dot" aria-hidden="true" />
                </Link>
              </div>

              {/* Top Right Navigation & Action Buttons */}
              <div className="hero-top-nav">
                <nav className="hero-nav-links">
                  <a href="#services" className="hero-nav-link">
                    Services
                  </a>
                  <a href="#faq" className="hero-nav-link">
                    FAQ
                  </a>
                </nav>
                <div className="hero-nav-actions">
                  <a
                    href="tel:+97140000000"
                    className="hero-call-btn"
                    title="Call Us"
                    aria-label="Call Us"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </a>
                  <a href="#enquiry" className="hero-contact-btn">
                    Contact Us
                  </a>

                  {currentUser ? (
                    <a
                      href="#logout"
                      role="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                      className="hero-login-btn"
                    >
                      Logout
                    </a>
                  ) : (
                    <Link href="/login" className="hero-login-btn">
                      Login
                    </Link>
                  )}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="hero-content">
                <h1 className="hero-title">
                  From Kerala to the Gulf —<br />
                  Every Document, Every Step.
                </h1>
                <p className="hero-subtitle">
                  Complete Solutions for Business Closure &amp; Trade License Cancellation
                </p>
                <div className="hero-cta-group">
                  <a href="#services" className="hero-cta-btn">
                    <span>Book a Call</span>
                    <svg
                      className="sleek-arrow"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              SLIDE 1: Business Setup Hero (Company Formation)
              ========================================================= */}
          <div
            className={`hero-carousel-slide ${currentSlide === 1 ? "is-active" : ""}`}
            aria-hidden={currentSlide !== 1}
          >
            <div className="setup-fullscreen-box setup-carousel-hero-box">
              {/* Top Left: Logo */}
              <div className="hero-logo-box">
                <Link href="/" className="hero-logo-link" aria-label="ABC Typing Services Homepage">
                  <span className="hero-logo-text">abc</span>
                  <span className="hero-logo-dot" aria-hidden="true" />
                </Link>
              </div>

              {/* Top Right Navigation & Action Buttons */}
              <div className="hero-top-nav">
                <nav className="hero-nav-links">
                  <a href="#services" className="hero-nav-link">
                    Services
                  </a>
                  <a href="#faq" className="hero-nav-link">
                    FAQ
                  </a>
                </nav>
                <div className="hero-nav-actions">
                  <a
                    href="tel:+97140000000"
                    className="hero-call-btn"
                    title="Call Us"
                    aria-label="Call Us"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </a>
                  <a href="#enquiry" className="hero-contact-btn">
                    Contact Us
                  </a>

                  {currentUser ? (
                    <a
                      href="#logout"
                      role="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                      className="hero-login-btn"
                    >
                      Logout
                    </a>
                  ) : (
                    <Link href="/login" className="hero-login-btn">
                      Login
                    </Link>
                  )}
                </div>
              </div>

              {/* Main Content Area: Left Center Hook + Right Plus Layout */}
              <div className="setup-hero-main-area">
                {/* Left Center: Large Hook */}
                <div className="setup-hero-left-content">
                  <h1 className="setup-hero-large-hook">
                    Your Business,
                    <br />
                    Set Up Right.
                  </h1>
                  <div className="setup-hero-cta-row">
                    <Link href="/services/business-setup-services" className="setup-hero-primary-btn">
                      <span>See More</span>
                      <svg
                        className="sleek-arrow"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                    <a
                      href={getWhatsAppUrl(WHATSAPP_MESSAGES.businessSetup)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="setup-hero-whatsapp-btn"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.54 1.83.822 2.796.822 3.182 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.808-5.768-5.808zm3.387 8.248c-.145.409-.726.772-1.025.808-.299.037-.687.054-2.222-.596-1.536-.65-2.531-2.247-2.607-2.351-.076-.104-.627-.834-.627-1.591 0-.756.398-1.127.538-1.282.141-.155.308-.194.411-.194.103 0 .205.001.296.006.095.005.223-.036.349.266.126.302.431 1.05.469 1.127.038.077.064.168.013.272-.051.104-.077.168-.154.259-.077.091-.162.203-.231.272-.077.077-.157.16-.068.314.089.154.397.656.852 1.061.585.521 1.079.682 1.233.759.154.077.244.064.334-.038.09-.103.385-.448.487-.602.103-.154.205-.129.346-.077.141.051.898.423 1.052.5.154.077.256.116.295.18.038.064.038.372-.107.781z" />
                      </svg>
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Right: 3-Card Interactive Portrait Showcase */}
                <div className="setup-hero-right-showcase">
                  {/* Tall Card (hr-1.jpg / Taxes optimized) */}
                  <div className="setup-feature-card tall">
                    <Image
                      src="/images/hr-1.jpg"
                      alt="Taxes optimized"
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      quality={95}
                      priority
                      className="setup-feature-img setup-img-tall"
                    />
                    <div className="setup-floating-pill">
                      <div className="setup-pill-icon orange">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="9" y1="17" x2="15" y2="11" />
                          <circle cx="10" cy="11.5" r="1" fill="currentColor" />
                          <circle cx="14" cy="16.5" r="1" fill="currentColor" />
                        </svg>
                      </div>
                      <span className="setup-pill-text">Taxes optimized</span>
                    </div>
                  </div>

                  {/* Chevrons pointing left */}
                  <div className="setup-feature-chevron-left" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </div>

                  {/* Right Column: 2 Stacked Cards with Down Chevrons */}
                  <div className="setup-feature-right-col">
                    {/* Top Card (coding.jpg / 100% Compliance) */}
                    <div className="setup-feature-card small">
                      <Image
                        src="/images/coding.jpg"
                        alt="100% Compliance"
                        fill
                        sizes="(max-width: 768px) 100vw, 260px"
                        quality={95}
                        priority
                        className="setup-feature-img setup-img-small"
                      />
                      <div className="setup-floating-pill">
                        <div className="setup-pill-icon blue">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                        </div>
                        <span className="setup-pill-text">100% Compliance</span>
                      </div>
                    </div>

                    {/* Down Chevrons */}
                    <div className="setup-feature-chevron-down" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>

                    {/* Bottom Card (sales.jpg / Payroll always on time) */}
                    <div className="setup-feature-card small">
                      <Image
                        src="/images/sales.jpg"
                        alt="Payroll always on time"
                        fill
                        sizes="(max-width: 768px) 100vw, 260px"
                        quality={95}
                        priority
                        className="setup-feature-img setup-img-small"
                      />
                      <div className="setup-floating-pill">
                        <div className="setup-pill-icon red">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="13" r="8" />
                            <path d="M10 2h4" />
                            <path d="M12 2v3" />
                            <path d="M12 9v8" />
                            <path d="M13.8 11.2a1.8 1.8 0 0 0-1.8-1.2h-0.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3H10" />
                          </svg>
                        </div>
                        <span className="setup-pill-text setup-pill-multiline">
                          <span>Payroll always</span>
                          <span>on time</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Side Arrow: Left */}
        <button
          type="button"
          className="hero-carousel-arrow hero-arrow-left"
          onClick={prevSlide}
          aria-label="Previous Slide: Liquidation"
          title="Previous Slide"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Carousel Side Arrow: Right */}
        <button
          type="button"
          className="hero-carousel-arrow hero-arrow-right"
          onClick={nextSlide}
          aria-label="Next Slide: Business Setup"
          title="Next Slide"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
