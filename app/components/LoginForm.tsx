"use client";

import React, { useState } from "react";

export default function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setIdentifier("");
    setPassword("");
  };

  return (
    <div className="login-form-container">
      <div className="login-form-header">
        <h1 className="login-title">Log in to your account</h1>
      </div>

      {submitted ? (
        <div
          style={{
            padding: "24px",
            backgroundColor: "#f8fafc",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#dcfce7",
              color: "#16a34a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#0f172a" }}>
              Signing In...
            </h3>
            <p style={{ fontSize: "0.88rem", color: "#64748b", marginTop: "4px" }}>
              Authenticating credentials for {identifier}.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            style={{
              marginTop: "8px",
              padding: "8px 18px",
              fontSize: "0.85rem",
              fontWeight: 500,
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "9999px",
              cursor: "pointer",
            }}
          >
            Use different account
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email or Phone Number */}
          <div className="login-field">
            <label htmlFor="login-identifier" className="login-label">
              Email or Phone Number
            </label>
            <div className="login-input-wrapper">
              <input
                id="login-identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="name@company.com or +971 50 000 0000"
                className="login-input"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="login-field">
            <div className="login-field-header">
              <label htmlFor="login-password" className="login-label">
                Password
              </label>
              <a href="#forgot" className="login-forgot-link">
                Forgot password?
              </a>
            </div>
            <div className="login-input-wrapper">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="login-input"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-password-toggle"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-submit-btn">
            <span>Sign In</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          {/* Divider */}
          <div className="login-divider">
            <span>or</span>
          </div>

          {/* Google One-Click Login */}
          <button
            type="button"
            className="login-google-btn"
            onClick={() => alert("Redirecting to Google Sign-In...")}
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27A7.18 7.18 0 0 1 4.9 12c0-.79.14-1.57.38-2.27V6.58H1.25A11.97 11.97 0 0 0 0 12c0 1.92.45 3.74 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </form>
      )}
    </div>
  );
}
