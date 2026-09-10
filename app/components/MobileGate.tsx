export default function MobileGate() {
  return (
    <div className="mobile-gate" role="alert" aria-live="polite">
      <div className="mobile-gate-card">
        <div className="mobile-gate-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="34"
            height="34"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="12" rx="2" />
            <line x1="2" y1="20" x2="22" y2="20" />
          </svg>
        </div>
        <h1 className="mobile-gate-title">Please view from a laptop</h1>
        <p className="mobile-gate-text">
          See the web from the laptop for the complete experience.
        </p>
      </div>
    </div>
  );
}
