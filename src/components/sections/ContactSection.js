import React, { useState } from 'react';
import { Facebook, Instagram, Github, Linkedin, Mail, Phone } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Message sent successfully!');
    setTimeout(() => setStatus(''), 5000);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Me</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
      </div>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 px-8">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h3>
          <div className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            ></textarea>
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Send Message
            </button>
            {status && <p className="text-green-600 text-center">{status}</p>}
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Follow Me</h3>
          <div className="space-y-4">
            <a
              href="https://www.facebook.com/kirandhakal715"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Facebook size={24} />
              <span>Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/kirandhakal77"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 p-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              <Instagram size={24} />
              <span>Instagram</span>
            </a>
            <a
              href="https://github.com/kirandhakal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Github size={24} />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/kirandhakal7/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Linkedin size={24} />
              <span>LinkedIn</span>
            </a>
          </div>
          <div className="mt-8">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Contact Info</h4>
            <div className="space-y-3">
              <a
                href="mailto:kirandhakal715@gmail.com"
                className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Mail size={20} />
                <span>kirandhakal715@gmail.com</span>
              </a>
              <a
                href="tel:+9779827591616"
                className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Phone size={20} />
                <span>+977 982 759 1616</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;