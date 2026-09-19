"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceDetail } from "../data/servicesData";
import BusinessSetupDetailView from "./BusinessSetupDetailView";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "../utils/whatsapp";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ServiceDetailViewProps {
  service: ServiceDetail;
  isTemplateMode?: boolean;
}

export default function ServiceDetailView({
  service,
  isTemplateMode = false,
}: ServiceDetailViewProps) {
  // Delegate business setup & company formation offerings to specialized corporate view
  if (
    service.slug === "business-setup-services" ||
    service.slug === "company-formation-services"
  ) {
    return (
      <BusinessSetupDetailView
        service={service}
        isTemplateMode={isTemplateMode}
      />
    );
  }

  // Interactive Document Checklist State
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});

  const toggleDoc = (index: number) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // FAQ Accordion State (first item open by default)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // Enquiry Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    if (!cleanName || !cleanEmail || !cleanPhone) {
      setError("Please fill in your name, email, and phone number.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const now = new Date();
    const enquiryPayload = {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      service: service.name,
      otherService: notes.trim() ? `[Service Page Note]: ${notes.trim()}` : undefined,
      submittedAt: now.toISOString(),
    };

    try {
      // 1. Send to Express Backend API (MongoDB 'enquiry' collection)
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

      // 2. Mirror to LocalStorage abc_enquiries for instant local dev & cross-port parity
      try {
        const stored = localStorage.getItem("abc_enquiries");
        const list = stored ? JSON.parse(stored) : [];
        const localItem = {
          _id: "enq_" + Date.now(),
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          service: service.name,
          otherService: notes.trim() ? `[Service Page Note]: ${notes.trim()}` : undefined,
          status: "pending",
          submittedAt: now.toISOString(),
          createdAt: now.toISOString(),
        };
        localStorage.setItem("abc_enquiries", JSON.stringify([localItem, ...list]));
        window.dispatchEvent(new Event("abc_enquiries_updated"));
      } catch {
        // Ignore storage errors
      }

      setSubmitted(true);
    } catch {
      setError("An error occurred while submitting your enquiry. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetEnquiry = () => {
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setSubmitted(false);
    setError(null);
  };

  const scrollToEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("client-name");
    if (el) {
      el.focus();
    }
  };

  const isTemplate = isTemplateMode || service.slug === "template";

  return (
    <div className="service-page-wrapper">
      {/* ------------------------------------------------------------------
          Top Navigation Bar (Brand logo + Contact CTAs)
          ------------------------------------------------------------------ */}
      <header className="service-top-navbar">
        <div className="service-nav-container">
          <div className="service-nav-left">
            <Link href="/" className="service-nav-brand" aria-label="ABC Typing Home">
              <span className="service-nav-brand-text">abc</span>
              <span className="service-nav-brand-dot" aria-hidden="true" />
            </Link>
          </div>

          <div className="service-nav-right">
            <a href="tel:+97140000000" className="service-nav-call" title="Call our PRO Office">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>+971 4 000 0000</span>
            </a>

            <a href="#enquiry-card" onClick={scrollToEnquiry} className="service-nav-cta">
              <span>Book Consultation</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------
          Template Mode Banner (Shown on /services/template)
          ------------------------------------------------------------------ */}
      {isTemplate && (
        <aside className="service-template-banner" aria-label="Template Preview Notice">
          <div className="service-template-banner-inner">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="service-template-badge">Template Preview</span>
              <span>
                This is the standard Service Details Blueprint. Clicking any service in the main Services section uses this layout.
              </span>
            </div>
            <Link
              href="/#services"
              style={{ color: "#ffffff", textDecoration: "underline", fontSize: "0.82rem", fontWeight: 600 }}
            >
              Test with Live Services →
            </Link>
          </div>
        </aside>
      )}

      {/* ------------------------------------------------------------------
          Hero Header Section (Breadcrumbs + Category Kicker + Title + Tagline)
          ------------------------------------------------------------------ */}
      <section className="service-header-section">
        <div className="service-header-container">
          {/* Breadcrumbs */}
          <nav className="service-breadcrumb" aria-label="Breadcrumbs">
            <Link href="/">Home</Link>
            <span className="service-breadcrumb-sep">/</span>
            <Link href="/#services">Services</Link>
            <span className="service-breadcrumb-sep">/</span>
            <span>{service.category.name}</span>
            <span className="service-breadcrumb-sep">/</span>
            <span className="service-breadcrumb-current">{service.name}</span>
          </nav>

          {/* Category Kicker */}
          <div className="service-category-kicker">
            <span aria-hidden="true">●</span>
            <span>{service.category.name}</span>
          </div>

          {/* Main Title & Tagline */}
          <h1 className="service-main-title">{service.name}</h1>
          <p className="service-main-tagline">{service.tagline}</p>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          Main Content Section (Split: 65% Guide | 35% Fixed FAST INQUIRY)
          ------------------------------------------------------------------ */}
      <section className="service-content-section">
        <div className="service-content-container">
          {/* ==============================================================
              LEFT COLUMN: Comprehensive Service Guide
              ============================================================== */}
          <main className="service-main-col">
            {/* 1. Required Documents Checklist */}
            <section className="service-docs-block">
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "18px" }}>
                <div>
                  <span className="service-block-kicker">CHECKLIST</span>
                  <h2 className="service-block-heading" style={{ marginBottom: 0 }}>
                    Required Documentation
                  </h2>
                </div>
                <span style={{ fontSize: "0.82rem", color: "#71717a" }}>
                  Click items to mark what you have ready
                </span>
              </div>

              <div className="service-docs-container">
                {service.requiredDocuments.map((doc, idx) => {
                  const isChecked = !!checkedDocs[idx];
                  return (
                    <div
                      key={idx}
                      className={`service-doc-card ${isChecked ? "is-checked" : ""}`}
                      onClick={() => toggleDoc(idx)}
                      role="checkbox"
                      aria-checked={isChecked}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          toggleDoc(idx);
                        }
                      }}
                    >
                      <div className="service-doc-main">
                        <div className="service-doc-checkbox" aria-hidden="true">
                          {isChecked && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <h3 className="service-doc-title">{doc.title}</h3>
                          <p className="service-doc-desc">{doc.description}</p>
                        </div>
                      </div>
                      <span className={`service-doc-badge ${doc.mandatory ? "mandatory" : "optional"}`}>
                        {doc.mandatory ? "Mandatory" : "Optional"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 3. Frequently Asked Questions */}
            {service.faqs && service.faqs.length > 0 && (
              <section className="service-faq-block">
                <span className="service-block-kicker">COMMON QUESTIONS</span>
                <h2 className="service-block-heading">Frequently Asked Questions</h2>
                <div className="service-faq-accordion">
                  {service.faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx} className={`service-faq-item ${isOpen ? "is-open" : ""}`}>
                        <button
                          type="button"
                          className="service-faq-question"
                          onClick={() => toggleFaq(idx)}
                          aria-expanded={isOpen}
                        >
                          <span>{faq.question}</span>
                          <svg
                            className="service-faq-chevron"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="service-faq-answer">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </main>

          {/* ==============================================================
              RIGHT COLUMN: Fixed FAST INQUIRY Box
              ============================================================== */}
          <aside className="service-sidebar">
            {/* Direct WhatsApp Quick Chat */}
            <a
              href={getWhatsAppUrl(
                WHATSAPP_MESSAGES.serviceDetail(service.name, service.category?.name)
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="service-whatsapp-direct"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.54 1.83.822 2.796.822 3.182 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.808-5.768-5.808zm3.387 8.248c-.145.409-.726.772-1.025.808-.299.037-.687.054-2.222-.596-1.536-.65-2.531-2.247-2.607-2.351-.076-.104-.627-.834-.627-1.591 0-.756.398-1.127.538-1.282.141-.155.308-.194.411-.194.103 0 .205.001.296.006.095.005.223-.036.349.266.126.302.431 1.05.469 1.127.038.077.064.168.013.272-.051.104-.077.168-.154.259-.077.091-.162.203-.231.272-.077.077-.157.16-.068.314.089.154.397.656.852 1.061.585.521 1.079.682 1.233.759.154.077.244.064.334-.038.09-.103.385-.448.487-.602.103-.154.205-.129.346-.077.141.051.898.423 1.052.5.154.077.256.116.295.18.038.064.038.372-.107.781z" />
              </svg>
              <span>Chat Directly on WhatsApp</span>
            </a>

            <div className="service-enquiry-card" id="enquiry-card">
              <div className="service-enquiry-header">
                <span className="service-enquiry-kicker">FAST INQUIRY</span>
                <h3 className="service-enquiry-title">Enquire for This Service</h3>
                <p className="service-enquiry-subtitle">
                  Our PRO team responds within 15 minutes during UAE working hours.
                </p>
              </div>

              {submitted ? (
                <div className="service-enquiry-success">
                  <div className="service-success-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h4 className="service-success-title">Enquiry Submitted!</h4>
                  <p className="service-success-desc">
                    Thank you, <strong>{name}</strong>. We received your request regarding <strong>{service.name}</strong>. A senior PRO officer will contact you shortly.
                  </p>
                  <button type="button" onClick={handleResetEnquiry} className="service-reset-enquiry-btn">
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit}>
                  {error && (
                    <div style={{ color: "#dc2626", fontSize: "0.82rem", marginBottom: "12px", background: "#fef2f2", padding: "8px 12px", borderRadius: "6px" }}>
                      {error}
                    </div>
                  )}

                  <div className="service-form-group">
                    <label className="service-form-label">Service Name</label>
                    <input
                      type="text"
                      className="service-form-input"
                      value={service.name}
                      disabled
                      aria-readonly="true"
                    />
                  </div>

                  <div className="service-form-group">
                    <label className="service-form-label" htmlFor="client-name">
                      Full Name *
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      className="service-form-input"
                      placeholder="e.g. Mohammed Al Mansoori"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="service-form-group">
                    <label className="service-form-label" htmlFor="client-phone">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      id="client-phone"
                      type="tel"
                      className="service-form-input"
                      placeholder="+971 50 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="service-form-group">
                    <label className="service-form-label" htmlFor="client-email">
                      Email Address *
                    </label>
                    <input
                      id="client-email"
                      type="email"
                      className="service-form-input"
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="service-form-group">
                    <label className="service-form-label" htmlFor="client-notes">
                      Specific Requirements / Notes (Optional)
                    </label>
                    <textarea
                      id="client-notes"
                      className="service-form-textarea"
                      placeholder="Mention any existing visa status, company type, or urgent deadlines..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="service-form-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
