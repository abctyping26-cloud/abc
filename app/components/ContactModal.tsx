"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHONE_NUMBER = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+971 2 642 7667";
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE_DISPLAY ||
  process.env.NEXT_PUBLIC_CONTACT_PHONE ||
  PHONE_NUMBER;
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

          {/* 2. WhatsApp Number */}
          <div
            className="contact-text-item"
            onMouseEnter={() => handleMouseEnter("whatsapp")}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCopy(WHATSAPP_NUMBER, "whatsapp")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCopy(WHATSAPP_NUMBER, "whatsapp");
              }
            }}
            title="Click to copy WhatsApp number"
          >
            <span className="contact-text-label">
              WhatsApp {copiedField === "whatsapp" && <span className="mobile-copied-tag">Copied!</span>}
            </span>
            <span className="contact-text-value">{WHATSAPP_NUMBER}</span>
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
