/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        spa: {
          green: '#a0c294',
          seafoam: '#a8d9db',
          lavender: '#8f9cc4',
          ocean: '#1492ed',
          deepGreen: '#5b8058',
          sky: '#789ddb',
          hibiscus: '#ffa2cc',
          white: '#ffffff'
        }
      },
      backgroundImage: {
        'hawaiian-gradient': 'linear-gradient(135deg, #a8d9db 0%, #a0c294 100%)',
      }
    },
  },
  plugins: [],
};
