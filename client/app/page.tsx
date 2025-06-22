import { Header } from "./components/header";
import { Footer } from "./components/footer";

import HeroSection from "./components/hero-section";
import ToolsSection from "./components/tools-section";
import WhoIsVeriFIRFor from "./components/verifir-for";
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
      <WhoIsVeriFIRFor />
      <CallToAction />
      <Footer />
    </div>
  );
}
