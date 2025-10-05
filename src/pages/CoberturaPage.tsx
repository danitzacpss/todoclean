// ===================================
// TODO CLEAN - COBERTURA COMPONENT
// Página de cobertura y zonas de servicio
// ===================================

import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
// import { Link } from 'react-router-dom'; // Unused
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
import { SERVICE_AREAS, SPECIAL_ZONES, WHATSAPP_MESSAGES, SITE_CONFIG } from '@/utils/constants';
import { generateWhatsAppURL } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';
import EmergencyCleanPromo from '@/components/sections/EmergencyCleanPromo';

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
  // const scrollToSection = (sectionId: string) => {
  //   const section = document.getElementById(sectionId);
  //   if (section) {
  //     section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // };

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
        'A': ['centro', 'chillan', 'viejo'],
        'B': ['pinto', 'mariposas'],
        'C': ['san carlos', 'bulnes']
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
      
      <div className="min-h-screen !bg-gradient-to-br !from-neutral-50 !to-blue-50/30 coverage-page !bg-white">

        {/* Combined Hero and Search Section */}
        <section className="py-16">
          <div className="container mx-auto px-1 sm:px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Areas de Cobertura */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 !bg-cyan-50 !border !border-cyan-200 rounded-full px-3 py-1 mb-3">
                  <div className="w-2 h-2 !bg-cyan-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium !text-cyan-700">Cobertura Garantizada</span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  <span className="block !text-gray-900">Áreas de</span>
                  <span className="block bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 bg-clip-text text-transparent">
                    Cobertura
                  </span>
                  <span className="block !text-gray-700 text-2xl md:text-3xl lg:text-4xl">
                    en Chillán y alrededores
                  </span>
                </h1>

                <p className="text-lg md:text-xl !text-gray-600 mb-6 leading-relaxed">
                  Brindamos servicios en <span className="font-bold !text-gray-900">Chillán y comunas cercanas</span>
                  <span className="block text-base !text-cyan-600 mt-2 font-medium">
                    ✨ Con diferentes zonas de precio y tiempos de respuesta
                  </span>
                </p>

                <div className="grid grid-cols-3 gap-1 sm:gap-4">
                  <div className="!bg-white !border !border-gray-200 rounded-2xl p-3 sm:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <MapPinIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold !text-gray-900 mb-1">{SERVICE_AREAS ? SERVICE_AREAS.length : 0}</div>
                    <div className="text-sm !text-gray-600">Zonas</div>
                  </div>

                  <div className="!bg-white !border !border-gray-200 rounded-2xl p-3 sm:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold !text-gray-900 mb-1">{allCommunes.length > 0 ? `${allCommunes.length}+` : '0'}</div>
                    <div className="text-sm !text-gray-600">Comunas</div>
                  </div>

                  <div className="!bg-white !border !border-gray-200 rounded-2xl p-3 sm:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <ClockIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold !text-gray-900 mb-1">24h</div>
                    <div className="text-sm !text-gray-600">Respuesta</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Busca tu comuna o zona */}
              <div>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 !bg-cyan-50 !border !border-cyan-200 rounded-full px-4 py-2 mb-4">
                    <div className="w-2 h-2 !bg-cyan-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium !text-cyan-700">Búsqueda Inteligente</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold !text-gray-900 mb-4">
                    Busca tu comuna o zona
                  </h2>
                  <p className="text-lg !text-gray-600">
                    Ingresa tu comuna o zona para conocer la cobertura, recargos y tiempo de respuesta
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
                        placeholder="Ej: Chillán, Pinto, San Carlos..."
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
          </div>
        </section>

        {/* Coverage Zones */}
        <section id="map-section" className="relative overflow-hidden differentiators-section py-10">
          {/* Subtle Background Elements */}
          <div className="absolute inset-0">
            {/* Subtle color accents */}
            <div className="absolute top-40 left-20 w-32 h-32 bg-cyan-100/30 rounded-full blur-2xl" />
            <div className="absolute bottom-40 right-20 w-24 h-24 bg-teal-100/20 rounded-full blur-xl" />
            
            {/* Geometric details */}
            <div className="absolute top-20 left-1/4 w-6 h-6 border border-cyan-300/20 rotate-45" />
            <div className="absolute bottom-32 right-1/3 w-3 h-3 bg-teal-400/30 rounded-full" />
          </div>
          
          <div className="container mx-auto px-1 sm:px-4 lg:px-8 relative z-10">
            <div className="text-center mb-8">
              {/* Premium badge */}
              <div className="inline-flex items-center gap-2 !bg-cyan-50 !border !border-cyan-200 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 !bg-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium !text-cyan-700">Zonas Detalladas</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold !text-gray-900 mb-4">
                Zonas de servicio
              </h2>
              <p className="text-lg !text-gray-600 max-w-xl mx-auto">
                Revisa los detalles de cada zona y sus tarifas
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {SERVICE_AREAS && SERVICE_AREAS.map((area) => (
                <Card
                  key={area.zone}
                  className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl !bg-white !border-neutral-200 ${
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
                      <h3 className="text-xl font-bold !text-neutral-900">
                        {area.name}
                      </h3>
                    </div>
                    {getZoneIcon(area.zone)}
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="!text-neutral-600">Recargo por distancia:</span>
                      <span className="font-semibold" style={{ color: area.color }}>
                        {formatSurcharge(area.surcharge)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="!text-neutral-600">Tiempo de respuesta:</span>
                      <span className="font-semibold !text-neutral-900">
                        {area.responseTime}
                      </span>
                    </div>
                  </div>

                  {/* Communes list */}
                  <div className={`space-y-2 transition-all duration-300 ${
                    selectedZone === area.zone ? 'max-h-96 opacity-100' : 'max-h-20 opacity-70'
                  } overflow-hidden`}>
                    <h4 className="font-medium !text-neutral-800 text-sm">
                      Comunas incluidas:
                    </h4>
                    <div className="grid grid-cols-1 gap-1">
                      {area.communes.map((commune, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: area.color }}
                          />
                          <span className="text-sm !text-neutral-600">{commune}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedZone === area.zone && (
                    <div className="mt-4 pt-4 !border-t !border-neutral-200">
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

            {/* Special Zones Section */}
            {SPECIAL_ZONES && SPECIAL_ZONES.length > 0 && (
              <div className="mt-8">
                <div className="!bg-amber-50 !border-l-4 !border-amber-500 rounded-lg p-6">
                  <div className="flex items-start">
                    <ExclamationCircleIcon className="w-6 h-6 !text-amber-600 flex-shrink-0 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-semibold !text-amber-900 mb-2">
                        Zonas Especiales
                      </h4>
                      <div className="space-y-2">
                        {SPECIAL_ZONES.map((zone, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <span className="font-medium !text-amber-800">{zone.name}</span>
                              <span className="text-sm !text-amber-700 ml-2">- {zone.note}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="!border-amber-600 !text-amber-700 hover:!bg-amber-100"
                          onClick={() => {
                            const message = encodeURIComponent(
                              '¡Hola! Me interesa consultar disponibilidad y precio para Termas de Chillán.'
                            );
                            window.open(`https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`, '_blank');
                          }}
                        >
                          Consultar disponibilidad
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Emergency Clean Promo Banner */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <EmergencyCleanPromo />
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 lg:py-20 overflow-hidden testimonials-section">
          {/* Background consistent with main page */}
          <div className="absolute inset-0"></div>
          
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
          
          <div className="container mx-auto px-1 sm:px-4 lg:px-8 relative z-10">
            <div className="max-w-full sm:max-w-4xl mx-auto text-center">
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
              
              <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-full sm:max-w-3xl mx-auto leading-relaxed">
                Contáctanos para confirmar disponibilidad y obtener una cotización personalizada
              </p>
              
              <p className="text-base text-cyan-600 mb-10 max-w-full sm:max-w-2xl mx-auto font-medium">
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
                  onClick={() => window.location.href = '/servicios'}
                >
                  <span className="flex items-center gap-2">
                    🔍 Ver Servicios
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