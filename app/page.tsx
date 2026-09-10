import MobileGate from "./components/MobileGate";
import HeroSection from "./components/HeroSection";
import AboutQuoteSection from "./components/AboutQuoteSection";
import WhatWeDoSection from "./components/WhatWeDoSection";
import ProcessSection from "./components/ProcessSection";
import FAQSection from "./components/FAQSection";

export default function Home() {
  return (
    <>
      {/* Mobile Safety Gate (shows prompt when viewed on mobile / small screen) */}
      <MobileGate />

      {/* Main Website Experience */}
      <main>
        <HeroSection />
        <AboutQuoteSection />
        <WhatWeDoSection />
        <ProcessSection />
        <FAQSection />
      </main>
    </>
  );
}

