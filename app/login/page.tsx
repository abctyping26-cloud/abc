import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "../components/LoginForm";

export const metadata: Metadata = {
  title: "Client Portal Login | ABC Typing Services",
  description: "Secure login for clients of ABC Typing Services UAE.",
};

export default function LoginPage() {
  return (
    <main className="login-page-wrapper">
      <div className="login-box" data-aos="fade-up" data-aos-duration="800">
        {/* 60% Image Side */}
        <div className="login-image-side">
          <div className="login-image-top">
            <Link
              href="/"
              className="hero-logo-link"
              aria-label="ABC Typing Services Homepage"
            >
              <span className="hero-logo-text">abc</span>
              <span className="hero-logo-dot" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* 40% Form Side */}
        <div className="login-form-side">
          <div className="login-top-bar">
            <Link href="/" className="login-back-link">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back</span>
            </Link>
          </div>

          <LoginForm />

          <div style={{ height: "10px" }} />
        </div>
      </div>
    </main>
  );
}
