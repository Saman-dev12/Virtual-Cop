import { Header } from "./components/header";
import { Footer } from "./components/footer";

import VeriFIR from "./components/verifir-for";
import HeroSection from "./components/hero-section";
import ToolsSection from "./components/tools-section";
import CallToAction from "./components/call-to-action";
import SafetyFeatures from "./components/safety-features";
import FeaturesSection from "./components/features-section";
import BenefitsSection from "./components/benefits-section";
import GuidanceSection from "./components/guidance-section";

export default function Home() {
  return (
    <div className="dark bg-background text-foreground">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <ToolsSection />
      <GuidanceSection />
      <SafetyFeatures />
      <VeriFIR />
      <CallToAction />
      <Footer />
    </div>
  );
}
