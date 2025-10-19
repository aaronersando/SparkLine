import type { Config } from "tailwindcss";
import tailwindcssAnimatePlugin from "tailwindcss-animate";
import typographyPlugin from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        primary: {
          "100": "#D7F6FF",
          DEFAULT: "#0EA5FF", // Accent Cyan
        },
        secondary: "#FFB020", // Accent Ember
        black: {
          "100": "#111318", // tertiary background / panels
          "200": "#0B0F15", // secondary background / cards
          "300": "#131821", // surface muted
          DEFAULT: "#05060A", // primary background
        },
        white: {
          "100": "#E6EEF6", // primary text (soft white)
          DEFAULT: "#FFFFFF",
        },
      },
      fontFamily: {
        sora: ["var(--font-sora)"],
        inter: ["var(--font-inter)"],
        mono: ["var(--font-jetbrains)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        100: "2px 2px 0px 0px rgb(0, 0, 0)",
        200: "2px 2px 0px 2px rgb(0, 0, 0)",
        300: "2px 2px 0px 2px rgb(238, 43, 105)",
      },
    },
  },
  plugins: [tailwindcssAnimatePlugin, typographyPlugin],
};

export default config;
