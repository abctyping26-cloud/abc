"use client";

import React, { useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const SERVICE_LABELS: Record<string, string> = {
  "business-setup": "Business Setup & Formation",
  "trade-license": "Trade License Cancellation & Renewal",
  "golden-visa": "Golden Visa & Residency Services",
  "attestation": "Certificate Attestation & Legal Translation",
  "tax-vat": "Corporate Tax, VAT & Accounting",
  "police-clearance": "Police Clearance & Approvals",
  "other": "Other",
};

export default function EnquirySection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [otherService, setOtherService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionTime, setSubmissionTime] = useState<string>("");
  const [submittedService, setSubmittedService] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    if (!cleanName || !cleanEmail || !cleanPhone || !service) {
      return;
    }
    if (service === "other" && !otherService.trim()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const cleanOther = otherService.trim();
    const resolvedServiceName =
      service === "other"
        ? (cleanOther ? `Other: ${cleanOther}` : "Custom Service")
        : (SERVICE_LABELS[service] || service);

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const fullTimeString = `${formattedDate} at ${formattedTime}`;

    const enquiryPayload = {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      service: resolvedServiceName,
      otherService: cleanOther || undefined,
      submittedAt: now.toISOString(),
    };

    try {
      // 1. Send to Express Backend API
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
          service: resolvedServiceName,
          otherService: cleanOther || undefined,
          status: "pending",
          submittedAt: now.toISOString(),
          createdAt: now.toISOString(),
        };
        const updated = [localItem, ...list];
        localStorage.setItem("abc_enquiries", JSON.stringify(updated));
        window.dispatchEvent(new Event("abc_enquiries_updated"));
      } catch {
        // Ignore storage errors
      }

      setSubmissionTime(fullTimeString);
      setSubmittedService(resolvedServiceName);
      setSubmitted(true);
    } catch {
      setError("Unable to submit enquiry. Please try again or reach us via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setService("");
    setOtherService("");
    setSubmitted(false);
    setSubmissionTime("");
    setSubmittedService("");
    setError(null);
  };

  return (
    <section className="enquiry-section" id="enquiry">
      <div className="container">
        <div className="enquiry-layout">
          {/* Left Column: Title & Enquiry Form */}
          <div className="enquiry-left-col" data-aos="fade-right" data-aos-duration="800">
            <h2 className="enquiry-title">Enquiry</h2>

            {submitted ? (
              <div className="enquiry-success-box">
                <div className="enquiry-success-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="enquiry-success-title">Enquiry Received</h3>
                
                {/* Submission Timestamp Badge */}
                {submissionTime && (
                  <div className="enquiry-time-badge">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>Submitted on {submissionTime}</span>
                  </div>
                )}

                <p className="enquiry-success-desc">
                  Thank you, <strong>{name}</strong>! We have dispatched your request for{" "}
                  <strong>{submittedService}</strong>. Our legal specialists will reach out to you at{" "}
                  <strong>{phone}</strong> or <strong>{email}</strong> shortly.
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="enquiry-reset-btn"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="enquiry-form">
                {error && (
                  <div style={{ color: "#b91c1c", fontSize: "0.85rem", fontWeight: 500 }}>
                    {error}
                  </div>
                )}

                <div className="enquiry-field-group">
                  <label htmlFor="enquiry-name" className="enquiry-label">
                    Full Name
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="enquiry-input"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="enquiry-field-group">
                  <label htmlFor="enquiry-email" className="enquiry-label">
                    Email Address
                  </label>
                  <input
                    id="enquiry-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="enquiry-input"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="enquiry-field-group">
                  <label htmlFor="enquiry-phone" className="enquiry-label">
                    Phone Number
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50 000 0000"
                    className="enquiry-input"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="enquiry-field-group">
                  <label htmlFor="enquiry-service" className="enquiry-label">
                    Service Required
                  </label>
                  <div className="enquiry-select-wrapper">
                    <select
                      id="enquiry-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="enquiry-select"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="" disabled>
                        Select a service...
                      </option>
                      <option value="business-setup">Business Setup &amp; Formation</option>
                      <option value="trade-license">Trade License Cancellation &amp; Renewal</option>
                      <option value="golden-visa">Golden Visa &amp; Residency Services</option>
                      <option value="attestation">Certificate Attestation &amp; Legal Translation</option>
                      <option value="tax-vat">Corporate Tax, VAT &amp; Accounting</option>
                      <option value="police-clearance">Police Clearance &amp; Approvals</option>
                      <option value="other">Other (Specify)</option>
                    </select>
                    <span className="enquiry-select-arrow" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Conditional "Other" Input Field */}
                {service === "other" && (
                  <div className="enquiry-field-group enquiry-field-animate">
                    <label htmlFor="enquiry-other" className="enquiry-label">
                      Specify Service
                    </label>
                    <input
                      id="enquiry-other"
                      type="text"
                      value={otherService}
                      onChange={(e) => setOtherService(e.target.value)}
                      placeholder="Please specify the service you need"
                      className="enquiry-input"
                      required
                      autoFocus
                      disabled={isSubmitting}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="enquiry-submit-btn"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? "Submitting..." : "Submit Enquiry"}</span>
                  <svg
                    className="enquiry-submit-arrow"
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
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Us on WhatsApp Capsule Only */}
          <div className="enquiry-right-col" data-aos="fade-left" data-aos-duration="800">
            <a
              href="https://wa.me/971500000000?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="enquiry-whatsapp-capsule"
              title="Contact us on WhatsApp"
            >
              <svg
                className="enquiry-whatsapp-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Contact us on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
