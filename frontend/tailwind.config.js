/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sohne: ["test_shne_breitfett", "sans-serif"],
      },
    },
  },
  plugins: [],
};
