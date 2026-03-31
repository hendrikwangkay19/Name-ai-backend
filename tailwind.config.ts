import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#07070b",
        card: "rgba(255,255,255,0.06)",
        gold: "#d8b56a",
        accent: "#6d4aff",
        deepblue: "#3a5bf6"
      },
      backgroundImage: {
        grain: "radial-gradient(circle at top, rgba(109,74,255,0.2), transparent 35%), radial-gradient(circle at 80% 20%, rgba(216,181,106,0.18), transparent 30%), radial-gradient(circle at 20% 80%, rgba(58,91,246,0.18), transparent 30%)"
      },
      boxShadow: {
        glow: "0 0 30px rgba(109,74,255,0.35)",
        gold: "0 0 35px rgba(216,181,106,0.25)"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
