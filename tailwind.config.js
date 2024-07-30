/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      boxShadow: {
        cust: "0 4px 8px 3px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        primary: "#4ba3c3",
        secondary: "#000000",
        tertiary: "#96A3A6",
        paragraph: "#747c92",
        highlight: "#ff5964",
      },
    },
  },
  plugins: [],
};
