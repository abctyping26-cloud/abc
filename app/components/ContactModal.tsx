"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { getWhatsAppUrl, DEFAULT_WHATSAPP_PHONE } from "../utils/whatsapp";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHONE_NUMBER = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+971 2 642 7667";
const WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE || DEFAULT_WHATSAPP_PHONE || "971543078430";
const EMAIL_ADDRESS = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@abctyping.ae";

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [mounted, setMounted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    visible: false,
    text: "Copy",
  });

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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursor((prev) => ({
      ...prev,
      x: e.clientX,
      y: e.clientY,
    }));
  }, []);

  const handleMouseEnter = useCallback(
    (field: string) => {
      setCursor((prev) => ({
        ...prev,
        visible: true,
        text: copiedField === field ? "Copied! ✓" : "Copy",
      }));
    },
    [copiedField]
  );

  const handleMouseLeave = useCallback(() => {
    setCursor((prev) => ({
      ...prev,
      visible: false,
    }));
  }, []);

  const handleCopy = useCallback((text: string, field: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedField(field);
    setCursor((prev) => ({
      ...prev,
      text: "Copied! ✓",
    }));

    setTimeout(() => {
      setCopiedField((prev) => (prev === field ? null : prev));
      setCursor((prev) => ({
        ...prev,
        text: "Copy",
      }));
    }, 1600);
  }, []);

  if (!mounted || !isOpen) return null;

  const whatsappUrl = getWhatsAppUrl(
    "Hello ABC Typing, I am reaching out from your website to enquire about your services.",
    WHATSAPP_PHONE
  );

  return createPortal(
    <div
      className="contact-modal-backdrop"
      onClick={onClose}
      onMouseMove={handleMouseMove}
      role="presentation"
    >
      {/* Floating Cursor Copy Tag */}
      {cursor.visible && (
        <div
          className={`cursor-copy-badge ${cursor.text.includes("Copied") ? "is-copied" : ""}`}
          style={{
            transform: `translate3d(${cursor.x + 12}px, ${cursor.y + 12}px, 0)`,
          }}
        >
          {cursor.text}
        </div>
      )}

      <div
        className="contact-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        {/* Close Button */}
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

        {/* Center Top: ABC Logo */}
        <div className="contact-modal-logo-wrap">
          <span className="hero-logo-text">abc</span>
          <span className="hero-logo-dot" aria-hidden="true" />
        </div>

        {/* Under Logo: Contact Us */}
        <h2 id="contact-modal-title" className="contact-modal-title">
          Contact Us
        </h2>

        {/* Simple Text Items (No box designs) */}
        <div className="contact-modal-text-list">
          {/* 1. Phone Number */}
          <div
            className="contact-text-item"
            onMouseEnter={() => handleMouseEnter("phone")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCopy(PHONE_NUMBER, "phone")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCopy(PHONE_NUMBER, "phone");
              }
            }}
            title="Click to copy phone number"
          >
            <span className="contact-text-label">
              Phone Number {copiedField === "phone" && <span className="mobile-copied-tag">Copied!</span>}
            </span>
            <span className="contact-text-value">{PHONE_NUMBER}</span>
          </div>

          {/* 2. WhatsApp Direct Button */}
          <div
            className="contact-whatsapp-item"
            onMouseEnter={handleMouseLeave}
          >
            <span className="contact-text-label">WhatsApp</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-modal-whatsapp-btn"
              title="Chat on WhatsApp (+971 54 307 8430)"
              aria-label="Chat on WhatsApp"
            >
              <svg
                className="contact-modal-whatsapp-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* 3. Email */}
          <div
            className="contact-text-item"
            onMouseEnter={() => handleMouseEnter("email")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCopy(EMAIL_ADDRESS, "email")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCopy(EMAIL_ADDRESS, "email");
              }
            }}
            title="Click to copy email address"
          >
            <span className="contact-text-label">
              Email {copiedField === "email" && <span className="mobile-copied-tag">Copied!</span>}
            </span>
            <span className="contact-text-value">{EMAIL_ADDRESS}</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
