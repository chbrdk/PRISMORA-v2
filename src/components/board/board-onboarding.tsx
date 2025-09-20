'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Stack } from '@/components/ui/stack';
import { Badge } from '@/components/ui/badge';
import { Sparkles, MousePointer2, Move, Edit3, Share2, Link2, X } from 'lucide-react';

interface BoardOnboardingProps {
  boardId: string;
  onComplete: () => void;
}

export function BoardOnboarding({ boardId, onComplete }: BoardOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding for this board
    const hasSeenOnboarding = localStorage.getItem(`prismora-onboarding-${boardId}`);
    if (!hasSeenOnboarding) {
      setIsVisible(true);
    }
  }, [boardId]);

  const handleComplete = () => {
    localStorage.setItem(`prismora-onboarding-${boardId}`, 'true');
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    handleComplete();
  };

  const steps = [
    {
      icon: <Sparkles className="w-8 h-8 text-blue-500" />,
      title: 'Willkommen bei PRISMORA!',
      description: 'Dein kollaboratives Whiteboard für Ideen und Workflows ist bereit.',
      action: 'Los geht\'s!',
    },
    {
      icon: <MousePointer2 className="w-8 h-8 text-green-500" />,
      title: 'Prismions erstellen',
      description: 'Doppelklick auf das Canvas, um ein neues Prismion zu erstellen.',
      action: 'Verstanden',
    },
    {
      icon: <Move className="w-8 h-8 text-purple-500" />,
      title: 'Verschieben & Bearbeiten',
      description: 'Ziehe Prismions per Drag & Drop. Klicke auf Titel oder Inhalt zum Bearbeiten.',
      action: 'Weiter',
    },
    {
      icon: <Link2 className="w-8 h-8 text-orange-500" />,
      title: 'Verbindungen erstellen',
      description: 'Nutze die Port-Buttons an den Kanten, um Prismions zu verbinden.',
      action: 'Weiter',
    },
    {
      icon: <Share2 className="w-8 h-8 text-pink-500" />,
      title: 'Team einladen',
      description: 'Klicke auf "Teilen" um den Board-Link zu kopieren und dein Team einzuladen.',
      action: 'Board starten!',
    },
  ];

  if (!isVisible) return null;

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 relative">
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        <Stack direction="column" align="center" gap="lg">
          {/* Step Indicator */}
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Icon */}
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
            {currentStepData.icon}
          </div>

          {/* Content */}
          <Stack direction="column" align="center" gap="sm">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 text-center leading-relaxed">
              {currentStepData.description}
            </p>
          </Stack>

          {/* Actions */}
          <Stack direction="row" gap="md" className="w-full">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1"
              >
                Zurück
              </Button>
            )}
            <Button
              onClick={() => {
                if (currentStep === steps.length - 1) {
                  handleComplete();
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }}
              className="flex-1"
            >
              {currentStepData.action}
            </Button>
          </Stack>

          {/* Skip Link */}
          <button
            onClick={handleSkip}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Tutorial überspringen
          </button>
        </Stack>
      </Card>
    </div>
  );
}
