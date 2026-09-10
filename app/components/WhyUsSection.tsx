"use client";

import React from "react";

interface GoogleReview {
  id: number;
  author: string;
  avatarInitial: string;
  avatarBg: string;
  reviewsCount: string;
  rating: number;
  timeAgo: string;
  quote: string;
}

const reviews: GoogleReview[] = [
  {
    id: 1,
    author: "Shibu Gopalakrishnan",
    avatarInitial: "S",
    avatarBg: "#00897b",
    reviewsCount: "2 reviews",
    rating: 5,
    timeAgo: "4 months ago",
    quote:
      "I have contacted Fatima madam for taking spouse visa and she helped me alot in each and every step in the visa procedure. I am very satisfied with their service and I recommend all to contact everyone for the services.",
  },
  {
    id: 2,
    author: "Scandinavian Limousine",
    avatarInitial: "SL",
    avatarBg: "#1e3a8a",
    reviewsCount: "3 reviews · 3 photos",
    rating: 5,
    timeAgo: "a year ago",
    quote:
      "I open my trade license and also done my corperate tax and Vat services here . Everything was handled professionally and on time . The staff was courteous , attentive and very helpfull. I am trully impressed . Great value for money . I’ll definitely use this service again",
  },
  {
    id: 3,
    author: "Rashid Al-Maktoum Trading",
    avatarInitial: "R",
    avatarBg: "#0284c7",
    reviewsCount: "4 reviews · 2 photos",
    rating: 5,
    timeAgo: "2 months ago",
    quote:
      "Renewed our LLC commercial trade license and resolved corporate bank compliance. Mr. Faisal and the team handled the economic department clearances within 48 hours without any back-and-forth. Very dependable service!",
  },
  {
    id: 4,
    author: "Elena Rostova",
    avatarInitial: "E",
    avatarBg: "#7c3aed",
    reviewsCount: "Local Guide · 18 reviews",
    rating: 5,
    timeAgo: "5 months ago",
    quote:
      "Applied for 10-year Golden Visa through this center. From foreign degree attestation to VIP medical fitness and Emirates ID typing, Fatima madam coordinated every single milestone seamlessly. Highest recommendation!",
  },
  {
    id: 5,
    author: "Muhammad Tariq",
    avatarInitial: "M",
    avatarBg: "#059669",
    reviewsCount: "5 reviews",
    rating: 5,
    timeAgo: "3 months ago",
    quote:
      "Best typing office in Dubai for family residence and domestic worker visas. They thoroughly vetted all tenancy documents and salary contracts before immigration submission. Zero rejections, super fast approvals.",
  },
  {
    id: 6,
    author: "Apex Global Logistics",
    avatarInitial: "AG",
    avatarBg: "#d97706",
    reviewsCount: "8 reviews · 1 photo",
    rating: 5,
    timeAgo: "7 months ago",
    quote:
      "Corporate tax registration and FTA VAT filings handled meticulously. Their consultants clarified UAE tax laws and accounting guidelines with complete clarity. Extremely professional and courteous staff.",
  },
  {
    id: 7,
    author: "Sarah Jenkins",
    avatarInitial: "S",
    avatarBg: "#e11d48",
    reviewsCount: "Local Guide · 24 reviews",
    rating: 5,
    timeAgo: "1 month ago",
    quote:
      "Needed urgent investor visa cancellation and new employment quota issuance. The staff stayed late past working hours to ensure immigration portals processed our urgent request before deadline. True lifesavers!",
  },
  {
    id: 8,
    author: "Ahmed Bin Salem",
    avatarInitial: "A",
    avatarBg: "#0d9488",
    reviewsCount: "3 reviews",
    rating: 5,
    timeAgo: "6 months ago",
    quote:
      "Very honest and transparent business center. They provided an exact itemized fee structure without hidden surcharges. MOA drafting, Ejari registration, and establishment card all cleared under one roof.",
  },
  {
    id: 9,
    author: "Karthik Sundaram",
    avatarInitial: "K",
    avatarBg: "#4f46e5",
    reviewsCount: "6 reviews · 2 photos",
    rating: 5,
    timeAgo: "8 months ago",
    quote:
      "I renewed my freelance residence visa and medical insurance here. Fatima madam and her team walked me through biometrics, entry permits, and courier delivery patiently. Incredible customer commitment.",
  },
  {
    id: 10,
    author: "Nordic Design Studio",
    avatarInitial: "ND",
    avatarBg: "#0284c7",
    reviewsCount: "2 reviews",
    rating: 5,
    timeAgo: "9 months ago",
    quote:
      "We established our mainland branch in Dubai with their guidance. DED approvals, tenancy compliance, and partner visas were delivered ahead of schedule. Unmatched efficiency and peace of mind.",
  },
  {
    id: 11,
    author: "Zubair Farooq",
    avatarInitial: "Z",
    avatarBg: "#16a34a",
    reviewsCount: "9 reviews",
    rating: 5,
    timeAgo: "3 weeks ago",
    quote:
      "Fastest Emirates ID replacement and immigration fine waiver clearance I have ever seen. Honest guidance, transparent government receipts, and very reasonable service fees. I won't go anywhere else.",
  },
  {
    id: 12,
    author: "Dr. Ananya Sharma",
    avatarInitial: "A",
    avatarBg: "#9333ea",
    reviewsCount: "Local Guide · 31 reviews",
    rating: 5,
    timeAgo: "4 months ago",
    quote:
      "Processed our healthcare professional credential verification and family visas. They scrutinize every single paper so nothing gets held up at the ministry. Thank you so much for the exceptional service!",
  },
];

export default function WhyUsSection() {
  return (
    <section className="why-us-section" id="why-us" aria-label="Why Choose Us">
      <div className="container">
        <div className="why-us-layout">
          {/* Left Column: Title, Quote directly underneath, and Map circle button */}
          <div className="why-us-left-col">
            <h2 className="why-us-main-title">Why Us</h2>

            <blockquote className="why-us-quote-text">
              “True reliability isn’t just about processing paperwork — it’s
              about providing absolute certainty, transparency, and peace of
              mind when it matters most.”
            </blockquote>

            <a
              href="https://maps.app.goo.gl/Zfy3m3sPpGNJDLtr5"
              target="_blank"
              rel="noopener noreferrer"
              className="clean-map-circle-btn"
              aria-label="View our location on Google Maps"
              title="View on Google Maps"
            >
              <svg
                className="clean-map-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </a>
          </div>

          {/* Right Column: Big vertically scrolling cards inside a bordered container */}
          <div className="why-us-right-col">
            <div className="why-us-scroll-box">
              <div
                className="why-us-scroll-container"
                role="region"
                aria-label="Client Reviews list"
              >
                <div className="why-us-scroll-track">
                  {reviews.concat(reviews).map((review, index) => (
                    <div
                      key={`${review.id}-${index}`}
                      className="why-us-big-card"
                    >
                      <div className="big-card-header">
                        <div
                          className="big-card-avatar"
                          style={{ backgroundColor: review.avatarBg }}
                        >
                          {review.avatarInitial}
                        </div>
                        <div className="big-card-meta">
                          <span className="big-card-author">{review.author}</span>
                          <span className="big-card-stats">
                            {review.reviewsCount}
                          </span>
                        </div>
                        <div className="big-card-google-icon" aria-hidden="true">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              fill="#4285F4"
                              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.28 14.27A7.195 7.195 0 0 1 4.9 12c0-.79.14-1.57.38-2.27V6.58H1.25A11.96 11.96 0 0 0 0 12c0 1.92.45 3.74 1.25 5.42l4.03-3.15z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="big-card-rating-row">
                        <div
                          className="big-card-stars"
                          aria-label={`${review.rating} stars`}
                        >
                          ★★★★★
                        </div>
                        <span className="big-card-time">{review.timeAgo}</span>
                      </div>

                      <p className="big-card-quote">{review.quote}</p>

                      <div className="big-card-footer">
                        <span className="big-card-verified">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="#16a34a"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                          Posted on Google Maps
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

