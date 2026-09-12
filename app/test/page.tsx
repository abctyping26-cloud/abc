"use client";

import React, { useState } from "react";
import Link from "next/link";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const TARGET_WORKER_EMAIL = "abctyping26@gmail.com";

export default function CommercialTestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [responseResult, setResponseResult] = useState<{
    status: "success" | "error";
    message: string;
    data?: any;
  } | null>(null);

  const handleSendOneClickTest = async () => {
    setIsLoading(true);
    setResponseResult(null);

    const testPayload = {
      customerName: "Alex Carter (Test Client)",
      customerEmail: "alex.carter.test@gmail.com",
      customerPhone: "+971 50 987 6543",
      service: "Golden Visa & Business Setup (Test Enquiry)",
      message:
        "Hi! This is a test enquiry from the commercial website. When you receive this in Gmail, tap 'Reply' to verify that your reply automatically targets alex.carter.test@gmail.com.",
      workerEmail: TARGET_WORKER_EMAIL,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/test/send-enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testPayload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to dispatch test enquiry");
      }

      setResponseResult({
        status: "success",
        message:
          json.message ||
          `Enquiry email successfully dispatched to ${TARGET_WORKER_EMAIL}`,
        data: json.data,
      });
    } catch (err: any) {
      setResponseResult({
        status: "error",
        message:
          err.message ||
          "Could not send email. Make sure your server is running and RESEND_API_KEY is configured in server/.env.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "#f8fafc",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        padding: "60px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "540px",
          width: "100%",
          backgroundColor: "#1e293b",
          borderRadius: "20px",
          padding: "36px 32px",
          border: "1px solid #334155",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4)",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-block",
            padding: "5px 14px",
            borderRadius: "9999px",
            backgroundColor: "#0369a1",
            color: "#e0f2fe",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Commercial Site · Quick Test
        </div>

        <h1
          style={{
            fontSize: "24px",
            fontWeight: "700",
            margin: "0 0 10px 0",
            color: "#ffffff",
          }}
        >
          Test Enquiry Email Dispatch
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "14px",
            margin: "0 0 28px 0",
            lineHeight: "1.6",
          }}
        >
          Press the button below to send a simulated customer enquiry directly to{" "}
          <strong style={{ color: "#38bdf8" }}>{TARGET_WORKER_EMAIL}</strong> via
          Resend.
        </p>

        {/* Single Action Button */}
        <button
          onClick={handleSendOneClickTest}
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "16px 24px",
            borderRadius: "12px",
            backgroundColor: isLoading ? "#475569" : "#2563eb",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "600",
            border: "none",
            cursor: isLoading ? "not-allowed" : "pointer",
            boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.4)",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {isLoading ? (
            <span>Sending Email via Resend...</span>
          ) : (
            <>
              <span>🚀</span>
              <span>Send Test Enquiry to {TARGET_WORKER_EMAIL}</span>
            </>
          )}
        </button>

        {/* Result Message */}
        {responseResult && (
          <div
            style={{
              marginTop: "24px",
              padding: "18px 20px",
              borderRadius: "12px",
              textAlign: "left",
              backgroundColor:
                responseResult.status === "success" ? "#064e3b" : "#7f1d1d",
              border:
                responseResult.status === "success"
                  ? "1px solid #10b981"
                  : "1px solid #ef4444",
              color: "#ffffff",
            }}
          >
            <div
              style={{
                fontWeight: "700",
                fontSize: "15px",
                marginBottom: "6px",
              }}
            >
              {responseResult.status === "success"
                ? "✅ Email Sent Successfully!"
                : "❌ Delivery Failed"}
            </div>
            <div style={{ fontSize: "13px", lineHeight: "1.5" }}>
              {responseResult.message}
            </div>

            {responseResult.status === "success" && (
              <div
                style={{
                  marginTop: "12px",
                  paddingTop: "12px",
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                  fontSize: "13px",
                  color: "#d1fae5",
                  lineHeight: "1.5",
                }}
              >
                <strong>Verify in Gmail:</strong>
                <ol
                  style={{
                    margin: "8px 0 0 0",
                    paddingLeft: "18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <li>
                    Open inbox for <code>{TARGET_WORKER_EMAIL}</code>.
                  </li>
                  <li>Open the enquiry email from <strong>ABC Typing</strong>.</li>
                  <li>
                    Tap <strong>Reply</strong>: verify that Gmail automatically
                    sets the reply to <code>alex.carter.test@gmail.com</code>.
                  </li>
                </ol>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div
          style={{
            marginTop: "28px",
            paddingTop: "20px",
            borderTop: "1px solid #334155",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
          }}
        >
          <Link href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>
            ← Back to Home
          </Link>
          <a
            href="http://localhost:3001/test"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#38bdf8", textDecoration: "none" }}
          >
            Admin Reply Test Page →
          </a>
        </div>
      </div>
    </div>
  );
}
