// ===================================
// TODO CLEAN - PARTY CLEANUP PROMO
// Promotional banner for post-party cleaning services
// ===================================

import React from 'react';
import { SITE_CONFIG } from '@/utils/constants';
import logoImage from '@/assets/images/logo.png';

const PartyCleanupPromo: React.FC = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      '¡Hola! Me interesa el servicio de limpieza post-fiesta. ¿Podrían darme más información?'
    );
    window.open(
      `https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
      {/* Logo */}
      <div className="absolute top-0 right-0 z-20 bg-white/90 backdrop-blur-md rounded-bl-2xl p-3 hover:bg-white transition-all shadow-xl">
        <img
          src={logoImage}
          alt="Todo Clean"
          className="h-8 w-auto"
        />
      </div>

      {/* Decorative animated waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute -bottom-10 -left-10 w-64 h-64 opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ffffff" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,39.9,76.8C26,84.6,9.2,87.6,-6.5,86.3C-22.2,85,-37.8,79.4,-51.2,71.4C-64.6,63.4,-75.8,53,-82.4,40.1C-89,27.2,-91,12.8,-89.6,-1.3C-88.2,-15.4,-83.4,-29.2,-75.4,-41.8C-67.4,-54.4,-56.2,-65.8,-42.8,-73.3C-29.4,-80.8,-14.7,-84.4,0.5,-85.3C15.7,-86.2,31.4,-84.4,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute -top-10 -right-10 w-64 h-64 opacity-10 animate-pulse" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ffffff" d="M39.5,-65.5C51.4,-58.7,61.3,-47.3,68.6,-34.2C75.9,-21.1,80.6,-6.3,80.2,8.7C79.8,23.7,74.3,38.9,65.2,51.4C56.1,63.9,43.4,73.7,29.2,78.8C15,83.9,-0.7,84.3,-15.8,80.5C-30.9,76.7,-45.4,68.7,-56.8,57.3C-68.2,45.9,-76.5,31.1,-79.4,15.4C-82.3,-0.3,-79.8,-16.9,-73.2,-31.8C-66.6,-46.7,-55.9,-59.9,-42.8,-66.2C-29.7,-72.5,-14.8,-71.9,-0.3,-71.4C14.2,-70.9,27.6,-72.3,39.5,-65.5Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="relative z-10 flex items-start gap-4">
        <div className="flex-shrink-0 text-5xl drop-shadow-lg">🎉</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">
            ¿Hiciste una fiesta y se pasó de madres?
          </h3>
          <p className="text-orange-50 mb-4">
            ¿Necesitas una limpieza express y rápida? Aseo 24/7 a la hora que desees desde <span className="font-bold text-white">$39.990</span>
            <span className="text-sm block mt-1">(dependiendo de los m²)</span>
          </p>
          <button
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-all transform hover:scale-105 shadow-md"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.287" />
            </svg>
            Solicitar Limpieza Express
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartyCleanupPromo;
