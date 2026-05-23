'use client';
import { services } from '../data/services';
import ServiceCard from './ServiceCard';

export default function ServicesSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden min-h-screen flex items-center">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-orange-200/30 to-rose-200/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-amber-200/30 to-orange-200/30 rounded-full blur-3xl animate-float-delayed"></div>
      
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-orange-200/50 shadow-sm mb-6">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">What I Offer</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">My Services</h1>
          <div className="flex justify-center mb-6">
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Delivering comprehensive digital solutions tailored to bring your vision to life
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
