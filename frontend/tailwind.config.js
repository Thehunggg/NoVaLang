/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        mist: "#f5f3ff",
        grape: { 50: "#f5f3ff", 100: "#ede9fe", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9" }
      },
      boxShadow: { soft: "0 18px 55px rgba(62, 42, 105, 0.12)", card: "0 8px 28px rgba(40, 30, 80, 0.08)" },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"], display: ["Nunito", "Inter", "ui-sans-serif", "system-ui"] },
      keyframes: { float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } } },
      animation: { float: "float 4s ease-in-out infinite" }
    }
  },
  plugins: []
};
