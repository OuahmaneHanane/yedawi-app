// tailwind.config.js

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        softBg: '#f4f8fb',        // Light background
        primary: '#2ca58d',       // Calm green/teal for buttons, titles
        secondary: '#e6fffa',     // Soft cyan background blocks
        accent: '#ffd166',        // Accent (e.g., icons, highlights)
        card: '#ffffff',          // Card background
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'], // Simple readable font
      },
    },
  },
  plugins: [],
};
