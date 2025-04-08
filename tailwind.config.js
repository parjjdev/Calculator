/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        bunge: ["Bungee Tint", "sans-serif"] ,
        serif: ["Instrument Serif", "serif"],
        Fraunces: [ "Fraunces", "serif"]
      },
    },
  },
  plugins: [],
}