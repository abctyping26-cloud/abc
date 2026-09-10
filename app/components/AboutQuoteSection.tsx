export default function AboutQuoteSection() {
  return (
    <section className="about-quote-section" id="about">
      <div className="about-quote-container">
        <blockquote className="about-quote-text">
          “We are your dedicated partners in business transition — bridging
          Kerala and the Gulf to simplify every document, resolve every legal
          step, and stand beside you with unwavering integrity.”
        </blockquote>

        {/* 3 Offices Connected Network Row */}
        <div className="network-section">
          <div className="network-track">
            {/* Node 1: Kollam (India) */}
            <div
              className="network-node"
              tabIndex={0}
              role="button"
              aria-label="Kollam Office, India"
            >
              <span className="network-label">Kollam</span>
              <div className="network-circle">
                <span className="network-dot"></span>
                <div className="network-flag" aria-hidden="true">
                  {/* Flag of India */}
                  <svg
                    viewBox="0 0 60 60"
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <clipPath id="clip-flag-in">
                      <circle cx="30" cy="30" r="30" />
                    </clipPath>
                    <g clipPath="url(#clip-flag-in)">
                      <rect x="0" y="0" width="60" height="20" fill="#FF671F" />
                      <rect x="0" y="20" width="60" height="20" fill="#FFFFFF" />
                      <rect x="0" y="40" width="60" height="20" fill="#046A38" />
                      <circle
                        cx="30"
                        cy="30"
                        r="7.5"
                        fill="none"
                        stroke="#000080"
                        strokeWidth="1.2"
                      />
                      <circle cx="30" cy="30" r="1.8" fill="#000080" />
                      <g stroke="#000080" strokeWidth="0.7">
                        <line x1="30" y1="22.5" x2="30" y2="37.5" />
                        <line x1="22.5" y1="30" x2="37.5" y2="30" />
                        <line x1="24.7" y1="24.7" x2="35.3" y2="35.3" />
                        <line x1="35.3" y1="24.7" x2="24.7" y2="35.3" />
                        <line x1="23.1" y1="26.1" x2="36.9" y2="33.9" />
                        <line x1="36.9" y1="26.1" x2="23.1" y2="33.9" />
                        <line x1="26.1" y1="23.1" x2="33.9" y2="36.9" />
                        <line x1="33.9" y1="23.1" x2="26.1" y2="36.9" />
                        <line x1="22.6" y1="28" x2="37.4" y2="32" />
                        <line x1="37.4" y1="28" x2="22.6" y2="32" />
                        <line x1="28" y1="22.6" x2="32" y2="37.4" />
                        <line x1="32" y1="22.6" x2="28" y2="37.4" />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            {/* Connecting Line 1 */}
            <div className="network-connector" aria-hidden="true"></div>

            {/* Node 2: Abu Dhabi (UAE) */}
            <div
              className="network-node"
              tabIndex={0}
              role="button"
              aria-label="Abu Dhabi Office, UAE"
            >
              <span className="network-label">Abu Dhabi</span>
              <div className="network-circle">
                <span className="network-dot"></span>
                <div className="network-flag" aria-hidden="true">
                  {/* Flag of UAE */}
                  <svg
                    viewBox="0 0 60 60"
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <clipPath id="clip-flag-uae-ad">
                      <circle cx="30" cy="30" r="30" />
                    </clipPath>
                    <g clipPath="url(#clip-flag-uae-ad)">
                      <rect x="0" y="0" width="60" height="20" fill="#00732F" />
                      <rect x="0" y="20" width="60" height="20" fill="#FFFFFF" />
                      <rect x="0" y="40" width="60" height="20" fill="#000000" />
                      <rect x="0" y="0" width="17" height="60" fill="#CE1126" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            {/* Connecting Line 2 */}
            <div className="network-connector" aria-hidden="true"></div>

            {/* Node 3: Dubai (UAE) */}
            <div
              className="network-node"
              tabIndex={0}
              role="button"
              aria-label="Dubai Office, UAE"
            >
              <span className="network-label">Dubai</span>
              <div className="network-circle">
                <span className="network-dot"></span>
                <div className="network-flag" aria-hidden="true">
                  {/* Flag of UAE */}
                  <svg
                    viewBox="0 0 60 60"
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <clipPath id="clip-flag-uae-dxb">
                      <circle cx="30" cy="30" r="30" />
                    </clipPath>
                    <g clipPath="url(#clip-flag-uae-dxb)">
                      <rect x="0" y="0" width="60" height="20" fill="#00732F" />
                      <rect x="0" y="20" width="60" height="20" fill="#FFFFFF" />
                      <rect x="0" y="40" width="60" height="20" fill="#000000" />
                      <rect x="0" y="0" width="17" height="60" fill="#CE1126" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Network Caption Under Circle Row */}
          <p className="network-network-badge">
            3 OFFICES · ONE TRUSTED NETWORK · INDIA TO UAE
          </p>

          {/* 3 Stats Boxes Row */}
          <div className="stats-boxes-grid">
            {/* Box 1: 5+ Years */}
            <div className="stat-box stat-box-1" role="figure" aria-label="5+ Years">
              <div
                className="stat-box-bg"
                style={{ backgroundImage: "url('/box1.jpg')" }}
              ></div>
              <div className="stat-box-overlay"></div>
              <div className="stat-box-content">
                <span className="stat-box-number">5+</span>
                <span className="stat-box-label">Years</span>
              </div>
            </div>

            {/* Box 2: 10k+ Documents Cleared */}
            <div
              className="stat-box stat-box-2"
              role="figure"
              aria-label="10k+ Documents Cleared"
            >
              <div
                className="stat-box-bg"
                style={{ backgroundImage: "url('/box2.jpg')" }}
              ></div>
              <div className="stat-box-overlay"></div>
              <div className="stat-box-content">
                <span className="stat-box-number">10k+</span>
                <span className="stat-box-label">Documents Cleared</span>
              </div>
            </div>

            {/* Box 3: 2 Countries */}
            <div
              className="stat-box stat-box-3"
              role="figure"
              aria-label="2 Countries"
            >
              <div
                className="stat-box-bg"
                style={{ backgroundImage: "url('/box3.jpg')" }}
              ></div>
              <div className="stat-box-overlay"></div>
              <div className="stat-box-content">
                <span className="stat-box-number">2</span>
                <span className="stat-box-label">Countries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

