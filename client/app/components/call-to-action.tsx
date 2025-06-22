import { Button } from "@/components/ui/button";
import { FileText, BarChart2 } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          Justice Shouldn't Wait. Neither Should You.
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
          Join the movement toward safer, smarter communities.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="xl">
            <FileText className="w-5 h-5 mr-2" />
            Register Complaint
          </Button>
          <Button
            variant="outline"
            className="px-8 py-6 text-lg border-orange-500 text-orange-500 hover:bg-orange-500/10"
          >
            <BarChart2 className="w-5 h-5 mr-2" />
            Explore Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
}
