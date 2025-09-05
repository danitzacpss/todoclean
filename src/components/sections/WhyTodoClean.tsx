// ===================================
// TODO CLEAN - WHY TODO CLEAN SECTION
// Key differentiators and benefits
// ===================================

import React from 'react';
import { motion } from 'framer-motion';

// ==========================================
// INTERFACES
// ==========================================

interface DifferentiatorProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  index: number;
}

// ==========================================
// COMPONENT DATA
// ==========================================

const DIFFERENTIATORS = [
  {
    icon: '🏆',
    title: 'Estándares Americanos',
    description: 'Técnicas y procesos de limpieza profesional con certificación internacional',
    features: [
      'Personal capacitado con técnicas internacionales',
      'Productos eco-friendly certificados',
      'Protocolos de desinfección hospitalarios',
      'Control de calidad en cada servicio',
    ],
  },
  {
    icon: '⚡',
    title: 'Rapidez Garantizada',
    description: 'Tu hogar impecable en tiempo récord sin comprometer la calidad',
    features: [
      'Equipos de trabajo optimizados',
      'Tecnología de limpieza avanzada',
      'Planificación estratégica por ambiente',
      'Puntualidad garantizada o dinero de vuelta',
    ],
  },
  {
    icon: '🔒',
    title: '100% Confiable',
    description: 'Máxima seguridad y confianza para tu hogar y familia',
    features: [
      'Personal con antecedentes al día',
      'Seguro de responsabilidad civil',
      'Sistema de llaves seguro',
      'Verificación de referencias laborales',
    ],
  },
  {
    icon: '📱',
    title: 'Atención Personalizada',
    description: 'Comunicación directa y personal para una experiencia sin complicaciones',
    features: [
      'Atención por WhatsApp 24/7',
      'Respuesta inmediata a consultas',
      'Coordinación directa con el equipo',
      'Seguimiento personalizado del servicio',
    ],
  },
];

// ==========================================
// DIFFERENTIATOR CARD COMPONENT
// ==========================================

const DifferentiatorCard: React.FC<DifferentiatorProps> = ({
  icon,
  title,
  description,
  features,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="h-full bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-neutral-200 hover:border-accent-300">
        {/* Icon Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            {title}
          </h3>
          <p className="text-neutral-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-3">
          {features.map((feature, featureIndex) => (
            <motion.div
              key={featureIndex}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start"
            >
              <span className="flex-shrink-0 w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3"></span>
              <span className="text-sm text-neutral-700 leading-relaxed">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Hover Effect Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-50 to-secondary-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const WhyTodoClean: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-neutral-50/60 via-white to-white overflow-hidden">
      {/* Elementos decorativos sutiles pero visibles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Pequeños acentos celestes visibles */}
        <div className="absolute top-32 left-32 w-1.5 h-1.5 bg-cyan-500/30 rounded-full" />
        <div className="absolute bottom-40 right-20 w-2 h-2 bg-teal-500/25 rounded-full" />
        
        {/* Elementos geométricos más visibles */}
        <div className="absolute top-24 right-32 w-8 h-8 border-2 border-cyan-300/50 rotate-45" />
        <div className="absolute bottom-32 left-24 w-10 h-10 border-2 border-teal-300/40 rotate-12" />
        <div className="absolute top-40 right-12 w-6 h-6 border-2 border-blue-300/45 rotate-12" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2">
              La Diferencia Todo Clean
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-neutral-900 mb-4">
              ¿Por Qué Todo Clean?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Más de 500 hogares confían en nosotros. Conoce los estándares que nos hacen únicos en Chillán
            </p>
          </motion.div>
        </div>

        {/* Differentiators Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {DIFFERENTIATORS.map((differentiator, index) => (
            <DifferentiatorCard
              key={differentiator.title}
              icon={differentiator.icon}
              title={differentiator.title}
              description={differentiator.description}
              features={differentiator.features}
              index={index}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-white/80 via-cyan-50/60 to-teal-50/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 text-center shadow-xl border border-white/30"
        >
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-700 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Números que Hablan por Nosotros
              </h3>
              <p className="text-base text-gray-700 mb-10 max-w-2xl mx-auto font-medium">
                  La confianza de nuestros clientes se refleja en estos resultados
                </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                <div className="group bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/40 hover:bg-white/80 hover:border-cyan-200/50 transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-3">+500</div>
                  <div className="text-gray-700 text-sm md:text-base font-semibold">Hogares Atendidos</div>
                    <div className="w-8 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto mt-3 rounded-full group-hover:w-12 transition-all duration-300"></div>
                  </div>
                  <div className="group bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/40 hover:bg-white/80 hover:border-cyan-200/50 transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-3 flex items-center justify-center gap-1">
                      4.8<span className="text-yellow-500 text-2xl md:text-3xl drop-shadow-sm">★</span>
                    </div>
                    <div className="text-gray-700 text-sm md:text-base font-semibold">Rating Promedio</div>
                    <div className="w-8 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto mt-3 rounded-full group-hover:w-12 transition-all duration-300"></div>
                  </div>
                  <div className="group bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/40 hover:bg-white/80 hover:border-cyan-200/50 transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-3">&lt;2h</div>
                    <div className="text-gray-700 text-sm md:text-base font-semibold">Tiempo Respuesta</div>
                    <div className="w-8 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto mt-3 rounded-full group-hover:w-12 transition-all duration-300"></div>
                  </div>
                  <div className="group bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/40 hover:bg-white/80 hover:border-cyan-200/50 transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-3">85%</div>
                    <div className="text-gray-700 text-sm md:text-base font-semibold">Clientes Recurrentes</div>
                    <div className="w-8 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto mt-3 rounded-full group-hover:w-12 transition-all duration-300"></div>
                </div>
              </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mt-12"
        >
          <div className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-gray-700 font-medium text-sm md:text-base">Asegurado y Garantizado</span>
          </div>
          <div className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-gray-700 font-medium text-sm md:text-base">Personal Verificado</span>
          </div>
          <div className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <span className="text-gray-700 font-medium text-sm md:text-base">Calidad Certificada</span>
          </div>
          <div className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-gray-700 font-medium text-sm md:text-base">Eco-Amigable</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyTodoClean;