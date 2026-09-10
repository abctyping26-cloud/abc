"use client";

import React from "react";

// Column 1: Business & Corporate Services (7 items from Image 2)
const COLUMN_1_SERVICES = [
  "Typing Services Abu Dhabi.",
  "PRO Services Abu Dhabi.",
  "Business Setup Abu Dhabi.",
  "Company Formation Abu Dhabi.",
  "Businessmen Services Abu Dhabi.",
  "Business Support Services Abu Dhabi.",
  "Corporate Services Abu Dhabi.",
];

// Column 2: Legal, Attestation & Gov Services (9 items from Image 1, Left)
const COLUMN_2_SERVICES = [
  "Normal & Legal Translation.",
  "MOFA, Embassy Attestation.",
  "Notary Services Abu Dhabi.",
  "Digital Marketing Abu Dhabi.",
  "Insurance Services.",
  "Transaction Follow-Up.",
  "Abu Dhabi Driving License.",
  "Vehicle Services Abu Dhabi.",
  "Virtual Offices Abu Dhabi.",
];

// Column 3: Visa Services (9 items from Image 1, Right)
const COLUMN_3_SERVICES = [
  "Golden Visa Abu Dhabi.",
  "Investor Visa Abu Dhabi.",
  "Family Visa Abu Dhabi.",
  "Employment Visa Abu Dhabi.",
  "Tourist Visit Visa Abu Dhabi.",
  "Mission Visa Abu Dhabi.",
  "Green Visa Abu Dhabi.",
  "Domestic Worker-Maid Visa.",
  "Foreign Visa Services.",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section" id="contact" role="contentinfo">
      {/* Ambient background lighting */}
      <div className="footer-ambient-glow" aria-hidden="true" />
      <div className="footer-ambient-glow-left" aria-hidden="true" />

      <div className="footer-container">
        {/* Split layout: 60% Left | 70vh Divider | 40% Right */}
        <div className="footer-split-wrapper">
          {/* =======================================================
              Left Column: 60% Width
              ======================================================= */}
          <div className="footer-left-col">
            {/* Top Left: abc Logo */}
            <div className="footer-logo-box">
              <a href="#" className="footer-logo-link" aria-label="ABC Typing Services Homepage">
                <span className="footer-logo-text">abc</span>
                <span className="footer-logo-dot" aria-hidden="true" />
              </a>
              <span className="footer-logo-tagline">
                Typing &amp; Corporate Services • Abu Dhabi
              </span>
            </div>

            {/* 3-Column Service Directory with ▸ Bullets */}
            <div className="footer-services-container">
              <div className="footer-services-grid">
                {/* Column 1 */}
                <div className="footer-services-col">
                  {COLUMN_1_SERVICES.map((item, idx) => (
                    <a
                      key={`col1-${idx}`}
                      href="#services"
                      className="footer-service-item"
                      title={item}
                    >
                      <span className="service-bullet" aria-hidden="true">
                        &#9656;
                      </span>
                      <span className="service-label">{item}</span>
                    </a>
                  ))}
                </div>

                {/* Column 2 */}
                <div className="footer-services-col">
                  {COLUMN_2_SERVICES.map((item, idx) => (
                    <a
                      key={`col2-${idx}`}
                      href="#services"
                      className="footer-service-item"
                      title={item}
                    >
                      <span className="service-bullet" aria-hidden="true">
                        &#9656;
                      </span>
                      <span className="service-label">{item}</span>
                    </a>
                  ))}
                </div>

                {/* Column 3 */}
                <div className="footer-services-col">
                  {COLUMN_3_SERVICES.map((item, idx) => (
                    <a
                      key={`col3-${idx}`}
                      href="#services"
                      className="footer-service-item"
                      title={item}
                    >
                      <span className="service-bullet" aria-hidden="true">
                        &#9656;
                      </span>
                      <span className="service-label">{item}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Left Bottom Bar: Copyright & Legal */}
            <div className="footer-bottom-bar">
              <div className="footer-copyright">
                &copy; {currentYear} ABC Typing Services. All rights reserved.
              </div>
              <div className="footer-bottom-links">
                <a href="#">Privacy Policy</a>
                <span aria-hidden="true">&bull;</span>
                <a href="#">Terms of Service</a>
                <span aria-hidden="true">&bull;</span>
                <a href="#">Abu Dhabi, UAE</a>
              </div>
            </div>
          </div>

          {/* =======================================================
              Vertical Divider Line: 70vh Height & Ultra-Thin (1px)
              ======================================================= */}
          <div className="footer-divider-line" aria-hidden="true" />

          {/* =======================================================
              Right Column: 40% Width (CTA Area)
              ======================================================= */}
          <div className="footer-right-col">
            <div className="footer-cta-card">
              <h2 className="footer-cta-title">
                Have questions or need assistance?
              </h2>

              <p className="footer-cta-desc">
                Speak directly with our Abu Dhabi PRO &amp; legal specialists for fast,
                hassle-free document clearance, visa processing, and business setups.
              </p>

              {/* Action Buttons */}
              <div className="footer-cta-actions">
                {/* 1. Chat in WhatsApp */}
                <a
                  href="https://wa.me/971500000000?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-whatsapp-btn"
                  title="Chat with us on WhatsApp"
                >
                  <svg
                    className="footer-whatsapp-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Chat in WhatsApp</span>
                </a>

                {/* 2. Enquiry Us */}
                <a
                  href="mailto:info@abctyping.ae?subject=Service%20Enquiry%20-%20ABC%20Typing"
                  className="footer-enquiry-btn"
                  title="Send us an enquiry"
                >
                  <span>Enquiry Us</span>
                  <svg
                    className="footer-enquiry-arrow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>

              {/* Quick Contact Details */}
              <div className="footer-contact-info">
                <div className="footer-contact-row">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <a href="tel:+97120000000">+971 2 000 0000</a>
                </div>

                <div className="footer-contact-row">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <a href="mailto:info@abctyping.ae">info@abctyping.ae</a>
                </div>

                <div className="footer-contact-row">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Abu Dhabi, United Arab Emirates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
