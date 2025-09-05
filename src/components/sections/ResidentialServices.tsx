// ===================================
// TODO CLEAN - RESIDENTIAL SERVICES SECTION
// Complete residential services section with pricing, comparisons and FAQs
// ===================================

import React, { useState } from 'react';
import PricingTable from '../ui/PricingTable';
import ServiceCompare from '../ui/ServiceCompare';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/utils/constants';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const RESIDENTIAL_FAQS: FAQItem[] = [
  {
    id: '1',
    question: '¿Traen sus propios productos de limpieza?',
    answer: 'Sí, incluimos todos los productos profesionales eco-friendly en nuestros servicios. Utilizamos productos de calidad internacional que son seguros para tu familia y mascotas. Solo necesitas tener agua disponible.'
  },
  {
    id: '2',
    question: '¿Debo estar presente durante la limpieza?',
    answer: 'No es necesario que estés presente. Manejamos un sistema de llaves seguro y nuestro personal está completamente verificado con antecedentes al día. Muchos de nuestros clientes nos dejan las llaves y regresan a un hogar impecable.'
  },
  {
    id: '3',
    question: '¿Puedo personalizar el servicio según mis necesidades?',
    answer: 'Absolutamente. Entendemos que cada hogar es único. Puedes solicitar atención especial a ciertas áreas, excluir espacios específicos, o agregar servicios extras como limpieza de electrodomésticos o ventanas exteriores.'
  },
  {
    id: '4',
    question: '¿Qué pasa si no quedo conforme con el servicio?',
    answer: 'Ofrecemos garantía 100% de satisfacción. Si no quedas completamente satisfecho con nuestro trabajo, regresamos sin costo adicional dentro de las siguientes 24 horas, o te devolvemos tu dinero.'
  },
  {
    id: '5',
    question: '¿Con cuánta anticipación debo reservar?',
    answer: 'Recomendamos reservar con 24-48 horas de anticipación para asegurar tu horario preferido. Sin embargo, también atendemos servicios de emergencia el mismo día según disponibilidad, especialmente para Quilamapu y centro de Chillán.'
  },
  {
    id: '6',
    question: '¿Qué diferencia hay entre limpieza regular y profunda?',
    answer: 'La limpieza regular es perfecta para mantenimiento semanal o quincenal. La limpieza profunda incluye todo lo anterior más: ventanas interiores, electrodomésticos por dentro, zócalos, debajo de muebles y desinfección especializada. Es ideal para primera limpieza o después de mucho tiempo.'
  },
];

interface FAQAccordionProps {
  faqs: FAQItem[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div key={faq.id} className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
          <button
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors"
            onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
            aria-expanded={openFAQ === faq.id}
          >
            <span className="font-semibold text-neutral-900 pr-4">{faq.question}</span>
            <svg
              className={`w-5 h-5 text-neutral-500 transition-transform duration-200 ${
                openFAQ === faq.id ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {openFAQ === faq.id && (
            <div className="px-6 pb-4 text-neutral-600 border-t border-neutral-100 bg-neutral-50">
              <div className="pt-4">
                {faq.answer}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ResidentialServices: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-neutral-900 mb-6">
          Servicios Residenciales
        </h1>
        
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
          Transforma tu hogar en un espacio impecable con nuestros servicios profesionales de limpieza. 
          Desde limpieza regular hasta servicios post-obra, tenemos la solución perfecta para ti.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">350+</div>
            <div className="text-sm text-neutral-600">Clientes Satisfechos</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-green-600">4.8★</div>
            <div className="text-sm text-neutral-600">Calificación Promedio</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-amber-600">24h</div>
            <div className="text-sm text-neutral-600">Tiempo de Respuesta</div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section>
        <PricingTable />
      </section>

      {/* Service Comparison */}
      <section>
        <ServiceCompare />
      </section>

      {/* Additional Services */}
      <section className="bg-gradient-to-r from-neutral-50 to-blue-50/50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Servicios Adicionales
          </h2>
          <p className="text-lg text-neutral-600">
            Complementa tu limpieza con estos servicios especializados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Ventanas Exteriores',
              price: 8000,
              description: 'Limpieza completa por fuera',
              icon: '🪟'
            },
            {
              name: 'Terraza/Balcón',
              price: 12000,
              description: 'Barrido, lavado y orden',
              icon: '🏡'
            },
            {
              name: 'Interior Refrigerador',
              price: 10000,
              description: 'Limpieza y desinfección',
              icon: '❄️'
            },
            {
              name: 'Horno/Microondas',
              price: 8000,
              description: 'Desengrase profundo',
              icon: '🔥'
            },
            {
              name: 'Interior Closets',
              price: 12000,
              description: 'Aspirado y orden interior',
              icon: '👔'
            },
            {
              name: 'Shampoo Alfombras',
              price: 15000,
              description: 'Limpieza especializada',
              icon: '🏠'
            },
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{service.icon}</span>
                <div>
                  <h3 className="font-semibold text-neutral-900">{service.name}</h3>
                  <p className="text-sm text-neutral-600">{service.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">
                  ${service.price.toLocaleString()}
                </span>
                <button 
                  onClick={() => {
                    const message = encodeURIComponent(
                      `¡Hola! Me interesa agregar el servicio de ${service.name} a mi limpieza.`
                    );
                    window.open(`https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`, '_blank');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Resolvemos las dudas más comunes sobre nuestros servicios residenciales
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <FAQAccordion faqs={RESIDENTIAL_FAQS} />
        </div>

        {/* FAQ Bottom CTA */}
        <div className="text-center mt-8 p-6 bg-blue-50 rounded-xl">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            ¿No encuentras respuesta a tu pregunta?
          </h3>
          <p className="text-neutral-600 mb-4">
            Nuestro equipo está listo para ayudarte con cualquier consulta específica.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('¡Hola! Tengo algunas preguntas sobre sus servicios residenciales.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.287" />
              </svg>
              Preguntar por WhatsApp
            </a>
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-neutral-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Formulario de Contacto
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          ¡Comienza hoy mismo!
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Miles de familias en Chillán ya confían en nosotros. 
          Únete y descubre por qué somos la opción #1 en limpieza residencial.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/cotizador"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-neutral-50 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 002 2v14a2 2 0 002 2z" />
            </svg>
            Cotizar Ahora
          </Link>
          
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('¡Hola! Me interesa contratar un servicio de limpieza residencial. ¿Podrían darme más información?')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.287" />
            </svg>
            Reservar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
};

export default ResidentialServices;