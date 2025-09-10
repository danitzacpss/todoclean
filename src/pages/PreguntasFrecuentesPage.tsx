import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronDownIcon, 
  MagnifyingGlassIcon,
  TagIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FAQ_DATA, WHATSAPP_MESSAGES } from '@/utils/constants';
import { generateWhatsAppURL } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';

type FAQCategory = 'all' | 'service' | 'booking' | 'pricing' | 'general';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'service' | 'booking' | 'pricing' | 'general';
  popular: boolean;
}

// Extended FAQ data with additional questions
const EXTENDED_FAQ_DATA: FAQ[] = [
  ...FAQ_DATA,
  {
    id: '9',
    question: '¿Qué diferencia hay entre limpieza profunda y regular?',
    answer: 'La limpieza regular es para mantenimiento (aspirado, trapeado, desinfección básica). La profunda incluye ventanas interiores, electrodomésticos por dentro, zócalos, debajo de muebles y desinfección completa.',
    category: 'service',
    popular: true,
  }
];

const PreguntasFrecuentesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('all');
  const [expandedFAQs, setExpandedFAQs] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'all' as FAQCategory, name: 'Todas', icon: QuestionMarkCircleIcon },
    { id: 'service' as FAQCategory, name: 'Servicios', icon: HomeIcon },
    { id: 'booking' as FAQCategory, name: 'Reservas', icon: ClockIcon },
    { id: 'pricing' as FAQCategory, name: 'Precios', icon: CurrencyDollarIcon },
    { id: 'general' as FAQCategory, name: 'General', icon: TagIcon },
  ];

  const filteredFAQs = useMemo(() => {
    let filtered = EXTENDED_FAQ_DATA;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term)
      );
    }

    return filtered.sort((a, b) => {
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return a.question.localeCompare(b.question);
    });
  }, [searchTerm, selectedCategory]);

  const toggleFAQ = (faqId: string) => {
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId);
    } else {
      newExpanded.add(faqId);
    }
    setExpandedFAQs(newExpanded);

    trackEvent('faq_toggle', {
      faq_id: faqId,
      action: newExpanded.has(faqId) ? 'expand' : 'collapse',
      category: selectedCategory
    });
  };

  const handleWhatsAppContact = () => {
    trackEvent('whatsapp_click', {
      source: 'faq_page',
      reason: 'question_not_found'
    });
    window.open(generateWhatsAppURL(WHATSAPP_MESSAGES.general), '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Preguntas Frecuentes | Todo Clean Chillán</title>
        <meta 
          name="description" 
          content="Encuentra respuestas a las preguntas más comunes sobre nuestros servicios de limpieza. Precios, horarios, cobertura y más."
        />
        <meta name="keywords" content="preguntas frecuentes todo clean, faq limpieza chillán, dudas servicios limpieza" />
        <link rel="canonical" href="https://todoclean.cl/preguntas-frecuentes" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16 md:py-24">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-1 sm:px-4 lg:px-8">
            <div className="max-w-full sm:max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Preguntas frecuentes
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 mb-8">
                Encuentra respuestas rápidas a las dudas más comunes sobre nuestros servicios
              </p>
              
              {/* Search Bar */}
              <div className="max-w-full sm:max-w-2xl mx-auto relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar en preguntas frecuentes..."
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-neutral-900 placeholder-neutral-500 focus:ring-2 focus:ring-primary-300 focus:outline-none"
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-neutral-50">
          <div className="container mx-auto px-1 sm:px-4 lg:px-8">
            <div className="max-w-full sm:max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.id;
                  const count = category.id === 'all' 
                    ? EXTENDED_FAQ_DATA.length 
                    : EXTENDED_FAQ_DATA.filter(faq => faq.category === category.id).length;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{category.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        isActive ? 'bg-primary-500' : 'bg-neutral-200 text-neutral-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-1 sm:px-4 lg:px-8">
            <div className="max-w-full sm:max-w-4xl mx-auto">
              {filteredFAQs.length === 0 ? (
                <Card className="p-8 text-center">
                  <QuestionMarkCircleIcon className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    No encontramos preguntas que coincidan
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    {searchTerm.trim() 
                      ? `No hay resultados para "${searchTerm}"`
                      : 'No hay preguntas en esta categoría'}
                  </p>
                  <div className="space-y-4">
                    <Button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                      }}
                      variant="outline"
                    >
                      Ver todas las preguntas
                    </Button>
                    <div>
                      <p className="text-sm text-neutral-500 mb-2">
                        ¿No encuentras lo que buscas?
                      </p>
                      <Button onClick={handleWhatsAppContact}>
                        Pregúntanos por WhatsApp
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <>
                  {/* Results count */}
                  <div className="mb-8 text-center">
                    <p className="text-neutral-600">
                      {filteredFAQs.length === 1 
                        ? '1 pregunta encontrada'
                        : `${filteredFAQs.length} preguntas encontradas`
                      }
                    </p>
                  </div>

                  {/* FAQ List */}
                  <div className="space-y-4">
                    {filteredFAQs.map((faq) => {
                      const isExpanded = expandedFAQs.has(faq.id);
                      
                      return (
                        <Card 
                          key={faq.id} 
                          className={`transition-all duration-200 hover:shadow-md ${
                            isExpanded ? 'ring-2 ring-primary-200' : ''
                          }`}
                        >
                          <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-start space-x-3 flex-1">
                                {faq.popular && (
                                  <div className="flex-shrink-0">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                      Popular
                                    </span>
                                  </div>
                                )}
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                                    {faq.question}
                                  </h3>
                                  <div className="text-sm text-neutral-500">
                                    Categoría: {{
                                      service: 'Servicios',
                                      booking: 'Reservas', 
                                      pricing: 'Precios',
                                      general: 'General'
                                    }[faq.category]}
                                  </div>
                                </div>
                              </div>
                              <ChevronDownIcon 
                                className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
                                  isExpanded ? 'rotate-180' : ''
                                }`} 
                              />
                            </div>
                          </button>
                          
                          {isExpanded && (
                            <div className="px-6 pb-6">
                              <div className="pt-4 border-t border-neutral-200">
                                <p className="text-neutral-600 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-primary-900 text-white">
          <div className="container mx-auto px-1 sm:px-4 lg:px-8 text-center">
            <div className="max-w-full sm:max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                ¿Tienes alguna pregunta?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Si no encontraste la respuesta que buscabas, contáctanos directamente
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-primary-900 hover:bg-primary-50"
                  onClick={handleWhatsAppContact}
                >
                  WhatsApp directo
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-900"
                  onClick={() => window.location.href = '/contacto'}
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

export default PreguntasFrecuentesPage;