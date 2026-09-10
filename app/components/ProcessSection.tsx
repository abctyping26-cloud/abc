export default function ProcessSection() {
  return (
    <section className="process-section">
      <div className="container">
        <h2 className="process-title">Our Process</h2>
        <div className="process-grid">
          {/* Step 1 */}
          <div className="process-card">
            <h3 className="process-card-title">Initial Consultation</h3>
            <p className="process-card-desc">
              Understanding your company&apos;s liquidation needs thoroughly
              within detailed consultation to assess your company&apos;s
              summary, understand your liquidation goals, and provide a clear
              roadmap tailored to your specific needs.
            </p>
          </div>

          {/* Step 2 */}
          <div className="process-card">
            <h3 className="process-card-title">Document Preparation</h3>
            <p className="process-card-desc">
              Managing all necessary legal paperwork, our team handles all
              required documentation, from preparing liquidation board
              resolutions to compiling financial statements and ensuring all
              legal paperwork is accurate and complete.
            </p>
          </div>

          {/* Step 3 */}
          <div className="process-card">
            <h3 className="process-card-title">Government Approvals</h3>
            <p className="process-card-desc">
              Handling legal clearances and formalities with relevant
              authorities to ensure necessary approvals, navigate cancelations,
              settling obligations, and obtaining final release document to
              relieve entities and stakeholders.
            </p>
          </div>

          {/* Step 4 */}
          <div className="process-card">
            <h3 className="process-card-title">Final Closure</h3>
            <p className="process-card-desc">
              Company deregistration and completion of the process: the final
              step includes asset liquidation, debt settlement, conducting a
              final audit, and officially deregistering your company, ensuring
              complete legal closure with all documents and records.
            </p>
          </div>
        </div>

        {/* Process CTA Button */}
        <div>
          <a href="#services" className="process-cta-btn">
            <span>START YOUR COMPANY LIQUIDATION TODAY</span>
            <span className="process-cta-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
