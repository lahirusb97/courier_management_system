/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./Pages/**/*.{html,js,jsx}",
    "./Components/**/*.{html,js}",
  ],
  theme: {
    extend: {
      width: {
        "input-max": "450px",
        "dialog-screen": "80vw",
        "dialog-screen2": "90vw",
      },
    },
  },
  plugins: [],
};
