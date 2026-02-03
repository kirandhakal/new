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
    <div className="py-12 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">My Services</h2>
        {/* <div className="w-24 h-1 bg-blue-600 mx-auto"></div> */}
        <div className="flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"></div>
          </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8 px-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-8 rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="text-4xl mb-6">{service.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p className="text-gray-300 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;