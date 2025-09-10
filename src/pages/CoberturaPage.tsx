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
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SERVICE_AREAS, WHATSAPP_MESSAGES } from '../utils/constants';
import { generateWhatsAppURL } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';

interface ZoneCalculatorResult {
  zone: string;
  zoneName: string;
  surcharge: number;
  responseTime: string;
  color: string;
  found: boolean;
}

const CoberturaPage: React.FC = () => {
  const [searchAddress, setSearchAddress] = useState('');
  const [searchResult, setSearchResult] = useState<ZoneCalculatorResult | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

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
      
      trackEvent('address_search', {
        query: searchAddress,
        zone_found: foundZone.zone,
        result: 'found'
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
      
      trackEvent('address_search', {
        query: searchAddress,
        zone_found: 'none',
        result: 'not_found'
      });
    }
    
    setIsSearching(false);
  };

  const handleWhatsAppContact = (zone?: string) => {
    const message = zone 
      ? WHATSAPP_MESSAGES.serviceSpecific.coverage(zone)
      : WHATSAPP_MESSAGES.general;
    
    trackEvent('whatsapp_click', {
      source: 'coverage_page',
      zone: zone || 'general'
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
      <Helmet>
        <title>Cobertura | Todo Clean Chillán - Zonas de Servicio</title>
        <meta 
          name="description" 
          content="Revisa nuestra cobertura de servicios en Chillán y comunas cercanas. Calcula los recargos por zona y tiempos de respuesta."
        />
        <meta name="keywords" content="cobertura todo clean, zonas servicio chillán, recargos por zona, chillán viejo, san carlos, coihueco" />
        <link rel="canonical" href="https://todoclean.cl/cobertura" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16 md:py-24">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Área de cobertura
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 mb-8">
                Brindamos servicios en Chillán y comunas cercanas con diferentes zonas de precio
              </p>
              
              {/* Quick stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-200 mb-1">
                    {SERVICE_AREAS.length}
                  </div>
                  <div className="text-primary-100">Zonas de servicio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-200 mb-1">
                    {allCommunes.length}+
                  </div>
                  <div className="text-primary-100">Comunas cubiertas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-200 mb-1">
                    24h
                  </div>
                  <div className="text-primary-100">Tiempo mínimo respuesta</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Address Search */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                  Busca tu dirección
                </h2>
                <p className="text-lg text-neutral-600">
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
                    borderLeftColor: searchResult.color,
                    backgroundColor: searchResult.found ? '#f0fdf4' : '#fef2f2'
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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Zonas de servicio
              </h2>
              <p className="text-lg text-neutral-600">
                Revisa los detalles de cada zona y sus tarifas
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {SERVICE_AREAS.map((area) => (
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
        <section className="py-16 bg-primary-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                ¿Tu zona está cubierta?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Contáctanos para confirmar disponibilidad y obtener una cotización personalizada
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-primary-900 hover:bg-primary-50"
                  onClick={() => handleWhatsAppContact()}
                >
                  WhatsApp directo
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-900"
                  onClick={() => window.location.href = '/cotizador'}
                >
                  Cotizar servicio
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CoberturaPage;