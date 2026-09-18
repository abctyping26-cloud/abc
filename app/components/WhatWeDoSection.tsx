"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  CATEGORIES,
  slugify,
  type ServiceCategory,
  type ServiceItem,
} from "../data/servicesData";

export { CATEGORIES, type ServiceCategory, type ServiceItem };


// Flat list of keywords for instant ghost suggestion autocomplete
const ALL_SEARCH_KEYWORDS = Array.from(
  new Set([
    ...CATEGORIES.map((c) => c.name.toLowerCase()),
    ...CATEGORIES.map((c) => c.shortName.toLowerCase()),
    ...CATEGORIES.flatMap((c) => c.services.map((s) => s.name.toLowerCase())),
    "business setup",
    "tasheel",
    "tamm",
    "tawjeeh",
    "tadbeer",
    "municipality",
    "tawtheeq",
    "tawteek",
    "darb",
    "salik",
    "asateel",
    "itc services",
    "wps",
    "wage protection",
    "wp insurance",
    "iloe",
    "insurance",
    "golden visa",
    "investor visa",
    "green visa",
    "family visa",
    "employment visa",
    "visit visa",
    "out pass",
    "fine reduction",
    "american visa",
    "schengen visa",
    "canada visa",
    "saudi visa",
    "attestation",
    "equivalency",
    "translation",
    "notary",
    "police clearance",
    "cicpa",
    "cna",
    "aml",
    "goaml",
    "liquidation",
    "cv",
    "print",
    "typing",
    "traffic",
    "driving license",
  ])
);

const getSuggestionSuffix = (input: string): string => {
  if (!input) return "";
  const lower = input.toLowerCase();

  const matches = ALL_SEARCH_KEYWORDS.filter(
    (kw) => kw.startsWith(lower) && kw.length > lower.length
  );

  if (matches.length > 0) {
    matches.sort((a, b) => a.length - b.length);
    return matches[0].slice(lower.length);
  }

  const trimmed = lower.trim();
  if (trimmed && trimmed !== lower) {
    const trimmedMatches = ALL_SEARCH_KEYWORDS.filter(
      (kw) => kw.startsWith(trimmed) && kw.length > trimmed.length
    );
    if (trimmedMatches.length > 0) {
      trimmedMatches.sort((a, b) => a.length - b.length);
      return trimmedMatches[0].slice(trimmed.length);
    }
  }

  return "";
};

const ROTATION_INTERVAL_MS = 5000;
const INITIAL_DWELL_MS = 5000;
const MANUAL_CLICK_FREEZE_MS = 10000;

export default function WhatWeDoSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Refs for bulletproof timer and viewport tracking
  const sectionRef = useRef<HTMLElement>(null);
  const isInSectionRef = useRef<boolean>(false);
  const isHoveringRef = useRef<boolean>(false);
  const manualPauseUntilRef = useRef<number>(0);
  const nextAdvanceTimeRef = useRef<number>(0); // Inactive on page load

  const suggestionSuffix = getSuggestionSuffix(searchQuery);

  const acceptSuggestion = () => {
    if (suggestionSuffix) {
      setSearchQuery((prev) => prev + suggestionSuffix);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Tab" || e.key === "ArrowRight" || e.key === "Enter") && suggestionSuffix) {
      e.preventDefault();
      acceptSuggestion();
    }
  };

  // Viewport visibility detection:
  // Animation only starts after the user is in the section and waits 5 seconds.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const evaluateVisibility = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < vh * 0.75 && rect.bottom > vh * 0.25;
    };

    const updateInSection = (inView: boolean) => {
      if (inView) {
        if (!isInSectionRef.current) {
          isInSectionRef.current = true;
          // Start 5-second countdown only after user arrives in the section
          nextAdvanceTimeRef.current = Date.now() + INITIAL_DWELL_MS;
        }
      } else {
        if (isInSectionRef.current) {
          isInSectionRef.current = false;
          // Reset timer when user leaves section so it doesn't rotate off-screen
          nextAdvanceTimeRef.current = 0;
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const inView = entry.isIntersecting && entry.intersectionRatio >= 0.15;
        updateInSection(inView || evaluateVisibility());
      },
      {
        threshold: [0, 0.15, 0.3, 0.5, 0.75],
      }
    );

    observer.observe(el);

    // Initial check (in case page loaded directly at anchor or already scrolled)
    updateInSection(evaluateVisibility());

    const handleScroll = () => {
      updateInSection(evaluateVisibility());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // High-precision 250ms scheduler:
  // Guarantees auto-rotation every 5s ONLY when in view after 5s wait,
  // pauses during hover or search, and respects the 10-second manual click pause
  useEffect(() => {
    const interval = setInterval(() => {
      // Do nothing if user is not in the section or timer is inactive
      if (!isInSectionRef.current || nextAdvanceTimeRef.current === 0) {
        return;
      }

      const now = Date.now();

      // Skip if user is actively searching
      if (searchQuery.trim()) {
        nextAdvanceTimeRef.current = now + ROTATION_INTERVAL_MS;
        return;
      }

      // Skip if user is hovering directly on any text/category item
      if (isHoveringRef.current) {
        nextAdvanceTimeRef.current = now + ROTATION_INTERVAL_MS;
        return;
      }

      // Skip if within the 10-second manual click freeze
      if (now < manualPauseUntilRef.current) {
        nextAdvanceTimeRef.current = manualPauseUntilRef.current + ROTATION_INTERVAL_MS;
        return;
      }

      // If dwell/advance time reached, advance to the next category!
      if (now >= nextAdvanceTimeRef.current) {
        setActiveIndex((prev) => (prev + 1) % CATEGORIES.length);
        nextAdvanceTimeRef.current = now + ROTATION_INTERVAL_MS;
      }
    }, 250);

    return () => clearInterval(interval);
  }, [searchQuery]);

  // When user manually clicks a category button:
  // Immediately switch & freeze auto-advance for 10 full seconds!
  const handleSelectCategory = (index: number) => {
    setActiveIndex(index);
    manualPauseUntilRef.current = Date.now() + MANUAL_CLICK_FREEZE_MS;
    nextAdvanceTimeRef.current = Date.now() + MANUAL_CLICK_FREEZE_MS + ROTATION_INTERVAL_MS;
  };

  const activeCategory = CATEGORIES[activeIndex];

  // Search Results Filtering
  const query = searchQuery.toLowerCase().trim();
  const searchResults = useMemo(() => {
    if (!query) return null;

    const results: Array<{ category: ServiceCategory; service: ServiceItem }> = [];
    CATEGORIES.forEach((cat) => {
      cat.services.forEach((srv) => {
        if (srv.name.toLowerCase().includes(query) || cat.name.toLowerCase().includes(query)) {
          results.push({ category: cat, service: srv });
        }
      });
    });

    return results;
  }, [query]);

  const totalServicesCount = useMemo(() => {
    return CATEGORIES.reduce((acc, cat) => acc + cat.services.length, 0);
  }, []);

  return (
    <section ref={sectionRef} className="what-we-do-split-section" id="services">
      <div className="container what-we-do-split-container">
        {/* =========================================================
            LEFT COLUMN: Services Showcase (No Boxes, Dot Bullets & Left Margin)
            ========================================================= */}
        <div className="what-we-do-left-col">
          {/* If Search is Active: Show Search Results */}
          {query ? (
            <div className="search-results-panel">
              <div className="search-results-header">
                <span className="search-results-kicker">SEARCH RESULTS</span>
                <h3 className="search-results-title">
                  {searchResults?.length || 0} services matching &ldquo;{searchQuery}&rdquo;
                </h3>
              </div>

              {searchResults && searchResults.length > 0 ? (
                <div className="services-bullet-list">
                  {searchResults.map(({ category, service }, idx) => (
                    <Link
                      href={`/services/${slugify(service.name)}`}
                      key={`search-${category.id}-${service.id}`}
                      className="service-bullet-item"
                      style={{ animationDelay: `${idx * 35}ms` }}
                      onMouseEnter={() => { isHoveringRef.current = true; }}
                      onMouseLeave={() => { isHoveringRef.current = false; }}
                      title={`View details for ${service.name}`}
                    >
                      <span className="service-bullet-dot" aria-hidden="true" />
                      <span className="service-bullet-title">{service.name}</span>
                      <span className="service-category-tag">{category.shortName}</span>
                      {service.isNew && <span className="service-new-tag">NEW</span>}
                      <svg
                        className="service-bullet-arrow"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="search-no-results">
                  <p>
                    No exact services found. Try searching for &ldquo;visa&rdquo;, &ldquo;tasheel&rdquo;, &ldquo;tamm&rdquo;, or select a category on the right.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Normal Mode: Showcase Active Category (One by One AOS Cascade) */
            <div className="category-showcase-panel">
              {/* Category Header Meta: Scaled to ~70% proportional size */}
              <div className="category-showcase-header">
                <div className="category-meta-badge-row">
                  <span className="category-meta-step">
                    CATEGORY {String(activeIndex + 1).padStart(2, "0")} / {String(CATEGORIES.length).padStart(2, "0")}
                  </span>
                  <span className="category-meta-count">
                    {activeCategory.services.length} SERVICES
                  </span>
                </div>
                <h3 className="category-showcase-title">{activeCategory.name}</h3>
                <p className="category-showcase-desc">{activeCategory.description}</p>
              </div>

              {/* Clean Dot-Bulleted List (Hover target strictly on text item) */}
              <div className="services-bullet-list">
                {activeCategory.services.map((service, idx) => (
                  <Link
                    href={`/services/${slugify(service.name)}`}
                    key={`${activeCategory.id}-${service.id}`}
                    className="service-bullet-item"
                    style={{ animationDelay: `${idx * 40}ms` }}
                    onMouseEnter={() => { isHoveringRef.current = true; }}
                    onMouseLeave={() => { isHoveringRef.current = false; }}
                    title={`View details for ${service.name}`}
                  >
                    <span className="service-bullet-dot" aria-hidden="true" />
                    <span className="service-bullet-title">{service.name}</span>
                    {service.isNew && <span className="service-new-tag">NEW</span>}
                    <svg
                      className="service-bullet-arrow"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* =========================================================
            RIGHT COLUMN: Title at Top-Right, Search, and Category Menu Card
            ========================================================= */}
        <div className="what-we-do-right-col">
          {/* Top-Right Title Block */}
          <div className="right-col-header" data-aos="fade-left">
            <span className="what-we-do-kicker">SERVICES &amp; CAPABILITIES</span>
            <h2 className="what-we-do-main-title">What We Do</h2>
            <p className="right-col-subtitle">
              {CATEGORIES.length} Categories &bull; {totalServicesCount} Specialized Services
            </p>
          </div>

          {/* Search Bar (Matches width of title & menu box) */}
          <div className="what-we-do-search-capsule" data-aos="fade-left" data-aos-delay="100">
            <svg
              className="search-capsule-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <div className="search-input-wrapper">
              <div className="search-ghost-text" aria-hidden="true">
                {searchQuery ? (
                  <>
                    <span className="ghost-prefix">{searchQuery}</span>
                    <span className="ghost-suffix">{suggestionSuffix}</span>
                  </>
                ) : (
                  <span className="ghost-placeholder">search service (e.g. tasheel, visa, tamm)</span>
                )}
              </div>

              <input
                type="text"
                className="search-capsule-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Search service"
                autoComplete="off"
                spellCheck="false"
              />
            </div>

            {suggestionSuffix && (
              <button
                type="button"
                className="search-tab-badge"
                onClick={acceptSuggestion}
                title="Press Tab, Enter, or Right Arrow to complete"
                aria-label="Accept suggestion"
              >
                Tab ⇥
              </button>
            )}

            {searchQuery && (
              <button
                type="button"
                className="search-capsule-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {/* Category Menu Box (Matching Uploaded Design - Pauses on Hover) */}
          <div
            className="category-menu-card"
            data-aos="fade-left"
            data-aos-delay="200"
            role="tablist"
            aria-label="Service categories menu"
            onMouseEnter={() => { isHoveringRef.current = true; }}
            onMouseLeave={() => { isHoveringRef.current = false; }}
          >
            {CATEGORIES.map((category, idx) => {
              const isActive = activeIndex === idx && !query;

              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelectCategory(idx)}
                  className={`category-menu-item ${isActive ? "is-active" : ""}`}
                >
                  <span className="category-item-text">{category.name}</span>
                  <span
                    className={`category-item-dot ${isActive ? "dot-active" : "dot-inactive"}`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
