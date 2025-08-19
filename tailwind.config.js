/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "./src/components/**/*.{js,jsx,ts,tsx}"
];
export const theme = {
  extend: {
    animation: {
      'spin-slow': 'spin 6s linear infinite',
      'spin-slower': 'spin 12s linear infinite',
    },
  },
};
export const plugins = [];