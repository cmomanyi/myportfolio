/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 tells Tailwind to scan all your React files
  ],
  theme: {
    extend: {}, // you can customize colors, fonts, etc. here later
  },
  plugins: [],
}
