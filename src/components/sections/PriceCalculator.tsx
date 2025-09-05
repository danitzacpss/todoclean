// ===================================
// TODO CLEAN - PRICE CALCULATOR COMPONENT
// Interactive 3-step price calculator
// ===================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_MESSAGES } from '@/utils/constants';
import { calculatePrice, formatPrice } from '@/utils/pricing';
import Button, { WhatsAppButton } from '@/components/ui/Button';
import type { ServiceType, PropertyType, FrequencyType } from '@/types';

// ==========================================
// INTERFACES
// ==========================================

interface CalculatorStep {
  step: number;
  title: string;
  subtitle: string;
}

interface CalculatorState {
  propertyType: PropertyType | null;
  squareMeters: number | null;
  frequency: FrequencyType | null;
  currentStep: number;
  showResult: boolean;
}

// ==========================================
// COMPONENT DATA
// ==========================================

const CALCULATOR_STEPS: CalculatorStep[] = [
  {
    step: 1,
    title: 'calculadora.step1.title',
    subtitle: 'calculadora.step1.subtitle',
  },
  {
    step: 2,
    title: 'calculadora.step2.title',
    subtitle: 'calculadora.step2.subtitle',
  },
  {
    step: 3,
    title: 'calculadora.step3.title',
    subtitle: 'calculadora.step3.subtitle',
  },
];

const PROPERTY_OPTIONS = [
  { id: 'casa', name: 'Casa/Depto', icon: '🏠', baseService: 'regular' as ServiceType },
  { id: 'oficina', name: 'Oficina', icon: '🏢', baseService: 'regular' as ServiceType },
  { id: 'local', name: 'Post-Obra', icon: '🔨', baseService: 'postobra' as ServiceType },
];

const SQUARE_METER_OPTIONS = [
  { id: 'small', label: '<50m²', value: 40 },
  { id: 'medium', label: '50-100m²', value: 75 },
  { id: 'large', label: '100-150m²', value: 125 },
  { id: 'xlarge', label: '>150m²', value: 200 },
];

const FREQUENCY_OPTIONS = [
  { id: 'unica', label: 'Una vez', description: 'Sin compromiso' },
  { id: 'semanal', label: 'Semanal', description: '15% descuento' },
  { id: 'quincenal', label: 'Quincenal', description: '10% descuento' },
  { id: 'mensual', label: 'Mensual', description: '5% descuento' },
];

// ==========================================
// MAIN COMPONENT
// ==========================================

const PriceCalculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    propertyType: null,
    squareMeters: null,
    frequency: null,
    currentStep: 1,
    showResult: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  // Auto-advance logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.currentStep === 1 && state.propertyType) {
        setState(prev => ({ ...prev, currentStep: 2 }));
      } else if (state.currentStep === 2 && state.squareMeters) {
        setState(prev => ({ ...prev, currentStep: 3 }));
      } else if (state.currentStep === 3 && state.frequency) {
        calculateFinalPrice();
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [state.propertyType, state.squareMeters, state.frequency, state.currentStep]);

  // Calculate final price
  const calculateFinalPrice = async () => {
    if (!state.propertyType || !state.squareMeters || !state.frequency) return;

    setIsLoading(true);

    try {
      // Determine service type based on property selection
      const selectedProperty = PROPERTY_OPTIONS.find(p => p.id === state.propertyType);
      const serviceType = selectedProperty?.baseService || 'regular';

      const calculation = calculatePrice({
        serviceType,
        propertyType: state.propertyType === 'local' ? 'casa' : state.propertyType,
        squareMeters: state.squareMeters,
        rooms: Math.ceil(state.squareMeters / 25), // Estimate rooms
        frequency: state.frequency,
        extras: [],
        zone: 'A',
      });

      setCalculatedPrice(calculation.totalPrice);
      
      // Delay for better UX
      setTimeout(() => {
        setIsLoading(false);
        setState(prev => ({ ...prev, showResult: true }));
      }, 1200);
    } catch (error) {
      console.error('Calculation error:', error);
      setIsLoading(false);
    }
  };

  // Reset calculator
  const resetCalculator = () => {
    setState({
      propertyType: null,
      squareMeters: null,
      frequency: null,
      currentStep: 1,
      showResult: false,
    });
    setCalculatedPrice(null);
  };

  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    if (!state.propertyType || !state.squareMeters || !state.frequency || !calculatedPrice) {
      return WHATSAPP_MESSAGES.general;
    }

    const propertyName = PROPERTY_OPTIONS.find(p => p.id === state.propertyType)?.name || '';
    const frequencyName = FREQUENCY_OPTIONS.find(f => f.id === state.frequency)?.label || '';
    
    const details = `
Tipo de propiedad: ${propertyName}
Superficie: ${state.squareMeters}m²
Frecuencia: ${frequencyName}`;

    return WHATSAPP_MESSAGES.calculator('limpieza', calculatedPrice, details);
  };

  // ==========================================
  // RENDER METHODS
  // ==========================================

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {CALCULATOR_STEPS.map((step, index) => (
        <React.Fragment key={step.step}>
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
              state.currentStep >= step.step
                ? 'bg-accent-500 text-white'
                : 'bg-white/20 text-white/60'
            }`}
          >
            {step.step}
          </div>
          {index < CALCULATOR_STEPS.length - 1 && (
            <div 
              className={`w-8 h-0.5 mx-2 transition-colors duration-500 ${
                state.currentStep > step.step
                  ? 'bg-accent-500'
                  : 'bg-white/20'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <h3 className="text-2xl font-bold text-white mb-2">
        ¿Qué necesitas limpiar?
      </h3>
      <p className="text-primary-100 mb-8">
        Selecciona el tipo de espacio a limpiar
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {PROPERTY_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => setState(prev => ({ ...prev, propertyType: option.id as PropertyType }))}
            className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
              state.propertyType === option.id
                ? 'border-accent-400 bg-white/10'
                : 'border-white/30 bg-white/5 hover:border-white/50'
            }`}
          >
            <div className="text-3xl mb-3">{option.icon}</div>
            <div className="font-semibold text-white">{option.name}</div>
          </button>
        ))}
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <h3 className="text-2xl font-bold text-white mb-2">
        ¿Cuántos m² aproximados?
      </h3>
      <p className="text-primary-100 mb-8">
        Selecciona el tamaño de tu espacio
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {SQUARE_METER_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => setState(prev => ({ ...prev, squareMeters: option.value }))}
            className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
              state.squareMeters === option.value
                ? 'border-accent-400 bg-white/10'
                : 'border-white/30 bg-white/5 hover:border-white/50'
            }`}
          >
            <div className="font-semibold text-white text-lg">{option.label}</div>
          </button>
        ))}
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <h3 className="text-2xl font-bold text-white mb-2">
        ¿Con qué frecuencia?
      </h3>
      <p className="text-primary-100 mb-8">
        Elige la frecuencia que más te convenga
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {FREQUENCY_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => setState(prev => ({ ...prev, frequency: option.id as FrequencyType }))}
            className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 text-left ${
              state.frequency === option.id
                ? 'border-accent-400 bg-white/10'
                : 'border-white/30 bg-white/5 hover:border-white/50'
            }`}
          >
            <div className="font-semibold text-white text-lg mb-1">{option.label}</div>
            <div className="text-primary-200 text-sm">{option.description}</div>
          </button>
        ))}
      </div>
    </motion.div>
  );

  const renderLoading = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12"
    >
      <div className="w-16 h-16 border-4 border-white/30 border-t-accent-400 rounded-full animate-spin mx-auto mb-6"></div>
      <h3 className="text-2xl font-bold text-white mb-2">
        Calculando tu precio personalizado...
      </h3>
      <p className="text-primary-100">
        Estamos preparando tu cotización exacta
      </p>
    </motion.div>
  );

  const renderResult = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="bg-white/10 rounded-2xl p-8 max-w-md mx-auto mb-8">
        <h3 className="text-3xl font-bold text-white mb-4">
          Tu precio estimado:
        </h3>
        <div className="text-5xl font-bold text-accent-400 mb-2">
          {calculatedPrice ? formatPrice(calculatedPrice) : '$0'}
        </div>
        <div className="text-xl text-primary-100">CLP</div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <WhatsAppButton
          size="lg"
          message={generateWhatsAppMessage()}
          trackingSource="calculator"
          className="bg-accent-500 hover:bg-accent-600"
        >
          Agendar Ahora
        </WhatsAppButton>
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.location.href = '/cotizador'}
          className="border-white text-white hover:bg-white hover:text-primary-700"
        >
          Personalizar
        </Button>
      </div>

      <button
        onClick={resetCalculator}
        className="text-primary-200 hover:text-white underline transition-colors"
      >
        Calcular nuevamente
      </button>
    </motion.div>
  );

  // ==========================================
  // MAIN RENDER
  // ==========================================

  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-16 -mt-1">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/30" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-white/20" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Calculadora de Precios Instantánea
            </h2>
            <p className="text-xl text-primary-100">
              Conoce tu precio exacto en solo 30 segundos
            </p>
          </div>

          {/* Step Indicator */}
          {!state.showResult && !isLoading && renderStepIndicator()}

          {/* Calculator Steps */}
          <div className="min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div key="loading">
                  {renderLoading()}
                </motion.div>
              ) : state.showResult ? (
                <motion.div key="result">
                  {renderResult()}
                </motion.div>
              ) : (
                <motion.div key={`step-${state.currentStep}`} className="w-full">
                  {state.currentStep === 1 && renderStep1()}
                  {state.currentStep === 2 && renderStep2()}
                  {state.currentStep === 3 && renderStep3()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trust elements */}
          {state.showResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-8 text-primary-200 text-sm"
            >
              <p>✓ Precio incluye materiales • ✓ Puntualidad garantizada • ✓ Seguro incluido</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;