'use client';
import { socialLinks, contactInfo } from '../data/contact';
import { useContactForm } from '../hooks/useContactForm';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const { formData, handleChange, handleSubmit, isSubmitting, isSuccess } = useContactForm();

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden min-h-screen flex items-center">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-float-delayed"></div>
      
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="container mx-auto max-w-5xl px-6 relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-blue-200/50 shadow-sm mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">Get In Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">Let's Talk</h1>
          <div className="flex justify-center mb-6">
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Direct contact */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Direct Contact</h3>
              <div className="space-y-4">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={idx}
                      href={info.href}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl hover:bg-blue-50 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition text-blue-600">
                        <Icon size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{info.label}</p>
                        <p className="font-semibold text-gray-900">{info.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Follow Me</h3>
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={link.name}
                      className={`${link.color} p-4 rounded-lg text-white hover:scale-110 transition-transform flex items-center justify-center`}
                    >
                      <Icon size={24} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {isSuccess ? (
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center space-y-4">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Message Sent!</h3>
                <p className="text-gray-600">I'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
