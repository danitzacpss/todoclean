// ===================================
// TODO CLEAN - WIZARD NAVIGATION COMPONENT
// Progress bar and navigation controls for multi-step wizard
// ===================================

import React from 'react';
import { cn } from '@/utils/cn';
import Button from './Button';

interface WizardStep {
  id: number;
  title: string;
  description?: string;
  completed?: boolean;
}

interface WizardNavigationProps {
  steps: WizardStep[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  isLoading?: boolean;
  nextLabel?: string;
  prevLabel?: string;
  className?: string;
}

const WizardNavigation: React.FC<WizardNavigationProps> = ({
  steps,
  currentStep,
  onStepChange,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev,
  isLoading = false,
  nextLabel = 'Siguiente',
  prevLabel = 'Anterior',
  className,
}) => {
  const progress = (currentStep / steps.length) * 100;

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const canClickStep = (stepId: number) => {
    // Allow clicking on completed steps or current step
    return stepId <= currentStep;
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-neutral-700">
            Paso {currentStep} de {steps.length}
          </h3>
          <span className="text-sm text-neutral-500">
            {Math.round(progress)}% completado
          </span>
        </div>
        
        {/* Progress track */}
        <div className="w-full bg-neutral-200 rounded-full h-2 mb-6">
          <div
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step indicators */}
        <div className="flex justify-between">
          {steps.map((step) => {
            const status = getStepStatus(step.id);
            const isClickable = canClickStep(step.id);
            
            return (
              <button
                key={step.id}
                type="button"
                className={cn(
                  'flex flex-col items-center group transition-all duration-200',
                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
                )}
                onClick={() => isClickable && onStepChange(step.id)}
                disabled={!isClickable}
              >
                {/* Step circle */}
                <div className={cn(
                  'w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-200',
                  status === 'completed' && 'bg-primary-500 border-primary-500 text-white',
                  status === 'current' && 'bg-white border-primary-500 text-primary-600',
                  status === 'upcoming' && 'bg-white border-neutral-300 text-neutral-400',
                  isClickable && 'group-hover:scale-110',
                  status === 'current' && 'ring-4 ring-primary-100'
                )}>
                  {status === 'completed' ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>

                {/* Step title */}
                <div className="mt-2 text-center">
                  <div className={cn(
                    'text-xs font-medium transition-colors',
                    status === 'current' && 'text-primary-600',
                    status === 'completed' && 'text-neutral-700',
                    status === 'upcoming' && 'text-neutral-400'
                  )}>
                    {step.title}
                  </div>
                  {step.description && (
                    <div className={cn(
                      'text-xs mt-1 hidden sm:block',
                      status === 'current' && 'text-primary-500',
                      status === 'completed' && 'text-neutral-500',
                      status === 'upcoming' && 'text-neutral-400'
                    )}>
                      {step.description}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={!canGoPrev || isLoading}
          className="min-w-[100px]"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {prevLabel}
        </Button>

        <div className="flex items-center space-x-2">
          {/* Step info */}
          <div className="text-center hidden sm:block">
            <div className="text-sm font-medium text-neutral-700">
              {steps[currentStep - 1]?.title}
            </div>
            {steps[currentStep - 1]?.description && (
              <div className="text-xs text-neutral-500">
                {steps[currentStep - 1].description}
              </div>
            )}
          </div>
        </div>

        <Button
          variant="primary"
          onClick={onNext}
          disabled={!canGoNext || isLoading}
          loading={isLoading}
          className="min-w-[100px]"
        >
          {nextLabel}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default WizardNavigation;