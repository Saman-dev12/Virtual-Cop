import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Clock, Filter } from "lucide-react";

export default function SafetyFeatures() {
  const features = [
    {
      icon: <MapPin className="w-6 h-6 text-orange-500" />,
      title: "Local Crime Heatmaps",
      description:
        "Visualize crime data by location to stay updated about incidents near your area and make safer decisions.",
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      title: "Real-Time Alerts",
      description:
        "Get immediate notifications about emergencies, curfews, or major criminal activities in your area.",
    },
    {
      icon: <Filter className="w-6 h-6 text-orange-500" />,
      title: "Customized Safety Feeds",
      description:
        "Tailor your dashboard to receive updates based on your location, preferred crime categories, or specific keywords.",
    },
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Stay Informed. Stay Safe.</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Real-time insights and personalized alerts to keep you and your
          community secure — anytime, anywhere.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="hover:shadow-orange-glow transition-shadow"
          >
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
}
