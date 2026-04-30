/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        fell: ['"IM Fell English SC"', "serif"],
        medieval: ["MedievalSharp", "cursive"],
        body: ['"IM Fell English SC"', "serif"]
      },
      colors: {
        parchment: "#f5e6ca",
        "parchment-dark": "#e8d5b0",
        gold: "#d4af37",
        "gold-light": "#f0c75e",
        rust: "#8c3a2b",
        forest: "#2c5e1a",
        "dark-brown": "#3a2921",
        "dark-gray": "#242424"
      },
    },
  },
  plugins: [],
}
