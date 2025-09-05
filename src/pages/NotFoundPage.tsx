import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  HomeIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { NAVIGATION_ROUTES, WHATSAPP_MESSAGES } from '@/utils/constants';
import { generateWhatsAppURL } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';

const NotFoundPage: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.pathname);
    
    // Track 404 error
    trackEvent('404_error', {
      requested_url: window.location.pathname,
      referrer: document.referrer
    });
  }, []);

  const popularServices = [
    {
      name: 'Limpieza Regular',
      description: 'Mantenimiento semanal o quincenal',
      href: '/servicios/residencial',
      icon: HomeIcon
    },
    {
      name: 'Limpieza Profunda',
      description: 'Limpieza completa y detallada',
      href: '/servicios/residencial',
      icon: SparklesIcon
    },
    {
      name: 'Cotizador',
      description: 'Calcula el precio de tu servicio',
      href: '/cotizador',
      icon: MagnifyingGlassIcon
    },
    {
      name: 'Cobertura',
      description: 'Revisa si llegamos a tu zona',
      href: '/cobertura',
      icon: PhoneIcon
    }
  ];

  const handleWhatsAppContact = (reason: string) => {
    trackEvent('whatsapp_click', {
      source: '404_page',
      reason
    });
    window.open(generateWhatsAppURL(WHATSAPP_MESSAGES.general), '_blank');
  };

  const handleNavigation = (href: string, name: string) => {
    trackEvent('404_navigation', {
      destination: href,
      service_name: name
    });
    window.location.href = href;
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      trackEvent('404_search', {
        search_term: searchTerm
      });
      window.location.href = `/servicios?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  // Suggest similar pages based on URL
  const getSuggestions = () => {
    const url = currentUrl.toLowerCase();
    const suggestions = [];

    if (url.includes('service') || url.includes('limpieza')) {
      suggestions.push({ name: 'Servicios', href: '/servicios' });
    }
    if (url.includes('price') || url.includes('precio') || url.includes('cotiz')) {
      suggestions.push({ name: 'Cotizador', href: '/cotizador' });
    }
    if (url.includes('contact') || url.includes('contacto')) {
      suggestions.push({ name: 'Contacto', href: '/contacto' });
    }
    if (url.includes('about') || url.includes('nosotros')) {
      suggestions.push({ name: 'Sobre Nosotros', href: '/sobre-nosotros' });
    }

    return suggestions;
  };

  const suggestions = getSuggestions();

  return (
    <>
      <Helmet>
        <title>Página no encontrada (404) | Todo Clean Chillán</title>
        <meta 
          name="description" 
          content="La página que buscas no existe. Encuentra nuestros servicios de limpieza, cotizador y información de contacto."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* 404 Illustration */}
              <div className="mb-8">
                <div className="relative inline-block">
                  <div className="text-8xl md:text-9xl font-bold text-primary-200 select-none">
                    404
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ExclamationTriangleIcon className="w-16 h-16 md:w-20 md:h-20 text-primary-600" />
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                ¡Página no encontrada!
              </h1>
              
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Parece que la página que buscas no existe o fue movida. 
                <br className="hidden md:block" />
                Pero no te preocupes, te ayudamos a encontrar lo que necesitas.
              </p>

              {/* Current URL info */}
              {currentUrl && (
                <div className="mb-8">
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    <ExclamationTriangleIcon className="w-4 h-4" />
                    <span>URL solicitada: <code className="bg-red-100 px-1 rounded">{currentUrl}</code></span>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  onClick={() => handleNavigation('/', 'home')}
                >
                  <HomeIcon className="w-5 h-5 mr-2" />
                  Ir al inicio
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => handleWhatsAppContact('page_not_found')}
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                  Contactar ayuda
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* URL Suggestions */}
        {suggestions.length > 0 && (
          <section className="py-8 bg-amber-50">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-lg font-semibold text-amber-900 mb-4">
                  ¿Tal vez buscabas alguno de estos?
                </h2>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={() => handleNavigation(suggestion.href, suggestion.name)}
                    >
                      {suggestion.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Search Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="p-8">
                <div className="text-center mb-6">
                  <MagnifyingGlassIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                    Buscar en el sitio
                  </h2>
                  <p className="text-neutral-600">
                    Escribe lo que buscas y te ayudamos a encontrarlo
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Ej: limpieza profunda, precios, contacto..."
                    className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                  <Button onClick={handleSearch} disabled={!searchTerm.trim()}>
                    <MagnifyingGlassIcon className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular Services */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                  Servicios populares
                </h2>
                <p className="text-lg text-neutral-600">
                  Quizás uno de estos sea lo que buscas
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <Card 
                      key={index} 
                      className="p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                      onClick={() => handleNavigation(service.href, service.name)}
                    >
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <h3 className="font-semibold text-neutral-900 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-4">
                        {service.description}
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        Ver más
                      </Button>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Links */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                  Mapa del sitio
                </h2>
                <p className="text-lg text-neutral-600">
                  Todas las páginas disponibles
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {NAVIGATION_ROUTES.map((route) => (
                  <Card 
                    key={route.path}
                    className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleNavigation(route.path, route.name)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <HomeIcon className="w-4 h-4 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-neutral-900">
                          {route.name}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          {route.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-primary-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                ¿Sigues sin encontrar lo que buscas?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Nuestro equipo está listo para ayudarte a encontrar exactamente lo que necesitas
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-primary-900 hover:bg-primary-50"
                  onClick={() => handleWhatsAppContact('help_needed')}
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                  WhatsApp directo
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-900"
                  onClick={() => handleNavigation('/contacto', 'contact')}
                >
                  Formulario de contacto
                </Button>
              </div>
              
              <div className="mt-8 text-sm text-primary-100">
                <p>Respuesta garantizada en menos de 2 horas</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default NotFoundPage;
