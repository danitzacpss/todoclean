import React from 'react';
import { Helmet } from 'react-helmet-async';

const ServiciosResidencialPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Servicios Residenciales | Todo Clean Chillán</title>
      </Helmet>
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Servicios Residenciales</h1>
          <p className="text-center text-neutral-600">Página en desarrollo...</p>
        </div>
      </div>
    </>
  );
};

export default ServiciosResidencialPage;