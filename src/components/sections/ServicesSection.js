import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Palette, Code, Database, Cloud } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      title: 'Web Development',
      icon: Globe,
      description:
        'I specialize in crafting exceptional web experiences using React JS and Next.js. This powerful JavaScript library allows me to build dynamic, user-friendly, and high-performing websites.',
      gradient: 'from-orange-400 to-rose-400',
    },
    {
      title: 'App Development',
      icon: Smartphone,
      description:
        'I craft exceptional mobile apps using Flutter, building beautiful and high-performing apps for both iOS and Android with a single codebase.',
      gradient: 'from-amber-400 to-orange-400',
    },
    {
      title: 'UI/UX Design',
      icon: Palette,
      description:
        'As a skilled front-end developer and UX/UI enthusiast, I bridge the gap between code and creativity, crafting seamless user experiences.',
      gradient: 'from-rose-400 to-pink-400',
    },
    {
      title: 'Backend Development',
      icon: Database,
      description:
        'Building robust and scalable server-side applications with Node.js, Express, and modern database technologies like MongoDB and PostgreSQL.',
      gradient: 'from-blue-400 to-cyan-400',
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      description:
        'Deploying and managing applications on cloud platforms with modern DevOps practices, CI/CD pipelines, and containerization.',
      gradient: 'from-purple-400 to-indigo-400',
    },
    {
      title: 'Clean Code',
      icon: Code,
      description:
        'Writing maintainable, scalable, and well-documented code following best practices and design patterns for long-term project success.',
      gradient: 'from-emerald-400 to-teal-400',
    },
  ];

  return (
    <div className="py-20 lg:py-32 relative overflow-hidden min-h-screen flex items-center">
      {/* Decorative elements - matching HomeSection */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-orange-200/30 to-rose-200/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-amber-200/30 to-orange-200/30 rounded-full blur-3xl animate-float-delayed"></div>
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-orange-200/50 shadow-sm mb-6">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">What I Offer</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 leading-tight tracking-tight mb-4">
            My Services
          </h1>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6 font-medium">
            Delivering comprehensive digital solutions tailored to bring your vision to life
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-lg shadow-orange-200/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <service.icon size={32} className="text-white" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight tracking-tight group-hover:text-orange-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                {service.description}
              </p>
              <div className={`mt-6 h-1 w-16 bg-gradient-to-r ${service.gradient} rounded-full group-hover:w-full transition-all duration-300`}></div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default ServicesSection;
