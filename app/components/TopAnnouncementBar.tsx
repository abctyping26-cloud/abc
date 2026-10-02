"use client";

import Link from "next/link";
import "../styles/top-announcement.css";

export default function TopAnnouncementBar() {
  return (
    <aside className="top-announcement-bar" aria-label="Official Service Announcement">
      <Link
        href="/services/uae-pass-assistance"
        className="top-announcement-link"
        title="UAE Pass Assistance & Kiosk Biometric Support in Abu Dhabi"
        aria-label="Service Update: UAE Pass Biometric & Kiosk Support in Musaffah. Click to view service details."
      >
        <div className="top-announcement-track">
          {/* First Half */}
          <div className="top-announcement-group">
            <div className="top-announcement-item">
              <span className="top-announcement-badge">
                <span className="top-announcement-pulse-dot" aria-hidden="true" />
                <span>NEW</span>
              </span>
              <span className="top-announcement-text">
                UAE Pass Biometric &amp; Kiosk Support in Musaffah — Lost SIM Recovery, Facial Recognition &amp; TAMM Digital Signatures
              </span>
              <span className="top-announcement-cta">
                <span>Explore</span>
                <svg
                  className="top-announcement-arrow"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
            <span className="top-announcement-sep" aria-hidden="true">✦</span>

            <div className="top-announcement-item">
              <span className="top-announcement-badge">
                <span className="top-announcement-pulse-dot" aria-hidden="true" />
                <span>NEW</span>
              </span>
              <span className="top-announcement-text">
                Instant Kiosk Fingerprint Verification, ICP Mobile Number Update &amp; Corporate Profile Linking
              </span>
              <span className="top-announcement-cta">
                <span>Explore</span>
                <svg
                  className="top-announcement-arrow"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
            <span className="top-announcement-sep" aria-hidden="true">✦</span>
          </div>

          {/* Second Half (Exact Duplicate for Infinite Seamless Marquee Loop) */}
          <div className="top-announcement-group" aria-hidden="true">
            <div className="top-announcement-item">
              <span className="top-announcement-badge">
                <span className="top-announcement-pulse-dot" aria-hidden="true" />
                <span>NEW</span>
              </span>
              <span className="top-announcement-text">
                UAE Pass Biometric &amp; Kiosk Support in Musaffah — Lost SIM Recovery, Facial Recognition &amp; TAMM Digital Signatures
              </span>
              <span className="top-announcement-cta">
                <span>Explore</span>
                <svg
                  className="top-announcement-arrow"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
            <span className="top-announcement-sep" aria-hidden="true">✦</span>

            <div className="top-announcement-item">
              <span className="top-announcement-badge">
                <span className="top-announcement-pulse-dot" aria-hidden="true" />
                <span>NEW</span>
              </span>
              <span className="top-announcement-text">
                Instant Kiosk Fingerprint Verification, ICP Mobile Number Update &amp; Corporate Profile Linking
              </span>
              <span className="top-announcement-cta">
                <span>Explore</span>
                <svg
                  className="top-announcement-arrow"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
            <span className="top-announcement-sep" aria-hidden="true">✦</span>
          </div>
        </div>
      </Link>
    </aside>
  );
}
