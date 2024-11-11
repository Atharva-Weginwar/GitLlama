/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
        slideInDown: 'slideInDown 0.7s ease-out',
        slideInLeft: 'slideInLeft 0.5s ease-out',
        slideInRight: 'slideInRight 0.5s ease-out',
      },
      backgroundImage: {
        url: 'https://img.freepik.com/free-photo/cosmic-environment-with-colorful-neon-laser-lights-perfect-digital-wallpaper_181624-32841.jpg?w=2000&t=st=1728772501~exp=1728773101~hmac=811c0236bc2af3207e1733f45a53276cdd683bd3a4eed68e8a0a60cefad848f0'  
      },
      backgroundColor: {
        darkBlue: "#030129e3"
      }
    },
  },
  plugins: [],
}

