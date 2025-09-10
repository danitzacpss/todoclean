// ===================================
// TODO CLEAN - PROCESS SECTION
// Visual 3-step process explanation
// ===================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WhatsAppButton } from '@/components/ui/Button';
import { WHATSAPP_MESSAGES } from '@/utils/constants';

// ==========================================
// INTERFACES
// ==========================================

interface ProcessStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  details: string[];
  ctaText?: string;
}

interface ProcessStepProps extends ProcessStep {
  isActive: boolean;
  onClick: () => void;
}

// ==========================================
// COMPONENT DATA
// ==========================================

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'COTIZA',
    subtitle: 'En 30 segundos',
    description: 'Obtén tu precio exacto usando nuestra calculadora inteligente o hablando directamente con nosotros',
    icon: '💰',
    details: [
      'Calculadora de precios instantánea',
      'Cotización personalizada por WhatsApp',
      'Sin compromiso ni costos ocultos',
      'Precio final transparente',
    ],
    ctaText: 'Cotizar Ahora',
  },
  {
    id: 2,
    title: 'AGENDA',
    subtitle: 'Cuando te convenga',
    description: 'Elige el día y hora que mejor se adapte a tu rutina. Tenemos disponibilidad incluso fines de semana',
    icon: '📅',
    details: [
      'Disponibilidad lunes a domingo',
      'Horarios desde 8:00 a 20:00',
      'Agendamiento por WhatsApp 24/7',
      'Confirmación inmediata',
    ],
    ctaText: 'Ver Horarios',
  },
  {
    id: 3,
    title: 'RELÁJATE',
    subtitle: 'Nosotros hacemos el resto',
    description: 'Disfruta tu tiempo libre mientras nuestro equipo profesional deja tu hogar impecable',
    icon: '✨',
    details: [
      'Equipo profesional certificado',
      'Llegamos con todo el material',
      'Tu hogar impecable en 3-6 horas',
      'Garantía 100% de satisfacción',
    ],
    ctaText: 'Conocer Garantía',
  },
];

// ==========================================
// PROCESS STEP COMPONENT
// ==========================================

const ProcessStepComponent: React.FC<ProcessStepProps> = ({
  id,
  title,
  subtitle,
  description,
  icon,
  details,
  ctaText,
  isActive,
  onClick,
}) => {
  const handleCTAClick = () => {
    if (id === 1) {
      // Scroll to calculator or open WhatsApp
      const calculatorSection = document.querySelector('[data-section="calculator"]');
      if (calculatorSection) {
        calculatorSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.open(`https://wa.me/56926176543?text=${encodeURIComponent(WHATSAPP_MESSAGES.general)}`, '_blank');
      }
    } else if (id === 2) {
      window.open(`https://wa.me/56926176543?text=${encodeURIComponent('¡Hola! Me gustaría conocer su disponibilidad de horarios para agendar un servicio.')}`, '_blank');
    } else {
      window.location.href = '/sobre-nosotros#garantia';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: id * 0.2 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Connection Line */}
      {id < 3 && (
        <div className="hidden lg:block absolute top-24 left-1/2 w-full h-0.5 bg-gradient-to-r from-accent-300 to-transparent z-0"></div>
      )}

      {/* Step Card */}
      <div 
        className={`relative bg-white rounded-3xl shadow-lg p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 z-10 ${
          isActive ? 'ring-4 ring-accent-400 ring-opacity-50 shadow-2xl' : ''
        }`}
        onClick={onClick}
      >
        {/* Step Number */}
        <div className="absolute -top-6 left-8">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg transition-colors duration-300 ${
            isActive ? 'bg-accent-500' : 'bg-neutral-400'
          }`}>
            {id}
          </div>
        </div>

        {/* Icon */}
        <div className="text-center mb-6 mt-4">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl text-4xl transition-transform duration-300 ${
            isActive ? 'bg-accent-100 scale-110' : 'bg-neutral-100'
          }`}>
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="text-lg sm:text-2xl font-bold text-neutral-900 mb-1">
            {title}
          </h3>
          <p className="text-accent-600 font-semibold mb-3">
            {subtitle}
          </p>
          <p className="text-neutral-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Details (shown when active) */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isActive ? 'auto' : 0,
            opacity: isActive ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="space-y-3 mb-6">
            {details.map((detail, index) => (
              <div key={index} className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3"></span>
                <span className="text-sm text-neutral-700">{detail}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCTAClick();
            }}
            className="w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300"
          >
            {ctaText}
          </button>
        </motion.div>

        {/* Inactive State CTA */}
        {!isActive && (
          <div className="text-center">
            <span className="text-sm text-neutral-500 italic">
              Haz clic para ver más detalles
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section className="relative pt-20 pb-8 bg-gradient-to-br from-white via-neutral-50/70 to-neutral-50 overflow-hidden">
      {/* Elementos decorativos sutiles pero visibles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Pequeños acentos celestes visibles */}
          <div className="absolute top-24 left-16 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-30"></div>
          <div className="absolute top-48 right-24 w-2 h-2 bg-blue-400 rounded-full opacity-25"></div>
          <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-teal-400 rounded-full opacity-30"></div>
          
          {/* Elementos geométricos más visibles */}
          <div className="absolute top-1/3 right-16 w-8 h-8 border-2 border-cyan-300 rounded opacity-50 rotate-45"></div>
          <div className="absolute bottom-24 right-1/4 w-10 h-10 border-2 border-blue-300 rounded-full opacity-40"></div>
          <div className="absolute top-20 left-1/4 w-6 h-6 border-2 border-teal-300 opacity-45 rotate-12"></div>
        </div>

      <div className="container mx-auto px-1 sm:px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2">
              Proceso Simple
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading text-neutral-900 mb-4">
              Tu Hogar Limpio en 3 Pasos
            </h2>
            <p className="text-sm sm:text-xl text-neutral-600 max-w-full sm:max-w-3xl mx-auto leading-relaxed">
              Un proceso diseñado para tu comodidad. Sin complicaciones, sin sorpresas, solo resultados excepcionales
            </p>
          </motion.div>
        </div>

        {/* Process Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto mb-16">
          {PROCESS_STEPS.map((step) => (
            <ProcessStepComponent
              key={step.id}
              {...step}
              isActive={activeStep === step.id}
              onClick={() => setActiveStep(activeStep === step.id ? 0 : step.id)}
            />
          ))}
        </div>

        {/* Timeline Visualization (Mobile) */}
        <div className="lg:hidden max-w-md mx-auto mb-16">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-accent-300"></div>
            
            {/* Timeline Steps */}
            <div className="space-y-8">
              {PROCESS_STEPS.map((step) => (
                <div key={step.id} className="flex items-start">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold z-10 ${
                    step.id <= activeStep ? 'bg-accent-500' : 'bg-neutral-400'
                  }`}>
                    {step.id}
                  </div>
                  <div className="ml-4 pb-8">
                    <h4 className="font-bold text-neutral-900">{step.title}</h4>
                    <p className="text-sm text-neutral-600">{step.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default ProcessSection;