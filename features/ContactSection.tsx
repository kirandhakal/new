"use client";

import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Facebook, Instagram, Github, Linkedin, Mail, Phone, 
  Send, CheckCircle, MapPin, Twitter, Youtube 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface SuccessMessageProps {
  onReset: () => void;
}

interface IconBoxProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}

interface SocialIconBoxProps {
  icon: LucideIcon;
  url: string;
  color: string;
}

interface FormFieldProps {
  label: string;
  name: keyof ContactFormData;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  isTextarea?: boolean;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Move constant data outside component to avoid recreation on every render
const SOCIAL_LINKS = [
  { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/kirandhakal715', color: 'bg-blue-600' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/dhakalkiran_', color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' },
  { name: 'GitHub', icon: Github, url: 'https://github.com/kirandhakal', color: 'bg-gray-900' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/kirandhakal7/', color: 'bg-blue-700' },
  { name: 'Twitter', icon: Twitter, url: 'https://x.com/dhakaldiary', color: 'bg-sky-500' },
  { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@kirandhakal715', color: 'bg-red-600' },
];

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'kirandhakal715@gmail.com', href: 'mailto:kirandhakal715@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+977 9827591616', href: 'tel:+9779827591616' },
  { icon: MapPin, label: 'Location', value: 'Kathmandu, Nepal', href: '#' },
];

const CONTACT_API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL
  || 'https://contact.kirandhakal.me/';
const CONTACT_FORM_KEY = process.env.NEXT_PUBLIC_CONTACT_FORM_KEY
  || 'frm_I-Sn9KqEu3BrCwky2xQMZxQK'; 

// Extract complex animation component for reusability
const EnvelopeAnimation = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
    className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
  >
    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg 
        viewBox="0 0 24 24" 
        className="w-40 h-40 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1"
      >
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
        <motion.rect 
          x="3" y="5" width="18" height="14" rx="2"
          fill="#dbeafe"
          initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
          animate={{ opacity: 0.8, clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="z-[-1]"
        />
      </svg>
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
);

// Success message component
const SuccessMessage = ({ onReset }: SuccessMessageProps) => (
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
      onClick={onReset}
      className="text-lg font-black uppercase tracking-widest text-gray-400 hover:text-blue-500 transition-colors"
    >
      Send Another
    </button>
  </motion.div>
);

const ContactInfoBox = ({ icon: Icon, label, value, href }: IconBoxProps) => (
  <a
    href={href}
    className="group flex items-center gap-3 p-3 bg-white rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm border border-blue-50"
  >
    <div className="p-2 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-white/20 group-hover:text-white transition-colors">
      <Icon size={26} />
    </div>
    <div>
      <p className="text-[15px] font-black uppercase tracking-widest opacity-60">{label}</p>
      <p className="font-bold text-lg truncate">{value}</p>
    </div>
  </a>
);

const SocialIconBox = ({ icon: Icon, url, color }: SocialIconBoxProps) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2, scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`${color} aspect-square rounded-lg flex items-center justify-center text-white shadow-sm transition-all p-1`}
  >
    <Icon size={24} />
  </motion.a>
);

const FormField = ({ label, name, value, onChange, placeholder, type = 'text', required = true, isTextarea = false }: FormFieldProps) => (
  <div className="space-y-1">
    <label className="text-[15px] font-black uppercase tracking-widest text-gray-600 ml-2">{label}</label>
    {isTextarea ? (
      <textarea
        name={name}
        required={required}
        rows={4}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/50 border border-gray-100 focus:border-orange-400 focus:bg-white rounded-2xl px-5 py-4 text-base font-semibold outline-none transition-all resize-none shadow-sm"
      />
    ) : (
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/50 border border-gray-100 focus:border-orange-400 focus:bg-white rounded-2xl px-5 py-4 text-base font-semibold outline-none transition-all shadow-sm"
      />
    )}
  </div>
);

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'' | 'success' | 'error'>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');
    setErrorMessage('');

    if (!CONTACT_FORM_KEY || CONTACT_FORM_KEY.includes('YOUR')) {
      setErrorMessage('Contact form is not configured yet. Add NEXT_PUBLIC_CONTACT_FORM_KEY before deploying.');
      setStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `${CONTACT_API_URL.replace(/\/$/, '')}/v1/forms/${encodeURIComponent(CONTACT_FORM_KEY)}/submissions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        let errorText = 'Failed to send message';
        try {
          const errorBody = await response.json();
          errorText = errorBody.message || errorBody.error || errorText;
        } catch {
          // Keep the generic message when the API does not return JSON.
        }
        throw new Error(errorText);
      }
    } catch (error: unknown) {
      console.error('Contact form error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Submission failed');
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
               Let's <span >Connect</span>
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
                    <FormField
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                    <FormField
                      label="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      type="email"
                    />
                    <FormField
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+977 98XXXXXXXX"
                      type="tel"
                    />
                    <FormField
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      isTextarea={true}
                    />
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
                          transition={{ duration: 1.5, ease: "linear" }}
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
                <SuccessMessage onReset={() => setStatus('')} />
              )}
            </AnimatePresence>

            {/* OVERLAY LETTERBOX ANIMATION */}
            <AnimatePresence>
              {isSubmitting && <EnvelopeAnimation />}
            </AnimatePresence>
          </div>

          {/* Contact Details Side */}
          <div className="space-y-6 flex flex-col">
            <div className="bg-white/50 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-white shadow-sm shadow-blue-200/10 space-y-4">
              <h3 className="text-xl font-black uppercase tracking-tighter text-gray-900">Contact Info</h3>
              <div className="grid gap-3">
                {CONTACT_INFO.map((info, index) => (
                  <ContactInfoBox
                    key={index}
                    icon={info.icon}
                    label={info.label}
                    value={info.value}
                    href={info.href}
                  />
                ))}
              </div>
            </div>

            {/* Social Media Grid */}
            <div className="bg-white/50 backdrop-blur-md p-2 md:p-4 rounded-xl border border-white shadow-sm shadow-blue-200/10 flex-1">
              <h3 className="text-lg font-black uppercase tracking-tighter text-gray-900 mb-4">Follow Me</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {SOCIAL_LINKS.map((social, index) => (
                  <SocialIconBox
                    key={index}
                    icon={social.icon}
                    url={social.url}
                    color={social.color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="mt-20 pt-8 border-t border-blue-100 text-center">
          <p className="text-gray-600 text-[20px] font-black uppercase tracking-[0.4em]">
            Available for new opportunities
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default ContactSection;
