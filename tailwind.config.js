/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('https://i.ibb.co/m6xNVJQ/background.png')",
      },
      colors: {
        'primary': '#DD6A70'
      },
      fontFamily: {
        'primary': 'Inter'
      }
    },
  },
  plugins: [],
}