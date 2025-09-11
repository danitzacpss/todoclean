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

// interface CalculatorStep {
//   step: number;
//   title: string;
//   subtitle: string;
// }

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

/* const CALCULATOR_STEPS: CalculatorStep[] = [
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
]; */

const PROPERTY_OPTIONS = [
  { id: 'casa', name: 'Casa/Depto', icon: '🏠', baseService: 'regular' as ServiceType },
  { id: 'oficina', name: 'Oficina', icon: '🏢', baseService: 'regular' as ServiceType },
  // Temporalmente oculto
  // { id: 'local', name: 'Post-Obra', icon: '🔨', baseService: 'postobra' as ServiceType },
];

const SQUARE_METER_OPTIONS = [
  { id: 'small', label: '<50m²', value: 40 },
  { id: 'medium', label: '50-100m²', value: 75 },
  { id: 'large', label: '100-150m²', value: 125 },
  { id: 'xlarge', label: '>150m²', value: 200 },
];

const FREQUENCY_OPTIONS = [
  { id: 'unica', label: 'Una vez', description: 'Sin compromiso' },
  { id: 'mensual', label: 'Mensual', description: '+ de 17% descuento' },
  { id: 'trimestral', label: 'Trimestral', description: '+ de 25% descuento' },
  { id: 'anual', label: 'Anual', description: '+ de 33% descuento' },
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
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);

  // Auto-advance logic
  useEffect(() => {
    if (isNavigatingBack) {
      setIsNavigatingBack(false);
      return;
    }
    
    const timer = setTimeout(() => {
      if (state.currentStep === 1 && state.propertyType) {
        setState(prev => ({ ...prev, currentStep: 2 }));
      } else if (state.currentStep === 2 && state.squareMeters) {
        setState(prev => ({ ...prev, currentStep: 3 }));
      } else if (state.currentStep === 3 && state.frequency) {
        calculateFinalPrice();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [state.propertyType, state.squareMeters, state.frequency, state.currentStep, isNavigatingBack]);

  // Calculate business prices based on BusinessServices.tsx pricing table
  const calculateBusinessPrice = (squareMeters: number, frequency: FrequencyType): number => {
    // Business pricing table from BusinessServices.tsx
    const businessPricing = {
      // Pequeña: Hasta 50m²
      small: {
        semanal: 80000,
        bisemanal: 136000,
        mensual: 60000,
        unica: 90000
      },
      // Mediana: 50-150m² (Más Popular)
      medium: {
        semanal: 150000,
        bisemanal: 255000,
        mensual: 112500,
        unica: 170000
      },
      // Grande: 150-300m²
      large: {
        semanal: 280000,
        bisemanal: 476000,
        mensual: 210000,
        unica: 320000
      },
      // Corporativa: Más de 300m²
      corporate: {
        semanal: 450000,
        bisemanal: 765000,
        mensual: 337500,
        unica: 520000
      }
    };

    // Determine size category
    let sizeCategory: keyof typeof businessPricing;
    if (squareMeters <= 50) {
      sizeCategory = 'small';
    } else if (squareMeters <= 150) {
      sizeCategory = 'medium';
    } else if (squareMeters <= 300) {
      sizeCategory = 'large';
    } else {
      sizeCategory = 'corporate';
    }

    // Map frequency to business pricing structure
    const frequencyMap = {
      'unica': 'unica',
      'mensual': 'mensual',
      'trimestral': 'mensual', // Use monthly price for trimestral
      'anual': 'mensual' // Use monthly price for anual
    } as const;

    const priceKey = frequencyMap[frequency] as keyof typeof businessPricing.small;
    return businessPricing[sizeCategory][priceKey];
  };

  // Calculate final price
  const calculateFinalPrice = async () => {
    if (!state.propertyType || !state.squareMeters || !state.frequency) return;

    setIsLoading(true);

    try {
      let finalPrice: number;

      if (state.propertyType === 'oficina') {
        // Use business pricing for offices
        finalPrice = calculateBusinessPrice(state.squareMeters, state.frequency);
      } else {
        // Use residential pricing for other property types
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

        finalPrice = calculation.totalPrice;
      }

      setCalculatedPrice(finalPrice);
      
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

  // Go back to previous step
  const goBackStep = () => {
    console.log('goBackStep called, currentStep:', state.currentStep);
    setIsNavigatingBack(true);
    if (state.currentStep === 2) {
      console.log('Going back from step 2 to step 1');
      setState(prev => ({ 
        ...prev, 
        currentStep: 1,
        propertyType: null,
        squareMeters: null,
        frequency: null,
        showResult: false
      }));
      setCalculatedPrice(null);
    } else if (state.currentStep === 3) {
      console.log('Going back from step 3 to step 2');
      setState(prev => ({ 
        ...prev, 
        currentStep: 2,
        squareMeters: null,
        frequency: null,
        showResult: false
      }));
      setCalculatedPrice(null);
    }
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

  // const renderStepIndicator = () => (
  //   <div className="flex items-center justify-center mb-8">
  //     {CALCULATOR_STEPS.map((step, index) => (
  //       <React.Fragment key={step.step}>
  //         <div 
  //           className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
  //             state.currentStep >= step.step
  //               ? 'bg-cyan-600 text-white'
  //               : 'bg-gray-200 text-gray-500'
  //           }`}
  //         >
  //           {step.step}
  //         </div>
  //         {index < CALCULATOR_STEPS.length - 1 && (
  //           <div 
  //             className={`w-8 h-0.5 mx-2 transition-colors duration-500 ${
  //               state.currentStep > step.step
  //                 ? 'bg-cyan-600'
  //                 : 'bg-gray-200'
  //             }`}
  //           />
  //         )}
  //       </React.Fragment>
  //     ))}
  //   </div>
  // );

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <h3 className="text-xl font-bold text-gray-900">
        ¿Qué necesitas limpiar?
      </h3>
      <p className="text-gray-600 mb-2">
        Selecciona el tipo de espacio a limpiar
      </p>
      
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {PROPERTY_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => setState(prev => ({ ...prev, propertyType: option.id as PropertyType }))}
            className={`p-2 sm:p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 shadow-sm ${
              state.propertyType === option.id
                ? 'border-cyan-500 bg-cyan-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="text-lg sm:text-xl mb-1">{option.icon}</div>
            <div className={`font-semibold text-xs sm:text-sm ${
              state.propertyType === option.id ? 'text-cyan-700' : 'text-gray-700'
            }`}>{option.name}</div>
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
      <h3 className="text-xl font-bold text-gray-900">
        ¿Cuántos m² aproximados?
      </h3>
      <p className="text-gray-600 mb-2">
        Selecciona el tamaño de tu espacio
      </p>
      
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {SQUARE_METER_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => setState(prev => ({ ...prev, squareMeters: option.value }))}
            className={`p-2 sm:p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 shadow-sm ${
              state.squareMeters === option.value
                ? 'border-cyan-500 bg-cyan-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className={`font-semibold text-xs sm:text-sm ${
              state.squareMeters === option.value ? 'text-cyan-700' : 'text-gray-700'
            }`}>{option.label}</div>
          </button>
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={goBackStep}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center mx-auto"
        >
          ← Atrás
        </button>
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
      <h3 className="text-xl font-bold text-gray-900">
        ¿Con qué frecuencia?
      </h3>
      <p className="text-gray-600 mb-2">
        Elige la frecuencia que más te convenga
      </p>
      
      <div className="grid grid-cols-1 gap-2 sm:gap-4">
        {FREQUENCY_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => setState(prev => ({ ...prev, frequency: option.id as FrequencyType }))}
            className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 text-center shadow-sm ${
              state.frequency === option.id
                ? 'border-cyan-500 bg-cyan-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className={`font-semibold mb-1 text-sm sm:text-base ${
              state.frequency === option.id ? 'text-cyan-700' : 'text-gray-700'
            }`}>{option.label}</div>
            <div className={`text-xs sm:text-sm ${
              state.frequency === option.id ? 'text-cyan-600' : 'text-gray-500'
            }`}>{option.description}</div>
          </button>
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={goBackStep}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center mx-auto"
        >
          ← Atrás
        </button>
      </div>
    </motion.div>
  );

  const renderLoading = () => (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center py-6"
    >
      <div className="w-10 h-10 border-4 border-gray-200 border-t-cyan-600 rounded-full animate-spin mx-auto mb-3"></div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">
        Calculando tu precio personalizado...
      </h3>
      <p className="text-gray-600 text-xs">
        Estamos preparando tu cotización exacta
      </p>
    </motion.div>
  );

  const renderResult = () => (
    <motion.div
      key="result"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="text-center"
    >
      <div className="bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-2xl p-4 sm:p-6 mb-4 shadow-lg">
        <div className="text-3xl mb-2">🎉</div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
          ¡Tu cotización está lista!
        </h3>
        <div className="text-xl sm:text-3xl font-bold text-cyan-600 mb-1">
          {calculatedPrice ? formatPrice(calculatedPrice) : '$0'}
        </div>
        <div className="text-sm text-gray-600 mb-1">CLP</div>
        {state.frequency !== 'unica' && (
          <div className="text-xs text-gray-500 mb-3 bg-gray-50 rounded-lg p-2">
            <p className="font-medium">💡 Precio mensual</p>
            <p>Servicio: 1 limpieza semanal</p>
          </div>
        )}
        
        <div className="text-gray-600 mb-3 text-xs sm:text-sm">
          <p className="mb-1">
            <span className="font-semibold text-gray-700">Tipo:</span> {PROPERTY_OPTIONS.find(p => p.id === state.propertyType)?.name}
          </p>
          <p className="mb-1">
            <span className="font-semibold text-gray-700">Tamaño:</span> {SQUARE_METER_OPTIONS.find(s => s.value === state.squareMeters)?.label}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Frecuencia:</span> {FREQUENCY_OPTIONS.find(f => f.id === state.frequency)?.label}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 justify-center mb-3">
        <WhatsAppButton
          size="sm"
          message={generateWhatsAppMessage()}
          trackingSource="calculator"
          className="bg-cyan-600 hover:bg-cyan-700 text-sm w-full sm:w-auto"
        >
          Agendar Ahora
        </WhatsAppButton>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.href = '/cotizador'}
          className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 text-sm w-full sm:w-auto"
        >
          Personalizar
        </Button>
      </div>

      <button
        onClick={resetCalculator}
        className="text-gray-500 hover:text-gray-700 underline transition-colors text-sm"
      >
        Calcular nuevamente
      </button>
    </motion.div>
  );

  // ==========================================
  // MAIN RENDER
  // ==========================================

  return (
    <section className="relative bg-gradient-to-br from-neutral-50 via-blue-50/30 to-neutral-50 py-4 pb-16">
      <div className="container mx-auto px-0.5 sm:px-2 lg:px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold font-heading mb-2 text-gray-900">
            Calculadora de Precios Instantánea
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Conoce tu precio aproximado en solo 30 segundos
          </p>
        </div>

        {/* Calculator Card Container */}
        <div className="max-w-full sm:max-w-lg md:max-w-2xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border-2 border-neutral-200 transition-all duration-300">
            {/* Duration Badge */}
            <div className="absolute top-2 right-2">
              <div className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full text-xs font-medium">
                3h
              </div>
            </div>

            {/* Calculator Icon */}
            <div className="text-center mb-3">
              <div className="text-2xl mb-1">🔨</div>
            </div>

            {/* Step Indicator */}
              {!state.showResult && !isLoading && (
                <div className="flex items-center justify-center mb-2">
                  {[1, 2, 3].map((step, index) => (
                    <React.Fragment key={step}>
                      <div 
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-300 ${
                          state.currentStep >= step
                            ? 'bg-cyan-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {step}
                      </div>
                      {index < 2 && (
                        <div 
                          className={`w-4 h-0.5 mx-1 transition-colors duration-500 ${
                            state.currentStep > step
                              ? 'bg-cyan-600'
                              : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}

          {/* Calculator Steps */}
          <div className="flex items-center justify-center py-4">
            <AnimatePresence mode="wait">
              {isLoading ? (
                renderLoading()
              ) : state.showResult ? (
                renderResult()
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
              className="text-center mt-8 text-gray-500 text-sm"
            >
              <p>✓ Precio incluye materiales • ✓ Puntualidad garantizada • ✓ Seguro incluido</p>
            </motion.div>
          )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;