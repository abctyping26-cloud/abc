import MobileGate from "./components/MobileGate";
import HeroSection from "./components/HeroSection";
import AboutQuoteSection from "./components/AboutQuoteSection";
import WhatWeDoSection from "./components/WhatWeDoSection";
import ProcessSection from "./components/ProcessSection";
import WhyUsSection from "./components/WhyUsSection";
import EnquirySection from "./components/EnquirySection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";

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
        <WhyUsSection />
        <EnquirySection />
        <FAQSection />
        <Footer />
        <FloatingActions />
      </main>
    </>
  );
}



