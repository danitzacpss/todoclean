import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ContactForm } from '../components/forms/ContactForm';
import { SITE_CONFIG, WHATSAPP_MESSAGES } from '../utils/constants';
import { generateWhatsAppURL } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';

const ContactoPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', {
      source: 'contact_page',
      message_type: 'general'
    });
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', {
      source: 'contact_page'
    });
  };

  return (
    <>
      <Helmet>
        <title>Contacto | Todo Clean Chillán - Limpieza Profesional</title>
        <meta 
          name="description" 
          content="Contáctanos para servicios de limpieza profesional en Chillán. WhatsApp +56 9 2617 6543, email y formulario de contacto disponible."
        />
        <meta name="keywords" content="contacto todo clean, limpieza chillán, whatsapp limpieza, presupuesto limpieza" />
        <link rel="canonical" href="https://todoclean.cl/contacto" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30">
        {/* Hero Section */}
        <section className="relative bg-primary-900 text-white py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-700 opacity-90" />
          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Contáctanos
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 mb-8">
                Respuesta garantizada en menos de 2 horas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary-900 hover:bg-primary-50"
                  onClick={() => {
                    handleWhatsAppClick();
                    window.open(generateWhatsAppURL(WHATSAPP_MESSAGES.general), '_blank');
                  }}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  WhatsApp Directo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-900"
                  onClick={() => {
                    handlePhoneClick();
                    window.open(`tel:${SITE_CONFIG.phone}`, '_self');
                  }}
                >
                  <PhoneIcon className="w-5 h-5 mr-2" />
                  Llamar Ahora
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <div className="space-y-8">
                <div className="max-w-md">
                  <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                    Envíanos un mensaje
                  </h2>
                  <p className="text-lg text-neutral-600">
                    Completa el formulario y te responderemos a la brevedad con una cotización personalizada.
                  </p>
                </div>
                
                {formSubmitted ? (
                  <Card className="p-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        ¡Mensaje enviado exitosamente!
                      </h3>
                      <p className="text-neutral-600 mb-4">
                        Gracias por contactarnos. Te responderemos dentro de las próximas 2 horas.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => setFormSubmitted(false)}
                        className="mr-4"
                      >
                        Enviar otro mensaje
                      </Button>
                      <Button
                        onClick={() => {
                          handleWhatsAppClick();
                          window.open(generateWhatsAppURL(WHATSAPP_MESSAGES.general), '_blank');
                        }}
                      >
                        WhatsApp para urgentes
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <ContactForm onSuccess={() => setFormSubmitted(true)} />
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                    Información de contacto
                  </h2>
                  <p className="text-lg text-neutral-600">
                    También puedes contactarnos directamente por cualquiera de estos medios.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-4">
                  {/* WhatsApp */}
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                        onClick={() => {
                          handleWhatsAppClick();
                          window.open(generateWhatsAppURL(WHATSAPP_MESSAGES.general), '_blank');
                        }}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900 mb-1">WhatsApp</h3>
                        <p className="text-primary-600 font-medium group-hover:text-primary-700">
                          +56 9 2617 6543
                        </p>
                        <p className="text-sm text-neutral-500 mt-1">
                          Respuesta inmediata • Disponible 24/7
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Phone */}
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                        onClick={() => {
                          handlePhoneClick();
                          window.open(`tel:${SITE_CONFIG.phone}`, '_self');
                        }}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                        <PhoneIcon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900 mb-1">Teléfono</h3>
                        <p className="text-primary-600 font-medium group-hover:text-primary-700">
                          +56 9 2617 6543
                        </p>
                        <p className="text-sm text-neutral-500 mt-1">
                          Lunes a Sábado • 8:00 - 20:00
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Email */}
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                        onClick={() => window.open(`mailto:${SITE_CONFIG.email}`, '_self')}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                        <EnvelopeIcon className="w-6 h-6 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                        <p className="text-primary-600 font-medium group-hover:text-primary-700">
                          {SITE_CONFIG.email}
                        </p>
                        <p className="text-sm text-neutral-500 mt-1">
                          Respuesta en menos de 2 horas
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Instagram */}
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                        onClick={() => window.open(SITE_CONFIG.social.instagram, '_blank')}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                        <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.814 3.708 13.66 3.708 12.36c0-1.297.49-2.448 1.297-3.323C5.882 8.16 7.033 7.67 8.33 7.67c1.297 0 2.448.49 3.323 1.297.877.876 1.367 2.027 1.367 3.324 0 1.297-.49 2.448-1.297 3.323-.876.877-2.027 1.367-3.324 1.367z"/>
                          <path d="M12 7.367c-2.566 0-4.633 2.067-4.633 4.633S9.434 16.633 12 16.633s4.633-2.067 4.633-4.633S14.566 7.367 12 7.367zm0 7.6c-1.636 0-2.967-1.331-2.967-2.967S10.364 9.033 12 9.033s2.967 1.331 2.967 2.967S13.636 14.967 12 14.967z"/>
                          <path d="M17.033 7.083c0 .617-.5 1.117-1.117 1.117s-1.117-.5-1.117-1.117.5-1.117 1.117-1.117 1.117.5 1.117 1.117z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900 mb-1">Instagram</h3>
                        <p className="text-primary-600 font-medium group-hover:text-primary-700">
                          @todo_cleanchillan
                        </p>
                        <p className="text-sm text-neutral-500 mt-1">
                          Síguenos para tips de limpieza
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Business Hours */}
                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ClockIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-3">Horarios de atención</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Lunes - Sábado</span>
                          <span className="font-medium text-neutral-900">8:00 - 20:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Domingo</span>
                          <span className="font-medium text-neutral-900">9:00 - 18:00</span>
                        </div>
                        <div className="pt-2 border-t border-neutral-200">
                          <p className="text-xs text-neutral-500">
                            * WhatsApp disponible 24/7 para emergencias
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Location */}
                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPinIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-2">Nuestra cobertura</h3>
                      <p className="text-neutral-600 mb-3">
                        {SITE_CONFIG.address}
                      </p>
                      <p className="text-sm text-neutral-500">
                        Servicio a domicilio en toda la zona de Chillán y alrededores
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() => window.location.href = '/cobertura'}
                      >
                        Ver mapa de cobertura
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                ¿Necesitas una cotización urgente?
              </h2>
              <p className="text-xl text-neutral-600 mb-8">
                Usa nuestro cotizador automático y obtén tu precio al instante
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => window.location.href = '/cotizador'}
                >
                  Cotizar ahora
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => {
                    handleWhatsAppClick();
                    window.open(generateWhatsAppURL(WHATSAPP_MESSAGES.emergency), '_blank');
                  }}
                >
                  WhatsApp urgente
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactoPage;