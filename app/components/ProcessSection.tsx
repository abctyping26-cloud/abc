"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: "01.",
    title: "Initial Consultation",
    description:
      "Understanding your company's liquidation needs thoroughly within detailed consultation to assess your company's summary, understand your liquidation goals, and provide a clear roadmap tailored to your specific needs.",
  },
  {
    number: "02.",
    title: "Document Preparation",
    description:
      "Managing all necessary legal paperwork, our team handles all required documentation, from preparing liquidation board resolutions to compiling financial statements and ensuring all legal paperwork is accurate and complete.",
  },
  {
    number: "03.",
    title: "Government Approvals",
    description:
      "Handling legal clearances and formalities with relevant authorities to ensure necessary approvals, navigate cancelations, settling obligations, and obtaining final release document to relieve entities and stakeholders.",
  },
  {
    number: "04.",
    title: "Final Closure",
    description:
      "Company deregistration and completion of the process: the final step includes asset liquidation, debt settlement, conducting a final audit, and officially deregistering your company, ensuring complete legal closure with all documents and records.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const handleCtaClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("abc:open-contact-modal"));
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`process-section ${isInView ? "is-in-view" : ""}`}
      id="process"
    >
      <div className="container">
        {/* Section Header */}
        <div className="process-header" data-aos="fade-up">
          <div className="process-title-container">
            <h2 className="process-title">
              <span className="process-title-line-1">
                <span className="process-title-sweep sweep-1">Effortless Process,</span>
              </span>
              <span className="process-title-line-2">
                <span className="process-title-text">
                  <span className="process-title-sweep sweep-2">Continuous Supply</span>
                </span>
                <span className="process-divider" aria-hidden="true" />
              </span>
            </h2>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="process-grid" data-aos="fade-up" data-aos-delay="100">
          {steps.map((step, idx) => (
            <div key={step.number} className="process-card">
              <div className="process-card-top">
                <span className="process-card-number">{step.number}</span>
                <h3 className="process-card-title">
                  <span className={`process-card-title-sweep card-sweep-${idx + 1}`}>
                    {step.title}
                  </span>
                </h3>
              </div>
              <p className="process-card-desc">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="process-banner" data-aos="fade-up" data-aos-delay="200">
          <div className="process-banner-left">
            <div className="process-avatar-stack" aria-hidden="true">
              <Image
                src="/images/person1.png"
                alt="Client avatar 1"
                width={40}
                height={40}
                className="process-avatar-img"
              />
              <Image
                src="/images/person2.png"
                alt="Client avatar 2"
                width={40}
                height={40}
                className="process-avatar-img"
              />
              <Image
                src="/images/person3.png"
                alt="Client avatar 3"
                width={40}
                height={40}
                className="process-avatar-img"
              />
              <Image
                src="/images/avatar_1.png"
                alt="Client avatar 4"
                width={40}
                height={40}
                className="process-avatar-img"
              />
            </div>
            <p className="process-banner-text">
              Align with Businesses that <strong>Choose Quality</strong>
            </p>
          </div>

          <a
            href="#enquiry"
            onClick={handleCtaClick}
            className="process-banner-btn"
          >
            <span className="process-banner-btn-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
            <span>Start Now</span>
          </a>
        </div>
      </div>
    </section>
  );
}
