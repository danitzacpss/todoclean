// ===================================
// TODO CLEAN - SERVICE COMPARE COMPONENT
// Side-by-side service comparison component
// ===================================

import React from 'react';

interface ServiceFeature {
  name: string;
  regular: boolean;
  deep: boolean;
  description?: string;
}

interface ServiceCompareProps {
  className?: string;
}

const SERVICE_FEATURES: ServiceFeature[] = [
  {
    name: 'Aspirado y barrido completo',
    regular: true,
    deep: true,
    description: 'Limpieza de todos los pisos y superficies'
  },
  {
    name: 'Trapeado de todos los pisos',
    regular: true,
    deep: true,
    description: 'Con productos desinfectantes profesionales'
  },
  {
    name: 'Desinfección de baños',
    regular: true,
    deep: true,
    description: 'Sanitarios, lavamanos, duchas y azulejos'
  },
  {
    name: 'Limpieza básica de cocina',
    regular: true,
    deep: true,
    description: 'Mesones, lavaplatos y superficies visibles'
  },
  {
    name: 'Cambio de sábanas',
    regular: true,
    deep: true,
    description: 'Si se proporciona ropa de cama limpia'
  },
  {
    name: 'Orden general de espacios',
    regular: true,
    deep: true,
    description: 'Organización de objetos y superficies'
  },
  {
    name: 'Limpieza de ventanas interiores',
    regular: false,
    deep: true,
    description: 'Cristales, marcos y alfeizares'
  },
  {
    name: 'Electrodomésticos por dentro',
    regular: false,
    deep: true,
    description: 'Refrigerador, horno, microondas'
  },
  {
    name: 'Zócalos y marcos de puertas',
    regular: false,
    deep: true,
    description: 'Limpieza detallada de bordes'
  },
  {
    name: 'Debajo de muebles móviles',
    regular: false,
    deep: true,
    description: 'Sofás, camas y muebles ligeros'
  },
  {
    name: 'Desinfección profunda',
    regular: false,
    deep: true,
    description: 'Productos especializados y mayor tiempo'
  },
  {
    name: 'Limpieza de luminarias',
    regular: false,
    deep: true,
    description: 'Lámparas, apliques y accesorios'
  },
];

const ServiceCompare: React.FC<ServiceCompareProps> = ({ className = '' }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          ¿Qué Incluye Cada Servicio?
        </h2>
        <p className="text-lg text-neutral-600 max-w-full sm:max-w-2xl mx-auto">
          Comparación detallada para que sepas exactamente qué incluye cada tipo de limpieza.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
        
        {/* Table Header - Desktop */}
        <div className="hidden md:grid md:grid-cols-3 bg-neutral-50 border-b border-neutral-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900">Servicios Incluidos</h3>
          </div>
          
          <div className="p-6 bg-blue-50 border-l border-neutral-200">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Limpieza Regular</h3>
              <p className="text-sm text-neutral-600 mt-1">Desde $35.000</p>
              <p className="text-xs text-neutral-500 mt-1">3-4 horas</p>
            </div>
          </div>
          
          <div className="p-6 bg-green-50 border-l border-neutral-200">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Limpieza Profunda</h3>
              <p className="text-sm text-neutral-600 mt-1">Desde $55.000</p>
              <p className="text-xs text-neutral-500 mt-1">4-6 horas</p>
            </div>
          </div>
        </div>

        {/* Feature Rows - Desktop */}
        <div className="hidden md:block">
          {SERVICE_FEATURES.map((feature, index) => (
            <div 
              key={feature.name} 
              className={`grid grid-cols-3 border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${
                index === SERVICE_FEATURES.length - 1 ? 'border-b-0' : ''
              }`}
            >
              <div className="p-4 flex items-center">
                <div>
                  <div className="font-medium text-neutral-900">{feature.name}</div>
                  {feature.description && (
                    <div className="text-sm text-neutral-500 mt-1">{feature.description}</div>
                  )}
                </div>
              </div>
              
              <div className="p-4 border-l border-neutral-100 flex items-center justify-center">
                {feature.regular ? (
                  <div className="flex items-center text-green-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2 text-sm font-medium">Incluido</span>
                  </div>
                ) : (
                  <div className="flex items-center text-neutral-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2 text-sm">No incluido</span>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-l border-neutral-100 flex items-center justify-center">
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-sm font-medium">Incluido</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Regular Service Card */}
          <div className="p-6 border-b border-neutral-200">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Limpieza Regular</h3>
              <p className="text-sm text-neutral-600">Desde $35.000 • 3-4 horas</p>
            </div>
            
            <div className="space-y-3">
              {SERVICE_FEATURES.filter(f => f.regular).map((feature) => (
                <div key={feature.name} className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="text-sm font-medium text-neutral-900">{feature.name}</div>
                    {feature.description && (
                      <div className="text-xs text-neutral-500 mt-1">{feature.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Service Card */}
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Limpieza Profunda</h3>
              <p className="text-sm text-neutral-600">Desde $55.000 • 4-6 horas</p>
              <p className="text-xs text-green-600 mt-1">Incluye todo lo anterior +</p>
            </div>
            
            <div className="space-y-3">
              {SERVICE_FEATURES.map((feature) => (
                <div key={feature.name} className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className={`text-sm font-medium ${!feature.regular ? 'text-green-700' : 'text-neutral-900'}`}>
                      {feature.name}
                      {!feature.regular && (
                        <span className="inline-flex items-center ml-2 px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                          Extra
                        </span>
                      )}
                    </div>
                    {feature.description && (
                      <div className="text-xs text-neutral-500 mt-1">{feature.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-neutral-900 mb-2">
          ¿No estás seguro cuál servicio necesitas?
        </h3>
        <p className="text-neutral-600 mb-6">
          Nuestros expertos pueden ayudarte a elegir el servicio perfecto para tu hogar.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/56926176543?text=Hola%2C%20me%20gustar%C3%ADa%20que%20me%20ayuden%20a%20elegir%20el%20servicio%20de%20limpieza%20m%C3%A1s%20adecuado%20para%20mi%20hogar."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-xl hover:bg-green-600 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.287" />
            </svg>
            Pedir Asesoría
          </a>
          
          <button
              onClick={() => {
                const faqSection = document.getElementById('preguntas-frecuentes');
                if (faqSection) {
                  faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-neutral-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ver FAQs
            </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCompare;