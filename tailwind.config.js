/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        oled: "#05050A",
        panel: "#101018",
        panelSoft: "#151522",
        accent: "#8B5CF6",
        accentHot: "#A855F7"
      },
      boxShadow: {
        neon: "0 0 28px rgba(139, 92, 246, 0.26)",
        card: "0 18px 50px rgba(0, 0, 0, 0.45)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
