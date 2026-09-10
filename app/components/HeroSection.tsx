import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-box">
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
            <a href="#services" className="hero-contact-btn">
              Contact Us
            </a>
          </div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            From Kerala to the Gulf —<br />
            Every Document, Every Step.
          </h1>
          <p className="hero-subtitle">
            Complete Solutions for Business Closure &amp; Trade License Cancellation
          </p>
          <div>
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
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Right Client Stat Card */}
        <div className="hero-stat-card">
          <div className="avatar-group">
            <Image
              src="/images/avatar_row_clean.png"
              alt="Happy clients"
              className="avatar-row-img"
              width={138}
              height={44}
              priority
            />
          </div>
          <div className="stat-number">30k+</div>
          <p className="stat-desc">
            Happy clients we have<br />
            world-wide.
          </p>
        </div>
      </div>
    </section>
  );
}
