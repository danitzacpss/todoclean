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
// import { Button } from '../components/ui/Button'; // Unused
import { Card } from '../components/ui/Card';
import { SITE_CONFIG } from '../utils/constants';
// import { generateWhatsAppURL } from '../utils/whatsapp'; // Unused
// import { trackEvent } from '../utils/analytics'; // Unused

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
    { name: 'Baltazar Llopis', role: 'Supervisor de Calidad', experience: '3 años' },
    { name: 'Sandra Campos', role: 'Especialista en Limpieza Profunda', experience: '5 años' }
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
      
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30">

        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-0.5 sm:px-2 lg:px-4">
            <div className="max-w-none sm:max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-neutral-900 leading-tight">
                Sobre Todo Clean
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-12 max-w-none sm:max-w-2xl mx-auto px-1">
                Limpieza profesional con estándares americanos y corazón chillanejo
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-8 px-1">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="w-6 h-6 text-teal-600" />
                      </div>
                      <div className="text-2xl font-bold text-neutral-900 mb-1">
                        {stat.number}
                      </div>
                      <div className="text-neutral-600 text-sm">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-0.5 sm:px-2 lg:px-4">
            <div className="grid lg:grid-cols-2 gap-3 sm:gap-6 items-stretch px-1">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
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
              
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
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
          <div className="container mx-auto px-0.5 sm:px-2 lg:px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Nuestra Historia
              </h2>
              <p className="text-lg text-neutral-600">
                Un recorrido de crecimiento y excelencia desde nuestros inicios
              </p>
            </div>
            
            <div className="max-w-none sm:max-w-4xl mx-auto px-1">
              <div className="relative">
                {/* Timeline line - responsive positioning */}
                <div className="absolute left-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-1 h-full bg-primary-200" />
                
                {timeline.map((item, index) => (
                  <div key={index} className="relative mb-8 sm:mb-12">
                    {/* Timeline dot - responsive positioning */}
                    <div className="absolute left-3 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg z-10" />
                    
                    {/* Mobile: Single column layout */}
                    <div className="block sm:hidden">
                      <div className="ml-12 pr-2">
                        <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
                          <div className="text-primary-600 font-bold mb-2 text-sm">{item.year}</div>
                          <h3 className="font-bold text-neutral-900 mb-3 text-lg">{item.title}</h3>
                          <p className="text-neutral-600 text-sm leading-relaxed">{item.description}</p>
                        </Card>
                      </div>
                    </div>

                    {/* Desktop: Alternating layout */}
                    <div className="hidden sm:flex items-center">
                      <div className={`flex w-full ${
                        index % 2 === 0 ? 'justify-start' : 'justify-end'
                      }`}>
                        <div className={`w-5/12 ${
                          index % 2 === 0 ? 'pr-4 text-right' : 'pl-4 text-left'
                        }`}>
                          <Card className="p-4 lg:p-5 hover:shadow-lg transition-shadow duration-300">
                            <div className="text-primary-600 font-bold mb-2">{item.year}</div>
                            <h3 className="font-bold text-neutral-900 mb-3 text-lg lg:text-xl">{item.title}</h3>
                            <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-0.5 sm:px-2 lg:px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Nuestro Equipo
              </h2>
              <p className="text-lg text-neutral-600">
                Profesionales capacitados, verificados y comprometidos con la excelencia
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-3 sm:gap-4 max-w-none sm:max-w-2xl mx-auto px-1">
              {team.map((member, index) => (
                <Card key={index} className="p-4 sm:p-5 text-center">
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
              <div className="grid md:grid-cols-3 gap-2 sm:gap-3 max-w-none sm:max-w-2xl mx-auto px-1">
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
          <div className="container mx-auto px-0.5 sm:px-2 lg:px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Certificaciones y Garantías
              </h2>
              <p className="text-lg text-neutral-600">
                Tu tranquilidad y satisfacción son nuestra prioridad
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-1">
              {certifications.map((cert, index) => {
                const IconComponent = cert.icon;
                return (
                  <Card key={index} className="p-4 sm:p-5 text-center">
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
          <div className="container mx-auto px-0.5 sm:px-2 lg:px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Nuestros Valores
              </h2>
              <p className="text-lg text-neutral-600">
                Los principios que guían nuestro trabajo diario
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-1">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="p-4 sm:p-5 text-center bg-white">
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

        {/* CTA Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="container mx-auto px-1 sm:px-4 lg:px-8 relative z-10">
            <div className="max-w-none sm:max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-teal-700">Servicio Premium Garantizado</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                ¿Listo para experimentar{' '}
                <span className="block bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 bg-clip-text text-transparent">
                  la diferencia?
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-none sm:max-w-3xl mx-auto leading-relaxed">
                Contáctanos para confirmar disponibilidad y obtener una cotización personalizada
              </p>
              
              <p className="text-base text-teal-600 mb-10 max-w-none sm:max-w-2xl mx-auto font-medium">
                ✨ Servicio garantizado en todas nuestras zonas de cobertura
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 px-1">
                <a
                   href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios de limpieza.')}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border-0"
                 >
                  <span className="flex items-center gap-2">
                    💬 WhatsApp Directo
                  </span>
                 </a>
                
                <Link
                   to="/servicios"
                   className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-teal-600 hover:bg-teal-50 text-teal-700 font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                 >
                  <span className="flex items-center gap-2">
                    🔍 Ver Servicios
                  </span>
                 </Link>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-gray-600 px-1">
                <div className="flex items-center gap-2 group">
                  <div className="w-3 h-3 bg-teal-500 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                  <span className="text-sm font-medium">Sin compromiso</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                  <span className="text-sm font-medium">Cotización gratuita</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="w-3 h-3 bg-teal-600 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                  <span className="text-sm font-medium">Respuesta inmediata</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="w-3 h-3 bg-cyan-600 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                  <span className="text-sm font-medium">Garantía 100%</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SobreNosotrosPage;