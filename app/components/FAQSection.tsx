"use client";

import { useState } from "react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What is the duration for company liquidation in UAE?",
    answer:
      "It generally takes 2-3 months, depending on the business type, jurisdiction (Mainland or Free Zone), and government clearance requirements.",
  },
  {
    id: 2,
    question: "Which documents are needed?",
    answer:
      "Trade license copy, Memorandum of Association (MOA), visa clearances for employees, partner passport copies, Emirates ID, and mobile numbers, along with personal details of authorized signatories.",
  },
  {
    id: 3,
    question: "Do you provide visa cancellation services?",
    answer:
      "Yes, we handle all partner and employee visa cancellations according to customer requirements, including grace period facilitation and immigration cancellation processes.",
  },
  {
    id: 4,
    question:
      "Can you assist with settling outstanding debts and liabilities during liquidation?",
    answer:
      "Yes, we prepare official final audit liquidation reports from our end and facilitate legal clearances and settlement documentation for creditors and entities.",
  },
  {
    id: 5,
    question:
      "Do I need to be physically present in the UAE for the liquidation process?",
    answer:
      "In most cases, physical presence is not required. We can manage the entire process on your behalf with proper Power of Attorney (POA), though authorized signatories must be inside the UAE during the final visa and immigration cancellation process.",
  },
  {
    id: 6,
    question: "Are all debts covered during the liquidation process?",
    answer:
      "We lead the company through the formal liquidation process, ensuring debts registered under the commercial license are cleared. However, private civil obligations or non-company personal liabilities must be handled directly by the stakeholders.",
  },
  {
    id: 7,
    question: "What happens to the company bank account during liquidation?",
    answer:
      "Once the liquidation board resolution is notarized and the liquidator is officially appointed, the corporate bank account is frozen and converted into a liquidation account under the liquidator's supervision to settle debts and disburse final balances.",
  },
  {
    id: 8,
    question: "How long is the mandatory creditor notice period in UAE?",
    answer:
      "Under UAE commercial company law, a minimum 45-day notice period must be published in two local Arabic newspapers to allow creditors to submit claims before final license cancellation can be approved.",
  },
  {
    id: 9,
    question: "Can a Free Zone company be liquidated without a final audit?",
    answer:
      "Most UAE Free Zone authorities (such as DAFZA, JAFZA, ADGM, and DMCC) strictly require a final liquidation audit report prepared by an officially registered UAE auditing firm before issuing the final deregistration certificate.",
  },
];

export default function FAQSection() {
  // First item open by default, matching the attached design
  const [openId, setOpenId] = useState<number | null>(1);
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 4);

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="faq-layout">
          {/* Left Column: Large FAQs Title */}
          <div className="faq-left-col" data-aos="fade-right" data-aos-duration="800">
            <h2 className="faq-main-title">FAQs</h2>
          </div>

          {/* Right Column: Stack of Accordion Cards */}
          <div
            className="faq-right-col"
            data-aos="fade-left"
            data-aos-duration="800"
            role="region"
            aria-label="Frequently Asked Questions list"
          >
            {visibleFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`faq-card ${isOpen ? "is-open" : "is-collapsed"}`}
                >
                  <button
                    className="faq-question-btn"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <span className="faq-toggle-icon" aria-hidden="true">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>
                  <div className="faq-answer-wrap">
                    <div className="faq-answer-content">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* See More Actions */}
            {faqs.length > 4 && (
              <div className="faq-see-more-wrap">
                {!showAll ? (
                  <button
                    type="button"
                    onClick={() => setShowAll(true)}
                    className="faq-see-more-btn"
                    aria-expanded={false}
                  >
                    <span>See More</span>
                    <svg
                      className="faq-see-more-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                ) : (
                  <>
                    {/* Button 1: See Less (collapses the list) */}
                    <button
                      type="button"
                      onClick={() => setShowAll(false)}
                      className="faq-see-more-btn faq-btn-secondary"
                      aria-expanded={true}
                    >
                      <span>See Less</span>
                      <svg
                        className="faq-see-more-icon is-rotated"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {/* Button 2: See More with right angle (inactive link to new page) */}
                    <a
                      href="#faq-all"
                      onClick={(e) => e.preventDefault()}
                      className="faq-see-more-btn faq-btn-primary"
                      aria-label="See more FAQs on new page (coming soon)"
                      role="button"
                    >
                      <span>See More</span>
                      <svg
                        className="faq-right-angle-icon"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
