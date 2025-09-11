// ===================================
// TODO CLEAN - QUOTE WIZARD COMPONENT
// Main wizard container with navigation and state management
// ===================================

import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import WizardNavigation from '@/components/ui/WizardNavigation';
import Step1BasicInfo from './Step1BasicInfo';
import Step2ServiceDetails from './Step2ServiceDetails';
import Step3ResultAndContact from './Step3ResultAndContact';
import { useCalculator, useCalculatorNavigation, useCalculatorPrice } from '@/contexts/CalculatorContext';
import type { ZoneType } from '@/types';

interface QuoteWizardProps {
  className?: string;
  onComplete?: () => void;
}

const QuoteWizard: React.FC<QuoteWizardProps> = ({
  className,
  onComplete,
}) => {
  const { state, actions } = useCalculator();
  const { 
    currentStep, 
    totalSteps, 
    progress, 
    nextStep, 
    prevStep, 
    setStep, 
    canGoNext, 
    canGoPrev, 
    validateStep 
  } = useCalculatorNavigation();
  
  const { calculation, isCalculating } = useCalculatorPrice();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Wizard steps configuration
  const steps = [
    {
      id: 1,
      title: 'Información Básica',
      description: 'Tipo de propiedad y tamaño',
    },
    {
      id: 2,
      title: 'Detalles del Servicio',
      description: 'Servicio y frecuencia',
    },
    {
      id: 3,
      title: 'Resultado y Contacto',
      description: 'Cotización y datos',
    },
  ];

  // Handle navigation with validation
  const handleNext = () => {
    if (validateStep()) {
      nextStep();
    }
  };

  const handlePrev = () => {
    prevStep();
  };

  const handleStepChange = (step: number) => {
    // Allow jumping to previous steps or current step
    if (step <= currentStep) {
      setStep(step);
    }
  };

  // Handle zone change from address validator
  const handleZoneChange = (zone: ZoneType | null) => {
    if (zone) {
      actions.updateFormData({ zone });
    } else {
      actions.updateFormData({});
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically send the data to your backend
      console.log('Submitting quote data:', {
        formData: state.formData,
        calculation: calculation,
        timestamp: new Date().toISOString(),
      });

      // Call onComplete callback if provided
      if (onComplete) {
        onComplete();
      }

      // Show success state or navigate to confirmation page
      // For now, we'll just log success
      console.log('Quote submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting quote:', error);
      setSubmitError('Error al enviar la cotización. Por favor intenta nuevamente o usa WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants for step transitions
  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);
  const [previousStep, setPreviousStep] = useState(currentStep);

  useEffect(() => {
    if (currentStep !== previousStep) {
      setDirection(currentStep > previousStep ? 1 : -1);
      setPreviousStep(currentStep);
    }
  }, [currentStep, previousStep]);

  // Auto-save progress to localStorage
  useEffect(() => {
    try {
      const wizardData = {
        formData: state.formData,
        currentStep,
        calculation,
        timestamp: Date.now(),
      };
      
      localStorage.setItem('todo-clean-wizard-progress', JSON.stringify(wizardData));
    } catch (error) {
      console.warn('Failed to save wizard progress:', error);
    }
  }, [state.formData, currentStep, calculation]);

  // Restore progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('todo-clean-wizard-progress');
      if (saved) {
        const wizardData = JSON.parse(saved);
        
        // Only restore if data is recent (less than 24 hours old)
        const savedTime = wizardData.timestamp;
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        
        if (savedTime && (now - savedTime) < oneDay) {
          actions.updateFormData(wizardData.formData || {});
          if (wizardData.currentStep && wizardData.currentStep <= totalSteps) {
            setStep(wizardData.currentStep);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to restore wizard progress:', error);
    }
  }, []);

  return (
    <div className={cn('max-w-full sm:max-w-4xl mx-auto', className)}>
      {/* Progress Navigation */}
      <WizardNavigation
        steps={steps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        onNext={handleNext}
        onPrev={handlePrev}
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
        isLoading={isSubmitting || isCalculating}
        nextLabel={currentStep === totalSteps ? 'Finalizar' : 'Siguiente'}
        className="mb-8"
      />

      {/* Submit Error */}
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-800">{submitError}</p>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="relative min-h-[600px] bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 p-6 md:p-8"
          >
            {currentStep === 1 && (
              <Step1BasicInfo
                formData={state.formData}
                updateFormData={actions.updateFormData}
                errors={state.errors}
              />
            )}

            {currentStep === 2 && (
              <Step2ServiceDetails
                formData={state.formData}
                updateFormData={actions.updateFormData}
                errors={state.errors}
              />
            )}

            {currentStep === 3 && (
              <Step3ResultAndContact
                formData={state.formData}
                updateFormData={(data) => {
                  actions.updateFormData(data);
                  // Handle zone changes for price recalculation
                  if (data.zone !== undefined) {
                    handleZoneChange(data.zone as ZoneType | null);
                  }
                }}
                calculation={calculation}
                errors={state.errors}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 text-center">
        <div className="text-sm text-neutral-600 mb-2">
          Progreso general: {Math.round(progress)}%
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Help and Support */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-4 text-sm text-neutral-600">
          <span>¿Necesitas ayuda?</span>
          <a 
            href="https://wa.me/56926176543?text=Hola,%20necesito%20ayuda%20con%20la%20calculadora%20de%20precios" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Contáctanos por WhatsApp
          </a>
          <span>•</span>
          <a 
            href="tel:+56926176543"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            +56 9 2617 6543
          </a>
        </div>
      </div>

      {/* Development helper */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">Debug Info</h4>
          <div className="text-xs text-yellow-700 space-y-1">
            <div>Current Step: {currentStep}/{totalSteps}</div>
            <div>Form Valid: {validateStep() ? '✅' : '❌'}</div>
            <div>Has Calculation: {calculation ? '✅' : '❌'}</div>
            <div>Errors: {Object.keys(state.errors).length}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteWizard;