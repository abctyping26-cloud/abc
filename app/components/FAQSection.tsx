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
    question: "WHAT IS THE DURATION FOR COMPANY LIQUIDATION IN UAE?",
    answer:
      "It generally takes 2-3 months, depending on the business type and clearance requirements.",
  },
  {
    id: 2,
    question: "WHICH DOCUMENTS ARE NEEDED?",
    answer:
      "Trade license, Memorandum of Association - MOA, if any, visa clearances for employees, passport copies, Emirates ID, mobile numbers. Personal details of authorized persons.",
  },
  {
    id: 3,
    question: "DO YOU PROVIDE VISA CANCELLATION SERVICES?",
    answer:
      "Yes, we handle visa cancellations according to customer requirements, including grace and immigration cancellation processes; costs will be additional.",
  },
  {
    id: 4,
    question:
      "CAN YOU ASSIST WITH SETTLING OUTSTANDING DEBTS AND LIABILITIES DURING LIQUIDATION?",
    answer:
      "Yes, we do final audit reports from our end for liquidation but the debts and liabilities of the companies to another companies or individuals shall be dealt by us.",
  },
  {
    id: 5,
    question:
      "DO I NEED TO BE PHYSICALLY PRESENT IN THE UAE FOR THE LIQUIDATION PROCESS?",
    answer:
      "In most cases, physical presence is not required. We can manage the entire process on your behalf with proper authorization, but must be inside UAE during the visa and immigration cancellation process.",
  },
  {
    id: 6,
    question: "ARE ALL DEBTS COVERED DURING THE LIQUIDATION PROCESS?",
    answer:
      "We lead the company through the legal liquidation process, ensuring debts registered under the company are cleared. However, legal debt clearance to other companies or persons is not included.",
  },
];

export default function FAQSection() {
  // Store open state for each FAQ item (by default, items are open as in original HTML)
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
  });

  const toggleFAQ = (id: number) => {
    setOpenMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-grid">
          {faqs.map((faq) => {
            const isOpen = openMap[faq.id] ?? false;
            return (
              <div
                key={faq.id}
                className={`faq-item ${isOpen ? "active" : "collapsed"}`}
              >
                <button
                  className="faq-question-btn"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
