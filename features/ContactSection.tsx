"use client";

import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Facebook, Instagram, Github, Linkedin, Mail, Phone, 
  Send, CheckCircle, MapPin, Twitter, Youtube 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import contactJson from '@/data/contact-form/contact.json';
import type { ContactFormData } from '@/types/content';
import { Form, FormField as FormFieldContainer, FormLabel, Input, Textarea } from '@/components/ui';
import { H1 } from '@/components/typography';

const content = contactJson;
const icons: Record<string, LucideIcon> = {
  Facebook, Instagram, Github, Linkedin, Mail, Phone, MapPin, Twitter, Youtube,
};

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

const CONTACT_API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL
  || 'https://contact.kirandhakal.me/';
const CONTACT_FORM_KEY = process.env.NEXT_PUBLIC_CONTACT_FORM_KEY
  || 'frm_VUGuth6Rs2FM2f21OFLYu8qg';

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
    className="bg-card p-12 rounded-2xl shadow-soft text-center space-y-6 flex flex-col items-center justify-center min-h-[500px]"
  >
    <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center border border-blue-100">
      <CheckCircle size={40} />
    </div>
    <div className="space-y-2">
      <h3 className="text-3xl font-black uppercase italic tracking-tighter text-foreground">{content.successTitle}</h3>
      <p className="text-muted-foreground text-xl font-medium">{content.successMessage}</p>
    </div>
    <button
      onClick={onReset}
      className="text-lg font-black uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
    >
      {content.resetLabel}
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
  <FormFieldContainer>
  <FormLabel className="text-[15px] font-black uppercase tracking-widest text-muted-foreground ml-2">{label}</FormLabel>
    {isTextarea ? (
      <Textarea
        name={name}
        required={required}
        rows={4}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-card/50 border border-input focus:border-ring focus:bg-card rounded-2xl px-5 py-4 text-base font-semibold outline-none transition-all resize-none shadow-sm"
      />
    ) : (
      <Input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-card/50 border border-input focus:border-ring focus:bg-card rounded-2xl px-5 py-4 text-base font-semibold outline-none transition-all shadow-sm"
      />
    )}
  </FormFieldContainer>
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
    <div className="py-20 bg-background text-foreground min-h-screen relative overflow-hidden font-sans">
      
      {/* Decorative Backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-card/80 backdrop-blur-sm text-accent border border-border shadow-sm font-bold text-[10px] uppercase tracking-widest"
          >
            <Mail size={14} className="text-blue-500" />
            <span>{content.eyebrow}</span>
          </motion.div>
          
          {/* <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none text-gray-900">
            Let's <span className="text-blue-500">Connect</span>
          </h2> */}
          <H1 className="leading-tight">
            {content.titleBefore} <span>{content.titleAccent}</span>
          </H1>
          
          <p className="text-lg text-muted-foreground max-w-xl mx-auto font-medium">
            {content.description}
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
                  className="bg-card/70 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-soft border border-border h-full relative overflow-hidden"
                >
                  <Form onSubmit={handleSubmit}>
                    {content.fields.map((field) => (
                      <FormField
                        key={field.name}
                        label={field.label}
                        name={field.name as keyof ContactFormData}
                        value={formData[field.name as keyof ContactFormData]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        type={field.type === 'textarea' ? 'text' : field.type}
                        isTextarea={field.type === 'textarea'}
                      />
                    ))}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 relative overflow-hidden transition-colors disabled:bg-primary/70"
                    >
                      <span className="relative z-10">
                        {isSubmitting ? content.submittingLabel : content.submitLabel}
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
                  </Form>
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
            <div className="bg-card/50 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-border shadow-soft space-y-4">
              <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">{content.contactInfoTitle}</h3>
              <div className="grid gap-3">
                {content.contactInfo.map((info) => (
                  <ContactInfoBox
                    key={info.label}
                    icon={icons[info.icon]}
                    label={info.label}
                    value={info.value}
                    href={info.href}
                  />
                ))}
              </div>
            </div>

            {/* Social Media Grid */}
            <div className="bg-white/50 backdrop-blur-md p-2 md:p-4 rounded-xl border border-white shadow-sm shadow-blue-200/10 flex-1">
              <h3 className="text-lg font-black uppercase tracking-tighter text-foreground mb-4">{content.socialTitle}</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {content.socialLinks.map((social) => (
                  <SocialIconBox
                    key={social.name}
                    icon={icons[social.icon]}
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
          <p className="text-muted-foreground text-[20px] font-black uppercase tracking-[0.4em]">
            Available for new opportunities
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default ContactSection;
