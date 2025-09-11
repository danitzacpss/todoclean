// ===================================
// TODO CLEAN - STEP 3 RESULT AND CONTACT
// Final step with price breakdown and contact form
// ===================================

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import Button from '@/components/ui/Button';
import PriceBreakdown from '@/components/ui/PriceBreakdown';
import AddressValidator from '@/components/ui/AddressValidator';
import type { QuoteFormData, PriceCalculation } from '@/types';
import { VALIDATION_RULES, ERROR_MESSAGES } from '@/utils/constants';
import { generateWhatsAppMessage } from '@/utils/whatsapp';

interface Step3ResultAndContactProps {
  formData: Partial<QuoteFormData>;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  calculation: PriceCalculation | null;
  errors: Record<string, string>;
  onSubmit: () => void;
  isSubmitting: boolean;
  className?: string;
}

const Step3ResultAndContact: React.FC<Step3ResultAndContactProps> = ({
  formData,
  updateFormData,
  calculation,
  errors,
  onSubmit,
  isSubmitting,
  className,
}) => {
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'schedule' | 'save' | 'adjust' | null>(null);

  // Validation
  const validateField = (field: string, value: any) => {
    const newErrors = { ...localErrors };
    
    switch (field) {
      case 'name':
        if (!value?.trim()) {
          newErrors.name = ERROR_MESSAGES.REQUIRED_FIELD;
        } else if (value.length < VALIDATION_RULES.NAME_MIN_LENGTH) {
          newErrors.name = ERROR_MESSAGES.NAME_TOO_SHORT;
        } else if (value.length > VALIDATION_RULES.NAME_MAX_LENGTH) {
          newErrors.name = ERROR_MESSAGES.NAME_TOO_LONG;
        } else {
          delete newErrors.name;
        }
        break;
        
      case 'phone':
        if (!value?.trim()) {
          newErrors.phone = ERROR_MESSAGES.REQUIRED_FIELD;
        } else if (!VALIDATION_RULES.PHONE_PATTERN.test(value)) {
          newErrors.phone = ERROR_MESSAGES.INVALID_PHONE;
        } else {
          delete newErrors.phone;
        }
        break;
        
      case 'email':
        if (value && !VALIDATION_RULES.EMAIL_PATTERN.test(value)) {
          newErrors.email = ERROR_MESSAGES.INVALID_EMAIL;
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'address':
        if (!value?.trim()) {
          newErrors.address = 'La dirección es requerida para el servicio';
        } else {
          delete newErrors.address;
        }
        break;
    }
    
    setLocalErrors(newErrors);
  };

  // Handle field changes
  const handleFieldChange = (field: keyof QuoteFormData, value: string) => {
    updateFormData({ [field]: value });
    validateField(field, value);
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    const fieldsToValidate = ['name', 'phone', 'email', 'address'];
    let isValid = true;
    
    fieldsToValidate.forEach(field => {
      const value = formData[field as keyof QuoteFormData];
      validateField(field, value);
      if (localErrors[field] || errors[field]) {
        isValid = false;
      }
    });
    
    if (!acceptedTerms) {
      setLocalErrors(prev => ({
        ...prev,
        terms: 'Debes aceptar los términos y condiciones'
      }));
      isValid = false;
    }
    
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (action: 'schedule' | 'save' | 'whatsapp' | 'call') => {
    if (!validateForm()) return;
    
    setSelectedAction(action === 'whatsapp' || action === 'call' ? 'schedule' : action);
    
    switch (action) {
      case 'whatsapp':
        handleWhatsAppAction();
        break;
      case 'call':
        handleCallAction();
        break;
      case 'schedule':
      case 'save':
        onSubmit();
        break;
    }
  };

  // Handle WhatsApp action
  const handleWhatsAppAction = () => {
    if (!calculation) return;
    
    const message = generateWhatsAppMessage({
      type: 'calculator',
      serviceType: calculation.serviceType,
      calculation,
      customerData: {
        name: formData.name || '',
        phone: formData.phone || '',
        address: formData.address || '',
      }
    });
    
    const whatsappUrl = `https://wa.me/56926176543?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Handle call action
  const handleCallAction = () => {
    window.location.href = 'tel:+56926176543';
  };

  const allErrors = { ...localErrors, ...errors };

  if (!calculation) {
    return (
      <div className={cn('text-center py-8', className)}>
        <div className="text-neutral-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 14h.01M9 11h.01M12 11h.01M15 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <p>Complete los pasos anteriores para ver el resultado</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-8', className)}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          ¡Tu Cotización Está Lista!
        </h2>
        <p className="text-neutral-600">
          Revisa los detalles y completa tus datos para agendar
        </p>
      </div>

      {/* Price Breakdown */}
      <PriceBreakdown calculation={calculation} showDetails={true} />

      {/* Contact Form */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Datos de Contacto
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Nombre completo *
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              placeholder="Tu nombre completo"
              className={cn(
                'w-full px-3 py-2 border border-neutral-300 rounded-lg shadow-sm',
                'focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
                allErrors.name && 'border-red-500 focus:border-red-500 focus:ring-red-500'
              )}
            />
            {allErrors.name && (
              <p className="mt-1 text-sm text-red-600">{allErrors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Teléfono *
            </label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              placeholder="+56 9 XXXX XXXX"
              className={cn(
                'w-full px-3 py-2 border border-neutral-300 rounded-lg shadow-sm',
                'focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
                allErrors.phone && 'border-red-500 focus:border-red-500 focus:ring-red-500'
              )}
            />
            {allErrors.phone && (
              <p className="mt-1 text-sm text-red-600">{allErrors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Email (opcional)
            </label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              placeholder="tu@email.com"
              className={cn(
                'w-full px-3 py-2 border border-neutral-300 rounded-lg shadow-sm',
                'focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
                allErrors.email && 'border-red-500 focus:border-red-500 focus:ring-red-500'
              )}
            />
            {allErrors.email && (
              <p className="mt-1 text-sm text-red-600">{allErrors.email}</p>
            )}
          </div>

          {/* Address - Full width */}
          <div className="md:col-span-2">
            <AddressValidator
              value={formData.address || ''}
              onChange={(address) => handleFieldChange('address', address)}
              onZoneChange={(zone) => {
                if (zone) {
                  updateFormData({ zone });
                } else {
                  updateFormData({});
                }
              }}
              required={true}
              {...(allErrors.address && { error: allErrors.address })}
            />
          </div>

          {/* Comments */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Comentarios adicionales (opcional)
            </label>
            <textarea
              rows={3}
              value={formData.notes || ''}
              onChange={(e) => handleFieldChange('notes', e.target.value)}
              placeholder="Instrucciones especiales, acceso, horario preferido, etc."
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Terms and conditions */}
        <div className="mt-6">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => {
                setAcceptedTerms(e.target.checked);
                if (e.target.checked) {
                  setLocalErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.terms;
                    return newErrors;
                  });
                }
              }}
              className="mt-1 mr-3 h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-neutral-600">
              Acepto los{' '}
              <a href="/terminos-condiciones" target="_blank" className="text-primary-600 hover:text-primary-700 underline">
                términos y condiciones
              </a>{' '}
              y la{' '}
              <a href="/politica-privacidad" target="_blank" className="text-primary-600 hover:text-primary-700 underline">
                política de privacidad
              </a>
            </span>
          </label>
          {allErrors.terms && (
            <p className="mt-1 text-sm text-red-600">{allErrors.terms}</p>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
        <h3 className="text-lg font-semibold text-primary-800 mb-4 text-center">
          ¿Cómo quieres continuar?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* WhatsApp */}
          <Button
            variant="whatsapp"
            onClick={() => handleSubmit('whatsapp')}
            disabled={isSubmitting}
            className="flex flex-col items-center p-4 h-auto"
          >
            <svg className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 2.079.549 4.090 1.595 5.904L0 24l6.335-1.652c1.746.943 3.71 1.444 5.682 1.444C18.597 24 24 18.633 24 11.987 24 5.367 18.597.001 12.017.001zm5.951 16.847c-.272.762-1.344 1.392-2.177 1.584-.576.133-1.328.24-3.848-.802-2.719-1.123-4.49-3.902-4.627-4.083-.137-.181-1.124-1.479-1.124-2.818 0-1.339.7-1.996 1.006-2.267.272-.24.653-.361 1.124-.361.137 0 .272 0 .396.016.272.016.651-.104.998.762.361.897 1.228 2.993 1.339 3.212.111.218.184.468.037.76-.147.273-.22.437-.401.67-.181.232-.383.518-.548.697-.181.197-.37.408-.159.803.211.396.938 1.548 2.014 2.506 1.386 1.232 2.55 1.61 2.914 1.79.361.181.576.152.789-.091.211-.242.911-1.066 1.154-1.433.242-.366.484-.305.817-.183.331.122 2.122 1.002 2.485 1.184.361.181.606.272.697.426.091.152.091.881-.181 1.643z"/>
            </svg>
            <span className="text-sm font-medium">WhatsApp</span>
            <span className="text-xs opacity-75">Respuesta inmediata</span>
          </Button>

          {/* Call */}
          <Button
            variant="primary"
            onClick={() => handleSubmit('call')}
            disabled={isSubmitting}
            className="flex flex-col items-center p-4 h-auto"
          >
            <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-sm font-medium">Llamar</span>
            <span className="text-xs opacity-75">Habla directamente</span>
          </Button>

          {/* Schedule */}
          <Button
            variant="primary"
            onClick={() => handleSubmit('schedule')}
            loading={isSubmitting && selectedAction === 'schedule'}
            disabled={isSubmitting}
            className="flex flex-col items-center p-4 h-auto"
          >
            <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">Agendar</span>
            <span className="text-xs opacity-75">Confirmar servicio</span>
          </Button>

          {/* Save for later */}
          <Button
            variant="outline"
            onClick={() => handleSubmit('save')}
            loading={isSubmitting && selectedAction === 'save'}
            disabled={isSubmitting}
            className="flex flex-col items-center p-4 h-auto"
          >
            <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <span className="text-sm font-medium">Guardar</span>
            <span className="text-xs opacity-75">Decidir después</span>
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-primary-700">
            📞 También puedes llamarnos directamente al{' '}
            <a href="tel:+56926176543" className="font-medium hover:underline">
              +56 9 2617 6543
            </a>
          </p>
        </div>
      </div>

      {/* Additional information */}
      <div className="bg-neutral-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-neutral-700 mb-2">
          ¿Qué pasa después?
        </h4>
        <ul className="text-sm text-neutral-600 space-y-1">
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Te contactaremos en menos de 2 horas
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Confirmaremos fecha y hora exacta
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Llevamos todos los productos incluidos
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Step3ResultAndContact;