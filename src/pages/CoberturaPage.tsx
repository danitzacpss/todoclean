// ===================================
// TODO CLEAN - COBERTURA COMPONENT
// Página de cobertura y zonas de servicio
// ===================================

import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  MapPinIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import { Button, WhatsAppButton } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SERVICE_AREAS, WHATSAPP_MESSAGES, SITE_CONFIG } from '@/utils/constants';
import { generateWhatsAppURL } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';

// Importamos los estilos específicos para la página de cobertura
import '@/design-system/layouts/coverage.css';

interface ZoneCalculatorResult {
  zone: string;
  zoneName: string;
  surcharge: number;
  responseTime: string;
  color: string;
  found: boolean;
}

// ==========================================
// COBERTURA PAGE COMPONENT
// ==========================================

const CoberturaPage: React.FC = () => {
  const [searchAddress, setSearchAddress] = useState('');
  const [searchResult, setSearchResult] = useState<ZoneCalculatorResult | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  // Función para desplazarse a una sección específica
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddressSearch = async () => {
    if (!searchAddress.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const addressLower = searchAddress.toLowerCase();
    let foundZone: typeof SERVICE_AREAS[0] | null = null;
    
    // Search in communes
    for (const area of SERVICE_AREAS) {
      const communeFound = area.communes.some(commune => 
        addressLower.includes(commune.toLowerCase()) ||
        commune.toLowerCase().includes(addressLower)
      );
      
      if (communeFound) {
        foundZone = area;
        break;
      }
    }
    
    // If no exact match, try to match by keywords
    if (!foundZone) {
      const zoneKeywords = {
        'A': ['centro', 'quilamapu', 'las termas', 'termas'],
        'B': ['viejo', 'san carlos', 'coihueco', 'niquen'],
        'C': ['bulnes', 'quillen', 'quillon', 'san ignacio', 'carmen', 'pemuco']
      };
      
      for (const [zone, keywords] of Object.entries(zoneKeywords)) {
        const keywordFound = keywords.some(keyword => 
          addressLower.includes(keyword)
        );
        
        if (keywordFound) {
          foundZone = SERVICE_AREAS.find(area => area.zone === zone) || null;
          break;
        }
      }
    }
    
    if (foundZone) {
      setSearchResult({
        zone: foundZone.zone,
        zoneName: foundZone.name,
        surcharge: foundZone.surcharge,
        responseTime: foundZone.responseTime,
        color: foundZone.color,
        found: true
      });
      
      trackEvent({
        event: 'address_search',
        category: 'engagement',
        label: 'address_search_found',
        source: {
          query: searchAddress,
          zone_found: foundZone.zone,
          result: 'found'
        }
      });
    } else {
      setSearchResult({
        zone: '',
        zoneName: 'Zona no encontrada',
        surcharge: 0,
        responseTime: '',
        color: '#ef4444',
        found: false
      });
      
      trackEvent({
        event: 'address_search',
        category: 'engagement',
        label: 'address_search_not_found',
        source: {
          query: searchAddress,
          zone_found: 'none',
          result: 'not_found'
        }
      });
    }
    
    setIsSearching(false);
  };

  const handleWhatsAppContact = (zone?: string) => {
    const message = zone 
      ? WHATSAPP_MESSAGES.serviceSpecific.coverage(zone)
      : WHATSAPP_MESSAGES.general;
    
    trackEvent({
      event: 'whatsapp_click',
      category: 'engagement',
      label: 'coverage_page',
      source: {
        page: 'coverage_page',
        zone: zone || 'general'
      }
    });
    
    window.open(generateWhatsAppURL(message), '_blank');
  };

  const formatSurcharge = (surcharge: number): string => {
    if (surcharge === 0) return 'Sin recargo';
    return `+$${surcharge.toLocaleString().replace(/,/g, '.')} CLP`;
  };

  const getZoneIcon = (zone: string) => {
    switch (zone) {
      case 'A':
        return <CheckCircleIcon className="w-6 h-6 text-green-600" />;
      case 'B':
        return <ClockIcon className="w-6 h-6 text-amber-600" />;
      case 'C':
        return <TruckIcon className="w-6 h-6 text-orange-600" />;
      default:
        return <MapPinIcon className="w-6 h-6 text-neutral-500" />;
    }
  };

  // Flatten communes for search suggestions
  const allCommunes = useMemo(() => {
    const communes: string[] = [];
    SERVICE_AREAS.forEach(area => {
      communes.push(...area.communes);
    });
    return communes.sort();
  }, []);

  const filteredSuggestions = useMemo(() => {
    if (!searchAddress.trim()) return [];
    
    return allCommunes
      .filter(commune => 
        commune.toLowerCase().includes(searchAddress.toLowerCase())
      )
      .slice(0, 5);
  }, [searchAddress, allCommunes]);

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Cobertura | Todo Clean Chillán - Zonas de Servicio</title>
        <meta 
          name="description" 
          content="Revisa nuestra cobertura de servicios en Chillán y comunas cercanas. Calcula los recargos por zona y tiempos de respuesta."
        />
        <meta name="keywords" content="cobertura todo clean, zonas servicio chillán, recargos por zona, chillán viejo, san carlos, coihueco" />
        <link rel="canonical" href={`${SITE_CONFIG.url}/cobertura`} />
      </Helmet>
      
      <div className="min-h-screen bg-white coverage-page">
        {/* Hero Section */}
        <section className="relative overflow-hidden hero">
          {/* Removed background elements for cleaner design */}

          <div className="container mx-auto px-4 relative z-10 py-12 lg:py-16 hero-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center hero-content">
              {/* Content Column */}
              <div className="text-center lg:text-left hero-text">
                {/* Premium badge */}
                <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-2 mb-6 hero-badge">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-cyan-700">Cobertura Garantizada</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-8 leading-tight hero-headline">
                  <span className="block text-gray-900">Áreas de</span>
                  <span className="block bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 bg-clip-text text-transparent highlight">
                    Cobertura
                  </span>
                  <span className="block text-gray-700 text-3xl md:text-4xl lg:text-5xl mt-2">
                    en Chillán y alrededores
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl mb-10 text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed hero-subheadline">
                  Brindamos servicios en
                  <span className="block font-bold text-gray-900 mt-1">
                    Chillán y comunas cercanas
                  </span>
                  <span className="block text-base text-cyan-600 mt-2 font-medium">
                    ✨ Con diferentes zonas de precio y tiempos de respuesta
                  </span>
                </p>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 mb-8 hero-actions">
                  <div className="group">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center hover:bg-cyan-50 hover:border-cyan-200 transition-all duration-300 group-hover:scale-105">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <MapPinIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-lg font-bold text-gray-900">{SERVICE_AREAS ? SERVICE_AREAS.length : 0}</div>
                      <div className="text-sm text-gray-600">Zonas</div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center hover:bg-cyan-50 hover:border-cyan-200 transition-all duration-300 group-hover:scale-105">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-lg font-bold text-gray-900">{allCommunes.length > 0 ? `${allCommunes.length}+` : '0'}</div>
                      <div className="text-sm text-gray-600">Comunas</div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center hover:bg-cyan-50 hover:border-cyan-200 transition-all duration-300 group-hover:scale-105">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <ClockIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-lg font-bold text-gray-900">24h</div>
                      <div className="text-sm text-gray-600">Respuesta</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Card Column - Replacing image with clean information card */}
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Zonas de Cobertura</h3>
                    <p className="text-gray-600 mb-6">Nuestro servicio está disponible en Chillán y comunas cercanas con diferentes tiempos de respuesta según la ubicación.</p>
                    
                    <div className="space-y-4">
                      {SERVICE_AREAS.slice(0, 3).map((area, index) => (
                        <div key={index} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: area.color }} />
                          <div>
                            <h4 className="font-medium text-gray-900">{area.name}</h4>
                            <p className="text-sm text-gray-500">{area.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-6">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">Ver todas las zonas</div>
                      <Button variant="outline" size="sm" onClick={() => scrollToSection('map-section')}>
                        <MapPinIcon className="w-4 h-4 mr-2" />
                        Ver mapa
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Address Search */}
        <section className="py-10 bg-white relative overflow-hidden services-section">
          {/* Removed decorative elements for cleaner design */}
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                {/* Premium badge */}
                <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-2 mb-6">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-cyan-700">Búsqueda Inteligente</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Busca tu dirección
                </h2>
                <p className="text-lg text-gray-600 max-w-xl mx-auto">
                  Ingresa tu dirección para conocer la zona de servicio, recargos y tiempo de respuesta
                </p>
              </div>
              
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchAddress}
                      onChange={(e) => setSearchAddress(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddressSearch()}
                      placeholder="Ej: Av. Libertad 123, Centro, Chillán"
                      className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      disabled={isSearching}
                    />
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    
                    {/* Search suggestions */}
                    {filteredSuggestions.length > 0 && searchAddress.trim() && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-10">
                        {filteredSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSearchAddress(suggestion);
                              handleAddressSearch();
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-neutral-50 first:rounded-t-lg last:rounded-b-lg border-b border-neutral-100 last:border-b-0"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={handleAddressSearch}
                    disabled={!searchAddress.trim() || isSearching}
                    className="w-full"
                    size="lg"
                  >
                    {isSearching ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Buscando...
                      </>
                    ) : (
                      <>
                        <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                        Buscar zona
                      </>
                    )}
                  </Button>
                </div>
                
                {/* Search Result */}
                {searchResult && (
                  <div className="mt-6 p-4 rounded-lg border-l-4" style={{ 
                    borderLeftColor: searchResult?.color || '#000000',
                    backgroundColor: searchResult?.found ? '#f0fdf4' : '#fef2f2'
                  }}>
                    <div className="flex items-start space-x-3">
                      {searchResult.found ? (
                        <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <ExclamationCircleIcon className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      
                      <div className="flex-1">
                        {searchResult.found ? (
                          <>
                            <h3 className="font-semibold text-green-900 mb-2">
                              ¡Tu zona está cubierta! - {searchResult.zoneName}
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center space-x-2">
                                <CurrencyDollarIcon className="w-4 h-4 text-green-700" />
                                <span className="text-green-800">
                                  <strong>Recargo:</strong> {formatSurcharge(searchResult.surcharge)}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <ClockIcon className="w-4 h-4 text-green-700" />
                                <span className="text-green-800">
                                  <strong>Tiempo de respuesta:</strong> {searchResult.responseTime}
                                </span>
                              </div>
                            </div>
                            <div className="mt-4">
                              <Button 
                                size="sm" 
                                onClick={() => handleWhatsAppContact(searchResult.zoneName)}
                              >
                                Solicitar servicio
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <h3 className="font-semibold text-red-900 mb-2">
                              Zona no encontrada o fuera de cobertura
                            </h3>
                            <p className="text-sm text-red-800 mb-4">
                              No hemos podido identificar tu zona. Contáctanos para verificar si brindamos servicio en tu área.
                            </p>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-red-300 text-red-700 hover:bg-red-50"
                              onClick={() => handleWhatsAppContact()}
                            >
                              Consultar por WhatsApp
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </section>

        {/* Coverage Zones */}
        <section id="map-section" className="py-10 relative overflow-hidden differentiators-section">
          {/* Subtle Background Elements */}
          <div className="absolute inset-0">
            {/* Subtle color accents */}
            <div className="absolute top-40 left-20 w-32 h-32 bg-cyan-100/30 rounded-full blur-2xl" />
            <div className="absolute bottom-40 right-20 w-24 h-24 bg-teal-100/20 rounded-full blur-xl" />
            
            {/* Geometric details */}
            <div className="absolute top-20 left-1/4 w-6 h-6 border border-cyan-300/20 rotate-45" />
            <div className="absolute bottom-32 right-1/3 w-3 h-3 bg-teal-400/30 rounded-full" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-8">
              {/* Premium badge */}
              <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-cyan-700">Zonas Detalladas</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Zonas de servicio
              </h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Revisa los detalles de cada zona y sus tarifas
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {SERVICE_AREAS && SERVICE_AREAS.map((area) => (
                <Card 
                  key={area.zone}
                  className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    selectedZone === area.zone 
                      ? 'ring-2 ring-primary-500 shadow-lg' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedZone(selectedZone === area.zone ? null : area.zone)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: area.color }}
                      >
                        {area.zone}
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900">
                        {area.name}
                      </h3>
                    </div>
                    {getZoneIcon(area.zone)}
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Recargo por distancia:</span>
                      <span className="font-semibold" style={{ color: area.color }}>
                        {formatSurcharge(area.surcharge)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Tiempo de respuesta:</span>
                      <span className="font-semibold text-neutral-900">
                        {area.responseTime}
                      </span>
                    </div>
                  </div>
                  
                  {/* Communes list */}
                  <div className={`space-y-2 transition-all duration-300 ${
                    selectedZone === area.zone ? 'max-h-96 opacity-100' : 'max-h-20 opacity-70'
                  } overflow-hidden`}>
                    <h4 className="font-medium text-neutral-800 text-sm">
                      Comunas incluidas:
                    </h4>
                    <div className="grid grid-cols-1 gap-1">
                      {area.communes.map((commune, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: area.color }}
                          />
                          <span className="text-sm text-neutral-600">{commune}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedZone === area.zone && (
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsAppContact(area.name);
                        }}
                      >
                        Solicitar servicio en {area.name}
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 lg:py-20 overflow-hidden testimonials-section">
          {/* Background consistent with hero - subtle white background */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-white"></div>
          
          {/* Clean Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Minimal accent points */}
            <div className="absolute top-24 right-1/3 w-2 h-2 bg-cyan-500 rounded-full opacity-30"></div>
            <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-teal-500 rounded-full opacity-25"></div>
            <div className="absolute top-16 left-20 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-30"></div>
            
            {/* Enhanced geometric shapes - more visible */}
            <div className="absolute top-20 right-24 w-8 h-8 border-2 border-cyan-300 rounded opacity-50 rotate-12"></div>
            <div className="absolute bottom-28 left-24 w-10 h-10 border-2 border-teal-300 rounded-full opacity-40"></div>
            <div className="absolute top-1/4 right-20 w-6 h-6 border-2 border-blue-300 opacity-45 rotate-45"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Premium badge */}
              <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-cyan-700">Servicio Premium Garantizado</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                ¿Tu zona está 
                <span className="block bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 bg-clip-text text-transparent">
                  cubierta?
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
                Contáctanos para confirmar disponibilidad y obtener una cotización personalizada
              </p>
              
              <p className="text-base text-cyan-600 mb-10 max-w-2xl mx-auto font-medium">
                ✨ Servicio garantizado en todas nuestras zonas de cobertura
              </p>
              
              {/* CTA Buttons with enhanced design */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <WhatsAppButton
                  size="lg"
                  message="¡Hola! Quiero consultar si mi zona está dentro de su cobertura."
                  trackingSource="coverage-page"
                  className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300 border-0"
                >
                  <span className="flex items-center gap-2">
                    💬 WhatsApp Directo
                  </span>
                </WhatsAppButton>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white border-2 border-cyan-600 hover:bg-cyan-50 text-cyan-700 shadow-lg transform hover:scale-105 transition-all duration-300"
                  onClick={() => window.location.href = '/cotizador'}
                >
                  <span className="flex items-center gap-2">
                    ⚡ Cotizar Servicio
                  </span>
                </Button>
              </div>
              
              {/* Trust indicators with consistent design */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
                <div className="flex items-center gap-2 group">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                  <span className="text-sm font-medium">Sin compromiso</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="w-3 h-3 bg-teal-500 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                  <span className="text-sm font-medium">Cotización gratuita</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="w-3 h-3 bg-cyan-600 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                  <span className="text-sm font-medium">Respuesta inmediata</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="w-3 h-3 bg-teal-600 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
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

export default CoberturaPage;