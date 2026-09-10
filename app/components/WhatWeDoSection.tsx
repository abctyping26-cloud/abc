export default function WhatWeDoSection() {
  const stream1 = [
    { name: "Business Setup Services", cls: "drift-up-1 float-a" },
    { name: "Businessmen Services", cls: "drift-down-1 float-b" },
    { name: "Corporate Services", cls: "drift-up-2 float-c" },
    { name: "Company Formation Services", cls: "drift-down-2 float-d" },
    { name: "PRO Services", cls: "drift-up-3 float-a" },
    { name: "Golden Visa Services", cls: "drift-down-3 float-b" },
  ];

  const stream2 = [
    { name: "Investor Visa Services", cls: "drift-down-2 float-c" },
    { name: "Family Visa Services", cls: "drift-up-3 float-d" },
    { name: "Employment Visa Services", cls: "drift-down-1 float-a" },
    { name: "Visit Visa Services", cls: "drift-up-1 float-b" },
    { name: "Domestic Worker Visa", cls: "drift-down-3 float-c" },
    { name: "Foreign Visa Services", cls: "drift-up-2 float-d" },
    { name: "Family Visa Holding", cls: "drift-down-4 float-a" },
  ];

  const stream3 = [
    { name: "Insurance Services", cls: "drift-up-2 float-b" },
    { name: "Fine Reduction Services", cls: "drift-down-2 float-c" },
    { name: "Trademark Registration", cls: "drift-up-4 float-d" },
    { name: "CISPA & Port Passes", cls: "drift-down-1 float-a" },
    { name: "ICV Certification", cls: "drift-up-1 float-b" },
    { name: "ISO Certification", cls: "drift-down-3 float-c" },
  ];

  const leftCrescent = [
    { name: "Copyright Registration", cls: "drift-up-2 float-a" },
    { name: "Virtual Offices", cls: "drift-down-1 float-b" },
    { name: "Patent Registration", cls: "drift-down-3 float-c" },
    { name: "Business Bank Account", cls: "drift-up-1 float-d" },
  ];

  const rightCrescent = [
    { name: "Notary Services", cls: "drift-up-1 float-b" },
    { name: "Legal, Normal Translation", cls: "drift-down-2 float-c" },
    { name: "Typing, Transactions Follow-up", cls: "drift-down-3 float-d" },
    { name: "Document, Certificate Attestation", cls: "drift-up-3 float-a" },
  ];

  const stream4 = [
    { name: "Government Entity Services", cls: "drift-down-1 float-a" },
    { name: "ADNOC Registration", cls: "drift-up-2 float-b" },
    { name: "Digital Marketing", cls: "drift-down-2 float-c" },
    { name: "UAE TAX & VAT Services", cls: "drift-up-1 float-d" },
    { name: "Driving License Services", cls: "drift-down-3 float-a" },
  ];

  const stream5 = [
    { name: "Vehicle Services", cls: "drift-up-3 float-b" },
    { name: "Police Clearance Certificate", cls: "drift-down-1 float-c" },
    { name: "Legal, Court Services", cls: "drift-up-2 float-d" },
    { name: "Approval & NOC Services", cls: "drift-down-2 float-a" },
    { name: "Equivalency Certificate", cls: "drift-up-1 float-b" },
    { name: "Engineer License", cls: "drift-down-4 float-c" },
  ];

  const stream6 = [
    { name: "Medical Professional Licensing Services", cls: "drift-up-2 float-d" },
    { name: "Genuineness Certificate", cls: "drift-down-1 float-a" },
    { name: "ILOE Insurance", cls: "drift-up-3 float-b" },
    { name: "Travel Desk", cls: "drift-down-2 float-c" },
  ];

  return (
    <section className="what-we-do-section" id="services">
      <div className="what-we-do-container">
        {/* Top Floating Waves */}
        <div className="what-we-do-stream">
          {stream1.map((item) => (
            <span key={item.name} className={`service-rect-btn ${item.cls}`}>
              {item.name}
            </span>
          ))}
        </div>

        <div className="what-we-do-stream">
          {stream2.map((item) => (
            <span key={item.name} className={`service-rect-btn ${item.cls}`}>
              {item.name}
            </span>
          ))}
        </div>

        <div className="what-we-do-stream">
          {stream3.map((item) => (
            <span key={item.name} className={`service-rect-btn ${item.cls}`}>
              {item.name}
            </span>
          ))}
        </div>

        {/* Middle Tier: Left Crescent + Central Title Hub + Right Crescent */}
        <div className="what-we-do-middle-tier">
          <div className="what-we-do-crescent">
            {leftCrescent.map((item) => (
              <span key={item.name} className={`service-rect-btn ${item.cls}`}>
                {item.name}
              </span>
            ))}
          </div>

          <div className="what-we-do-center-hub">
            <span className="what-we-do-kicker">SERVICES &amp; CAPABILITIES</span>
            <h2 className="what-we-do-main-title">What We Do</h2>
          </div>

          <div className="what-we-do-crescent">
            {rightCrescent.map((item) => (
              <span key={item.name} className={`service-rect-btn ${item.cls}`}>
                {item.name}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Floating Waves */}
        <div className="what-we-do-stream">
          {stream4.map((item) => (
            <span key={item.name} className={`service-rect-btn ${item.cls}`}>
              {item.name}
            </span>
          ))}
        </div>

        <div className="what-we-do-stream">
          {stream5.map((item) => (
            <span key={item.name} className={`service-rect-btn ${item.cls}`}>
              {item.name}
            </span>
          ))}
        </div>

        <div className="what-we-do-stream">
          {stream6.map((item) => (
            <span key={item.name} className={`service-rect-btn ${item.cls}`}>
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
