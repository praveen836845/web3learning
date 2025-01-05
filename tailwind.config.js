/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        slideIn: 'slideIn 1s ease-out',
        bgColorChange: 'bgColorChange 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideIn: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        bgColorChange: {
          '0%': {
            backgroundColor: '#000',
          },
          '100%': {
            backgroundColor: '#111',
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'), // Optional: For additional animations and features
  ],
}
