"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";

export interface ServiceItem {
  id: string;
  name: string;
  isNew?: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  shortName: string;
  description: string;
  services: ServiceItem[];
}

export const CATEGORIES: ServiceCategory[] = [
  {
    id: "business-setup",
    name: "Business Setup & Corporate",
    shortName: "Business Setup",
    description:
      "End-to-end corporate formation, trade licensing, amendments, virtual offices, and legal company liquidation across Abu Dhabi & UAE.",
    services: [
      { id: "bs-1", name: "Business Setup Services" },
      { id: "bs-2", name: "Company Formation Services" },
      { id: "bs-3", name: "Company Liquidation & License Cancellation" },
      { id: "bs-4", name: "Economic License Details", isNew: true },
      { id: "bs-5", name: "Business Activity Inquiry", isNew: true },
      { id: "bs-6", name: "Corporate Services Abu Dhabi" },
      { id: "bs-7", name: "Businessmen & Support Services" },
      { id: "bs-8", name: "Virtual Offices Abu Dhabi" },
      { id: "bs-9", name: "Business Bank Account Opening" },
      { id: "bs-10", name: "UAE TAX & VAT Services" },
      { id: "bs-11", name: "Trademark Registration" },
      { id: "bs-12", name: "Copyright Registration" },
      { id: "bs-13", name: "Patent Registration" },
    ],
  },
  {
    id: "uae-visas",
    name: "UAE Visas & Residency",
    shortName: "UAE Visas",
    description:
      "Comprehensive immigration and residency solutions including Golden Visa, Investor, Family, and employment clearance.",
    services: [
      { id: "uv-1", name: "UAE Family Visa" },
      { id: "uv-2", name: "Family Visa Holding" },
      { id: "uv-3", name: "Golden Visa (10-Year)" },
      { id: "uv-4", name: "Investor & Partner Visa" },
      { id: "uv-5", name: "Green Visa (5-Year)" },
      { id: "uv-6", name: "Employment Visa Services" },
      { id: "uv-7", name: "Domestic Worker / Maid Visa" },
      { id: "uv-8", name: "Tourist / Visit Visa" },
      { id: "uv-9", name: "Mission Visa Abu Dhabi" },
      { id: "uv-10", name: "Fine Reduction Services" },
      { id: "uv-11", name: "Out Pass (Exit Clearance)", isNew: true },
    ],
  },
  {
    id: "gov-portals",
    name: "Government Portals & PRO",
    shortName: "Gov Portals",
    description:
      "Direct integration and transaction processing with official UAE federal and local government systems.",
    services: [
      { id: "gp-1", name: "Tasheel Services (MOHRE)", isNew: true },
      { id: "gp-2", name: "TAMM Services (Abu Dhabi)", isNew: true },
      { id: "gp-3", name: "Tawjeeh Services", isNew: true },
      { id: "gp-4", name: "Tadbeer Services", isNew: true },
      { id: "gp-5", name: "Municipality Services", isNew: true },
      { id: "gp-6", name: "Tawteek Work (Tawtheeq)", isNew: true },
      { id: "gp-7", name: "ADNOC Registration" },
      { id: "gp-8", name: "Government Entity Approvals & NOCs" },
    ],
  },
  {
    id: "foreign-visas",
    name: "Foreign Visas & Travel",
    shortName: "Foreign Visas",
    description:
      "Global outbound visa consultation, appointment booking, document preparation, and flight reservations.",
    services: [
      { id: "fv-1", name: "American Visa (US)", isNew: true },
      { id: "fv-2", name: "Schengen Visa (Europe)", isNew: true },
      { id: "fv-3", name: "Canada Visa", isNew: true },
      { id: "fv-4", name: "Saudi Visa (KSA)", isNew: true },
      { id: "fv-5", name: "Foreign Visa Assistance" },
      { id: "fv-6", name: "Travel Desk & Ticket Booking" },
    ],
  },
  {
    id: "legal-attestation",
    name: "Legal, Attestation & Translation",
    shortName: "Legal & Attestation",
    description:
      "Certified legal translation, foreign document legalization, embassy attestation, and notary services.",
    services: [
      { id: "la-1", name: "Certificate Attestation (MOFA & Embassy)" },
      { id: "la-2", name: "Certificate Equivalency Services" },
      { id: "la-3", name: "Genuineness Certificate" },
      { id: "la-4", name: "Legal Arabic & English Translation" },
      { id: "la-5", name: "Notary Services Abu Dhabi" },
      { id: "la-6", name: "Police Clearance Certificate (PCC)" },
      { id: "la-7", name: "Legal & Court Services" },
    ],
  },
  {
    id: "traffic-vehicles",
    name: "Traffic, Vehicles & Tolls",
    shortName: "Traffic & Tolls",
    description:
      "Comprehensive vehicle administration, driver licensing, toll gate registrations, and commercial transport permits.",
    services: [
      { id: "tv-1", name: "Traffic Dept Work", isNew: true },
      { id: "tv-2", name: "Vehicle Services Abu Dhabi" },
      { id: "tv-3", name: "Abu Dhabi Driving License" },
      { id: "tv-4", name: "Abu Dhabi Police Security for Vehicle", isNew: true },
      { id: "tv-5", name: "DARB Toll Registration", isNew: true },
      { id: "tv-6", name: "Salik Registration", isNew: true },
      { id: "tv-7", name: "ITC Services (Transport)", isNew: true },
      { id: "tv-8", name: "Asateel Work (Fleet Tracking)", isNew: true },
    ],
  },
  {
    id: "labor-insurance",
    name: "Labor, Payroll & Insurance",
    shortName: "Labor & Insurance",
    description:
      "Mandatory worker protection schemes, salary compliance, unemployment insurance, and health policies.",
    services: [
      { id: "li-1", name: "WPS Service (Wage Protection)", isNew: true },
      { id: "li-2", name: "WP Insurance (Work Permit)", isNew: true },
      { id: "li-3", name: "ILOE Insurance (Job Loss)" },
      { id: "li-4", name: "Health & Vehicle Insurance" },
      { id: "li-5", name: "General Insurance Services" },
    ],
  },
  {
    id: "pro-compliance",
    name: "Professional Licensing & Compliance",
    shortName: "Licensing & Compliance",
    description:
      "Specialized healthcare, engineering, anti-money laundering, and national security clearances.",
    services: [
      { id: "pc-1", name: "CICPA Pass (CNA / Port Passes)" },
      { id: "pc-2", name: "AML Registration (goAML)", isNew: true },
      { id: "pc-3", name: "Medical Professional Licensing (DOH/DHA)" },
      { id: "pc-4", name: "Engineer License Registration" },
      { id: "pc-5", name: "ICV Certification" },
      { id: "pc-6", name: "ISO Certification" },
    ],
  },
  {
    id: "typing-office",
    name: "Typing & Office Services",
    shortName: "Typing & Office",
    description:
      "Front-office document drafting, bilingual typing, executive CV writing, high-speed printing, and digital marketing.",
    services: [
      { id: "to-1", name: "Arabic & English Typing" },
      { id: "to-2", name: "Transactions Follow-up" },
      { id: "to-3", name: "Professional CV Writing", isNew: true },
      { id: "to-4", name: "PRINT Color and Black", isNew: true },
      { id: "to-5", name: "Digital Marketing Abu Dhabi" },
    ],
  },
];

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

export default function WhatWeDoSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Refs for bulletproof timer tracking
  const isHoveringRef = useRef<boolean>(false);
  const manualPauseUntilRef = useRef<number>(0);
  const nextAdvanceTimeRef = useRef<number>(Date.now() + 3000);

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

  // High-precision 250ms scheduler: guarantees auto-rotation every 3s,
  // pauses during hover or search, and respects the 10-second manual click pause
  useEffect(() => {
    nextAdvanceTimeRef.current = Date.now() + 3000;

    const interval = setInterval(() => {
      const now = Date.now();

      // Skip if user is actively searching
      if (searchQuery.trim()) {
        nextAdvanceTimeRef.current = now + 3000;
        return;
      }

      // Skip if user is hovering directly on any text item
      if (isHoveringRef.current) {
        nextAdvanceTimeRef.current = now + 3000;
        return;
      }

      // Skip if within the 10-second manual click freeze
      if (now < manualPauseUntilRef.current) {
        nextAdvanceTimeRef.current = manualPauseUntilRef.current + 3000;
        return;
      }

      // If time reached, advance to the next category!
      if (now >= nextAdvanceTimeRef.current) {
        setActiveIndex((prev) => (prev + 1) % CATEGORIES.length);
        nextAdvanceTimeRef.current = now + 3000;
      }
    }, 250);

    return () => clearInterval(interval);
  }, [searchQuery]);

  // When user manually clicks a category button:
  // Immediately switch & freeze auto-advance for 10 full seconds!
  const handleSelectCategory = (index: number) => {
    setActiveIndex(index);
    manualPauseUntilRef.current = Date.now() + 10000;
    nextAdvanceTimeRef.current = Date.now() + 13000;
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
    <section className="what-we-do-split-section" id="services">
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
                    <div
                      key={`search-${category.id}-${service.id}`}
                      className="service-bullet-item"
                      style={{ animationDelay: `${idx * 35}ms` }}
                      onMouseEnter={() => { isHoveringRef.current = true; }}
                      onMouseLeave={() => { isHoveringRef.current = false; }}
                    >
                      <span className="service-bullet-dot" aria-hidden="true" />
                      <span className="service-bullet-title">{service.name}</span>
                      <span className="service-category-tag">{category.shortName}</span>
                      {service.isNew && <span className="service-new-tag">NEW</span>}
                    </div>
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
                  <div
                    key={`${activeCategory.id}-${service.id}`}
                    className="service-bullet-item"
                    style={{ animationDelay: `${idx * 40}ms` }}
                    onMouseEnter={() => { isHoveringRef.current = true; }}
                    onMouseLeave={() => { isHoveringRef.current = false; }}
                  >
                    <span className="service-bullet-dot" aria-hidden="true" />
                    <span className="service-bullet-title">{service.name}</span>
                    {service.isNew && <span className="service-new-tag">NEW</span>}
                  </div>
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
