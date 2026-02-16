import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import kiran1 from "../../assets/images/kiran1.jpg";
import { Download, MessageCircle, ArrowRight } from "lucide-react";

const roles = [
  "Web Developer",
  "Full Stack Developer",
  "Computer Engineer",
  "AI Enthusiast"
];

const HomeSection = ({ setActiveSection }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setIsAnimating(false);
      }, 500); // Half of the animation duration
    }, 3000); // Change role every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 min-h-screen flex items-center">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-orange-200/30 to-rose-200/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-amber-200/30 to-orange-200/30 rounded-full blur-3xl animate-float-delayed"></div>
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="relative z-10 flex items-center justify-center px-8 py-12">
        <div className="max-w-5xl w-full">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Mobile: 1) Greeting + Name + Role  2) Image  3) Rest. Desktop: Image left, content right. */}
            {/* Block 1: Greeting + "I'm Kiran Dhakal" + role (mobile order 1); desktop: col 2 row 1 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left order-1 w-full md:col-start-2 md:row-start-1 space-y-4 md:space-y-0">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-200/50 shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm sm:text-lg font-medium text-gray-700">Hey there! Welcome to my portfolio</span>
              </div>
              <div className="space-y-3 md:space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 leading-tight tracking-tight">
                  I'm Kiran Dhakal
                </h1>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="h-1 w-10 sm:w-12 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"></div>
                  <div className="relative h-10 sm:h-12 overflow-hidden">
                    <p
                      className={`text-xl sm:text-2xl md:text-3xl font-bold text-orange-700 transition-all duration-500 ${
                        isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
                      }`}
                    >
                      {roles[currentRoleIndex]}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Block 2: Image — right below "I'm Kiran Dhakal" on mobile; desktop: col 1, span 2 rows */}
            <div className="flex justify-center md:justify-end order-2 w-full md:col-start-1 md:row-start-1 md:row-span-2">
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-rose-400 opacity-20 animate-ping-slow"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 md:border-8 border-white shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={kiran1}
                    alt="Kiran Dhakal - Web Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full blur-2xl opacity-60"></div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full blur-2xl opacity-60"></div>
              </div>
            </div>

            {/* Block 3: Description, stats, CTAs, tech (mobile order 3); desktop: col 2 row 2 */}
            <div className="space-y-6 sm:space-y-8 order-3 w-full text-center md:text-left md:col-start-2 md:row-start-2 md:flex md:flex-col md:items-start">
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
                Crafting exceptional digital experiences through clean code and thoughtful design. 
                I transform ideas into responsive, interactive web applications that users love.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto md:mx-0">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-orange-100/50 shadow-sm">
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600">3+</div>
                  <div className="text-xs text-gray-600 font-medium mt-1">Years Exp</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-orange-100/50 shadow-sm">
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600">20+</div>
                  <div className="text-xs text-gray-600 font-medium mt-1">Projects</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-orange-100/50 shadow-sm">
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600">10+</div>
                  <div className="text-xs text-gray-600 font-medium mt-1">Happy Clients</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="/Kiran Dhakal - Web Developer.pdf"
                  download="Kiran-Dhakal-CV.pdf"
                  className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 hover:shadow-2xl overflow-hidden"
                  aria-label="Download Kiran Dhakal's CV"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <Download size={20} className="relative z-10" />
                  <span className="relative z-10">Download CV</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <button
                  onClick={() => setActiveSection && setActiveSection("contact")}
                  className="group inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 border-2 border-gray-200 hover:border-orange-300 shadow-lg hover:shadow-xl"
                  aria-label="Navigate to contact section"
                >
                  <MessageCircle size={20} />
                  <span>Let's Talk</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Tech stack preview */}
              <div className="pt-4">
                <p className="text-sm text-gray-500 font-medium mb-3">Working with</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {['React','Next js', 'Node.js', 'TypeScript', 'Tailwind', 'MongoDB' ,'Postgress'].map((tech, i) => (
                    <span 
                      key={i}
                      className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700 border border-orange-100/50 shadow-sm hover:shadow-md hover:scale-105 transition-all cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.1; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>
    </div>
  );
};

HomeSection.propTypes = {
  setActiveSection: PropTypes.func.isRequired,
};

export default HomeSection;
