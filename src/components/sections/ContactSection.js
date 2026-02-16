import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Facebook, Instagram, Github, Linkedin, Mail, Phone, 
  Send, CheckCircle, MapPin, Twitter, Youtube 
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
      }, 3500); // Slightly longer to appreciate the animation
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <div className="py-20 bg-gradient-to-br from-amber-50 via-orange-50/40 to-rose-50/60 min-h-screen relative overflow-hidden font-sans">
      
      {/* Decorative Backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-200/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm text-blue-600 border border-blue-100 shadow-sm font-bold text-[10px] uppercase tracking-widest"
          >
            <Mail size={14} className="text-blue-500" />
            <span>Get In Touch</span>
          </motion.div>
          
          {/* <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none text-gray-900">
            Let's <span className="text-blue-500">Connect</span>
          </h2> */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 leading-tight tracking-tight">
               Let's <span className="text-blue-500">Connect</span>
                </h1>
          
          <p className="text-lg text-gray-600 max-w-xl mx-auto font-medium">
            Have a project in mind? Drop me a line below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Form Container */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {status !== 'success' ? (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-sm shadow-blue-200/20 border border-white h-full relative overflow-hidden"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-white/50 border border-gray-100 focus:border-blue-400 focus:bg-white rounded-2xl px-5 py-4 text-base font-semibold outline-none transition-all shadow-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-white/50 border border-gray-100 focus:border-blue-400 focus:bg-white rounded-2xl px-5 py-4 text-base font-semibold outline-none transition-all shadow-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Message</label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        className="w-full bg-white/50 border border-gray-100 focus:border-blue-400 focus:bg-white rounded-2xl px-5 py-4 text-base font-semibold outline-none transition-all resize-none shadow-sm"
                      ></textarea>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="w-full py-5 bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 relative overflow-hidden transition-colors disabled:bg-gray-800"
                    >
                      <span className="relative z-10">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </span>
                      {!isSubmitting && <Send size={16} className="relative z-10" />}
                      
                      {/* Animated Progress Loader */}
                      {isSubmitting && (
                        <motion.div 
                          className="absolute inset-0 bg-blue-600 origin-left"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 3.5, ease: "linear" }}
                        />
                      )}
                    </motion.button>

                    {status === 'error' && (
                      <motion.p 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="text-red-500 text-[10px] font-bold uppercase text-center"
                      >
                        {errorMessage || "Submission failed."}
                      </motion.p>
                    )}
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-12 rounded-[2.5rem] shadow-sm shadow-blue-100 text-center space-y-6 flex flex-col items-center justify-center min-h-[500px]"
                >
                  <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center border border-blue-100">
                    <CheckCircle size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter text-gray-900">Delivered!</h3>
                    <p className="text-gray-500 text-xl font-medium">Your message is on its way.<br/>I'll be in touch shortly.</p>
                  </div>
                  <button
                    onClick={() => setStatus('')}
                    className="text-lg font-black uppercase tracking-widest text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    Send Another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* OVERLAY LETTERBOX ANIMATION */}
            <AnimatePresence>
              {isSubmitting && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                  className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
                >
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* The Envelope SVG */}
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-40 h-40 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1"
                    >
                      {/* Main Envelope Body */}
                      <motion.path 
                        d="M3 8L12 13L21 8" 
                        stroke="#3b82f6" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                      <motion.rect 
                        x="3" y="5" width="18" height="14" rx="2" 
                        stroke="#3b82f6" 
                        strokeLinejoin="round" 
                      />
                      
                      {/* Light Blue Filling Effect */}
                      <motion.rect 
                        x="3" y="5" width="18" height="14" rx="2"
                        fill="#dbeafe"
                        initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                        animate={{ opacity: 0.8, clipPath: 'inset(0% 0 0 0)' }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        className="z-[-1]"
                      />
                    </svg>
                    
                    {/* Floating Send Icon */}
                    <motion.div
                      initial={{ opacity: 0, x: -20, y: 20 }}
                      animate={{ opacity: [0, 1, 0], x: 40, y: -40 }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                      className="absolute text-blue-500"
                    >
                      <Send size={24} />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Details Side */}
          <div className="space-y-6 flex flex-col">
            <div className="bg-white/50 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-white shadow-sm shadow-blue-200/10 space-y-6">
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
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Email</p>
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
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Phone</p>
                    <p className="font-bold">+977 9827591616</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-blue-50">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Location</p>
                    <p className="font-bold text-gray-800">Kathmandu, Nepal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Grid */}
            <div className="bg-white/50 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-white shadow-sm shadow-blue-200/10 flex-1">
              <h3 className="text-2xl font-black uppercase tracking-tighter italic text-gray-900 mb-6">Social Network</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.05 }}
                    className={`${social.color} aspect-square rounded-3xl flex flex-col items-center justify-center text-white gap-2 shadow-sm shadow-gray-200/50`}
                  >
                    <social.icon size={28} />
                    <span className="text-[9px] font-black uppercase tracking-widest">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-blue-100 text-center">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">
            Available for new opportunities
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;