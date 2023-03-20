/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        palate: {
          100: "#FFBE0B",
          200: "#fb5607",
          300: "#ff006e",
          400: "#8338ec",
          500: "#FEE440",
          600: "#00BBF9",
          700: "#00F5D4",
        }
      },
      animation: {
        fade: 'fadeOut 1s ease-in-out',
      },
      keyframes: (theme) => ({
        fadeOut: {
          '0%': {opacity: 1},
          '100%': {opacity: 0 },
        },
      })
    },
  },
  plugins: [
      require('@tailwindcss/forms'),
  ],
}
