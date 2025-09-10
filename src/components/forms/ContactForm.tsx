import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { contactFormSchema, type ContactFormData, validateField } from '@/utils/validation';
import { SITE_CONFIG, WHATSAPP_MESSAGES, SERVICE_PRICING } from '@/utils/constants';
import { generateWhatsAppURL } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';

// Extended schema for contact form with additional fields
const extendedContactFormSchema = contactFormSchema.extend({
  servicio: z.enum(['residencial', 'empresarial', 'otro']).optional(),
  telefono: z.string().optional(),
  terminos: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los términos y condiciones'
  })
});

type ExtendedContactFormData = z.infer<typeof extendedContactFormSchema>;

interface ContactFormProps {
  onSuccess: () => void;
  initialService?: string;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSuccess,
  initialService,
  className = ''
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
    trigger
  } = useForm<ExtendedContactFormData>({
    resolver: zodResolver(extendedContactFormSchema),
    defaultValues: {
      servicio: initialService as any,
      terminos: false
    },
    mode: 'onChange'
  });

  // Watch email for suggestions
  const emailValue = watch('email');

  useEffect(() => {
    if (emailValue && emailValue.includes('@')) {
      const domain = emailValue.split('@')[1]?.toLowerCase();
      const suggestions: Record<string, string> = {
        'gmial.com': 'gmail.com',
        'gmai.com': 'gmail.com',
        'gmail.co': 'gmail.com',
        'hotmial.com': 'hotmail.com',
        'hotmai.com': 'hotmail.com',
        'yahooo.com': 'yahoo.com',
        'yaho.com': 'yahoo.com',
      };
      
      if (domain && suggestions[domain]) {
        setEmailSuggestion(emailValue.replace(domain, suggestions[domain]));
      } else {
        setEmailSuggestion(null);
      }
    } else {
      setEmailSuggestion(null);
    }
  }, [emailValue]);

  const onSubmit = async (data: ExtendedContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Track form submission attempt
      trackEvent('form_submit', {
        form_type: 'contact',
        service_type: data.servicio || 'general',
        has_phone: !!data.telefono
      });

      // Simulate form submission (replace with actual API call)
      const response = await simulateFormSubmission(data);
      
      if (response.success) {
        trackEvent('form_submit_success', {
          form_type: 'contact',
          service_type: data.servicio || 'general'
        });
        onSuccess();
      } else {
        throw new Error(response.error || 'Error al enviar el formulario');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setSubmitError(errorMessage);
      
      trackEvent('form_submit_error', {
        form_type: 'contact',
        error_message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppFallback = () => {
    const formData = watch();
    const message = WHATSAPP_MESSAGES.contact(
      formData.name || 'Usuario',
      formData.servicio ? getServiceName(formData.servicio) : undefined
    );
    
    trackEvent('whatsapp_fallback', {
      source: 'contact_form',
      reason: 'form_error'
    });
    
    window.open(generateWhatsAppURL(message), '_blank');
  };

  const getServiceName = (serviceKey: string): string => {
    const serviceNames: Record<string, string> = {
      residencial: 'Servicios Residenciales',
      empresarial: 'Servicios Empresariales',
      otro: 'Otro servicio'
    };
    return serviceNames[serviceKey] || serviceKey;
  };

  const applySuggestion = () => {
    if (emailSuggestion) {
      setValue('email', emailSuggestion);
      setEmailSuggestion(null);
      trigger('email');
    }
  };

  return (
    <Card className={`p-6 md:p-8 ${className}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
            Nombre completo *
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              errors.name ? 'border-red-300 bg-red-50' : 'border-neutral-300'
            }`}
            placeholder="Ingresa tu nombre completo"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600 flex items-center">
              <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
            Email *
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-neutral-300'
            }`}
            placeholder="tu@email.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : 'email-suggestion'}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600 flex items-center">
              <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
              {errors.email.message}
            </p>
          )}
          {emailSuggestion && !errors.email && (
            <div id="email-suggestion" className="mt-1">
              <button
                type="button"
                onClick={applySuggestion}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                ¿Quisiste decir {emailSuggestion}?
              </button>
            </div>
          )}
        </div>

        {/* Phone (optional) */}
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-neutral-700 mb-2">
            Teléfono <span className="text-neutral-400">(opcional)</span>
          </label>
          <input
            id="telefono"
            type="tel"
            {...register('telefono')}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="+56 9 XXXX XXXX"
            aria-describedby="telefono-help"
          />
          <p id="telefono-help" className="mt-1 text-sm text-neutral-500">
            Para contacto más rápido por WhatsApp
          </p>
        </div>

        {/* Service Type */}
        <div>
          <label htmlFor="servicio" className="block text-sm font-medium text-neutral-700 mb-2">
            Servicio de interés <span className="text-neutral-400">(opcional)</span>
          </label>
          <select
            id="servicio"
            {...register('servicio')}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            aria-describedby="servicio-help"
          >
            <option value="">Selecciona un servicio</option>
            <option value="residencial">Servicios Residenciales</option>
            <option value="empresarial">Servicios Empresariales</option>
            <option value="otro">Otro</option>
          </select>
          <p id="servicio-help" className="mt-1 text-sm text-neutral-500">
            Nos ayuda a preparar mejor tu cotización
          </p>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
            Mensaje *
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical ${
              errors.message ? 'border-red-300 bg-red-50' : 'border-neutral-300'
            }`}
            placeholder="Cuéntanos qué tipo de limpieza necesitas, el tamaño de tu hogar/oficina, y cualquier detalle específico que consideres importante..."
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : 'message-help'}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-600 flex items-center">
              <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
              {errors.message.message}
            </p>
          )}
          {!errors.message && (
            <p id="message-help" className="mt-1 text-sm text-neutral-500">
              Mínimo 10 caracteres. Entre más detalles, mejor cotización.
            </p>
          )}
        </div>

        {/* Terms acceptance */}
        <div className="flex items-start space-x-3">
          <input
            id="terminos"
            type="checkbox"
            {...register('terminos')}
            className={`w-4 h-4 text-primary-600 bg-white border-neutral-300 rounded focus:ring-primary-500 focus:ring-2 ${
              errors.terminos ? 'border-red-300' : ''
            }`}
            aria-invalid={errors.terminos ? 'true' : 'false'}
            aria-describedby={errors.terminos ? 'terminos-error' : 'terminos-help'}
          />
          <div className="flex-1">
            <label htmlFor="terminos" className="text-sm text-neutral-600">
              Acepto los{' '}
              <a 
                href="/terminos-condiciones" 
                className="text-primary-600 hover:text-primary-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                términos y condiciones
              </a>
              {' '}y{' '}
              <a 
                href="/politica-privacidad" 
                className="text-primary-600 hover:text-primary-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                política de privacidad
              </a>
              {' '}*
            </label>
            {errors.terminos && (
              <p id="terminos-error" className="mt-1 text-sm text-red-600 flex items-center">
                <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                {errors.terminos.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Error */}
        {submitError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">Error al enviar formulario</h3>
                <p className="mt-1 text-sm text-red-700">{submitError}</p>
                <div className="mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleWhatsAppFallback}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    Contactar por WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="space-y-4">
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting || !isValid}
            aria-describedby="submit-help"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando mensaje...
              </>
            ) : (
              <>
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                Enviar mensaje
              </>
            )}
          </Button>
          
          <p id="submit-help" className="text-center text-sm text-neutral-500">
            Te responderemos dentro de las próximas 2 horas
          </p>
          
          <div className="text-center">
            <p className="text-sm text-neutral-600 mb-2">¿Prefieres contacto inmediato?</p>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                trackEvent('whatsapp_click', {
                  source: 'contact_form',
                  message_type: 'general'
                });
                window.open(generateWhatsAppURL(WHATSAPP_MESSAGES.general), '_blank');
              }}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp directo
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

// Simulated form submission (replace with actual API integration)
async function simulateFormSubmission(data: ExtendedContactFormData): Promise<{
  success: boolean;
  error?: string;
}> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate random success/failure for testing
  // In production, this would be replaced with actual form submission logic
  if (Math.random() > 0.1) { // 90% success rate
    return { success: true };
  } else {
    return { 
      success: false, 
      error: 'Error de conexión. Por favor intenta nuevamente o usa WhatsApp.' 
    };
  }
}