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
    title: 'Gestión Digital',
    description: 'Tecnología moderna para una experiencia sin complicaciones',
    features: [
      'Agendamiento online 24/7',
      'Recordatorios automáticos',
      'Seguimiento en tiempo real',
      'Facturación electrónica',
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
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-primary-400 to-accent-400"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-secondary-400 to-primary-400"></div>
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
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-8">
            Números que Hablan por Nosotros
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent-300">+500</div>
              <div className="text-primary-100">Hogares Atendidos</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent-300">4.8★</div>
              <div className="text-primary-100">Rating Promedio</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent-300">&lt;2h</div>
              <div className="text-primary-100">Tiempo Respuesta</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent-300">85%</div>
              <div className="text-primary-100">Clientes Recurrentes</div>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 mt-12 opacity-60"
        >
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</span>
            <span className="text-neutral-600">Bonded & Insured</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">🛡</span>
            <span className="text-neutral-600">Background Verified</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">🏆</span>
            <span className="text-neutral-600">Quality Certified</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">🌿</span>
            <span className="text-neutral-600">Eco-Friendly</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyTodoClean;