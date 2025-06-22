import { AlertCircle, FileText, BarChart2, Search } from "lucide-react";

const ToolsSection = () => (
  <section className="py-20 px-4 max-w-7xl mx-auto">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl font-bold mb-6">
          Smarter Tools for Faster Justice
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Give officers the power to focus on action, not paperwork. Our system
          reduces administrative burden while increasing accountability.
        </p>

        <div className="space-y-4">
          {[
            {
              icon: <AlertCircle className="w-5 h-5 text-orange-500" />,
              text: "Auto-assignment of cases",
            },
            {
              icon: <FileText className="w-5 h-5 text-orange-500" />,
              text: "One-click blockchain FIR submission",
            },
            {
              icon: <BarChart2 className="w-5 h-5 text-orange-500" />,
              text: "Real-time dashboard of active cases",
            },
            {
              icon: <Search className="w-5 h-5 text-orange-500" />,
              text: "Track complaint history transparently",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                {item.icon}
              </div>
              <p className="font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-500/10 to-transparent rounded-2xl p-8 border border-orange-500/20">
        <div className="bg-background rounded-lg p-6 shadow-lg">
          <h3 className="font-bold text-lg mb-4">Officer Dashboard Preview</h3>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`h-4 bg-orange-500/10 rounded-full w-${
                  (i + 3) * 10
                }%`}
              />
            ))}
            <div className="h-32 bg-orange-500/10 rounded-lg mt-6" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ToolsSection;
