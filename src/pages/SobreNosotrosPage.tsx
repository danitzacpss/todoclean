import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  CheckBadgeIcon,
  TrophyIcon,
  UserGroupIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { WHATSAPP_MESSAGES, SITE_CONFIG } from '../utils/constants';
import { generateWhatsAppURL } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';

const SobreNosotrosPage: React.FC = () => {

  const stats = [
    { number: '500+', label: 'Servicios completados', icon: TrophyIcon },
    { number: '4.8/5', label: 'Rating promedio', icon: StarIcon },
    { number: '98%', label: 'Puntualidad', icon: ClockIcon },
    { number: '85%', label: 'Clientes recurrentes', icon: UserGroupIcon }
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Fundación',
      description: 'Nacemos de la frustración con servicios impuntuales y poco profesionales en Chillán.'
    },
    {
      year: '2023',
      title: 'Primeros clientes',
      description: 'Comenzamos con 5 hogares en el centro de Chillán, enfocados en la excelencia.'
    },
    {
      year: '2024',
      title: 'Expansión',
      description: 'Ampliamos cobertura a 15+ comunas con equipo de 12 profesionales certificados.'
    },
    {
      year: '2024',
      title: 'Reconocimiento',
      description: '500+ hogares atendidos y 4.8/5 estrellas en Google Reviews.'
    }
  ];

  const team = [
    { name: 'María González', role: 'Supervisora de Calidad', experience: '5 años' },
    { name: 'Carlos Mendoza', role: 'Especialista en Limpieza Profunda', experience: '4 años' },
    { name: 'Ana López', role: 'Coordinadora de Servicios', experience: '3 años' },
    { name: 'Roberto Silva', role: 'Especialista Post-Obra', experience: '6 años' }
  ];

  const certifications = [
    {
      title: 'Seguro de Responsabilidad Civil',
      description: 'Cobertura completa para tu tranquilidad',
      icon: ShieldCheckIcon
    },
    {
      title: 'Protocolo COVID-19',
      description: 'Medidas sanitarias certificadas',
      icon: CheckBadgeIcon
    },
    {
      title: 'Productos Eco-Friendly',
      description: 'Certificados para cuidar tu salud y el medio ambiente',
      icon: CheckBadgeIcon
    },
    {
      title: 'Personal Verificado',
      description: 'Antecedentes verificados y capacitación continua',
      icon: UserGroupIcon
    }
  ];

  const values = [
    {
      title: 'Puntualidad',
      description: 'Cumplimos con los horarios acordados en el 98% de los casos',
      icon: ClockIcon
    },
    {
      title: 'Profesionalismo',
      description: 'Equipo uniformado, identificado y capacitado continuamente',
      icon: CheckBadgeIcon
    },
    {
      title: 'Confiabilidad',
      description: 'Personal verificado con antecedentes limpios y seguro incluido',
      icon: ShieldCheckIcon
    },
    {
      title: 'Excelencia',
      description: 'Estándares americanos adaptados a las necesidades locales',
      icon: TrophyIcon
    }
  ];

  return (
    <>
      <Helmet>
        <title>Sobre Nosotros | Todo Clean Chillán - Limpieza Profesional</title>
        <meta 
          name="description" 
          content="Conoce la historia de Todo Clean Chillán. Fundados en 2023, somos especialistas en limpieza profesional con estándares americanos y personal verificado."
        />
        <meta name="keywords" content="todo clean historia, equipo limpieza chillán, empresa limpieza profesional, certificaciones limpieza" />
        <link rel="canonical" href="https://todoclean.cl/sobre-nosotros" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16 md:py-24">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Sobre Todo Clean
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 mb-8">
                Limpieza profesional con estándares americanos y corazón chillanejo
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-primary-200/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="w-6 h-6 text-primary-200" />
                      </div>
                      <div className="text-2xl font-bold text-primary-200 mb-1">
                        {stat.number}
                      </div>
                      <div className="text-primary-100 text-sm">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Nuestra Misión
                </h2>
                <p className="text-lg text-neutral-600 mb-6">
                  Brindar servicios de limpieza profesional con estándares americanos, 
                  garantizando rapidez, puntualidad y total satisfacción a nuestros clientes 
                  en Chillán y alrededores.
                </p>
                <p className="text-neutral-600">
                  Creemos que un hogar o espacio de trabajo limpio no es un lujo, sino una 
                  necesidad básica que mejora la calidad de vida de las personas.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Nuestra Visión
                </h2>
                <p className="text-lg text-neutral-600 mb-6">
                  Ser reconocidos como la empresa líder en servicios de limpieza moderna 
                  en la región de Ñuble, estableciendo el estándar de calidad y 
                  profesionalismo en el sector.
                </p>
                <p className="text-neutral-600">
                  Aspiramos a expandir nuestros servicios manteniendo siempre la 
                  excelencia y cercanía que nos caracteriza.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Nuestra Historia
              </h2>
              <p className="text-lg text-neutral-600">
                Un recorrido de crecimiento y excelencia desde nuestros inicios
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200" />
                
                {timeline.map((item, index) => (
                  <div key={index} className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}>
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg" />
                    
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <Card className="p-6">
                        <div className="text-primary-600 font-bold mb-2">{item.year}</div>
                        <h3 className="font-bold text-neutral-900 mb-3">{item.title}</h3>
                        <p className="text-neutral-600">{item.description}</p>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Nuestro Equipo
              </h2>
              <p className="text-lg text-neutral-600">
                12 profesionales capacitados, verificados y comprometidos con la excelencia
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-600">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 text-sm font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-neutral-500 text-xs">
                    {member.experience} de experiencia
                  </p>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-neutral-600 mb-4">
                <strong>Características de nuestro equipo:</strong>
              </p>
              <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="text-sm text-neutral-600">
                  ✓ Verificación de antecedentes
                </div>
                <div className="text-sm text-neutral-600">
                  ✓ Uniformados e identificados
                </div>
                <div className="text-sm text-neutral-600">
                  ✓ Capacitación continua
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Certificaciones y Garantías
              </h2>
              <p className="text-lg text-neutral-600">
                Tu tranquilidad y satisfacción son nuestra prioridad
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => {
                const IconComponent = cert.icon;
                return (
                  <Card key={index} className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-3">
                      {cert.title}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {cert.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-primary-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Nuestros Valores
              </h2>
              <p className="text-lg text-neutral-600">
                Los principios que guían nuestro trabajo diario
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="p-6 text-center bg-white">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {value.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Numbers that speak */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Números que hablan por nosotros
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
                <div className="text-neutral-600">Servicios completados</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">4.8/5</div>
                <div className="text-neutral-600">Rating promedio</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
                <div className="text-neutral-600">Puntualidad</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">85%</div>
                <div className="text-neutral-600">Clientes recurrentes</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                ¿Listo para experimentar la diferencia Todo Clean?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Únete a más de 500 hogares que ya disfrutan de un hogar impecable.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                   href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios de limpieza.')}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors shadow-lg"
                 >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.287" />
                  </svg>
                  Contactar ahora
                 </a>
                
                <Link
                   to="/cotizador"
                   className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                 >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Obtener cotización
                 </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SobreNosotrosPage;