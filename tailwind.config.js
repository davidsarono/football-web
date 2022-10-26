/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        "dark-grey-gradient":
          "linear-gradient(180deg, #3A3A3A 0%, #1A1A1A 100%)",
      },
    },
  },
  plugins: [],
};
