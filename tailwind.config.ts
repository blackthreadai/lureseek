import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lure: {
          bg: "#011432",
          surface: "#021a3d",
          border: "#0a2a5c",
          accent: "#db2439",
          "accent-dim": "#a81c2e",
          muted: "#4a6fa5",
          text: "#e2e8f0",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
