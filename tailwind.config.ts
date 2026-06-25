import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          mjkt: "#D4537E",
          light: "#FBEAF0",
          dark: "#993556"
        },
        blue: {
          mjkt: "#378ADD",
          light: "#E6F1FB",
          dark: "#185FA5"
        },
        amber: {
          mjkt: "#EF9F27",
          light: "#FAEEDA",
          dark: "#854F0B"
        },
        green: {
          mjkt: "#1D9E75",
          light: "#E1F5EE",
          dark: "#085041"
        },
        midnight: "#1A1A2E",
        ivory: "#F7F4EF",
        graymid: "#888780",
        graylight: "#D3D1C7"
      },
      boxShadow: {
        mjkt: "0 4px 24px rgba(0,0,0,0.08)",
        glow: "0 16px 70px rgba(212,83,126,0.22)"
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-lato)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
