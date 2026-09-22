"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ServiceDetail } from "../data/servicesData";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "../utils/whatsapp";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const sampleWebsites = [
  {
    src: "/sample-web/web1.jpeg",
    title: "Prosen IT Solutions",
    tag: "Enterprise Portal",
    themeColor: "#16a34a", // Emerald Green
  },
  {
    src: "/sample-web/web2.jpeg",
    title: "Expert Handyman Services",
    tag: "Service Business",
    themeColor: "#ea580c", // Vibrant Orange
  },
  {
    src: "/sample-web/web3.jpeg",
    title: "LOGISTIQO Global Shipping",
    tag: "Logistics & Trade",
    themeColor: "#2563eb", // Ocean Blue
  },
  {
    src: "/sample-web/web4.jpeg",
    title: "Ecovia Clean Energy",
    tag: "CleanTech Platform",
    themeColor: "#059669", // CleanTech Mint Green
  },
];

interface BusinessSetupDetailViewProps {
  service: ServiceDetail;
  isTemplateMode?: boolean;
}

export default function BusinessSetupDetailView({
  service: _service,
  isTemplateMode: _isTemplateMode = false,
}: BusinessSetupDetailViewProps) {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContent = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("what-we-do");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Flip state for the right box
  const [isFlipped, setIsFlipped] = useState(false);

  // Rotating layered website cards (changes every 2s, top card fades out)
  const [activeWebIndex, setActiveWebIndex] = useState(0);
  const [fadingIndex, setFadingIndex] = useState<number | null>(null);

  useEffect(() => {
    let fadeTimer: NodeJS.Timeout;

    const intervalTimer = setInterval(() => {
      setFadingIndex(activeWebIndex);
      setActiveWebIndex((prev) => (prev + 1) % sampleWebsites.length);

      fadeTimer = setTimeout(() => {
        setFadingIndex(null);
      }, 750);
    }, 2000);

    return () => {
      clearInterval(intervalTimer);
      clearTimeout(fadeTimer);
    };
  }, [activeWebIndex]);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
    setSubmitted(false);
    setError(null);
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanNotes = notes.trim();

    if (!cleanName) {
      setError("Please enter the name of the business or individual.");
      return;
    }
    if (!cleanPhone) {
      setError("Please provide a phone or WhatsApp contact number.");
      return;
    }
    if (!cleanEmail) {
      setError("Please provide an email address.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const now = new Date();
    const resolvedServiceName = _service?.name || "Business Setup & Company Formation";
    const enquiryPayload = {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      service: resolvedServiceName,
      otherService: cleanNotes ? `[One-Click Enquiry]: ${cleanNotes}` : "[One-Click Quick Enquiry]",
      notes: cleanNotes || undefined,
      submittedAt: now.toISOString(),
    };

    try {
      // 1. Post to Express Backend API (MongoDB 'enquiry' collection)
      try {
        await fetch(`${API_BASE_URL}/api/v1/client/enquiry`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enquiryPayload),
        });
      } catch (networkErr) {
        console.warn("Backend offline or unreachable, mirroring locally:", networkErr);
      }

      // 2. Mirror to LocalStorage abc_enquiries for instant cross-tab / cross-port admin sync
      try {
        const stored = localStorage.getItem("abc_enquiries");
        const list = stored ? JSON.parse(stored) : [];
        const localItem = {
          _id: "enq_" + Date.now(),
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          service: resolvedServiceName,
          otherService: cleanNotes ? `[One-Click Enquiry]: ${cleanNotes}` : "[One-Click Quick Enquiry]",
          status: "pending",
          submittedAt: now.toISOString(),
          createdAt: now.toISOString(),
        };
        localStorage.setItem("abc_enquiries", JSON.stringify([localItem, ...list]));
        window.dispatchEvent(new Event("abc_enquiries_updated"));
      } catch {
        // Ignore storage error
      }

      setSubmitted(true);
    } catch {
      setError("An error occurred while sending your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="service-page-wrapper">
      {/* ------------------------------------------------------------------
          Creative Fullscreen Hero Section (100vh & 100% width)
          ------------------------------------------------------------------ */}
      <section className="setup-fullscreen-hero">
        <div className="setup-fullscreen-box">
          {/* Top Left: Logo matching Home Hero */}
          <div className="hero-logo-box">
            <Link href="/" className="hero-logo-link" aria-label="ABC Typing Services Homepage">
              <span className="hero-logo-text">abc</span>
              <span className="hero-logo-dot" aria-hidden="true" />
            </Link>
          </div>

          {/* Top Right: Call & Contact Buttons matching Home Hero */}
          <div className="hero-top-nav">
            <div className="hero-nav-actions">
              <a
                href="tel:+97126427667"
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
              <a href="#contact" onClick={scrollToContact} className="hero-contact-btn">
                Contact Us
              </a>
            </div>
          </div>

          {/* Main Content Area: Left Center Hook + Right Plus Layout */}
          <div className="setup-hero-main-area">
            {/* Left Center: Large Hook */}
            <div className="setup-hero-left-content">
              <h1 className="setup-hero-large-hook">
                Your Business,
                <br />
                Set Up Right.
              </h1>
              <div className="setup-hero-cta-row">
                <a href="#what-we-do" onClick={scrollToContent} className="setup-hero-primary-btn">
                  <span>See More</span>
                </a>
                <a
                  href={getWhatsAppUrl(WHATSAPP_MESSAGES.businessSetup)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="setup-hero-whatsapp-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.54 1.83.822 2.796.822 3.182 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.808-5.768-5.808zm3.387 8.248c-.145.409-.726.772-1.025.808-.299.037-.687.054-2.222-.596-1.536-.65-2.531-2.247-2.607-2.351-.076-.104-.627-.834-.627-1.591 0-.756.398-1.127.538-1.282.141-.155.308-.194.411-.194.103 0 .205.001.296.006.095.005.223-.036.349.266.126.302.431 1.05.469 1.127.038.077.064.168.013.272-.051.104-.077.168-.154.259-.077.091-.162.203-.231.272-.077.077-.157.16-.068.314.089.154.397.656.852 1.061.585.521 1.079.682 1.233.759.154.077.244.064.334-.038.09-.103.385-.448.487-.602.103-.154.205-.129.346-.077.141.051.898.423 1.052.5.154.077.256.116.295.18.038.064.038.372-.107.781z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right: 3-Card Interactive Portrait Showcase matching design */}
            <div className="setup-hero-right-showcase">
              {/* Left Column: Tall Card (hr-1.jpg / Taxes optimized) */}
              <div className="setup-feature-card tall setup-box-1">
                <Image
                  src="/images/hr-1.jpg"
                  alt="Taxes optimized"
                  fill
                  sizes="(max-width: 768px) 50vw, 300px"
                  quality={95}
                  priority
                  className="setup-feature-img setup-img-tall"
                />
                <div className="setup-floating-pill">
                  <div className="setup-pill-icon orange">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="9" y1="17" x2="15" y2="11" />
                      <circle cx="10" cy="11.5" r="1" fill="currentColor" />
                      <circle cx="14" cy="16.5" r="1" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="setup-pill-text">
                    <span className="pill-long">Taxes optimized</span>
                    <span className="pill-short">Taxes optimized</span>
                  </span>
                </div>
              </div>

              {/* Chevrons pointing left */}
              <div className="setup-feature-chevron-left hero-feature-hide-mobile" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </div>

              {/* Right Column: 2 Stacked Cards with Down Chevrons */}
              <div className="setup-feature-right-col">
                {/* Top Card (coding.jpg / 100% Compliance) */}
                <div className="setup-feature-card small setup-box-2">
                  <Image
                    src="/images/coding.jpg"
                    alt="100% Compliance"
                    fill
                    sizes="(max-width: 768px) 50vw, 260px"
                    quality={95}
                    priority
                    className="setup-feature-img setup-img-small"
                  />
                  <div className="setup-floating-pill">
                    <div className="setup-pill-icon blue">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <span className="setup-pill-text">
                      <span className="pill-long">100% Compliance</span>
                      <span className="pill-short">100% Compliance</span>
                    </span>
                  </div>
                </div>

                {/* Down Chevrons */}
                <div className="setup-feature-chevron-down hero-feature-hide-mobile" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                {/* Bottom Card (sales.jpg / Payroll always on time) */}
                <div className="setup-feature-card small setup-box-3">
                  <Image
                    src="/images/sales.jpg"
                    alt="Payroll always on time"
                    fill
                    sizes="(max-width: 768px) 50vw, 260px"
                    quality={95}
                    priority
                    className="setup-feature-img setup-img-small"
                  />
                  <div className="setup-floating-pill">
                    <div className="setup-pill-icon red">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="13" r="8" />
                        <path d="M10 2h4" />
                        <path d="M12 2v3" />
                        <path d="M12 9v8" />
                        <path d="M13.8 11.2a1.8 1.8 0 0 0-1.8-1.2h-0.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3H10" />
                      </svg>
                    </div>
                    <span className="setup-pill-text setup-pill-multiline">
                      <span className="pill-long">
                        <span>Payroll always</span>
                        <span>on time</span>
                      </span>
                      <span className="pill-short">Payroll on time</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          "What Can We Do" 100vh Color-Blocked Bento Box Grid
          ------------------------------------------------------------------ */}
      <section className="setup-bento-section" id="what-we-do">
        <div className="setup-bento-container">
          {/* Top Row: 2 Bento Boxes */}
          <div className="setup-bento-top-row">
            {/* Box 1: Outdoor Billboard Card (Top Left) */}
            <div className="setup-bento-box bento-billboard-card">
              <div className="bento-billboard-stage">
                {/* Sky background atmosphere */}
                <div className="bento-sky-bg" />
                {/* Billboard Frame */}
                <div className="bento-billboard-frame">
                  <div className="bento-billboard-lights">
                    <span className="b-light" />
                    <span className="b-light" />
                    <span className="b-light" />
                  </div>
                  {/* Billboard Face */}
                  <div className="bento-billboard-face">
                    <div className="bento-face-copy">
                      <h3>Trusted by<br />Entrepreneurs,<br />Powered by<br />Innovation</h3>
                      <div className="bento-face-tags">
                        <span className="mini-tag red">uae</span>
                        <span className="mini-tag purple">licensing</span>
                      </div>
                    </div>
                    <div className="bento-face-art">
                      <svg viewBox="0 0 100 120" className="bento-artist-svg">
                        <circle cx="50" cy="25" r="12" fill="#38BDF8" />
                        <path d="M42 40 L58 40 L64 70 L36 70 Z" fill="#38BDF8" />
                        <path d="M38 70 L34 105 L46 105 L50 78" fill="#22C55E" />
                        <path d="M62 70 L66 105 L54 105 L50 78" fill="#22C55E" />
                        {/* Giant Pen */}
                        <path d="M44 35 L56 35 L52 110 L48 110 Z" fill="#8B5CF6" />
                        <polygon points="48,110 52,110 50,118" fill="#0f172a" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Billboard Structural Steel Pillar */}
                <div className="bento-billboard-pillars">
                  <div className="b-pillar" />
                </div>
              </div>
            </div>

            {/* Box 2: Purple Card with Big "Start a Business" Capsule */}
            <div className="setup-bento-box bento-purple-capsule-card">
              <a href="#contact" className="bento-giant-capsule">
                <span>Start a Business</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom Row: 3 Columns Bento Grid */}
          <div className="setup-bento-bottom-row">
            {/* Column 1: Illustration & T-Shirt Merch (Bottom Left) */}
            <div className="setup-bento-col bento-col-left">
              {/* Box 3: White Illustration Card */}
              <div className="setup-bento-box bento-illus-card">
                <div className="bento-illus-wrapper">
                  <svg className="bento-character-svg" viewBox="0 0 260 200" fill="none">
                    {/* Floating Speech Bubble with Heart */}
                    <g className="bento-floating-heart">
                      <rect x="110" y="16" width="46" height="34" rx="10" fill="#7C5CFC" />
                      <path d="M124 50 L130 56 L134 50 Z" fill="#7C5CFC" />
                      <path d="M133 27 C131 23, 126 23, 124 26 C122 23, 117 23, 115 26 C112 30, 115 36, 124 41 C133 36, 136 30, 133 27 Z" fill="#ffffff" transform="translate(9, 2) scale(0.85)" />
                    </g>
                    {/* Armchair Base */}
                    <ellipse cx="140" cy="180" rx="42" ry="8" fill="#e2e8f0" />
                    <path d="M106 172 C106 178, 174 178, 174 172 L164 150 L116 150 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
                    {/* Red Armchair Body */}
                    <path d="M86 98 C72 118, 76 150, 102 166 C122 178, 158 178, 178 166 C204 150, 208 118, 194 98 C186 86, 172 82, 160 84 C148 76, 132 76, 120 84 C108 82, 94 86, 86 98 Z" fill="#FF4D4D" stroke="#0f172a" strokeWidth="4" />
                    <path d="M96 114 C90 128, 96 148, 114 158 C128 166, 152 166, 166 158 C184 148, 190 128, 184 114" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
                    {/* Character Head */}
                    <ellipse cx="106" cy="104" rx="8" ry="10" fill="#38BDF8" stroke="#0f172a" strokeWidth="3" />
                    <path d="M98 96 C98 88, 106 82, 114 84 C120 84, 124 90, 120 98 C116 94, 110 92, 104 94 C100 94, 98 96, 98 96 Z" fill="#0f172a" />
                    {/* Blue Arms & Phone */}
                    <path d="M112 114 L132 108 L142 126" stroke="#38BDF8" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="138" y="104" width="12" height="20" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
                    {/* Green Pants */}
                    <path d="M124 136 L158 128 L190 156" stroke="#22C55E" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M136 148 L170 148 L198 174" stroke="#22C55E" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                    {/* White Sneakers */}
                    <path d="M184 156 L204 152 C208 152, 212 156, 210 162 L198 168 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
                    <path d="M192 174 L212 170 C216 170, 220 174, 218 180 L204 186 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
                  </svg>
                </div>
              </div>

              {/* Box 4: Purple Branded Merch / T-Shirt Card (Bottom Left Box) */}
              <div className="setup-bento-box bento-purple-apparel bento-apparel-bottom-left">
                <div className="bento-apparel-stage">
                  {/* T-Shirt Merch Vector Graphic */}
                  <div className="bento-tshirt-wrap">
                    <svg className="bento-tshirt-svg" viewBox="0 0 340 230" fill="none">
                      {/* Soft ambient drop shadow */}
                      <path d="M96 36 C124 50, 216 50, 244 36 L310 82 C316 86, 314 96, 306 102 L276 122 C270 126, 262 122, 258 116 L248 102 L248 206 C248 214, 242 220, 234 220 L106 220 C98 220, 92 214, 92 206 L92 102 L82 116 C78 122, 70 126, 64 122 L34 102 C26 96, 24 86, 30 82 Z" fill="rgba(0,0,0,0.22)" transform="translate(6, 12)" filter="blur(8px)" />
                      {/* Main Shirt Body in Coral Red */}
                      <path d="M96 36 C124 50, 216 50, 244 36 L310 82 C316 86, 314 96, 306 102 L276 122 C270 126, 262 122, 258 116 L248 102 L248 206 C248 214, 242 220, 234 220 L106 220 C98 220, 92 214, 92 206 L92 102 L82 116 C78 122, 70 126, 64 122 L34 102 C26 96, 24 86, 30 82 Z" fill="#FF5252" />
                      {/* Ribbed Collar */}
                      <path d="M124 36 C140 54, 200 54, 216 36 C202 46, 138 46, 124 36 Z" fill="#E63939" />
                      <path d="M122 35 C142 53, 198 53, 218 35" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                      {/* Natural fabric folds */}
                      <path d="M92 108 C106 122, 112 146, 114 182" stroke="#E63939" strokeWidth="3.5" strokeLinecap="round" opacity="0.4" />
                      <path d="M248 108 C234 122, 228 146, 226 182" stroke="#E63939" strokeWidth="3.5" strokeLinecap="round" opacity="0.4" />
                      {/* Logo printed on T-Shirt Chest */}
                      <g transform="translate(136, 98) scale(0.66)">
                        <circle cx="22" cy="24" r="9" stroke="#ffffff" strokeWidth="4" />
                        <circle cx="42" cy="24" r="9" stroke="#ffffff" strokeWidth="4" />
                        <circle cx="23" cy="23" r="3.5" fill="#ffffff" />
                        <circle cx="41" cy="23" r="3.5" fill="#ffffff" />
                        <path d="M27 34 C30 38, 34 38, 37 34" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
                        <path d="M14 44 C10 50, 14 58, 20 58 C26 58, 25 50, 31 50 C37 50, 36 58, 42 58 C48 58, 47 50, 52 50" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
                        <text x="68" y="38" fill="#ffffff" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="24" letterSpacing="-0.5">abc</text>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Billboard & Mascot */}
            <div className="setup-bento-col bento-col-center">
              {/* Box 5: Coral Red Brand Card (Center) */}
              <div className="setup-bento-box bento-coral-brand">
                <div className="bento-brand-content">
                  <div className="bento-mascot-icon">
                    <svg width="74" height="74" viewBox="0 0 100 100" fill="none">
                      <circle cx="34" cy="38" r="16" stroke="#ffffff" strokeWidth="6" fill="#FF4D4D" />
                      <circle cx="66" cy="38" r="16" stroke="#ffffff" strokeWidth="6" fill="#FF4D4D" />
                      <circle cx="36" cy="36" r="6" fill="#ffffff" />
                      <circle cx="64" cy="36" r="6" fill="#ffffff" />
                      <circle cx="39" cy="34" r="2.5" fill="#FF4D4D" />
                      <circle cx="61" cy="34" r="2.5" fill="#FF4D4D" />
                      <path d="M42 54 C47 60, 53 60, 58 54" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
                      <path d="M22 62 C16 70, 20 84, 30 84 C38 84, 36 72, 44 72 C50 72, 48 84, 56 84 C64 84, 62 72, 70 72 C78 72, 76 84, 84 84" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20 48 C12 48, 8 58, 14 66" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h2 className="bento-brand-title">what we do</h2>
                </div>
              </div>

              {/* Box 6: Purple Mascot Card */}
              <div className="setup-bento-box bento-mascot-card">
                <div className="bento-outline-mascot">
                  <svg width="84" height="84" viewBox="0 0 100 100" fill="none">
                    <circle cx="34" cy="38" r="16" stroke="#ffffff" strokeWidth="6" />
                    <circle cx="66" cy="38" r="16" stroke="#ffffff" strokeWidth="6" />
                    <circle cx="36" cy="36" r="6" fill="#ffffff" />
                    <circle cx="64" cy="36" r="6" fill="#ffffff" />
                    <path d="M42 54 C47 60, 53 60, 58 54" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
                    <path d="M22 62 C16 70, 20 84, 30 84 C38 84, 36 72, 44 72 C50 72, 48 84, 56 84 C64 84, 62 72, 70 72 C78 72, 76 84, 84 84" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 48 C12 48, 8 58, 14 66" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Column 3: Coral Card with Distinctive Service Pills */}
            <div className="setup-bento-col bento-col-right">
              {/* Box 7: Solid Coral Red Card with Multi-Style Service Pills */}
              <div className="setup-bento-box bento-pills-card">
                <div className="bento-pills-list">
                  {/* Pill 1: White Clean Pill */}
                  <a href="#contact" className="bento-service-pill pill-start">
                    <span>Company Formation</span>
                  </a>

                  {/* Pill 2: Vibrant Neon Green Pill */}
                  <a href="#contact" className="bento-service-pill pill-modify">
                    <span>Modify a Business</span>
                  </a>

                  {/* Pill 3: Pitch Black Onyx Pill */}
                  <a href="#contact" className="bento-service-pill pill-accountancy">
                    <span>Accountancy</span>
                  </a>

                  {/* Pill 4: Lavender Violet Pill */}
                  <a href="#contact" className="bento-service-pill pill-accomodation">
                    <span>Accomodation</span>
                  </a>

                  {/* Pill 5: Crisp White Monospace / Bold Pill */}
                  <a href="#contact" className="bento-service-pill pill-licensing">
                    <span>Licensing</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          "Your Business. Your Brand. Your Website." Showcase Section
          ------------------------------------------------------------------ */}
      <section className="setup-websites-section" id="best-websites">
        <div className="setup-websites-container">
          {/* Left Column: Top-Left Title & Bottom-Left Tagline */}
          <div className="setup-websites-left-col">
            <div className="setup-websites-top-left">
              <h2 className="setup-websites-title">
                Your Business.<br />
                Your Brand.<br />
                Your Website.
              </h2>
            </div>

            {/* Bottom-Left Corner Tagline */}
            <div className="setup-websites-bottom-left">
              <p className="setup-websites-tagline">
                &ldquo;Creating a{" "}
                <span
                  className="setup-digital-presence-text"
                  style={{
                    color: sampleWebsites[activeWebIndex]?.themeColor || "#16a34a",
                  }}
                >
                  digital presence
                </span>{" "}
                that speaks for your{" "}
                <span className="setup-business-highlight">business.</span>&rdquo;
              </p>
            </div>
          </div>

          {/* Layered Website Cards Overflowing Bottom-Right Corner */}
          <div className="setup-websites-deck-wrap" aria-label="Websites Showcase">
            {sampleWebsites.map((web, idx) => {
              const isFading = idx === fadingIndex;
              const offset = (idx - activeWebIndex + sampleWebsites.length) % sampleWebsites.length;

              return (
                <div
                  key={web.src}
                  className={`setup-layered-card ${isFading ? "card-fading-out" : `layer-${offset}`}`}
                  aria-hidden={offset !== 0 && !isFading}
                >
                  <div className="setup-card-inner">
                    <Image
                      src={web.src}
                      alt={web.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 860px"
                      priority={idx === 0}
                      className="setup-layered-card-img"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          "Your Business, One Click Away" Split Showcase Section (with 3D Flip Form)
          ------------------------------------------------------------------ */}
      <section className="setup-oneclick-section" id="one-click-away">
        <div className="setup-oneclick-container">
          {/* Left Card: White Card with Bold Typography & Enquiry Button */}
          <div className="setup-oneclick-card oneclick-left-card">
            <div className="oneclick-copy-wrap">
              <h2 className="oneclick-heading">
                Your Business,<br />
                One Click<br />
                Away
              </h2>
            </div>

            <div className="oneclick-actions">
              <button
                type="button"
                onClick={() => {
                  setIsFlipped((prev) => !prev);
                  if (!isFlipped) {
                    setTimeout(() => {
                      document.getElementById("oneclick-client-name")?.focus();
                    }, 450);
                  }
                }}
                className={`oneclick-enquiry-pill-btn ${isFlipped ? "is-active" : ""}`}
                aria-label="Open Business Enquiry Form"
              >
                <span>{isFlipped ? "Show Illustration" : "Enquiry"}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="enquiry-arrow-icon"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Card: 3D Horizontal Flip Card (Front: Illustration | Back: Enquiry Form) */}
          <div className="oneclick-flip-container">
            <div className={`oneclick-flip-card ${isFlipped ? "is-flipped" : ""}`}>
              {/* Front Face: Coral Red Card with Illustrated Founder Workstation */}
              <div className="oneclick-card-face oneclick-card-front">
                <div className="oneclick-illus-wrap">
                  <svg className="oneclick-svg" viewBox="0 0 580 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Scattered playful doodles */}
                    <g className="oneclick-doodle" opacity="0.8">
                      <path d="M 480 110 Q 486 106 492 110 T 504 110" stroke="#09090b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                      <path d="M 65 240 Q 71 236 77 240 T 89 240" stroke="#09090b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                      <path d="M 480 420 Q 486 416 492 420 T 504 420" stroke="#09090b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                      <path d="M 70 430 Q 76 426 82 430 T 94 430" stroke="#09090b" strokeWidth="1.8" fill="none" strokeLinecap="round" />

                      <circle cx="110" cy="110" r="4.5" stroke="#09090b" strokeWidth="1.6" fill="none" />
                      <circle cx="440" cy="115" r="3.5" stroke="#09090b" strokeWidth="1.6" fill="none" />
                      <circle cx="75" cy="370" r="4" stroke="#09090b" strokeWidth="1.6" fill="none" />
                      <circle cx="510" cy="280" r="3.5" stroke="#09090b" strokeWidth="1.6" fill="none" />

                      <path d="M 104 220 L 112 220 M 108 216 L 108 224" stroke="#09090b" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M 495 210 L 503 210 M 499 206 L 499 214" stroke="#09090b" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M 515 350 L 523 350 M 519 346 L 519 354" stroke="#09090b" strokeWidth="1.6" strokeLinecap="round" />
                      <circle cx="68" cy="300" r="1.8" fill="#09090b" />
                      <circle cx="405" cy="98" r="1.8" fill="#09090b" />
                      <circle cx="515" cy="460" r="1.8" fill="#09090b" />
                    </g>

                    {/* Top Right: Black Wall Tech Display Dashboard */}
                    <g className="oneclick-wall-display">
                      <rect x="445" y="130" width="100" height="66" rx="8" fill="#09090b" />
                      <rect x="455" y="140" width="30" height="46" rx="4" fill="#ffffff" />
                      <rect x="493" y="140" width="18" height="18" rx="4" fill="#8B5CF6" />
                      <rect x="493" y="166" width="40" height="15" rx="4" fill="#ffffff" />
                    </g>

                    {/* Top Left: Floating Idea Bubble with Lightbulb */}
                    <g className="oneclick-idea-bubble">
                      <rect x="150" y="128" width="86" height="52" rx="14" fill="#ffffff" />
                      <polygon points="215,168 238,178 220,158" fill="#ffffff" />

                      <g className="oneclick-lightbulb">
                        <path
                          d="M 188 144 C 185 147.5, 185 151, 187 154 L 187 158 L 199 158 L 199 154 C 201 151, 201 147.5, 198 144 C 195 140.5, 191 140.5, 188 144 Z"
                          fill="#FEF08A"
                          stroke="#09090b"
                          strokeWidth="2.2"
                        />
                        <rect x="190" y="158" width="6" height="3" rx="1" fill="#09090b" />
                        <line x1="191" y1="151" x2="195" y2="151" stroke="#09090b" strokeWidth="1.6" />
                        <line x1="193" y1="136" x2="193" y2="133" stroke="#09090b" strokeWidth="2" strokeLinecap="round" />
                        <line x1="184" y1="139" x2="181" y2="136" stroke="#09090b" strokeWidth="2" strokeLinecap="round" />
                        <line x1="202" y1="139" x2="205" y2="136" stroke="#09090b" strokeWidth="2" strokeLinecap="round" />
                        <line x1="179" y1="148" x2="175" y2="148" stroke="#09090b" strokeWidth="2" strokeLinecap="round" />
                        <line x1="207" y1="148" x2="211" y2="148" stroke="#09090b" strokeWidth="2" strokeLinecap="round" />
                      </g>
                    </g>

                    {/* Modern Desk & Structure */}
                    <g className="oneclick-desk">
                      <rect x="80" y="270" width="430" height="6" rx="3" fill="#09090b" />

                      <line x1="95" y1="276" x2="70" y2="405" stroke="#09090b" strokeWidth="3" strokeLinecap="round" />
                      <line x1="135" y1="276" x2="180" y2="405" stroke="#09090b" strokeWidth="2" strokeLinecap="round" />
                      <line x1="78" y1="355" x2="150" y2="355" stroke="#09090b" strokeWidth="1.6" strokeLinecap="round" />

                      <line x1="495" y1="276" x2="520" y2="405" stroke="#09090b" strokeWidth="3" strokeLinecap="round" />
                      <line x1="455" y1="276" x2="430" y2="405" stroke="#09090b" strokeWidth="2" strokeLinecap="round" />
                      <line x1="440" y1="355" x2="512" y2="355" stroke="#09090b" strokeWidth="1.6" strokeLinecap="round" />
                    </g>

                    {/* Laptops on Desk */}
                    <g className="oneclick-tech-setup">
                      <g className="oneclick-purple-laptop">
                        <polyline points="132,270 142,250 208,250 216,270" fill="none" stroke="#09090b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <polygon points="124,196 204,196 220,250 140,250" fill="#8B5CF6" stroke="#09090b" strokeWidth="3" strokeLinejoin="round" />
                        <circle cx="172" cy="223" r="6.5" fill="#ffffff" />
                      </g>

                      <g className="oneclick-black-laptop">
                        <line x1="380" y1="270" x2="465" y2="270" stroke="#09090b" strokeWidth="3" strokeLinecap="round" />
                        <polygon points="390,224 456,224 464,270 384,270" fill="#09090b" stroke="#09090b" strokeWidth="2.5" strokeLinejoin="round" />
                        <circle cx="422" cy="247" r="4.5" fill="#ffffff" />
                      </g>
                    </g>

                    {/* Seated Founder Character */}
                    <g className="oneclick-character-body">
                      <rect x="310" y="328" width="95" height="10" rx="4" fill="#09090b" />
                      <line x1="358" y1="338" x2="358" y2="398" stroke="#09090b" strokeWidth="4" strokeLinecap="round" />
                      <line x1="335" y1="398" x2="380" y2="398" stroke="#09090b" strokeWidth="4" strokeLinecap="round" />

                      <path
                        d="M 315 285 C 310 320, 312 355, 360 355 L 372 355 L 368 402 L 342 402 L 334 345 L 315 330 Z"
                        fill="#09090b"
                        stroke="#09090b"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 368 285 L 410 285 C 418 320, 416 360, 404 398 L 380 398 L 386 352 L 358 348 Z"
                        fill="#09090b"
                        stroke="#09090b"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />

                      <rect x="342" y="396" width="14" height="10" fill="#ffffff" stroke="#09090b" strokeWidth="2" />
                      <path
                        d="M 338 406 L 370 406 C 374 406, 376 410, 374 416 L 336 416 C 334 412, 336 406, 338 406 Z"
                        fill="#ffffff"
                        stroke="#09090b"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                      <line x1="335" y1="416" x2="375" y2="416" stroke="#09090b" strokeWidth="2.5" />

                      <rect x="380" y="394" width="14" height="10" fill="#ffffff" stroke="#09090b" strokeWidth="2" />
                      <path
                        d="M 376 404 L 412 404 C 416 404, 418 408, 416 414 L 374 414 C 372 410, 374 404, 376 404 Z"
                        fill="#ffffff"
                        stroke="#09090b"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                      <line x1="373" y1="414" x2="417" y2="414" stroke="#09090b" strokeWidth="2.5" />

                      <path
                        d="M 310 208 C 304 240, 305 272, 360 272 C 395 272, 404 240, 398 208 C 388 198, 324 198, 310 208 Z"
                        fill="#ffffff"
                        stroke="#09090b"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                      <g fill="#CBD5E1" opacity="0.7">
                        <circle cx="335" cy="220" r="1.5" />
                        <circle cx="350" cy="218" r="1.5" />
                        <circle cx="365" cy="222" r="1.5" />
                        <circle cx="330" cy="236" r="1.5" />
                        <circle cx="348" cy="234" r="1.5" />
                        <circle cx="366" cy="238" r="1.5" />
                        <circle cx="338" cy="252" r="1.5" />
                        <circle cx="356" cy="250" r="1.5" />
                        <circle cx="374" cy="254" r="1.5" />
                      </g>

                      <path d="M 344 204 C 348 210, 360 210, 364 204" stroke="#09090b" strokeWidth="2.2" fill="none" />

                      <path
                        d="M 316 218 C 305 244, 308 268, 345 268 L 350 258"
                        fill="#ffffff"
                        stroke="#09090b"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                      <ellipse cx="350" cy="266" rx="9" ry="5.5" fill="#38BDF8" stroke="#09090b" strokeWidth="2" />

                      <path
                        d="M 375 210 C 392 204, 400 220, 394 246 L 378 246"
                        fill="#ffffff"
                        stroke="#09090b"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                      <path d="M 384 192 C 388 184, 398 184, 398 192" fill="#38BDF8" stroke="#09090b" strokeWidth="2" />

                      <rect
                        x="386"
                        y="158"
                        width="18"
                        height="38"
                        rx="5"
                        transform="rotate(12 395 177)"
                        fill="#0284c7"
                        stroke="#09090b"
                        strokeWidth="2.5"
                      />

                      <rect x="346" y="188" width="18" height="16" fill="#38BDF8" stroke="#09090b" strokeWidth="2.5" />
                      <circle cx="355" cy="174" r="18" fill="#38BDF8" stroke="#09090b" strokeWidth="2.5" />
                      <path d="M 346 179 Q 355 188 364 179" fill="#ffffff" stroke="#09090b" strokeWidth="2.2" strokeLinecap="round" />

                      <circle cx="346" cy="171" r="7" stroke="#09090b" strokeWidth="2.5" fill="none" />
                      <circle cx="364" cy="171" r="7" stroke="#09090b" strokeWidth="2.5" fill="none" />
                      <line x1="353" y1="170" x2="357" y2="170" stroke="#09090b" strokeWidth="2.5" />

                      <path
                        d="M 338 164 C 338 143, 372 143, 372 164 Z"
                        fill="#ffffff"
                        stroke="#09090b"
                        strokeWidth="2.5"
                      />
                      <line x1="335" y1="164" x2="375" y2="164" stroke="#09090b" strokeWidth="3.5" strokeLinecap="round" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Back Face: Coral Red Card with Enquiry Form */}
              <div className="oneclick-card-face oneclick-card-back">
                {submitted ? (
                  <div className="oneclick-form-success">
                    <div className="oneclick-success-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="oneclick-success-title">Enquiry Received!</h3>
                    <p className="oneclick-success-desc">
                      Thank you, <strong>{name}</strong>. Your enquiry has been sent to our Abu Dhabi formation specialists. We will contact you shortly.
                    </p>
                    <div className="oneclick-success-actions">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="oneclick-success-reset-btn"
                      >
                        Submit Another Enquiry
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsFlipped(false)}
                        className="oneclick-success-back-btn"
                      >
                        ← Back to Showcase
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="oneclick-form-wrap">
                    <div className="oneclick-form-header">
                      <div>
                        <span className="oneclick-form-badge">QUICK INQUIRY</span>
                        <h3 className="oneclick-form-title">Business Formation Enquiry</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsFlipped(false)}
                        className="oneclick-flip-close-btn"
                        title="Close & Flip Back"
                        aria-label="Close form"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>

                    {error && (
                      <div className="oneclick-form-error">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleEnquirySubmit} className="oneclick-form-fields">
                      {/* Name of Business or Individual */}
                      <div className="oneclick-field-group">
                        <label htmlFor="oneclick-client-name" className="oneclick-field-label">
                          Name of Business or Individual *
                        </label>
                        <input
                          id="oneclick-client-name"
                          type="text"
                          className="oneclick-field-input"
                          placeholder="e.g. Al Reem Commercial LLC or Tariq Al Mansoori"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>

                      {/* Contact Information */}
                      <div className="oneclick-contact-row">
                        <div className="oneclick-field-group">
                          <label htmlFor="oneclick-client-phone" className="oneclick-field-label">
                            Phone / WhatsApp *
                          </label>
                          <input
                            id="oneclick-client-phone"
                            type="tel"
                            className="oneclick-field-input"
                            placeholder="+971 50 123 4567"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>

                        <div className="oneclick-field-group">
                          <label htmlFor="oneclick-client-email" className="oneclick-field-label">
                            Email Address *
                          </label>
                          <input
                            id="oneclick-client-email"
                            type="email"
                            className="oneclick-field-input"
                            placeholder="founder@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Enquiry Note */}
                      <div className="oneclick-field-group">
                        <label htmlFor="oneclick-client-notes" className="oneclick-field-label">
                          Enquiry Note
                        </label>
                        <textarea
                          id="oneclick-client-notes"
                          className="oneclick-field-textarea"
                          placeholder="Mention your preferred activity, mainland/free zone preference, or questions..."
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="oneclick-form-submit-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span>Sending Enquiry...</span>
                        ) : (
                          <>
                            <span>Submit Enquiry</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
