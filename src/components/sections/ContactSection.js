import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Facebook, Instagram, Github, Linkedin, Mail, Phone, 
  Send, CheckCircle, MapPin, Twitter, Youtube, ArrowLeft
} from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // EmailJS configuration - access environment variables directly
  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || '';
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '';
  const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    // If keys are missing, simulate success for preview/demo purposes
    if (!SERVICE_ID || SERVICE_ID.includes('YOUR') || !PUBLIC_KEY || PUBLIC_KEY.includes('YOUR')) {
      setTimeout(() => {
        setStatus('success');
        setIsSubmitting(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3500);
      return;
    }

    const data = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: PUBLIC_KEY,
      template_params: {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to send message');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setErrorMessage(error.message || 'Submission failed');
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.name });
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/kirandhakal715', color: 'bg-blue-600' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/dhakalkiran_', color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/kirandhakal', color: 'bg-gray-900' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/kirandhakal7/', color: 'bg-blue-700' },
    { name: 'Twitter', icon: Twitter, url: 'https://x.com/dhakaldiary', color: 'bg-sky-500' },
    { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@kirandhakal715', color: 'bg-red-600' },
  ];

  return (
    <div className="py-20 lg:py-32 relative overflow-hidden min-h-screen flex items-center">
      {/* Decorative elements - matching HomeSection */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-200/10 rounded-full blur-[120px] -z-10"></div>
      
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
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-blue-200/50 shadow-sm mb-6">
            <Mail size={14} className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Get In Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 leading-tight tracking-tight">
            Let's <span className="text-blue-500">Connect</span>
          </h1>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mt-6 font-medium">
            Have a project in mind? Drop me a line below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Form Container */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {status !== 'success' ? (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-sm shadow-blue-200/20 border border-white h-full"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                      <Send size={24} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">Send a Message</h3>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-white/50 border border-gray-100 focus:border-blue-400 focus:bg-white rounded-2xl px-5 py-4 text-base font-semibold outline-none transition-all shadow-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-white/50 border border-gray-100 focus:border-blue-400 focus:bg-white rounded-2xl px-5 py-4 text-base font-semibold outline-none transition-all shadow-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Message</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project..."
                        className="w-full bg-white/50 border border-gray-100 focus:border-blue-400 focus:bg-white rounded-2xl px-5 py-4 text-base font-semibold outline-none transition-all resize-none shadow-sm"
                      ></textarea>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="w-full py-5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all disabled:opacity-70"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      {!isSubmitting && <Send size={18} />}
                    </motion.button>

                    {status === 'error' && (
                      <motion.p 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="text-red-500 text-sm font-semibold text-center"
                      >
                        {errorMessage || "Submission failed. Please try again."}
                      </motion.p>
                    )}
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/70 backdrop-blur-md p-12 rounded-[2.5rem] shadow-lg border border-white text-center"
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={48} className="text-white" />
                  </div>
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter text-gray-900 mb-4">Delivered!</h3>
                  <p className="text-xl text-gray-600 font-medium mb-8">Your message is on its way.<br/>I'll be in touch shortly.</p>
                  <button
                    onClick={() => setStatus('')}
                    className="inline-flex items-center gap-2 text-lg font-black uppercase tracking-widest text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <ArrowLeft size={20} />
                    Send Another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading Animation */}
            <AnimatePresence>
              {isSubmitting && status !== 'success' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-[2.5rem]"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-blue-600 font-bold">Sending your message...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Details */}
          <div className="space-6 flex flex-col">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/50 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-white shadow-lg space-y-6"
            >
              <h3 className="text-2xl font-black uppercase tracking-tighter italic text-gray-900">Contact Info</h3>
              
              <div className="grid gap-4">
                <a 
                  href="mailto:kirandhakal715@gmail.com" 
                  className="group flex items-center gap-4 p-4 bg-white rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm border border-blue-50"
                >
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-white/20 group-hover:text-white transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest opacity-60">Email</p>
                    <p className="font-bold truncate">kirandhakal715@gmail.com</p>
                  </div>
                </a>

                <a 
                  href="tel:+9779827591616" 
                  className="group flex items-center gap-4 p-4 bg-white rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm border border-blue-50"
                >
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-white/20 group-hover:text-white transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest opacity-60">Phone</p>
                    <p className="font-bold">+977 9827591616</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-blue-50">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest opacity-60">Location</p>
                    <p className="font-bold text-gray-800">Kathmandu, Nepal</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/50 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-white shadow-lg flex-1"
            >
              <h3 className="text-2xl font-black uppercase tracking-tighter italic text-gray-900 mb-6">Social Network</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.05 }}
                    className={`${social.color} aspect-square rounded-3xl flex flex-col items-center justify-center text-white gap-2 shadow-lg hover:shadow-xl transition-all`}
                  >
                    <social.icon size={28} />
                    <span className="text-[9px] font-black uppercase tracking-widest">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
