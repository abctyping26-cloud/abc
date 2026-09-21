"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface ProcessStep {
  number: number;
  label: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: 1,
    label: "Step 1",
    title: "Initial Consultation",
    description:
      "Understanding your company's liquidation needs thoroughly within detailed consultation to assess your company's summary, understand your liquidation goals, and provide a clear roadmap tailored to your specific needs.",
  },
  {
    number: 2,
    label: "Step 2",
    title: "Document Preparation",
    description:
      "Managing all necessary legal paperwork, our team handles all required documentation, from preparing liquidation board resolutions to compiling financial statements and ensuring all legal paperwork is accurate and complete.",
  },
  {
    number: 3,
    label: "Step 3",
    title: "Government Approvals",
    description:
      "Handling legal clearances and formalities with relevant authorities to ensure necessary approvals, navigate cancelations, settling obligations, and obtaining final release document to relieve entities and stakeholders.",
  },
  {
    number: 4,
    label: "Step 4",
    title: "Final Closure",
    description:
      "Company deregistration and completion of the process: the final step includes asset liquidation, debt settlement, conducting a final audit, and officially deregistering your company, ensuring complete legal closure with all documents and records.",
  },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isHoveredRef = useRef(false);
  isHoveredRef.current = isHovered;

  const lastAdvanceTimeRef = useRef(Date.now());

  // Advance to next step smoothly
  const nextStep = useCallback(() => {
    setActiveStep((prev) => (prev + 1) % steps.length);
    setAnimKey((k) => k + 1);
    lastAdvanceTimeRef.current = Date.now();
  }, []);

  // Continuous 3-second auto-advance loop (immune to iOS Safari timer throttling)
  useEffect(() => {
    lastAdvanceTimeRef.current = Date.now();
    let animId: number;

    const checkAutoAdvance = () => {
      const now = Date.now();
      if (now - lastAdvanceTimeRef.current >= 3000) {
        if (!isHoveredRef.current) {
          setActiveStep((prev) => (prev + 1) % steps.length);
          setAnimKey((k) => k + 1);
        }
        lastAdvanceTimeRef.current = now;
      }
      animId = requestAnimationFrame(checkAutoAdvance);
    };

    animId = requestAnimationFrame(checkAutoAdvance);

    // Fallback interval (runs every 1s, ensures advancing even if RAF paused during background/scroll)
    const intervalId = setInterval(() => {
      const now = Date.now();
      if (now - lastAdvanceTimeRef.current >= 3000 && !isHoveredRef.current) {
        setActiveStep((prev) => (prev + 1) % steps.length);
        setAnimKey((k) => k + 1);
        lastAdvanceTimeRef.current = now;
      }
    }, 1000);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(intervalId);
    };
  }, []);

  // Resume smoothly if mobile browser tab was locked or backgrounded
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        lastAdvanceTimeRef.current = Date.now();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Tap or click on any step circle to jump immediately
  const handleSelectStep = (index: number) => {
    setActiveStep(index);
    setAnimKey((k) => k + 1);
    lastAdvanceTimeRef.current = Date.now();
  };

  // Laptop/Desktop hover pause (strictly guarded against mobile touch devices)
  const handleMouseEnter = () => {
    if (
      typeof window !== "undefined" &&
      window.innerWidth > 820 &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && window.innerWidth > 820) {
      setIsHovered(false);
    }
  };

  const currentStep = steps[activeStep];

  return (
    <section className="process-section" id="process">
      <div className="container">
        {/* Section Header */}
        <div className="process-header" data-aos="fade-up">
          <span className="process-kicker">STEP-BY-STEP ROADMAP</span>
          <h2 className="process-title">Our Process</h2>
        </div>

        {/* 4 Connected Circles Network Row */}
        <div className="process-network-wrapper" data-aos="fade-up" data-aos-delay="100">
          <div
            className="process-track"
            role="tablist"
            aria-label="Process navigation steps"
          >
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const isCompleted = idx < activeStep;

              return (
                <React.Fragment key={step.number}>
                  {/* Node Button: native button with immediate tap & click support */}
                  <button
                    type="button"
                    onClick={() => handleSelectStep(idx)}
                    className={`process-node ${isActive ? "node-active" : ""} ${
                      isCompleted ? "node-completed" : ""
                    }`}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Step ${step.number}: ${step.title}`}
                  >
                    <div className="process-circle">
                      {/* Active SVG countdown ring */}
                      {isActive && (
                        <svg
                          className="process-circle-ring"
                          viewBox="0 0 100 100"
                          aria-hidden="true"
                        >
                          <circle
                            className="ring-track"
                            cx="50"
                            cy="50"
                            r="46"
                          />
                          <circle
                            key={`ring-${activeStep}-${animKey}`}
                            className={`ring-fill ${
                              isHovered ? "ring-fill-paused" : ""
                            }`}
                            cx="50"
                            cy="50"
                            r="46"
                          />
                        </svg>
                      )}
                      <span className="process-circle-number">{step.number}</span>
                    </div>
                  </button>

                  {/* Connecting Line between nodes */}
                  {idx < steps.length - 1 && (
                    <div
                      className={`process-connector ${
                        idx < activeStep ? "connector-active" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <div
                        className={`process-connector-line ${
                          idx < activeStep ? "line-filled" : ""
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Centered Idea Showcase Card directly under the circle row */}
        <div
          className="process-showcase-container"
          data-aos="fade-up"
          data-aos-delay="200"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="process-showcase-card">
            {/* Top 3s countdown progress line */}
            <div className="process-timer-track" aria-hidden="true">
              <div
                key={`bar-${activeStep}-${animKey}`}
                className={`process-timer-bar ${
                  isHovered ? "timer-paused" : ""
                }`}
              />
            </div>

            {/* Inner Content with smooth entrance animation */}
            <div className="process-showcase-inner" key={`content-${activeStep}`}>
              <h3 className="process-showcase-title">{currentStep.title}</h3>
              <p className="process-showcase-desc">{currentStep.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
