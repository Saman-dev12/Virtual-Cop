import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, User, Gavel } from "lucide-react";

export default function VeriFIR() {
  const audience = [
    {
      title: "Citizens",
      icon: <Users className="w-8 h-8 text-orange-500" />,
      description:
        "File complaints, access legal advice, and track case progress with full transparency.",
    },
    {
      title: "Law Enforcement",
      icon: <User className="w-8 h-8 text-orange-500" />,
      description:
        "Manage cases efficiently with automated tools and blockchain-backed documentation.",
    },
    {
      title: "Administrators",
      icon: <Gavel className="w-8 h-8 text-orange-500" />,
      description:
        "Monitor crime data, department performance, and resource allocation in real-time.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black/80 to-black/20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Who Is VeriFIR For?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A unified platform serving all stakeholders in public safety
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {audience.map((item, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
