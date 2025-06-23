import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

const GuidanceSection = () => (
  <section className="py-20 bg-gradient-to-b from-black/80 to-black/20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-orange-500/10 text-orange-500">
        <Scale className="w-4 h-4" />
        <span className="text-sm font-medium">AI-Powered Guidance</span>
      </div>

      <h2 className="text-4xl font-bold mb-6">
        Not Sure What to Do? Ask VeriFIR.
      </h2>
      <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
        Our AI assistant offers basic legal guidance based on your input — no
        legal jargon, no confusion.
      </p>

      <Button size="lg">
        <Scale className="w-5 h-5 mr-2" />
        Talk to Legal AI
      </Button>
    </div>
  </section>
);

export default GuidanceSection;
