/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./App.{ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1EB854",
        secondary: "#1DB88E",
        inactiver: "#6B7280",
        background: "#171212",
        base100: "#171212",
        base200: "#1F1A19",
        base300: "#2A2423",
        warning: "#FBBD23",
        danger: "#F87272",
      },
      fontFamily: {
        main: ["LatoRegular"],
        title: ["CookieRegular"],
        bold: ["LatoBold"],
      },
    },
  },
  plugins: [],
};
