/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "base": "#202022",
        "second": "#404145",
        "lavender": "#b7bdf8",
        "gray-border": "#2a2a2a"
      }
    },
  },
  plugins: [],
}

