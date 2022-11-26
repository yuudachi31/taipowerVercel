
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        sm: "375px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      height: {
        header: "60px",
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        green: {
          500: "#55A630",
          400: "#7ACA00",
          300: "#92D131",
        },
        red:{
          400:"#FF6262",
        },
        purple:{
          400:"#524FDD",
        }
      },
      fontSize: {
        base: '18px',
      },
      backgroundImage:{
        'login':"url('./assets/img/starsunset.jpg')"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
  
};
