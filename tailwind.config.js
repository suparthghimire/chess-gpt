/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightSq: "#FAFBF4",
        darkSq: "#769556",
      },
    },
  },
  plugins: [],
};
