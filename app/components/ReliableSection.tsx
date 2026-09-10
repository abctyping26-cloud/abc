export default function ReliableSection() {
  return (
    <section className="reliable-section">
      <div className="container">
        <div className="reliable-grid">
          {/* Left: Content */}
          <div className="reliable-content">
            <h2 className="reliable-title">
              Reliable and Efficient Company Liquidation in Abu Dhabi &amp;
              Across the UAE
            </h2>
            <p className="reliable-description">
              We specialize in providing smooth and compliant company liquidation
              services tailored to meet your business needs. Whether you&apos;re
              closing an LLC, canceling a trade license, or winding up operations,
              our expert team ensures a streamlined process, handling all legal
              formalities and documentation efficiently. With our reliable
              service, you can focus on your next venture while we take care of
              the rest.
            </p>
          </div>

          {/* Right: Image Placeholder */}
          <div
            className="reliable-placeholder"
            role="img"
            aria-label="Company liquidation and financial documentation files"
          >
            <div className="files-visual">
              <div className="file-tab">
                <span className="file-tab-label">COMPANY LIQUIDATION</span>
                <span className="file-tab-meta">STATUS: READY</span>
              </div>
              <div className="file-tab">
                <span className="file-tab-label">FINANCES &amp; CREDITORS</span>
                <span className="file-tab-meta">AUDITED</span>
              </div>
              <div className="file-tab">
                <span className="file-tab-label">INSOLVENCY &amp; CLOSURE</span>
                <span className="file-tab-meta">COMPLIANT</span>
              </div>
            </div>
            <div className="img-placeholder-badge">
              Corporate Archives &amp; Filing
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
