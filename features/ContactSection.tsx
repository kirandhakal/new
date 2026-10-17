"use client";

import React, { useState, type ChangeEvent, type FormEvent, type FocusEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Facebook, Instagram, Github, Linkedin, Mail, Phone, 
  MapPin, Twitter, Youtube, ArrowUpRight, Send
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import contactJson from '@/data/contact-form/contact.json';
import type { ContactFormData } from '@/types/content';
import { Form, FormField as FormFieldContainer, FormLabel, FormMessage, Input, Textarea } from '@/components/ui';
import ModuleHeading from '@/components/ModuleHeading';

const content = contactJson;
const icons: Record<string, LucideIcon> = {
  Facebook, Instagram, Github, Linkedin, Mail, Phone, MapPin, Twitter, Youtube,
};

type FieldName = keyof ContactFormData;
type FieldErrors = Partial<Record<FieldName, string>>;

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
  name: FieldName;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  isTextarea?: boolean;
  error?: string;
}

const SOCIAL_LINKS = [
  { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/kirandhakal715' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/dhakalkiran_' },
  { name: 'GitHub', icon: Github, url: 'https://github.com/kirandhakal' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/kirandhakal7/' },
  { name: 'Twitter', icon: Twitter, url: 'https://x.com/dhakaldiary' },
  { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@kirandhakal715' },
];

const CONTACT_API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL
  || 'https://contact.kirandhakal.me/';
const CONTACT_FORM_KEY = process.env.NEXT_PUBLIC_CONTACT_FORM_KEY
  || 'frm_I-Sn9KqEu3BrCwky2xQMZxQK'; 

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;

const fieldRequired = (name: FieldName) =>
  content.fields.find((f) => f.name === name)?.required ?? name !== 'phone';

const validateField = (name: FieldName, value: string): string => {
  const trimmed = value.trim();
  const required = fieldRequired(name);

  if (required && !trimmed) {
    const labels: Record<FieldName, string> = {
      name: 'Please enter your name.',
      email: 'Please enter your email address.',
      phone: '',
      message: 'Please write a message.',
    };
    return labels[name];
  }

  if (name === 'email' && trimmed && !EMAIL_RE.test(trimmed)) {
    return 'Enter a valid email address (e.g. you@example.com).';
  }

  if (name === 'phone' && trimmed && !PHONE_RE.test(trimmed)) {
    return 'Enter a valid phone number, or leave it blank.';
  }

  if (name === 'message' && trimmed && trimmed.length < 10) {
    return 'Message should be at least 10 characters.';
  }

  return '';
};

const validateForm = (data: ContactFormData): FieldErrors => {
  const errors: FieldErrors = {};
  (Object.keys(data) as FieldName[]).forEach((name) => {
    const msg = validateField(name, data[name]);
    if (msg) errors[name] = msg;
  });
  return errors;
};

const EnvelopeAnimation = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 rounded-3xl bg-background/85 backdrop-blur-sm"
  >
    <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.2em]">
      <span className="text-led-amber">TX →</span>
      <span className="text-muted-foreground">RX</span>
    </div>
    <svg viewBox="0 0 240 40" className="h-10 w-60" aria-hidden="true">
      <motion.path
        d="M0 30 H30 V10 H50 V30 H70 V10 H110 V30 H130 V10 H150 V30 H190 V10 H210 V30 H240"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      />
    </svg>
    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Transmitting @ 115200 baud…</span>
  </motion.div>
);

const SuccessMessage = ({ onReset }: SuccessMessageProps) => (
  <motion.div
    key="success-message"
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex min-h-[520px] flex-col justify-center gap-2 rounded-3xl border border-border bg-chip p-8 font-mono text-sm text-chip-foreground sm:p-10"
  >
    <p className="text-chip-foreground/50">$ uart send --to kiran</p>
    <p>&gt; frame 1/1 sent ............ <span className="text-led-green">[ OK ]</span></p>
    <p>&gt; checksum verified ......... <span className="text-led-green">[ OK ]</span></p>
    <p className="mt-2 font-display text-3xl font-bold uppercase text-led-green">ACK ✓ {content.successTitle}</p>
    <p className="text-chip-foreground/70">{content.successMessage}</p>
    <button
      type="button"
      onClick={onReset}
      className="mt-6 self-start rounded-md border border-chip-foreground/20 px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-chip-foreground/80 transition-colors hover:border-led-green hover:text-led-green"
    >
      $ {content.resetLabel}
    </button>
  </motion.div>
);

const ContactInfoBox = ({ icon: Icon, label, value, href, channel }: IconBoxProps & { channel: number }) => (
  <a href={href} className="group flex items-center gap-4 border-b border-dashed border-border py-5 last:border-b-0">
    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-secondary text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
      <Icon size={18} />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{['TX', 'RX', 'GND'][channel - 1] ?? `P${channel}`} · {label}</span>
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
    className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border py-4 text-muted-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
  >
    <Icon size={20} />
    <span className="text-xs font-semibold">{name}</span>
  </motion.a>
);

const FormField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type = 'text',
  required = true,
  isTextarea = false,
  error,
}: FormFieldProps) => {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const invalid = Boolean(error);

  return (
    <FormFieldContainer>
      <FormLabel htmlFor={id} className="flex items-center gap-1.5">
        <span>{label}</span>
        {required ? (
          <span className="text-danger" aria-hidden="true">*</span>
        ) : (
          <span className="normal-case tracking-normal text-muted-foreground/70">(optional)</span>
        )}
        {required && <span className="sr-only">(required)</span>}
      </FormLabel>
      {isTextarea ? (
        <Textarea
          id={id}
          name={name}
          required={required}
          aria-required={required}
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          rows={5}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`resize-none text-base ${invalid ? 'border-danger focus-visible:ring-danger' : ''}`}
        />
      ) : (
        <Input
          id={id}
          type={type}
          name={name}
          required={required}
          aria-required={required}
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`text-base ${invalid ? 'border-danger focus-visible:ring-danger' : ''}`}
        />
      )}
      {error && (
        <FormMessage id={errorId} role="alert">
          {error}
        </FormMessage>
      )}
    </FormFieldContainer>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'' | 'success' | 'error'>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('');
    setErrorMessage('');

    const nextErrors = validateForm(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setErrorMessage('Fix the highlighted fields, then try again.');
      setStatus('error');
      return;
    }

    setIsSubmitting(true);

    if (!CONTACT_FORM_KEY || CONTACT_FORM_KEY.includes('YOUR')) {
      setErrorMessage('Contact form is not configured yet. Add NEXT_PUBLIC_CONTACT_FORM_KEY before deploying.');
      setStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      };

      const response = await fetch(
        `${CONTACT_API_URL.replace(/\/$/, '')}/v1/forms/${encodeURIComponent(CONTACT_FORM_KEY)}/submissions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
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
    const { name, value } = e.target;
    const field = name as FieldName;
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: validateField(field, value) || undefined });
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as FieldName;
    const msg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: msg || undefined }));
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
      <ModuleHeading
        module="contact"
        title={<>Serial <span className="text-copper">port</span></>}
        description={`${content.description} Write to the port and I'll send an ACK back.`}
      />

      <div className="mt-14 grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
        {/* UART console */}
        <div className="relative min-w-0 lg:col-span-7">
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="form-container"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="flex items-center justify-between border-b border-dashed border-border px-6 py-4 sm:px-9">
                  <span className="font-mono text-sm font-semibold text-foreground">/dev/ttyKD0</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">115200 · 8N1</span>
                </div>
                <Form onSubmit={handleSubmit} className="p-6 sm:p-9" noValidate>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Fields marked <span className="text-danger">*</span> are required
                  </p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {content.fields.map((field) => (
                      <div key={field.name} className={field.type === 'textarea' || field.type === 'tel' ? 'sm:col-span-2' : ''}>
                        <FormField
                          label={field.label}
                          name={field.name as FieldName}
                          value={formData[field.name as FieldName]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={field.placeholder}
                          type={field.type === 'textarea' ? 'text' : field.type}
                          required={field.required}
                          isTextarea={field.type === 'textarea'}
                          error={errors[field.name as FieldName]}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex w-full items-center justify-between rounded-lg bg-foreground py-2 pl-6 pr-2 font-mono text-sm font-semibold uppercase tracking-wider text-background transition-transform hover:-translate-y-0.5 disabled:opacity-70"
                  >
                    <span>{isSubmitting ? content.submittingLabel : 'Transmit message'}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent text-accent-foreground">
                      <Send size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
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

        {/* Pinout */}
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-5">
          <div className="rounded-2xl border border-border bg-card px-6 py-2 sm:px-8">
            <p className="pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              J5 pinout · listening
            </p>
            {content.contactInfo.map((info, i) => (
              <ContactInfoBox key={info.label} channel={i + 1} icon={icons[info.icon]} label={info.label} value={info.value} href={info.href} />
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="eyebrow">{content.socialTitle}</p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {SOCIAL_LINKS.map((social) => (
                <SocialIconBox key={social.name} icon={social.icon} url={social.url} name={social.name} />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-3xl bg-copper p-6 text-background sm:p-8">
            <span className="font-mono text-4xl font-bold" aria-hidden="true">⏱</span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">Latency</p>
              <p className="mt-1 font-display text-2xl font-bold uppercase leading-tight">Reply &lt; 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
