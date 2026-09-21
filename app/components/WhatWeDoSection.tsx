"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  CATEGORIES,
  slugify,
  type ServiceCategory,
  type ServiceItem,
} from "../data/servicesData";
import { getWhatsAppUrl } from "../utils/whatsapp";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Refs for bulletproof timer, dropdown, and viewport tracking
  const sectionRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isInSectionRef = useRef<boolean>(false);
  const isHoveringRef = useRef<boolean>(false);
  const isDropdownOpenRef = useRef<boolean>(false);
  isDropdownOpenRef.current = isDropdownOpen;
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

      // Skip if user is hovering directly on any text/category item or dropdown is open
      if (isHoveringRef.current || isDropdownOpenRef.current) {
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

  // Click outside and escape key handling to close mobile dropdown
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isDropdownOpen]);

  // When user manually clicks a category button or selects from dropdown:
  // Immediately switch, clear active search, & freeze auto-advance for 10 full seconds!
  const handleSelectCategory = (index: number) => {
    setActiveIndex(index);
    if (searchQuery) setSearchQuery("");
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
                <a
                  href={getWhatsAppUrl(
                    `Hello ABC Typing, I would like more details regarding services in ${activeCategory.name}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="category-showcase-wa-btn"
                  title={`Chat with us on WhatsApp about ${activeCategory.name}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "10px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#15803d",
                    textDecoration: "none",
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    padding: "4px 10px",
                    borderRadius: "9999px",
                    width: "fit-content",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.54 1.83.822 2.796.822 3.182 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.808-5.768-5.808zm3.387 8.248c-.145.409-.726.772-1.025.808-.299.037-.687.054-2.222-.596-1.536-.65-2.531-2.247-2.607-2.351-.076-.104-.627-.834-.627-1.591 0-.756.398-1.127.538-1.282.141-.155.308-.194.411-.194.103 0 .205.001.296.006.095.005.223-.036.349.266.126.302.431 1.05.469 1.127.038.077.064.168.013.272-.051.104-.077.168-.154.259-.077.091-.162.203-.231.272-.077.077-.157.16-.068.314.089.154.397.656.852 1.061.585.521 1.079.682 1.233.759.154.077.244.064.334-.038.09-.103.385-.448.487-.602.103-.154.205-.129.346-.077.141.051.898.423 1.052.5.154.077.256.116.295.18.038.064.038.372-.107.781z" />
                  </svg>
                  <span>Chat on WhatsApp about this category</span>
                </a>
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

          {/* Mobile Category Dropdown Capsule (Replaces horizontal scroll capsule on mobile) */}
          <div
            className="category-mobile-dropdown-container"
            ref={dropdownRef}
            aria-label="Service categories dropdown"
          >
            <button
              type="button"
              className={`category-mobile-dropdown-capsule ${isDropdownOpen ? "is-open" : ""}`}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              aria-label={`Current category: ${activeCategory.name}. Tap to change category.`}
            >
              <div className="category-mobile-dropdown-left">
                <span className="category-mobile-dropdown-num">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="category-mobile-dropdown-name">
                  {activeCategory.name}
                </span>
              </div>
              <div className="category-mobile-dropdown-right">
                <svg
                  className={`category-mobile-dropdown-chevron ${isDropdownOpen ? "chevron-open" : ""}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </button>

            {/* Floating Dropdown Menu */}
            {isDropdownOpen && (
              <div className="category-mobile-dropdown-menu" role="listbox">
                {CATEGORIES.map((category, idx) => {
                  const isCurrent = activeIndex === idx && !query;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      role="option"
                      aria-selected={isCurrent}
                      onClick={() => {
                        handleSelectCategory(idx);
                        setIsDropdownOpen(false);
                      }}
                      className={`category-mobile-dropdown-item ${isCurrent ? "is-active" : ""}`}
                    >
                      <div className="dropdown-item-left">
                        <span className="dropdown-item-num">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="dropdown-item-name">{category.name}</span>
                      </div>
                      <div className="dropdown-item-right">
                        <span className="dropdown-item-services-count">
                          {category.services.length}
                        </span>
                        <span
                          className={`category-item-dot ${isCurrent ? "dot-active" : "dot-inactive"}`}
                          aria-hidden="true"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
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
