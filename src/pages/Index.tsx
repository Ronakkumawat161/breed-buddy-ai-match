import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeatureHighlights from "@/components/FeatureHighlights";
import Footer from "@/components/Footer";
import QuizModal, { QuizAnswers } from "@/components/QuizModal";
import PaymentModal from "@/components/PaymentModal";
import ResultsModal from "@/components/ResultsModal";
import { findBestBreedMatch, BreedMatch } from "@/utils/breedMatcher";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [breedMatch, setBreedMatch] = useState<BreedMatch | null>(null);
  const { toast } = useToast();

  const handleStartQuiz = () => {
    setIsQuizOpen(true);
  };

  const handleQuizComplete = (answers: QuizAnswers) => {
    setQuizAnswers(answers);
    setIsQuizOpen(false);
    setIsPaymentOpen(true);
  };

  const handlePaymentComplete = async () => {
    setIsPaymentOpen(false);
    
    if (quizAnswers) {
      try {
        // Call AI-powered breed matcher
        toast({
          title: "Analyzing your answers...",
          description: "Our AI is finding your perfect breed match",
        });

        const { data, error } = await supabase.functions.invoke('ai-breed-matcher', {
          body: { answers: quizAnswers }
        });

        if (error) {
          throw error;
        }

        const { breedMatch, aiPrompt, aiResponse } = data;
        setBreedMatch(breedMatch);
        
        // Save quiz results to Supabase with AI data
        const { error: saveError } = await supabase
          .from('quiz_results')
          .insert([{
            user_answers: quizAnswers as any,
            breed_matched: breedMatch.name,
            breed_description: breedMatch.description,
            ai_response_prompt: aiPrompt + '\n\nAI Response: ' + aiResponse
          }]);

        if (saveError) {
          console.error('Error saving quiz results:', saveError);
          toast({
            title: "Warning",
            description: "Results generated but not saved. Please contact support if needed.",
            variant: "destructive"
          });
        }
        
        setIsResultsOpen(true);
        
        toast({
          title: "Perfect Match Found! 🎉",
          description: `AI recommends: ${breedMatch.name} (${breedMatch.compatibility}% compatibility)`,
        });

      } catch (error) {
        console.error('Error getting AI breed recommendation:', error);
        
        // Fallback to static matcher
        const match = findBestBreedMatch(quizAnswers);
        setBreedMatch(match);
        setIsResultsOpen(true);
        
        toast({
          title: "Match Found!",
          description: `Breed recommendation: ${match.name}`,
          variant: "destructive"
        });
      }
    }
  };

  const handleCloseResults = () => {
    setIsResultsOpen(false);
    setQuizAnswers(null);
    setBreedMatch(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onStartQuiz={handleStartQuiz} />
      <HowItWorks />
      <FeatureHighlights />
      <Footer />
      
      <QuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)}
        onComplete={handleQuizComplete}
      />
      
      <PaymentModal 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onPaymentComplete={handlePaymentComplete}
      />
      
      <ResultsModal 
        isOpen={isResultsOpen}
        onClose={handleCloseResults}
        breedMatch={breedMatch}
      />
    </div>
  );
};

export default Index;
