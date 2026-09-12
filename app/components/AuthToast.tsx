"use client";

import React, { useEffect, useState } from "react";

interface ToastData {
  title: string;
  message: string;
  isNewUser?: boolean;
}

export default function AuthToast() {
  const [toast, setToast] = useState<ToastData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if there is a pending toast stored from login navigation
    const checkStoredToast = () => {
      try {
        const stored = sessionStorage.getItem("abc_auth_toast");
        if (stored) {
          const parsed = JSON.parse(stored) as ToastData;
          sessionStorage.removeItem("abc_auth_toast");
          show(parsed);
        }
      } catch {
        // Ignore storage errors
      }
    };

    // Listen for dynamic toast events
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<ToastData>;
      if (customEvent.detail) {
        show(customEvent.detail);
      }
    };

    checkStoredToast();
    window.addEventListener("abc:toast", handleToastEvent);

    return () => {
      window.removeEventListener("abc:toast", handleToastEvent);
    };
  }, []);

  const show = (data: ToastData) => {
    setToast(data);
    setTimeout(() => setIsVisible(true), 40);

    // Auto-dismiss after 3.5 seconds
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setToast(null), 300);
    }, 3500);
  };

  if (!toast) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 99999,
        display: "inline-flex",
        alignItems: "center",
        padding: "9px 18px",
        backgroundColor: "#ffffff",
        color: "#000000",
        border: "1px solid #18181b",
        borderRadius: "8px",
        fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: "0.86rem",
        fontWeight: 500,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
        transform: isVisible ? "translateY(0)" : "translateY(-10px)",
        opacity: isVisible ? 1 : 0,
        transition: "transform 0.25s ease, opacity 0.25s ease",
        pointerEvents: "none",
      }}
    >
      <span>
        {toast.isNewUser ? `Account created · ${toast.message}` : toast.message}
      </span>
    </div>
  );
}
