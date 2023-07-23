/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      dmBlack: '#3b3b3b',
      dmWhite: '#F4EEE0',
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms')],
};
