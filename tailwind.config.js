/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '660px',
      md: '960px',
    },
    extend: {
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
    },
    fontFamily: {
       sans: 'Roboto Mono,monoscope'
    }
   
  },
  plugins: [],
};
