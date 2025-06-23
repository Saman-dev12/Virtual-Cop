import { ShieldAlert, AlertCircle, Search } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";

const HeroSection = () => (
  <section className="relative flex flex-col items-center justify-center sm:min-h-[100vh] px-4 text-center overflow-hidden">
    <div className="flex justify-center sm:mt-0 mt-8 overflow-hidden">
      <Spotlight className="hidden sm:block" />
    </div>
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/20 z-10" />
    </div>

    <div className="relative z-20 w-full max-w-4xl space-y-6">
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 sm:mb-8 rounded-full bg-orange-500/10 text-orange-500 mx-auto">
        <ShieldAlert className="w-4 h-4" />
        <span className="text-sm font-medium">Justice Reinvented</span>
      </div>

      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight sm:leading-tight">
        <span className="text-gradient-orange block sm:inline">Justice.</span>{" "}
        <span className="text-gradient-orange block sm:inline">Verified.</span>{" "}
        <span className="text-gradient-orange block sm:inline">Fast.</span>
      </h1>

      <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0">
        Empowering citizens and law enforcement with AI-powered emergency
        response, tamper-proof FIR filing, and transparent case management — all
        on the blockchain.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 sm:pt-8">
        <Button variant="default" size="lg">
          <AlertCircle className="w-5 h-5 mr-2" />
          File a Complaint
        </Button>
        <Button variant="outline" size="lg">
          <Search className="w-5 h-5 mr-2" />
          View Crime Data
        </Button>
      </div>
    </div>
  </section>
);

export default HeroSection;
