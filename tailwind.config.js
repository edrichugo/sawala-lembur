/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sawala: {
          dark: '#1b4322',      // Deep Forest Green
          primary: '#245a2e',   // Medium Green
          light: '#8cb853',     // Fresh Moss Green aksen
          bg: '#fbfdf9',        // Off-white hangat
          text: '#1c241b',      // Teks gelap natural
          muted: '#556b53',     // Teks sekunder
        }
      },
    },
  },
  plugins: [],
}