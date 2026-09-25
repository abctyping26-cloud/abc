import HeroSection from "./components/HeroSection";
import AboutQuoteSection from "./components/AboutQuoteSection";
import WhatWeDoSection from "./components/WhatWeDoSection";
import ProcessSection from "./components/ProcessSection";
import ConsultancySection from "./components/ConsultancySection";
import WhyUsSection from "./components/WhyUsSection";
import EnquirySection from "./components/EnquirySection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutQuoteSection />
      <WhatWeDoSection />
      <ProcessSection />
      <ConsultancySection />
      <WhyUsSection />
      <EnquirySection />
      <FAQSection />
      <Footer />
      <FloatingActions />
    </main>
  );
}
