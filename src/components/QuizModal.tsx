import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { X, ArrowRight, ArrowLeft } from "lucide-react";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (answers: QuizAnswers) => void;
}

export interface QuizAnswers {
  homeType: string;
  lifestyle: string;
  experience: string;
  allergies: string;
  sizePreference: string;
  timeAvailable: string;
  livingSpace: string;
  children: string;
}

export default function QuizModal({ isOpen, onClose, onComplete }: QuizModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});

  if (!isOpen) return null;

  const questions = [
    {
      id: 'homeType',
      title: 'What type of home do you live in?',
      options: [
        { value: 'apartment', label: 'Apartment', emoji: '🏢' },
        { value: 'house', label: 'House with yard', emoji: '🏠' },
        { value: 'farm', label: 'Farm/Large property', emoji: '🚜' }
      ]
    },
    {
      id: 'lifestyle',
      title: 'How would you describe your lifestyle?',
      options: [
        { value: 'calm', label: 'Calm & relaxed', emoji: '😌' },
        { value: 'moderate', label: 'Moderately active', emoji: '🚶' },
        { value: 'active', label: 'Very active & outdoorsy', emoji: '🏃' }
      ]
    },
    {
      id: 'experience',
      title: "What's your experience with dogs?",
      options: [
        { value: 'none', label: 'First-time owner', emoji: '🐾' },
        { value: 'basic', label: 'Some experience', emoji: '🎯' },
        { value: 'confident', label: 'Very experienced', emoji: '🏆' }
      ]
    },
    {
      id: 'allergies',
      title: 'Do you have allergies to consider?',
      options: [
        { value: 'yes', label: 'Yes, need hypoallergenic', emoji: '🤧' },
        { value: 'no', label: 'No allergies', emoji: '✨' }
      ]
    },
    {
      id: 'sizePreference',
      title: 'What size dog do you prefer?',
      options: [
        { value: 'small', label: 'Small (under 25 lbs)', emoji: '🐕' },
        { value: 'medium', label: 'Medium (25-60 lbs)', emoji: '🐶' },
        { value: 'large', label: 'Large (over 60 lbs)', emoji: '🐕‍🦺' }
      ]
    },
    {
      id: 'timeAvailable',
      title: 'How much time can you dedicate daily?',
      options: [
        { value: 'low', label: '1-2 hours', emoji: '⏰' },
        { value: 'medium', label: '3-4 hours', emoji: '⏲️' },
        { value: 'high', label: '5+ hours', emoji: '⏳' }
      ]
    },
    {
      id: 'livingSpace',
      title: 'How much space do you have?',
      options: [
        { value: 'limited', label: 'Limited indoor space', emoji: '🏠' },
        { value: 'moderate', label: 'Good indoor/outdoor space', emoji: '🏡' },
        { value: 'large', label: 'Large property', emoji: '🏘️' }
      ]
    },
    {
      id: 'children',
      title: 'Do you have children at home?',
      options: [
        { value: 'yes', label: 'Yes, need kid-friendly', emoji: '👶' },
        { value: 'no', label: 'No children', emoji: '👫' }
      ]
    }
  ];

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newAnswers as QuizAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl flex items-center gap-2">
              🐾 BreedMatch Quiz
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">{currentQuestion.title}</h3>
            <p className="text-muted-foreground">
              Choose the option that best describes your situation
            </p>
          </div>

          <div className="grid gap-3">
            {currentQuestion.options.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                size="lg"
                onClick={() => handleAnswer(option.value)}
                className="h-auto p-4 justify-start text-left hover:border-primary hover:bg-primary/5"
              >
                <span className="text-2xl mr-3">{option.emoji}</span>
                <span className="font-medium">{option.label}</span>
              </Button>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <span className="text-lg">💡</span>
              <span>Your perfect breed match awaits!</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}