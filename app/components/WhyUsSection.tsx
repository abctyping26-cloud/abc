export default function WhyUsSection() {
  return (
    <section className="why-us-section">
      <div className="container">
        <div className="why-us-grid">
          {/* Left: Image Placeholder */}
          <div
            className="why-us-placeholder"
            role="img"
            aria-label="UAE Corporate Towers and Business Authority"
          >
            <div className="skyscraper-visual">
              <svg
                viewBox="0 0 64 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect
                  x="10"
                  y="24"
                  width="14"
                  height="34"
                  rx="1"
                  fill="rgba(196, 215, 236, 0.15)"
                  stroke="#c4d7ec"
                />
                <rect
                  x="25"
                  y="10"
                  width="16"
                  height="48"
                  rx="1"
                  fill="rgba(196, 215, 236, 0.25)"
                  stroke="#c4d7ec"
                />
                <rect
                  x="42"
                  y="18"
                  width="12"
                  height="40"
                  rx="1"
                  fill="rgba(196, 215, 236, 0.15)"
                  stroke="#c4d7ec"
                />
                <line
                  x1="29"
                  y1="16"
                  x2="37"
                  y2="16"
                  stroke="#c4d7ec"
                  strokeWidth="1.5"
                />
                <line
                  x1="29"
                  y1="22"
                  x2="37"
                  y2="22"
                  stroke="#c4d7ec"
                  strokeWidth="1.5"
                />
                <line
                  x1="29"
                  y1="28"
                  x2="37"
                  y2="28"
                  stroke="#c4d7ec"
                  strokeWidth="1.5"
                />
                <line
                  x1="29"
                  y1="34"
                  x2="37"
                  y2="34"
                  stroke="#c4d7ec"
                  strokeWidth="1.5"
                />
                <line
                  x1="14"
                  y1="30"
                  x2="20"
                  y2="30"
                  stroke="#c4d7ec"
                  strokeWidth="1.5"
                />
                <line
                  x1="14"
                  y1="36"
                  x2="20"
                  y2="36"
                  stroke="#c4d7ec"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="skyscraper-visual-text">
                UAE Business Excellence
              </span>
            </div>
            <div className="img-placeholder-badge">Corporate Track Record</div>
          </div>

          {/* Right: Content */}
          <div className="why-us-content">
            <h2 className="why-us-title">Why Choose Us</h2>
            <ul className="why-us-list">
              <li>Extensive Experience in UAE Business Liquidations</li>
              <li>Full Compliance With UAE Laws &amp; Legal Procedures</li>
              <li>Expert Handling Of All Documentation And Formalities</li>
              <li>Quick Turnaround And Transparent Process</li>
              <li>Affordable Rates With No Hidden Fees</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
