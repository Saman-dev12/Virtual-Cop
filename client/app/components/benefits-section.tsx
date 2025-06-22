const BenefitsSection = () => (
  <section className="py-20 px-4 bg-gradient-to-b from-black/80 to-black/20">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">What You Get with VeriFIR</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Comprehensive tools for citizens and law enforcement
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {[
          "Decentralized complaint storage (IPFS)",
          "Blockchain-backed FIR filing",
          "AI urgency detection for emergency calls",
          "Case assignment to police automatically",
          "Transparent, immutable report history",
          "AI-driven legal suggestions",
          "Real-time local crime trends",
          "Citizen-friendly complaint portal",
        ].map((text, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center mt-1 flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
            </div>
            <p className="text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
