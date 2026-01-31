/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'spin-slower': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
}
