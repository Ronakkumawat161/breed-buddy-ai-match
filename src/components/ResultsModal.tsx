import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Heart, Star, Info } from "lucide-react";
import { BreedMatch } from "@/utils/breedMatcher";

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  breedMatch: BreedMatch | null;
}

export default function ResultsModal({ isOpen, onClose, breedMatch }: ResultsModalProps) {
  if (!isOpen || !breedMatch) return null;

  const compatibilityPercentage = Math.round((breedMatch.compatibility / 150) * 100);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl flex items-center gap-2">
              🎉 Your Perfect Match!
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Breed Hero Section */}
          <div className="text-center space-y-4">
            <div className="text-8xl">{breedMatch.image}</div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">{breedMatch.name}</h2>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Heart className="w-3 h-3 mr-1" />
                  {compatibilityPercentage}% Match
                </Badge>
              </div>
            </div>
          </div>

          {/* Compatibility Score */}
          <div className="bg-gradient-card p-6 rounded-2xl border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                Compatibility Score
              </h3>
              <span className="text-2xl font-bold text-primary">{compatibilityPercentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-gradient-accent h-3 rounded-full transition-all duration-1000" 
                style={{ width: `${compatibilityPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Key Traits */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Why This Breed is Perfect for You
            </h3>
            <div className="flex flex-wrap gap-2">
              {breedMatch.traits.map((trait, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {trait}
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-card border border-border p-6 rounded-2xl space-y-4">
            <h3 className="font-semibold">About {breedMatch.name}s</h3>
            <p className="text-muted-foreground leading-relaxed">
              {breedMatch.description}
            </p>
          </div>

          {/* Care Information */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-center">
              <div className="text-2xl mb-2">🏃</div>
              <h4 className="font-medium text-sm">Exercise Needs</h4>
              <p className="text-xs text-blue-600 font-semibold">{breedMatch.exerciseNeeds}</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-medium text-sm">Care Level</h4>
              <p className="text-xs text-purple-600 font-semibold">{breedMatch.careLevel}</p>
            </div>
            <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-center">
              <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
              <h4 className="font-medium text-sm">Family Friendly</h4>
              <p className="text-xs text-green-600 font-semibold">
                {breedMatch.familyFriendly ? "Excellent" : "Good"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button variant="hero" size="lg" className="flex-1">
              🐾 Find {breedMatch.name} Breeders
            </Button>
            <Button variant="outline" size="lg" className="flex-1" onClick={onClose}>
              Take Quiz Again
            </Button>
          </div>

          {/* Footer Note */}
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              🎯 Remember: Every dog is unique! This recommendation is based on typical breed characteristics. 
              Always meet your potential companion before making a decision.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}