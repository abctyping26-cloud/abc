"use client";

import { useState } from "react";

const SERVICE_KEYWORDS = [
  "insurance",
  "attestation",
  "visa",
  "business",
  "corporate",
  "company",
  "formation",
  "investor",
  "golden",
  "family",
  "employment",
  "visit",
  "domestic",
  "worker",
  "foreign",
  "holding",
  "fine",
  "reduction",
  "trademark",
  "registration",
  "certification",
  "copyright",
  "virtual",
  "offices",
  "patent",
  "bank",
  "account",
  "notary",
  "legal",
  "translation",
  "government",
  "entity",
  "marketing",
  "tax",
  "vat",
  "driving",
  "license",
  "vehicle",
  "police",
  "clearance",
  "court",
  "approval",
  "noc",
  "equivalency",
  "engineer",
  "medical",
  "licensing",
  "genuineness",
  "travel",
  "desk",
  "typing",
  "transactions",
  "insurance services",
  "business setup services",
  "businessmen services",
  "company formation services",
  "golden visa services",
  "investor visa services",
  "family visa services",
  "employment visa services",
  "visit visa services",
  "domestic worker visa",
  "foreign visa services",
  "family visa holding",
  "fine reduction services",
  "trademark registration",
  "cispa & port passes",
  "icv certification",
  "iso certification",
  "copyright registration",
  "virtual offices",
  "patent registration",
  "business bank account",
  "notary services",
  "legal, normal translation",
  "government entity services",
  "adnoc registration",
  "typing, transactions follow-up",
  "digital marketing",
  "uae tax & vat services",
  "driving license services",
  "vehicle services",
  "police clearance certificate",
  "legal, court services",
  "approval & noc services",
  "document, certificate attestation",
  "equivalency certificate",
  "engineer license",
  "medical professional licensing services",
  "genuineness certificate",
  "iloe insurance",
  "travel desk",
];

const getSuggestionSuffix = (input: string): string => {
  if (!input) return "";
  const lower = input.toLowerCase();

  // Find matches starting with lower that are longer
  const matches = SERVICE_KEYWORDS.filter(
    (kw) => kw.startsWith(lower) && kw.length > lower.length
  );

  if (matches.length > 0) {
    // Pick optimal match: shortest word/phrase first (e.g. insu -> insurance)
    matches.sort((a, b) => a.length - b.length);
    return matches[0].slice(lower.length);
  }

  // If trailing space or punctuation, check trimmed
  const trimmed = lower.trim();
  if (trimmed && trimmed !== lower) {
    const trimmedMatches = SERVICE_KEYWORDS.filter(
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
  const [searchQuery, setSearchQuery] = useState("");
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

  // Balanced 43 items across 6 full streams + 2 middle flank clusters:
  // Top: Stream 1 (6 items), Stream 2 (6 items), Stream 3 (6 items)
  // Middle: Left Flank (4 items) + Center Title + Right Flank (4 items)
  // Bottom: Stream 4 (6 items), Stream 5 (6 items), Stream 6 (5 items)
  // Total: 6 + 6 + 6 + 4 + 4 + 6 + 6 + 5 = 43 items!

  const query = searchQuery.toLowerCase().trim();
  const getItemClass = (item: { name: string; cls: string }) => {
    if (!query) return `service-rect-btn ${item.cls}`;
    const isMatch = item.name.toLowerCase().includes(query);
    return `service-rect-btn ${item.cls} ${isMatch ? "btn-matched" : "btn-dimmed"}`;
  };

  const stream1 = [
    { name: "Business Setup Services", cls: "drift-up-1 float-a" },
    { name: "Corporate Services", cls: "drift-down-2 float-c" },
    { name: "PRO Services", cls: "drift-up-2 float-b" },
    { name: "Attestation", cls: "drift-down-1 float-d" },
    { name: "Golden Visa Services", cls: "drift-up-3 float-a" },
    { name: "Investor Visa Services", cls: "drift-down-3 float-b" },
  ];

  const stream2 = [
    { name: "Businessmen Services", cls: "drift-down-1 float-b" },
    { name: "Company Formation Services", cls: "drift-up-1 float-d" },
    { name: "Family Visa Services", cls: "drift-down-2 float-a" },
    { name: "Employment Visa Services", cls: "drift-up-2 float-c" },
    { name: "Visit Visa Services", cls: "drift-down-3 float-b" },
    { name: "Domestic Worker Visa", cls: "drift-up-3 float-d" },
  ];

  const stream3 = [
    { name: "Foreign Visa Services", cls: "drift-up-2 float-c" },
    { name: "Family Visa Holding", cls: "drift-down-1 float-a" },
    { name: "Fine Reduction Services", cls: "drift-up-1 float-d" },
    { name: "Trademark Registration", cls: "drift-down-2 float-b" },
    { name: "CISPA & Port Passes", cls: "drift-up-3 float-c" },
    { name: "ICV Certification", cls: "drift-down-1 float-a" },
  ];

  // Middle Tier Flanks: 2 sub-rows of 2 items each, framing the center title
  const leftFlankRow1 = [
    { name: "Copyright Registration", cls: "drift-up-1 float-b" },
    { name: "Virtual Offices", cls: "drift-down-2 float-d" },
  ];

  const leftFlankRow2 = [
    { name: "Patent Registration", cls: "drift-down-1 float-a" },
    { name: "Business Bank Account", cls: "drift-up-2 float-c" },
  ];

  const rightFlankRow1 = [
    { name: "Notary Services", cls: "drift-up-2 float-c" },
    { name: "Legal, Normal Translation", cls: "drift-down-1 float-a" },
  ];

  const rightFlankRow2 = [
    { name: "ISO Certification", cls: "drift-down-2 float-b" },
    { name: "Insurance Services", cls: "drift-up-1 float-d" },
  ];

  const stream4 = [
    { name: "Government Entity Services", cls: "drift-down-2 float-c" },
    { name: "ADNOC Registration", cls: "drift-up-1 float-b" },
    { name: "Typing, Transactions Follow-up", cls: "drift-down-1 float-d" },
    { name: "Digital Marketing", cls: "drift-up-2 float-a" },
    { name: "UAE TAX & VAT Services", cls: "drift-down-3 float-c" },
    { name: "Driving License Services", cls: "drift-up-3 float-b" },
  ];

  const stream5 = [
    { name: "Vehicle Services", cls: "drift-up-1 float-a" },
    { name: "Police Clearance Certificate", cls: "drift-down-2 float-d" },
    { name: "Legal, Court Services", cls: "drift-up-2 float-b" },
    { name: "Approval & NOC Services", cls: "drift-down-1 float-c" },
    { name: "Document, Certificate Attestation", cls: "drift-up-3 float-a" },
    { name: "Equivalency Certificate", cls: "drift-down-2 float-d" },
  ];

  const stream6 = [
    { name: "Engineer License", cls: "drift-up-2 float-c" },
    { name: "Medical Professional Licensing Services", cls: "drift-down-1 float-b" },
    { name: "Genuineness Certificate", cls: "drift-up-1 float-d" },
    { name: "ILOE Insurance", cls: "drift-down-2 float-a" },
    { name: "Travel Desk", cls: "drift-up-3 float-c" },
  ];

  return (
    <section className="what-we-do-section" id="services">
      <div className="what-we-do-container">
        {/* Top Floating Waves */}
        <div className="what-we-do-stream stream-shift-1">
          {stream1.map((item) => (
            <span key={item.name} className={getItemClass(item)}>
              {item.name}
            </span>
          ))}
        </div>

        <div className="what-we-do-stream stream-shift-2">
          {stream2.map((item) => (
            <span key={item.name} className={getItemClass(item)}>
              {item.name}
            </span>
          ))}
        </div>

        <div className="what-we-do-stream stream-shift-3">
          {stream3.map((item) => (
            <span key={item.name} className={getItemClass(item)}>
              {item.name}
            </span>
          ))}
        </div>

        {/* Middle Tier: Left Flank + Central Title Hub + Right Flank */}
        <div className="what-we-do-middle-tier">
          <div className="what-we-do-flank what-we-do-flank-left">
            <div className="what-we-do-flank-subrow flank-curve-top-left">
              {leftFlankRow1.map((item) => (
                <span key={item.name} className={getItemClass(item)}>
                  {item.name}
                </span>
              ))}
            </div>
            <div className="what-we-do-flank-subrow flank-curve-bottom-left">
              {leftFlankRow2.map((item) => (
                <span key={item.name} className={getItemClass(item)}>
                  {item.name}
                </span>
              ))}
            </div>
          </div>

          <div className="what-we-do-center-hub">
            <span className="what-we-do-kicker">SERVICES &amp; CAPABILITIES</span>
            <h2 className="what-we-do-main-title">What We Do</h2>

            {/* Minimalist Capsule Search Bar with Inline Suggestion Placeholder */}
            <div className="what-we-do-search-capsule">
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
                {/* Inline ghost suggestion placeholder layer */}
                <div className="search-ghost-text" aria-hidden="true">
                  {searchQuery ? (
                    <>
                      <span className="ghost-prefix">{searchQuery}</span>
                      <span className="ghost-suffix">{suggestionSuffix}</span>
                    </>
                  ) : (
                    <span className="ghost-placeholder">search service</span>
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
          </div>

          <div className="what-we-do-flank what-we-do-flank-right">
            <div className="what-we-do-flank-subrow flank-curve-top-right">
              {rightFlankRow1.map((item) => (
                <span key={item.name} className={getItemClass(item)}>
                  {item.name}
                </span>
              ))}
            </div>
            <div className="what-we-do-flank-subrow flank-curve-bottom-right">
              {rightFlankRow2.map((item) => (
                <span key={item.name} className={getItemClass(item)}>
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Floating Waves */}
        <div className="what-we-do-stream stream-shift-4">
          {stream4.map((item) => (
            <span key={item.name} className={getItemClass(item)}>
              {item.name}
            </span>
          ))}
        </div>

        <div className="what-we-do-stream stream-shift-5">
          {stream5.map((item) => (
            <span key={item.name} className={getItemClass(item)}>
              {item.name}
            </span>
          ))}
        </div>

        <div className="what-we-do-stream stream-shift-6">
          {stream6.map((item) => (
            <span key={item.name} className={getItemClass(item)}>
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
