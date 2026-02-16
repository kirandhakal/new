import React, { useState } from "react";
import { Heart, Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hearts, setHearts] = useState([]);

  const createHeart = () => {
    const id1 = Date.now();
    const id2 = Date.now() + 1;

    const heartPair = [
      {
        id: id1,
        x: -25,
        size: 18,
      },
      {
        id: id2,
        x: 25,
        size: 18,
      },
    ];

    setHearts((prev) => [...prev, ...heartPair]);

    setTimeout(() => {
      setHearts((prev) =>
        prev.filter((h) => h.id !== id1 && h.id !== id2)
      );
    }, 1200);
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 mt-auto relative overflow-hidden">
      
      {/* Decorative blur */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Left Section */}
          <div className="flex flex-col items-center md:items-start gap-3">

            {/* Sending Love */}
            <div className="flex items-center gap-2 text-xl font-medium relative">
              <span>Sending</span>

              <span
                onClick={createHeart}
                className="relative cursor-pointer flex items-center justify-center"
              >
                <Heart
                  size={28}
                  className="text-rose-500 hover:scale-125 transition-transform duration-200 relative top-[1px]"
                />

                {/* Animated Hearts */}
                <AnimatePresence>
                  {hearts.map((heart) => (
                    <motion.span
                      key={heart.id}
                      initial={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                      animate={{
                        opacity: 0,
                        y: -80,
                        x: heart.x,
                        scale: 1.4,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="absolute"
                    >
                      <Heart
                        size={heart.size}
                        className="text-rose-500 fill-rose-500"
                      />
                    </motion.span>
                  ))}
                </AnimatePresence>
              </span>

              <span>Love</span>
            </div>

            {/* Copyright */}
            <p className="text-gray-100 text-lg">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/kirandhakal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/kirandhakal7/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>

            <a
              href="mailto:kirandhakal715@gmail.com"
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;