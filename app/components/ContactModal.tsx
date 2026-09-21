"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "../utils/whatsapp";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHONE_NUMBER = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+971 2 642 7667";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_DISPLAY || "+971 50 000 0000";
const EMAIL_ADDRESS = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@abctyping.ae";

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [mounted, setMounted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key to close & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const handleCopy = useCallback((text: string, field: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => {
        setCopiedField((prev) => (prev === field ? null : prev));
      }, 1800);
    }
  }, []);

  if (!mounted || !isOpen) return null;

  const cleanPhoneForTel = PHONE_NUMBER.replace(/\s+/g, "");
  const whatsappUrl = getWhatsAppUrl(WHATSAPP_MESSAGES.hero);

  return createPortal(
    <div
      className="contact-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="contact-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        {/* Header */}
        <div className="contact-modal-header">
          <h2 id="contact-modal-title" className="contact-modal-title">
            Contact Us
          </h2>
          <button
            type="button"
            className="contact-modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Contact List */}
        <div className="contact-modal-list">
          {/* 1. Phone Number */}
          <div className="contact-modal-item">
            <a
              href={`tel:${cleanPhoneForTel}`}
              className="contact-item-main"
              title={`Call ${PHONE_NUMBER}`}
            >
              <div className="contact-item-icon-circle phone-icon-circle">
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
              </div>
              <div className="contact-item-info">
                <span className="contact-item-label">Phone Number</span>
                <span className="contact-item-value">{PHONE_NUMBER}</span>
              </div>
            </a>
            <button
              type="button"
              className={`contact-item-copy-btn ${copiedField === "phone" ? "copied" : ""}`}
              onClick={() => handleCopy(PHONE_NUMBER, "phone")}
              aria-label="Copy phone number"
              title="Copy phone number"
            >
              {copiedField === "phone" ? (
                <span className="copied-text">Copied!</span>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>

          {/* 2. WhatsApp */}
          <div className="contact-modal-item">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item-main"
              title={`Chat on WhatsApp ${WHATSAPP_NUMBER}`}
            >
              <div className="contact-item-icon-circle whatsapp-icon-circle">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.54 1.83.822 2.796.822 3.182 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.808-5.768-5.808zm3.387 8.248c-.145.409-.726.772-1.025.808-.299.037-.687.054-2.222-.596-1.536-.65-2.531-2.247-2.607-2.351-.076-.104-.627-.834-.627-1.591 0-.756.398-1.127.538-1.282.141-.155.308-.194.411-.194.103 0 .205.001.296.006.095.005.223-.036.349.266.126.302.431 1.05.469 1.127.038.077.064.168.013.272-.051.104-.077.168-.154.259-.077.091-.162.203-.231.272-.077.077-.157.16-.068.314.089.154.397.656.852 1.061.585.521 1.079.682 1.233.759.154.077.244.064.334-.038.09-.103.385-.448.487-.602.103-.154.205-.129.346-.077.141.051.898.423 1.052.5.154.077.256.116.295.18.038.064.038.372-.107.781z" />
                </svg>
              </div>
              <div className="contact-item-info">
                <span className="contact-item-label">WhatsApp</span>
                <span className="contact-item-value">{WHATSAPP_NUMBER}</span>
              </div>
            </a>
            <button
              type="button"
              className={`contact-item-copy-btn ${copiedField === "whatsapp" ? "copied" : ""}`}
              onClick={() => handleCopy(WHATSAPP_NUMBER, "whatsapp")}
              aria-label="Copy WhatsApp number"
              title="Copy WhatsApp number"
            >
              {copiedField === "whatsapp" ? (
                <span className="copied-text">Copied!</span>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>

          {/* 3. Email */}
          <div className="contact-modal-item">
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="contact-item-main"
              title={`Send Email to ${EMAIL_ADDRESS}`}
            >
              <div className="contact-item-icon-circle email-icon-circle">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="contact-item-info">
                <span className="contact-item-label">Email</span>
                <span className="contact-item-value">{EMAIL_ADDRESS}</span>
              </div>
            </a>
            <button
              type="button"
              className={`contact-item-copy-btn ${copiedField === "email" ? "copied" : ""}`}
              onClick={() => handleCopy(EMAIL_ADDRESS, "email")}
              aria-label="Copy email address"
              title="Copy email address"
            >
              {copiedField === "email" ? (
                <span className="copied-text">Copied!</span>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
