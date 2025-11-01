/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // For the main HTML file
    "./src/**/*.{vue,js,ts,jsx,tsx}", // For all Vue components and other relevant files in src
  ],
  theme: {
    extend: {
      // Extend Tailwind's default theme here, e.g., adding custom colors, fonts, spacing, etc.
      colors: {
        "custom-blue": "#243c5a",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
