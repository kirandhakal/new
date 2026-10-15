"use client";

import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Facebook, Instagram, Github, Linkedin, Mail, Phone, 
  MapPin, Twitter, Youtube, ArrowUpRight, Flag
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import contactJson from '@/data/contact-form/contact.json';
import type { ContactFormData } from '@/types/content';
import { Form, FormField as FormFieldContainer, FormLabel, Input, Textarea } from '@/components/ui';
import CampHeading from '@/components/CampHeading';

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
  name: string;
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

// Move constant data outside component to avoid recreation on every render
const SOCIAL_LINKS = [
  { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/kirandhakal715' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/dhakalkiran_' },
  { name: 'GitHub', icon: Github, url: 'https://github.com/kirandhakal' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/kirandhakal7/' },
  { name: 'Twitter', icon: Twitter, url: 'https://x.com/dhakaldiary' },
  { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@kirandhakal715' },
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

// Climber-on-the-move overlay shown while the request is in flight.
const EnvelopeAnimation = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 rounded-3xl bg-background/80 backdrop-blur-sm"
  >
    <svg viewBox="0 0 120 80" className="h-24 w-36" aria-hidden="true">
      <path d="M5 75 L60 12 L115 75 Z" fill="hsl(var(--secondary))" />
      <motion.circle r="4" fill="hsl(var(--accent))" initial={{ cx: 12, cy: 70 }} animate={{ cx: [12, 60], cy: [70, 14] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} />
    </svg>
    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Climbing to the summit…</span>
  </motion.div>
);

const SuccessMessage = ({ onReset }: SuccessMessageProps) => (
  <motion.div
    key="success-message"
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex min-h-[520px] flex-col items-center justify-center gap-6 rounded-3xl border border-border bg-card p-10 text-center"
  >
    <svg viewBox="0 0 160 110" className="h-32 w-44" aria-hidden="true">
      <path d="M0 108 L80 30 L160 108 Z" fill="hsl(var(--secondary))" />
      <path d="M80 30 L66 44 L74 42 L80 48 L86 42 L94 44 Z" fill="hsl(var(--foreground))" />
      <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ originY: 1 }} transition={{ type: "spring", stiffness: 160, damping: 10, delay: 0.2 }}>
        <line x1="80" y1="30" x2="80" y2="0" stroke="hsl(var(--foreground))" strokeWidth="2.5" />
        <path d="M80 1 h28 l-7 8 l7 8 h-28 Z" fill="hsl(var(--accent))" />
      </motion.g>
    </svg>
    <div className="space-y-2">
      <h3 className="font-display text-4xl font-extrabold tracking-tight text-foreground">{content.successTitle} Flag planted.</h3>
      <p className="text-lg text-muted-foreground">{content.successMessage}</p>
    </div>
    <button
      type="button"
      onClick={onReset}
      className="rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-accent hover:text-accent"
    >
      {content.resetLabel}
    </button>
  </motion.div>
);

const ContactInfoBox = ({ icon: Icon, label, value, href, channel }: IconBoxProps & { channel: number }) => (
  <a href={href} className="group flex items-center gap-4 border-b border-dashed border-border py-5 last:border-b-0">
    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-secondary text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
      <Icon size={18} />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">CH {String(channel).padStart(2, '0')} · {label}</span>
      <span className="block truncate font-display text-lg font-bold text-foreground">{value}</span>
    </span>
    <ArrowUpRight size={18} className="flex-none text-muted-foreground transition-all group-hover:rotate-45 group-hover:text-accent" />
  </a>
);

const SocialIconBox = ({ icon: Icon, url, name }: SocialIconBoxProps) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={name}
    whileTap={{ scale: 0.96 }}
    className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border py-4 text-muted-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
  >
    <Icon size={20} />
    <span className="text-xs font-semibold">{name}</span>
  </motion.a>
);

const FormField = ({ label, name, value, onChange, placeholder, type = 'text', required = true, isTextarea = false }: FormFieldProps) => (
  <FormFieldContainer>
    <FormLabel htmlFor={`contact-${name}`}>{label}</FormLabel>
    {isTextarea ? (
      <Textarea id={`contact-${name}`} name={name} required={required} rows={5} value={value} onChange={onChange} placeholder={placeholder} className="resize-none text-base" />
    ) : (
      <Input id={`contact-${name}`} type={type} name={name} required={required} value={value} onChange={onChange} placeholder={placeholder} className="text-base" />
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
    <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
      <CampHeading
        camp="contact"
        title={<>You made it to the <span className="text-accent">summit</span>.</>}
        description={`${content.description} Sign the summit register and I'll radio back.`}
      />

      <div className="mt-14 grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Summit register */}
        <div className="relative min-w-0 lg:col-span-7">
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="form-container"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="overflow-hidden rounded-3xl border border-border bg-card"
              >
                <div className="flex items-center justify-between border-b border-dashed border-border px-6 py-4 sm:px-9">
                  <span className="font-display text-lg font-bold text-foreground">Summit register</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">▲ 8,849 m · Entry #{new Date().getFullYear()}</span>
                </div>
                <Form onSubmit={handleSubmit} className="p-6 sm:p-9">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {content.fields.map((field) => (
                      <div key={field.name} className={field.type === 'textarea' || field.type === 'tel' ? 'sm:col-span-2' : ''}>
                        <FormField
                          label={field.label}
                          name={field.name as keyof ContactFormData}
                          value={formData[field.name as keyof ContactFormData]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          type={field.type === 'textarea' ? 'text' : field.type}
                          isTextarea={field.type === 'textarea'}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex w-full items-center justify-between rounded-full bg-accent py-2 pl-7 pr-2 font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-70"
                  >
                    <span>{isSubmitting ? content.submittingLabel : 'Plant your flag & send'}</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-foreground text-accent">
                      <Flag size={19} className="transition-transform duration-300 group-hover:-rotate-12" />
                    </span>
                  </button>
                  {status === 'error' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="alert" className="rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-center text-sm font-medium text-danger">
                      {errorMessage || "Submission failed."}
                    </motion.p>
                  )}
                </Form>
              </motion.div>
            ) : (
              <SuccessMessage onReset={() => setStatus('')} />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isSubmitting && <EnvelopeAnimation />}
          </AnimatePresence>
        </div>

        {/* Base camp radio */}
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-5">
          <div className="rounded-3xl border border-border bg-card px-6 py-2 sm:px-8">
            <p className="flex items-center gap-2 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-flag-green" /> Base camp radio · on air
            </p>
            {content.contactInfo.map((info, i) => (
              <ContactInfoBox key={info.label} channel={i + 1} icon={icons[info.icon]} label={info.label} value={info.value} href={info.href} />
            ))}
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <p className="eyebrow">{content.socialTitle}</p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {SOCIAL_LINKS.map((social) => (
                <SocialIconBox key={social.name} icon={social.icon} url={social.url} name={social.name} />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-3xl bg-flag-yellow p-6 text-accent-foreground sm:p-8">
            <span className="text-4xl" aria-hidden="true">☀</span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">Descent time</p>
              <p className="mt-1 font-display text-2xl font-extrabold leading-tight">Replies within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
