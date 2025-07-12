import { CheckCircle, CreditCard, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Answer Questions",
      description: "Complete our smart AI quiz about your lifestyle, home, and preferences",
      step: "01"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Pay $1",
      description: "One-time payment for your personalized AI-powered breed recommendation",
      step: "02"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Get Your Match",
      description: "Receive your perfect dog breed match with detailed insights and care tips",
      step: "03"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI analyzes your responses to match you with the perfect dog breed in just 3 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-px bg-gradient-to-r from-primary/50 via-primary to-primary/50 transform -translate-y-1/2"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-6 hover:shadow-soft transition-all duration-300 hover:scale-105">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  {step.icon}
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}