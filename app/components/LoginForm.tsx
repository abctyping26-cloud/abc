"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LoginForm() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+971");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    router.prefetch("/dashboard");
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDigits = phoneDigits.replace(/\D/g, "").replace(/^0+/, "");
    if (!cleanDigits || !password) {
      setError("Please enter your phone number and password/PIN.");
      return;
    }

    const fullPhoneNumber = `${countryCode}${cleanDigits}`;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/client/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: fullPhoneNumber,
          password,
          name: isSignUp ? name.trim() : undefined,
          isSignUp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to log in.");
      }

      if (data.data?.token) {
        localStorage.setItem("abc_client_token", data.data.token);
      }
      if (data.data?.user) {
        localStorage.setItem(
          "abc_client_user",
          JSON.stringify(data.data.user)
        );
      }

      window.dispatchEvent(
        new CustomEvent("abc:toast", {
          detail: {
            title: data.isNewUser ? "Account Created" : "Welcome Back",
            message: `Logged in as ${data.data?.user?.identifier || fullPhoneNumber}`,
          },
        })
      );

      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-header">
        <h1 className="login-title">{isSignUp ? "Create Account" : "Client Login"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="login-form" style={{ marginTop: "20px" }}>
        {error && (
          <div
            style={{
              padding: "10px 14px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              color: "#b91c1c",
              fontSize: "0.86rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>{error}</span>
          </div>
        )}

        {isSignUp && (
          <div className="login-field">
            <label htmlFor="login-name" className="login-label">
              Full Name
            </label>
            <div className="login-input-wrapper">
              <input
                id="login-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="login-input"
                required={isSignUp}
                disabled={isSubmitting}
              />
            </div>
          </div>
        )}

        <div className="login-field">
          <label htmlFor="login-phone" className="login-label">
            Phone Number
          </label>
          <div className="login-phone-group">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="login-country-select"
              disabled={isSubmitting}
              aria-label="Country Code"
            >
              <option value="+971">🇦🇪 +971 (UAE)</option>
              <option value="+91">🇮🇳 +91 (IND)</option>
            </select>
            <input
              id="login-phone"
              type="tel"
              value={phoneDigits}
              onChange={(e) => setPhoneDigits(e.target.value)}
              placeholder={countryCode === "+971" ? "50 123 4567" : "98765 43210"}
              className="login-input login-phone-input"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="login-field">
          <label htmlFor="login-password" className="login-label">
            {isSignUp ? "Password" : "6-Digit PIN or Password"}
          </label>
          <div className="login-input-wrapper">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isSignUp ? "Create a password" : "Enter 6-digit PIN from store"}
              className="login-input"
              required
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="login-password-toggle"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="login-submit-btn"
          disabled={isSubmitting}
          style={{
            opacity: isSubmitting ? 0.85 : 1,
            cursor: isSubmitting ? "wait" : "pointer",
            marginTop: "8px",
          }}
        >
          {isSubmitting ? "Please wait..." : isSignUp ? "Create Account" : "Log In"}
        </button>

        <div className="login-switch-row">
          {isSignUp ? (
            <>
              Already have an account?
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setError(null);
                }}
                className="login-switch-btn"
              >
                Log in
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setError(null);
                }}
                className="login-switch-btn"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
