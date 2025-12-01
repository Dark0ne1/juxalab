/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        vt: ['"VT323"', 'monospace'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
      // Animations are defined in index.css, but we extend theme to allow standard tailwind animation classes if needed
    },
  },
  plugins: [],
}