/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        serc: {
          supervision: '#EF4444', // Red / Coral from SERC banner
          educacion: '#8B5CF6',   // Purple from SERC banner
          regulacion: '#F59E0B',  // Amber/Orange from SERC banner
          comunicacion: '#06B6D4' // Teal/Cyan from SERC banner
        },
        uruguay: {
          blue: '#0038A8',
          lightBlue: '#388E3C', // or sky
          sun: '#FCD116'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
