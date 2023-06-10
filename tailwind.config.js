/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Inter: ["inter", "sans-serif"],
    },

    extend: {
      animation: {
        forbidden: "forbidden 500ms",
      },
      keyframes: {
        forbidden: {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "20%, 60%": {
            transform: "translateX(-0.5em)",
          },
          "40%, 80%": {
            transform: "translateX(0.5em)",
          },
        },
      },
    },
  },
  plugins: [],
};
