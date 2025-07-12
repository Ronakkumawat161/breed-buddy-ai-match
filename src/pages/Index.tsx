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
      const match = findBestBreedMatch(quizAnswers);
      setBreedMatch(match);
      
      // Save quiz results to Supabase
      try {
        const { error } = await supabase
          .from('quiz_results')
          .insert([{
            user_answers: quizAnswers as any,
            breed_matched: match.name,
            breed_description: match.description,
            ai_response_prompt: `User preferences: ${JSON.stringify(quizAnswers)} | Matched breed: ${match.name} (${match.compatibility}% compatibility)`
          }]);

        if (error) {
          console.error('Error saving quiz results:', error);
          toast({
            title: "Warning",
            description: "Results generated but not saved. Please contact support if needed.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error saving quiz results:', error);
      }
      
      setIsResultsOpen(true);
      
      toast({
        title: "Payment Successful! 🎉",
        description: `Your perfect breed match has been found: ${match.name}`,
      });
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
