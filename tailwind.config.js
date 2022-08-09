
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
        header: "70px",
      },
      minHeight:{
        'textArea': '40px',
      },
      letterSpacing: {
        wide: ".03em",
      },
      colors: {
        white: "#ffffff",
        black: "#464453",
        liteBlue:'#35B7FC',
        litePurple:'#B992F9',
        liteGreen:'#B5EB5D',
        blue: {
          400: "#1E659C",
          300: "#E0EBF4",
          200: "#F0F5FB",
        },
        yellow: {
          400: "#F9B835",
          300: "#FFD786",
        },
        gray: {
          500: "#ACACAC",
          400: "#DBDFE5",
          300: "#F0F1F5",
        },
        red:{
          500:"#FF7E8D",
          400:"#FFE0E4",
        },
        purple:{
          600:"#464453",
          500:"#525077",
          400:"#7C80AA",
          300:"#9799B5",
        }
      },
      boxShadow: {
        header: "0px 5px 8px rgba(0, 0, 0, 0.1)",
        btn: "2px 3px 7px rgba(0, 0, 0, 0.2)",
        card: "0px 4px 8px rgba(0, 0, 0, 0.06)",
        busCircle: "0px 0px 4px #005DC0",
      },
      fontFamily: {
        ch: ["Noto Sans TC", "sans-serif"],
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
