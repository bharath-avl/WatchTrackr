/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e50914',
        dark: '#141414',
        'dark-light': '#1f1f1f',
      }
    },
  },
  plugins: [],
}