/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B0000',
        secondary: '#A52A2A',
        background: '#F0FFFF',
        card: '#FFF3E0',
      },
    },
  },
  plugins: [],
} 