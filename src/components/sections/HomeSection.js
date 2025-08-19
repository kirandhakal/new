import React from "react";
import PropTypes from "prop-types";
import kiran1 from "../../assets/images/kiran1.jpg"; // Ensure this path is correct

const HomeSection = ({ setActiveSection }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center space-y-6 px-8">
        {/* Profile Circle */}
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-500 animate-pulse-slow pointer-events-none"></div>
          <img
            src={kiran1}
            alt="Kiran Dhakal"
            className="w-40 h-40 rounded-full object-cover border-4 border-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          />
        </div>

        {/* Intro */}
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Hi! I AM KIRAN DHAKAL
        </h1>
        <p className="text-2xl text-gray-600 mb-8">I AM A WEB DEVELOPER</p>
        <p className="text-lg text-gray-500 mb-8">
          I create responsive and interactive web applications using modern
          technologies. I specialize in creating dynamic and beautiful web
          pages. I have a passion for web development and love to create
          user-friendly interfaces.
        </p>

        {/* Buttons */}
        <div className="space-x-4">
          <a
            href="/assets/kiran_cv.pdf" // Ensure this file exists in public/assets/
            download="Kiran-Dhakal-CV.pdf"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            aria-label="Download Kiran Dhakal's CV"
          >
            Download CV
          </a>
          <button
            onClick={() => setActiveSection && setActiveSection("contact")}
            className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            aria-label="Navigate to contact section"
          >
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
};

// PropTypes for type checking
HomeSection.propTypes = {
  setActiveSection: PropTypes.func.isRequired,
};

export default HomeSection;