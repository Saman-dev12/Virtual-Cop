import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FileText, Lock, Scale } from "lucide-react";

const FeaturesSection = () => (
  <section className="py-20 px-4 max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">
        Revolutionizing Emergency & FIR Systems
      </h2>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        A seamless integration of AI and blockchain to transform public safety
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          icon: <FileText className="w-6 h-6 text-orange-500" />,
          title: "AI-Analyzed Emergency Calls",
          description:
            "Auto-detect urgency from distress calls and route them instantly to the nearest available unit.",
        },
        {
          icon: <Lock className="w-6 h-6 text-orange-500" />,
          title: "Tamper-Proof Storage",
          description:
            "Complaints are stored on IPFS and FIRs are written to the blockchain for permanent, unalterable records.",
        },
        {
          icon: <Scale className="w-6 h-6 text-orange-500" />,
          title: "Verified Legal Insights",
          description:
            "Get instant AI-powered legal advice based on your complaint with references to relevant laws.",
        },
      ].map((feature, idx) => (
        <Card key={idx} className="hover:shadow-orange-glow transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{feature.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default FeaturesSection;
