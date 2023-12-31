import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-bg": "var(--primary-bg)",
        "btn-primary-bg": "var(--btn-primary-bg)",
        "btn-primary-light": "var(--btn-primary-light)",
        "secondary-color": "var(--secondary-color)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
      },
    },
  },
  plugins: [],
};
export default config;
