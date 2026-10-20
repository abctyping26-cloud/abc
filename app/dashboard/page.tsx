"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../styles/client-dashboard.css";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ClientFile {
  _id?: string;
  id?: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  uploadedAt: string;
}

export interface ClientServiceItem {
  id?: string;
  _id?: string;
  name: string;
  status: "in_progress" | "completed";
  targetDate?: string | null;
  notes?: string;
  files: ClientFile[];
  createdAt?: string;
}

interface ClientProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  pin?: string;
  completed: boolean;
  expirationTimer?: string | null;
  services?: ClientServiceItem[];
  files: ClientFile[];
  createdAt: string;
}

interface InvoiceItem {
  id: string;
  invoiceNo: string;
  invoiceDate: string;
  status: string;
  total: string;
  balance: string;
  paid: string;
  itemsCount: number;
}

export default function ClientDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"services" | "invoices" | "account">("services");
  const [client, setClient] = useState<ClientProfile | null>(null);
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("abc_client_token");
    if (!token) {
      router.replace("/login");
      return;
    }

    fetch(`${API_BASE_URL}/api/v1/client/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem("abc_client_token");
            localStorage.removeItem("abc_client_user");
            router.replace("/login");
            return null;
          }
          throw new Error("Failed to load dashboard data");
        }
        return res.json();
      })
      .then((data) => {
        if (data?.data) {
          setClient(data.data.client);
          setInvoices(data.data.invoices || []);
        }
      })
      .catch((err) => {
        setError(err.message || "Could not load data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("abc_client_token");
    localStorage.removeItem("abc_client_user");
    router.replace("/login");
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div style={{ color: "#64748b", fontSize: "0.95rem" }}>Loading dashboard...</div>
      </div>
    );
  }

  const isCompleted = client?.completed;

  return (
    <div className="client-dashboard-layout">
      {/* Left Sidebar */}
      <aside className="client-sidebar">
        <div className="client-sidebar-top">
          <Link href="/" className="client-brand">
            <span>abc</span>
            <span className="client-brand-dot" />
          </Link>

          <nav className="client-nav">
            <button
              type="button"
              className={`client-nav-item ${activeTab === "services" ? "active" : ""}`}
              onClick={() => setActiveTab("services")}
            >
              Services &amp; Progress
            </button>
            <button
              type="button"
              className={`client-nav-item ${activeTab === "invoices" ? "active" : ""}`}
              onClick={() => setActiveTab("invoices")}
            >
              Quotations &amp; Invoices
            </button>
            <button
              type="button"
              className={`client-nav-item ${activeTab === "account" ? "active" : ""}`}
              onClick={() => setActiveTab("account")}
            >
              Account
            </button>
          </nav>
        </div>

        <div className="client-sidebar-bottom">
          <div className="client-user-info">
            <span className="client-user-name">{client?.name || "Client"}</span>
            <span className="client-user-phone">{client?.phone}</span>
          </div>
          <button
            type="button"
            className="client-logout-btn"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="client-main-area">
        <header className="client-header">
          <div className="client-header-title">
            {activeTab === "services" && "Services & Progress"}
            {activeTab === "invoices" && "Quotations & Invoices"}
            {activeTab === "account" && "Account Details"}
          </div>
          <div className="client-header-actions">
            <a href="tel:+971500000000" className="client-contact-pill">
              Store Support
            </a>
          </div>
        </header>

        <main className="client-content">
          {error && (
            <div style={{ padding: "12px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", color: "#b91c1c", marginBottom: "20px" }}>
              {error}
            </div>
          )}

          {/* TAB 1: SERVICES & PROGRESS */}
          {activeTab === "services" && (
            <>
              {!client?.services || client.services.length === 0 ? (
                <div className="client-card" style={{ textAlign: "center", padding: "48px 24px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#f1f5f9", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", color: "#64748b" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                      <path d="M9 12h6" />
                      <path d="M9 16h6" />
                    </svg>
                  </div>
                  <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                    No Active Services
                  </h2>
                  <p style={{ fontSize: "0.88rem", color: "#64748b", maxWidth: "420px", margin: "0 auto 20px" }}>
                    You do not have any active service requests at this time. Once our team sets up your service at the center, its live progress and completed documents will appear here.
                  </p>
                  <a href="tel:+971500000000" className="client-contact-pill" style={{ display: "inline-block" }}>
                    Contact Support
                  </a>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {client.services.map((svc, idx) => {
                    const isSvcCompleted = svc.status === "completed";
                    return (
                      <div key={svc.id || svc._id || idx} className="client-card" style={{ marginBottom: 0 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: svc.files && svc.files.length > 0 ? "16px" : "0", paddingBottom: svc.files && svc.files.length > 0 ? "14px" : "0", borderBottom: svc.files && svc.files.length > 0 ? "1px solid #f1f5f9" : "none" }}>
                          <div>
                            <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>
                              {svc.name}
                            </h2>
                            {svc.notes && (
                              <p style={{ fontSize: "0.84rem", color: "#64748b", margin: 0 }}>
                                {svc.notes}
                              </p>
                            )}
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                            <span className={`client-status-badge ${isSvcCompleted ? "completed" : "in-progress"}`}>
                              <span className="client-status-dot" />
                              {isSvcCompleted ? "Completed" : "In Progress"}
                            </span>

                            {svc.targetDate && (
                              <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: "0.76rem", color: "#64748b" }}>Target Date</div>
                                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f172a" }}>
                                  {new Date(svc.targetDate).toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Service Files (Only displayed if files are attached) */}
                        {svc.files && svc.files.length > 0 && (
                          <div>
                            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: "10px" }}>
                              {isSvcCompleted ? "Completed Documents" : "Service Documents"}
                            </div>
                            {svc.files.map((file, fIdx) => (
                              <div key={file.id || file._id || fIdx} className="client-file-item">
                                <div className="client-file-meta">
                                  <span className="client-file-name">{file.fileName}</span>
                                  <span className="client-file-sub">
                                    {file.fileSize ? `${Math.round(file.fileSize / 1024)} KB` : "Document"} •{" "}
                                    {file.uploadedAt ? new Date(file.uploadedAt).toLocaleDateString() : ""}
                                  </span>
                                </div>
                                <a
                                  href={file.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="client-download-btn"
                                  download
                                >
                                  Download
                                </a>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* General Documents (if any uploaded directly to the client account) */}
              {client?.files && client.files.length > 0 && (
                <div className="client-card" style={{ marginTop: "24px" }}>
                  <h2 className="client-card-title">General Center Documents</h2>
                  {client.files.map((file, idx) => (
                    <div key={file.id || file._id || idx} className="client-file-item">
                      <div className="client-file-meta">
                        <span className="client-file-name">{file.fileName}</span>
                        <span className="client-file-sub">
                          {file.fileSize ? `${Math.round(file.fileSize / 1024)} KB` : "Document"} •{" "}
                          {file.uploadedAt ? new Date(file.uploadedAt).toLocaleDateString() : ""}
                        </span>
                      </div>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="client-download-btn"
                        download
                      >
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* TAB 2: INVOICES & QUOTATIONS */}
          {activeTab === "invoices" && (
            <div className="client-card" style={{ padding: "0", overflow: "hidden" }}>
              {invoices.length > 0 ? (
                <table className="client-table">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Paid</th>
                      <th>Balance</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv) => (
                      <tr key={inv.id}>
                        <td style={{ fontWeight: 600 }}>{inv.invoiceNo}</td>
                        <td>{inv.invoiceDate || "—"}</td>
                        <td>AED {inv.total}</td>
                        <td>AED {inv.paid}</td>
                        <td style={{ color: Number(inv.balance) > 0 ? "#b91c1c" : "#166534" }}>
                          AED {inv.balance}
                        </td>
                        <td>
                          <span style={{
                            padding: "3px 8px",
                            borderRadius: "12px",
                            fontSize: "0.76rem",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            background: inv.status === "paid" ? "#dcfce7" : "#fee2e2",
                            color: inv.status === "paid" ? "#166534" : "#991b1b",
                          }}>
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: "24px", color: "#64748b", fontSize: "0.88rem" }}>
                  No invoices or quotations linked to this account yet.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ACCOUNT DETAILS */}
          {activeTab === "account" && (
            <div className="client-card">
              <h2 className="client-card-title">Profile Information</h2>
              <div className="client-kv-grid">
                <div className="client-kv-item">
                  <span className="client-kv-label">Full Name</span>
                  <span className="client-kv-val">{client?.name || "—"}</span>
                </div>
                <div className="client-kv-item">
                  <span className="client-kv-label">Phone Number</span>
                  <span className="client-kv-val">{client?.phone || "—"}</span>
                </div>
                <div className="client-kv-item">
                  <span className="client-kv-label">Email Address</span>
                  <span className="client-kv-val">{client?.email || "—"}</span>
                </div>
                <div className="client-kv-item">
                  <span className="client-kv-label">Office / Delivery Address</span>
                  <span className="client-kv-val">{client?.address || "—"}</span>
                </div>
                <div className="client-kv-item">
                  <span className="client-kv-label">Postal / ZIP Code</span>
                  <span className="client-kv-val">{client?.pin || "—"}</span>
                </div>
                <div className="client-kv-item">
                  <span className="client-kv-label">Member Since</span>
                  <span className="client-kv-val">
                    {client?.createdAt ? new Date(client.createdAt).toLocaleDateString() : "—"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
