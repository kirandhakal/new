/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f97316', // orange-500
          50: '#fff7ed',
          100: '#fff3e0',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        accent: '#fb7185', // rose-500
        neutral: {
          900: '#111827',
          800: '#1f2937',
          700: '#374151',
          300: '#d1d5db',
        }
      },
      spacing: {
        // 8px grid (1 = 8px)
        '1': '0.5rem',
        '2': '1rem',
        '3': '1.5rem',
        '4': '2rem',
        '6': '3rem',
        '8': '4rem'
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'spin-slower': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
}

