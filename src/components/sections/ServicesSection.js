import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      title: 'Web Design',
      icon: '🌐',
      description:
        'I specialize in crafting exceptional web experiences using React JS. This powerful JavaScript library allows me to build dynamic, user-friendly, and high-performing websites.',
    },
    {
      title: 'App Development',
      icon: '📱',
      description:
        'I craft exceptional mobile apps using Flutter, building beautiful and high-performing apps for both iOS and Android with a single codebase.',
    },
    {
      title: 'UI/UX Design',
      icon: '🎨',
      description:
        'As a skilled front-end developer and UX/UI enthusiast, I bridge the gap between code and creativity, crafting seamless user experiences.',
    },
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-orange-200/30 to-rose-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-amber-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 leading-tight tracking-tight mb-4">My Services</h2>
        <div className="flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"></div>
          </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8 px-8 relative z-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl hover:shadow-xl transition-all transform hover:scale-105 border-2 border-orange-100/50 shadow-lg"
          >
            <div className="text-4xl mb-6 text-orange-500">{service.icon}</div>
            <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight tracking-tight">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed font-medium">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;