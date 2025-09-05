// ===================================
// TODO CLEAN - MAIN LAYOUT COMPONENT
// Primary layout wrapper with header, footer, and outlet
// ===================================

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

// ==========================================
// MAIN LAYOUT COMPONENT
// ==========================================

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-0">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-md focus:shadow-lg transition-all duration-200"
      >
        Saltar al contenido principal
      </a>

      {/* Header */}
      <Header />

      {/* Main content */}
      <main 
        id="main-content" 
        className="flex-1 focus:outline-none" 
        tabIndex={-1}
        role="main"
      >
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;