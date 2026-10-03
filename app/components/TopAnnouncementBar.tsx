"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../styles/top-announcement.css";

interface MarqueeItem {
  badgeText: string;
  message: string;
  ctaText: string;
  linkUrl: string;
}

const DEFAULT_ITEMS: MarqueeItem[] = [
  {
    badgeText: "NEW",
    message:
      "UAE Pass Biometric & Kiosk Support in Musaffah — Lost SIM Recovery, Facial Recognition & TAMM Digital Signatures",
    ctaText: "Explore",
    linkUrl: "/services/uae-pass-assistance",
  },
  {
    badgeText: "NEW",
    message:
      "Instant Kiosk Fingerprint Verification, ICP Mobile Number Update & Corporate Profile Linking",
    ctaText: "Explore",
    linkUrl: "/services/uae-pass-assistance",
  },
];

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function TopAnnouncementBar() {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [speedSeconds, setSpeedSeconds] = useState<number>(32);
  const [items, setItems] = useState<MarqueeItem[]>(DEFAULT_ITEMS);

  useEffect(() => {
    let isMounted = true;

    async function loadMarqueeConfig() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/v1/client/website-content/top-marquee`
        );
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data?.config && isMounted) {
            const cfg = json.data.config;
            setIsActive(Boolean(cfg.isActive));
            if (cfg.speedSeconds) setSpeedSeconds(Number(cfg.speedSeconds) || 32);
            if (Array.isArray(cfg.items) && cfg.items.length > 0) {
              setItems(cfg.items);
            }
          }
        }
      } catch {
        // Fail gracefully to defaults if backend is unavailable
      }
    }

    loadMarqueeConfig();

    return () => {
      isMounted = false;
    };
  }, []);

  // Update root CSS variable when visibility changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (!isActive) {
        document.documentElement.style.setProperty(
          "--top-announcement-height",
          "0px"
        );
      } else {
        document.documentElement.style.removeProperty(
          "--top-announcement-height"
        );
      }
    }
  }, [isActive]);

  if (!isActive || items.length === 0) {
    return null;
  }

  return (
    <aside
      className="top-announcement-bar"
      aria-label="Official Service Announcement"
    >
      <div className="top-announcement-track-container">
        <div
          className="top-announcement-track"
          style={{ animationDuration: `${speedSeconds}s` }}
        >
          {/* First Half */}
          <div className="top-announcement-group">
            {items.map((item, index) => (
              <React.Fragment key={`group1-${index}`}>
                <Link
                  href={item.linkUrl || "/services/uae-pass-assistance"}
                  className="top-announcement-item"
                  title={item.message}
                >
                  <span className="top-announcement-badge">
                    <span
                      className="top-announcement-pulse-dot"
                      aria-hidden="true"
                    />
                    <span>{item.badgeText || "NEW"}</span>
                  </span>
                  <span className="top-announcement-text">{item.message}</span>
                  <span className="top-announcement-cta">
                    <span>{item.ctaText || "Explore"}</span>
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
                </Link>
                <span className="top-announcement-sep" aria-hidden="true">
                  ✦
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Second Half (Exact Duplicate for Seamless Infinite Marquee Loop) */}
          <div className="top-announcement-group" aria-hidden="true">
            {items.map((item, index) => (
              <React.Fragment key={`group2-${index}`}>
                <Link
                  href={item.linkUrl || "/services/uae-pass-assistance"}
                  className="top-announcement-item"
                  tabIndex={-1}
                >
                  <span className="top-announcement-badge">
                    <span
                      className="top-announcement-pulse-dot"
                      aria-hidden="true"
                    />
                    <span>{item.badgeText || "NEW"}</span>
                  </span>
                  <span className="top-announcement-text">{item.message}</span>
                  <span className="top-announcement-cta">
                    <span>{item.ctaText || "Explore"}</span>
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
                </Link>
                <span className="top-announcement-sep" aria-hidden="true">
                  ✦
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
