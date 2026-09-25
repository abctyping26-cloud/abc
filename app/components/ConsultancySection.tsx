"use client";

import React from "react";
import Image from "next/image";
import { getWhatsAppUrl } from "../utils/whatsapp";

export default function ConsultancySection() {
  const handleOpenContact = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("abc:open-contact-modal"));
    }
  };

  const whatsappUrl = getWhatsAppUrl(
    "Hi, I would like to book a free consultation regarding business services."
  );

  return (
    <section className="consultancy-section" id="consultancy">
      <div className="consultancy-inner">
        {/* Top Left Title Area */}
        <div className="consultancy-header" data-aos="fade-up">
          <span className="consultancy-kicker">FREE CONSULTATION</span>
          <h2 className="consultancy-title">
            We offer assistance and tailored services
          </h2>
          <p className="consultancy-subtitle">
            Get personalized advice from seasoned UAE corporate and liquidation specialists.
            Zero commitment, complete legal clarity.
          </p>
        </div>

        {/* Bottom Full-Width Bar */}
        <div className="consultancy-bar" data-aos="fade-up" data-aos-delay="100">
          <div className="consultancy-bar-content">
            <span className="consultancy-pill">Expert 1-on-1 Guidance</span>
            <h3 className="consultancy-bar-headline">
              Ready to take the next step? Speak with our specialists today.
            </h3>
            <p className="consultancy-bar-desc">
              Whether navigating company liquidation, business formation, or complex ministry approvals,
              we guide you through every milestone smoothly.
            </p>

            <div className="consultancy-actions">
              <button
                type="button"
                onClick={handleOpenContact}
                className="consultancy-cta-btn"
              >
                <span>Book Free Consultation</span>
                <svg
                  className="consultancy-cta-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="consultancy-whatsapp-btn"
              >
                <svg
                  className="consultancy-wa-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
                </svg>
                <span>Chat via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Overlapping Man Image inside the bar to lock matching bottom */}
          <div className="consultancy-man-wrapper">
            <Image
              src="/remove-bg_-0 copy.png"
              alt="Business Consultant"
              width={832}
              height={1248}
              priority
              quality={95}
              className="consultancy-man-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
