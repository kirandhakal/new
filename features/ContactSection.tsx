"use client";

import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Facebook, Instagram, Github, Linkedin, Mail, Phone, 
  Send, CheckCircle, MapPin, Twitter, Youtube, ArrowUpRight
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import contactJson from '@/data/contact-form/contact.json';
import type { ContactFormData } from '@/types/content';
import { Form, FormField as FormFieldContainer, FormLabel, Input, Textarea } from '@/components/ui';
import SectionHeading from '@/components/SectionHeading';

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

// Paper-plane overlay shown while the request is in flight.
const EnvelopeAnimation = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center rounded-3xl bg-background/70 backdrop-blur-sm"
  >
    <motion.div
      animate={{ x: [0, 40, 0], y: [0, -30, 0], rotate: [0, 12, 0] }}
      transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground"
    >
      <Send size={30} />
    </motion.div>
  </motion.div>
);

const SuccessMessage = ({ onReset }: SuccessMessageProps) => (
  <motion.div
    key="success-message"
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex min-h-[520px] flex-col items-center justify-center gap-6 rounded-3xl border border-border bg-card p-10 text-center"
  >
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground">
      <CheckCircle size={38} />
    </div>
    <div className="space-y-2">
      <h3 className="font-display text-4xl font-bold tracking-tight text-foreground">{content.successTitle}</h3>
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

const ContactInfoBox = ({ icon: Icon, label, value, href }: IconBoxProps) => (
  <a
    href={href}
    className="group flex items-center gap-4 border-b border-border py-5 last:border-b-0"
  >
    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-secondary text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
      <Icon size={18} />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      <span className="block truncate font-display text-lg font-semibold text-foreground sm:text-xl">{value}</span>
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
    className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-border py-4 text-muted-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
  >
    <Icon size={20} />
    <span className="text-xs font-semibold">{name}</span>
  </motion.a>
);

const FormField = ({ label, name, value, onChange, placeholder, type = 'text', required = true, isTextarea = false }: FormFieldProps) => (
  <FormFieldContainer>
    <FormLabel htmlFor={`contact-${name}`}>{label}</FormLabel>
    {isTextarea ? (
      <Textarea
        id={`contact-${name}`}
        name={name}
        required={required}
        rows={5}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="resize-none text-base"
      />
    ) : (
      <Input
        id={`contact-${name}`}
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="text-base"
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
    <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
      <SectionHeading
        index="04"
        eyebrow={content.eyebrow}
        title={<>Let&apos;s build <span className="text-outline">something</span> <span className="text-accent">great.</span></>}
        description={content.description}
      />

      <div className="mt-12 grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Form */}
        <div className="relative min-w-0 lg:col-span-7">
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="form-container"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="rounded-3xl border border-border bg-card p-6 sm:p-9"
              >
                <Form onSubmit={handleSubmit}>
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
                    className="group flex w-full items-center justify-between rounded-full bg-accent py-2 pl-7 pr-2 font-bold text-accent-foreground transition-colors hover:bg-primary disabled:opacity-70"
                  >
                    <span>{isSubmitting ? content.submittingLabel : content.submitLabel}</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-foreground text-accent transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight size={20} />
                    </span>
                  </button>
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      role="alert"
                      className="rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-center text-sm font-medium text-danger"
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

          <AnimatePresence>
            {isSubmitting && <EnvelopeAnimation />}
          </AnimatePresence>
        </div>

        {/* Details */}
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-5">
          <div className="rounded-3xl border border-border bg-card px-6 py-2 sm:px-8">
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

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <p className="eyebrow">{content.socialTitle}</p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {SOCIAL_LINKS.map((social) => (
                <SocialIconBox key={social.name} icon={social.icon} url={social.url} name={social.name} />
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-coral p-6 text-accent-foreground sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">Response time</p>
            <p className="mt-2 font-display text-2xl font-bold leading-tight">Usually within 24 hours ✦</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
