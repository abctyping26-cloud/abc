"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    identifier: string;
    name?: string;
  } | null>(null);

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

  return (
    <section className="hero-section" id="hero">
      <div className="hero-box">
        {/* Top Left: Brand Logo matching Footer */}
        <div className="hero-logo-box">
          <a href="#" className="hero-logo-link" aria-label="ABC Typing Services Homepage">
            <span className="hero-logo-text">abc</span>
            <span className="hero-logo-dot" aria-hidden="true" />
          </a>
        </div>

        {/* Top Right Navigation & Action Buttons */}
        <div className="hero-top-nav">
          <nav className="hero-nav-links">
            <a href="#about" className="hero-nav-link">
              About Us
            </a>
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

        <div className="hero-content">
          <h1 className="hero-title" data-aos="fade-up" data-aos-duration="900">
            From Kerala to the Gulf —<br />
            Every Document, Every Step.
          </h1>
          <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="150" data-aos-duration="900">
            Complete Solutions for Business Closure &amp; Trade License Cancellation
          </p>
          <div className="hero-cta-group" data-aos="fade-up" data-aos-delay="300" data-aos-duration="900">
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
            <a href="#process" className="hero-process-btn">
              <span>See Our 4-Step Process</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
