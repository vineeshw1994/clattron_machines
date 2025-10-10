/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customRed: {
          DEFAULT: 'rgb(251, 5, 8)',
          50: '#ffebee',
          100: '#ffcdd2',
          200: '#ef9a9a',
          300: '#e57373',
          400: '#ef5350',
          500: 'rgb(251, 5, 8)',
          600: '#f44336',
          700: '#d32f2f',
          800: '#b71c1c',
          900: '#8a0000',
        },
      },
    },
  },
  plugins: [],
};