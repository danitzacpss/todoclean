// ===================================
// TODO CLEAN - CALCULATOR CONTEXT
// State management for the price calculator
// ===================================

import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import type { CalculatorContextType, QuoteFormData, PriceCalculation } from '@/types';
import { calculatePrice, validatePricingParams } from '@/utils/pricing';
import { trackCalculatorStart, trackCalculatorStep, trackCalculatorComplete } from '@/utils/analytics';

// ==========================================
// CONTEXT TYPE DEFINITIONS
// ==========================================

interface CalculatorState {
  currentStep: number;
  totalSteps: number;
  formData: Partial<QuoteFormData>;
  calculation: PriceCalculation | null;
  errors: Record<string, string>;
  isCalculating: boolean;
  history: Partial<QuoteFormData>[];
}

type CalculatorAction = 
  | { type: 'SET_STEP'; payload: number }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'UPDATE_FORM_DATA'; payload: Partial<QuoteFormData> }
  | { type: 'SET_CALCULATION'; payload: PriceCalculation | null }
  | { type: 'SET_ERRORS'; payload: Record<string, string> }
  | { type: 'SET_CALCULATING'; payload: boolean }
  | { type: 'RESET_CALCULATOR' }
  | { type: 'SAVE_TO_HISTORY' };

// ==========================================
// INITIAL STATE
// ==========================================

const initialState: CalculatorState = {
  currentStep: 1,
  totalSteps: 3,
  formData: {
    // Step 1 defaults
    propertyType: 'casa',
    squareMeters: 75,
    rooms: 3,
    // Step 2 defaults
    serviceType: 'regular',
    frequency: 'mensual',
    extras: [],
    // Step 3 empty
  },
  calculation: null,
  errors: {},
  isCalculating: false,
  history: [],
};

// ==========================================
// REDUCER
// ==========================================

function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        currentStep: Math.max(1, Math.min(action.payload, state.totalSteps)),
        errors: {}, // Clear errors when changing steps
      };
      
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.totalSteps),
        errors: {},
      };
      
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
        errors: {},
      };
      
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
      
    case 'SET_CALCULATION':
      return {
        ...state,
        calculation: action.payload,
        isCalculating: false,
      };
      
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
        isCalculating: false,
      };
      
    case 'SET_CALCULATING':
      return {
        ...state,
        isCalculating: action.payload,
      };
      
    case 'SAVE_TO_HISTORY':
      return {
        ...state,
        history: [...state.history, { ...state.formData }].slice(-10), // Keep last 10
      };
      
    case 'RESET_CALCULATOR':
      return {
        ...initialState,
        history: state.history, // Preserve history
      };
      
    default:
      return state;
  }
}

// ==========================================
// CONTEXT CREATION
// ==========================================

const CalculatorContext = createContext<{
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  actions: {
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    updateFormData: (data: Partial<QuoteFormData>) => void;
    calculatePrice: () => void;
    resetCalculator: () => void;
    validateCurrentStep: () => boolean;
    getStepProgress: () => number;
  };
} | null>(null);

// ==========================================
// PROVIDER COMPONENT
// ==========================================

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // ==========================================
  // LOCAL STORAGE PERSISTENCE
  // ==========================================

  useEffect(() => {
    // Load from localStorage on mount
    try {
      const saved = localStorage.getItem('todo-clean-calculator');
      if (saved) {
        const parsedData = JSON.parse(saved);
        
        // Only restore if data is recent (less than 24 hours old)
        const savedTime = parsedData.timestamp;
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        
        if (savedTime && (now - savedTime) < oneDay) {
          dispatch({ type: 'UPDATE_FORM_DATA', payload: parsedData.formData });
          dispatch({ type: 'SET_STEP', payload: parsedData.currentStep || 1 });
        }
      }
    } catch (error) {
      console.warn('Failed to load calculator data from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage on changes
    try {
      const dataToSave = {
        formData: state.formData,
        currentStep: state.currentStep,
        timestamp: Date.now(),
      };
      
      localStorage.setItem('todo-clean-calculator', JSON.stringify(dataToSave));
    } catch (error) {
      console.warn('Failed to save calculator data to localStorage:', error);
    }
  }, [state.formData, state.currentStep]);

  // ==========================================
  // AUTOMATIC PRICE CALCULATION
  // ==========================================

  // Memoize calculation to avoid infinite loops
  const autoCalculation = useMemo(() => {
    const { serviceType, propertyType, squareMeters, rooms, frequency, extras = [], zone } = state.formData;
    
    if (!serviceType || !propertyType || !squareMeters || !rooms || !frequency) {
      return null;
    }

    const calculationData = {
      serviceType,
      propertyType,
      squareMeters,
      rooms,
      frequency,
      extras,
      ...(zone && { zone }),
    };

    const validationErrors = validatePricingParams(calculationData);
    
    if (validationErrors.length === 0) {
      try {
        return calculatePrice(calculationData);
      } catch (error) {
        console.error('Calculation error:', error);
        return null;
      }
    }
    
    return null;
  }, [
    state.formData.serviceType,
    state.formData.propertyType, 
    state.formData.squareMeters,
    state.formData.rooms,
    state.formData.frequency,
    state.formData.extras,
    state.formData.zone,
  ]);

  // Update calculation only when auto-calculation changes
  useEffect(() => {
    if (autoCalculation && autoCalculation.totalPrice !== (state.calculation?.totalPrice || 0)) {
      dispatch({ type: 'SET_CALCULATION', payload: autoCalculation });
      
      // Clear errors when calculation succeeds
      if (Object.keys(state.errors).length > 0) {
        dispatch({ type: 'SET_ERRORS', payload: {} });
      }
    }
  }, [autoCalculation, state.calculation?.totalPrice, state.errors]);

  // ==========================================
  // ACTION CREATORS
  // ==========================================

  const actions = {
    setStep: (step: number) => {
      trackCalculatorStep(step, state.formData);
      dispatch({ type: 'SET_STEP', payload: step });
    },
    
    nextStep: () => {
      const nextStep = Math.min(state.currentStep + 1, state.totalSteps);
      trackCalculatorStep(nextStep, state.formData);
      dispatch({ type: 'NEXT_STEP' });
    },
    
    prevStep: () => {
      dispatch({ type: 'PREV_STEP' });
    },
    
    updateFormData: (data: Partial<QuoteFormData>) => {
      dispatch({ type: 'UPDATE_FORM_DATA', payload: data });
    },
    
    calculatePrice: () => {
      const { serviceType, propertyType, squareMeters, rooms, frequency, extras = [], zone } = state.formData;
      
      if (!serviceType || !propertyType || !squareMeters || !rooms || !frequency) {
        dispatch({ type: 'SET_ERRORS', payload: { 
          general: 'Faltan datos requeridos para el cálculo' 
        }});
        return;
      }

      try {
        dispatch({ type: 'SET_CALCULATING', payload: true });
        
        const calculation = calculatePrice({
          serviceType,
          propertyType,
          squareMeters,
          rooms,
          frequency,
          extras,
          ...(zone && { zone }),
        });
        
        dispatch({ type: 'SET_CALCULATION', payload: calculation });
        
        // Track completion
        trackCalculatorComplete(serviceType, calculation.totalPrice, 'manual_calculation', {
          source: 'calculator',
          ...state.formData,
        });
        
      } catch (error) {
        console.error('Manual calculation error:', error);
        dispatch({ type: 'SET_ERRORS', payload: { 
          calculation: 'Error al calcular el precio. Verifica los datos ingresados.' 
        }});
      }
    },
    
    resetCalculator: () => {
      // Save current state to history before resetting
      dispatch({ type: 'SAVE_TO_HISTORY' });
      dispatch({ type: 'RESET_CALCULATOR' });
      
      // Clear localStorage
      try {
        localStorage.removeItem('todo-clean-calculator');
      } catch (error) {
        console.warn('Failed to clear calculator localStorage:', error);
      }
      
      // Track reset
      trackCalculatorStart();
    },
    
    validateCurrentStep: useCallback((): boolean => {
      const errors: Record<string, string> = {};
      const { formData } = state;
      
      switch (state.currentStep) {
        case 1:
          if (!formData.propertyType) errors.propertyType = 'Selecciona el tipo de propiedad';
          if (!formData.squareMeters || formData.squareMeters < 20) errors.squareMeters = 'Ingresa los metros cuadrados';
          if (!formData.rooms || formData.rooms < 1) errors.rooms = 'Selecciona el número de ambientes';
          break;
          
        case 2:
          if (!formData.serviceType) errors.serviceType = 'Selecciona el tipo de servicio';
          if (!formData.frequency) errors.frequency = 'Selecciona la frecuencia';
          break;
          
        case 3:
          if (!formData.name?.trim()) errors.name = 'Ingresa tu nombre';
          if (!formData.phone?.trim()) errors.phone = 'Ingresa tu teléfono';
          if (!formData.address?.trim()) errors.address = 'Ingresa tu dirección';
          break;
      }
      
      return Object.keys(errors).length === 0;
    }, [state.currentStep, state.formData]),
    
    getStepProgress: (): number => {
      return (state.currentStep / state.totalSteps) * 100;
    },
  };

  // ==========================================
  // ANALYTICS TRACKING
  // ==========================================

  useEffect(() => {
    // Track calculator start on first mount
    if (state.currentStep === 1 && !state.formData.serviceType) {
      trackCalculatorStart();
    }
  }, []);

  // ==========================================
  // DEVELOPMENT HELPERS
  // ==========================================

  useEffect(() => {
    if (import.meta.env.DEV) {
      (window as any).__TODO_CLEAN_CALCULATOR_STATE__ = state;
      (window as any).__TODO_CLEAN_CALCULATOR_ACTIONS__ = actions;
      
      console.log('🧮 Calculator Context updated', {
        step: state.currentStep,
        hasCalculation: !!state.calculation,
        errors: Object.keys(state.errors),
        formData: state.formData,
      });
    }
  }, [state.currentStep, Object.keys(state.errors).length]);

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const contextValue = {
    state,
    dispatch,
    actions,
  };

  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
}

// ==========================================
// CUSTOM HOOKS
// ==========================================

export function useCalculator() {
  const context = useContext(CalculatorContext);
  
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  
  return context;
}

export function useCalculatorForm() {
  const { state, actions } = useCalculator();
  
  return {
    formData: state.formData,
    updateFormData: actions.updateFormData,
    errors: state.errors,
    isCalculating: state.isCalculating,
  };
}

export function useCalculatorNavigation() {
  const { state, actions } = useCalculator();
  
  return {
    currentStep: state.currentStep,
    totalSteps: state.totalSteps,
    progress: actions.getStepProgress(),
    nextStep: actions.nextStep,
    prevStep: actions.prevStep,
    setStep: actions.setStep,
    canGoNext: state.currentStep < state.totalSteps,
    canGoPrev: state.currentStep > 1,
    validateStep: actions.validateCurrentStep,
  };
}

export function useCalculatorPrice() {
  const { state, actions } = useCalculator();
  
  return {
    calculation: state.calculation,
    isCalculating: state.isCalculating,
    calculatePrice: actions.calculatePrice,
    hasPrice: !!state.calculation,
  };
}

export function useCalculatorHistory() {
  const { state, actions } = useCalculator();
  
  return {
    history: state.history,
    resetCalculator: actions.resetCalculator,
    hasHistory: state.history.length > 0,
  };
}

// ==========================================
// TYPED CONTEXT EXPORT
// ==========================================

export type { CalculatorState, CalculatorAction };
export default CalculatorContext;