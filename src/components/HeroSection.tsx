import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-dog.jpg";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onStartQuiz: () => void;
}

export default function HeroSection({ onStartQuiz }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI-Powered Breed Matching
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Find Your
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Perfect </span>
                Dog Breed
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Take our AI-powered quiz to discover the ideal dog breed that matches your lifestyle, 
                living situation, and preferences. Get personalized recommendations in minutes.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={onStartQuiz}
                className="group"
              >
                Start the Quiz ($1)
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm text-muted-foreground">
                ✨ Get instant AI-powered breed recommendations
              </p>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="text-2xl">🐶</span>
                <span>50+ Breeds</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl">⚡</span>
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl">🎯</span>
                <span>AI-Powered</span>
              </div>
            </div>
          </div>

          {/* Right side - Hero image */}
          <div className="relative animate-scale-in">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Happy dog - your perfect companion awaits" 
                className="w-full h-auto rounded-3xl shadow-soft"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-3xl"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-soft">
              🐾 AI-Powered
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-border px-4 py-2 rounded-full text-sm font-medium shadow-soft">
              💡 Instant Match
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}