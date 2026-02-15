import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Facebook, Instagram, Github, Linkedin, Mail, Phone, Send, CheckCircle, MapPin, Twitter ,Youtube } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // EmailJS configuration - set these in your environment
  const rawService = process.env.REACT_APP_EMAILJS_SERVICE_ID ;
  const rawTemplate = process.env.REACT_APP_EMAILJS_TEMPLATE_ID ;
  const rawPublic = process.env.REACT_APP_EMAILJS_PUBLIC_KEY ;

  const sanitize = (v) => String(v || '').trim().replace(/^['"](.*)['"]$/, '$1');

  const SERVICE_ID = sanitize(rawService);
  const TEMPLATE_ID = sanitize(rawTemplate);
  const PUBLIC_KEY = sanitize(rawPublic);

  useEffect(() => {
    if (PUBLIC_KEY && !PUBLIC_KEY.includes('YOUR')) {
      try {
        emailjs.init(PUBLIC_KEY);
      } catch (e) {
        console.warn('EmailJS init failed:', e);
      }
    }
  }, [PUBLIC_KEY]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    // If env vars are placeholders, bail early with an explanatory error
    if (SERVICE_ID.includes('YOUR') || TEMPLATE_ID.includes('YOUR') || PUBLIC_KEY.includes('YOUR')) {
      const msg = 'EmailJS keys not configured. Please set REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID and REACT_APP_EMAILJS_PUBLIC_KEY in your .env (no quotes, no spaces around =).';
      console.error(msg);
      setErrorMessage(msg);
      setStatus('error');
      setIsSubmitting(false);
      return;
    }

    // Use init'd public key and send without passing key explicitly
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then(() => {
        setStatus('success');
        setIsSubmitting(false);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        const msg = (error && (error.text || error.message)) || JSON.stringify(error) || 'Unknown error from EmailJS';
        setErrorMessage(msg);
        setStatus('error');
        setIsSubmitting(false);
        setTimeout(() => setStatus(''), 7000);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/kirandhakal715',
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:from-blue-700 hover:to-blue-800'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/dhakalkiran_',
      color: 'from-pink-600 to-rose-600',
      hoverColor: 'hover:from-pink-700 hover:to-rose-700'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/kirandhakal',
      color: 'from-gray-800 to-gray-900',
      hoverColor: 'hover:from-gray-900 hover:to-black'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/kirandhakal7/',
      color: 'from-blue-700 to-blue-800',
      hoverColor: 'hover:from-blue-800 hover:to-blue-900'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://x.com/dhakaldiary',
      color: 'from-blue-700 to-blue-800',
      hoverColor: 'hover:from-gray-800 hover:to-black-900'
    },
    {
      name: 'youtube',
      icon: Youtube,
      url: 'https://www.youtube.com/@kirandhakal715',
      color: 'from-red-700 to-red-800',
      hoverColor: 'hover:from-red-800 hover:to-red-900'
    },
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-rose-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
      
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-orange-200/50 shadow-sm mb-4">
            <Mail size={16} className="text-orange-500" />
            <span className="text-sm font-medium text-gray-700">Get In Touch</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 tracking-tight">
            Let's Connect
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Let's discuss how we can work together
          </p>
          
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-orange-100/50 h-full">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Send a Message</h3>
              <p className="text-gray-600 mb-8">Fill out the form and I'll get back to you within 24 hours</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/80 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all outline-none text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/80 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all outline-none text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/80 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all outline-none resize-none text-gray-900 placeholder-gray-400"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || status === 'success'}
                  className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white transition-all transform hover:scale-105 shadow-lg ${
                    status === 'success'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle size={20} />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                    <p className="text-green-800 text-sm font-medium">
                      Thank you for reaching out! I'll get back to you soon.
                    </p>
                  </div>
                )}
                {status === 'error' && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex flex-col gap-3">
                    <p className="text-red-800 text-sm font-medium">Oops — something went wrong.</p>
                    {errorMessage && (
                      <pre className="text-xs text-red-700 bg-red-25 p-2 rounded break-words">{errorMessage}</pre>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Info & Social */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            {/* Contact Information */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-orange-100/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Info</h3>
              <div className="space-y-5">
                <a
                  href="mailto:kirandhakal715@gmail.com"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-rose-50 rounded-2xl hover:shadow-lg transition-all group border border-orange-100/50"
                >
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</p>
                    <p className="text-sm font-bold text-gray-900 truncate">kirandhakal715@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+9779827591616"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-rose-50 rounded-2xl hover:shadow-lg transition-all group border border-orange-100/50"
                >
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</p>
                    <p className="text-sm font-bold text-gray-900">+977 982 759 1616</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-rose-50 rounded-2xl border border-orange-100/50">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl text-white">
                    <MapPin size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</p>
                    <p className="text-sm font-bold text-gray-900">Kathmandu, Nepal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-orange-100/50 flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center justify-center gap-3 p-5 bg-gradient-to-r ${social.color} ${social.hoverColor} text-white rounded-2xl transition-all transform hover:scale-105 shadow-lg`}
                    >
                      <Icon size={28} />
                      <span className="font-bold text-sm">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-20 flex justify-center">
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-300"></div>
            <div className="text-sm text-gray-500 font-medium">Let's build something amazing together</div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;