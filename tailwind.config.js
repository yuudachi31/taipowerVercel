
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
          400:"#524FDF",
        },
        gray:{
          200:"#FAFAFA",
          300:"#C4C4C4",
          400:"#7B7B7B",
        },
        orange:{
          400:"#E8A700",
          300:"#fdba74"
        }
      },
      fontSize: {
        base: '18px',
        normal: '16px',
      },
      backgroundImage:{
        'login':"url('./assets/img/login_bg.png')"
      },
      boxShadow: {
        'header': "0px 4px 10px rgba(172, 172, 172, 0.25)",
        'card': "0px 4px 8px rgba(0, 0, 0, 0.06)",
        'menu': "0px 6px 8px rgba(82, 79, 223, 0.3)"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
  
};
