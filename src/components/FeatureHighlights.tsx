import { Brain, Clock, Heart } from "lucide-react";

export default function FeatureHighlights() {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Matching",
      description: "Advanced algorithms analyze your lifestyle and preferences to find your perfect breed match",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Instant Results",
      description: "Get your personalized breed recommendation in under 5 minutes with detailed insights",
      color: "bg-green-500/10 text-green-600"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Perfect Match Guarantee",
      description: "Our AI considers 50+ breed characteristics to ensure the best possible match for your family",
      color: "bg-red-500/10 text-red-600"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Why Choose BreedMatch AI?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our advanced AI technology ensures you find the perfect canine companion for your unique lifestyle
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-6 hover:shadow-soft transition-all duration-300 group-hover:scale-105 h-full">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${feature.color}`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}