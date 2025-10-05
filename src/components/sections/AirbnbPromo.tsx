// ===================================
// TODO CLEAN - AIRBNB PROMO SECTION
// Promotional banner for Airbnb services on HomePage
// ===================================

import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '@/assets/images/logo.png';

const AirbnbPromo: React.FC = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-lg overflow-hidden relative">
            {/* Logo */}
            <div className="absolute top-0 right-0 z-20 bg-white/90 backdrop-blur-md rounded-bl-2xl p-3 hover:bg-white transition-all shadow-xl">
              <img
                src={logoImage}
                alt="Todo Clean"
                className="h-8 w-auto"
              />
            </div>

            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left: Content */}
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-3 mb-3">
                    <span className="text-4xl">🏡</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      ¿Necesitas limpiar tu Airbnb?
                    </h2>
                  </div>
                  <p className="text-cyan-100 text-base md:text-lg mb-4">
                    Servicio express entre huéspedes con garantía de puntualidad
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
                    <div className="flex items-center text-white">
                      <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Express 1-3h
                    </div>
                    <div className="flex items-center text-white">
                      <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Desde $15.000
                    </div>
                    <div className="flex items-center text-white">
                      <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Reportes fotográficos
                    </div>
                  </div>
                </div>

                {/* Right: CTA */}
                <Link
                  to="/servicios?tab=airbnb"
                  className="flex-shrink-0 px-8 py-3.5 bg-white text-teal-600 font-bold rounded-xl hover:bg-cyan-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Ver Servicios Airbnb →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirbnbPromo;
