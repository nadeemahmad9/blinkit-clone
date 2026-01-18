// tailwind.config.js content example
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FFD344", // Blinkit primary yellow
          green: "#0C831F",  // Fresh grocery green
          dark: "#1C1C1C",   // High contrast text
          gray: "#F4F6FB",   // Light background for separation
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'], // Use a clean geometric font
      }
    },
  },
  plugins: [],
}