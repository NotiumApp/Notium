module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe\\ UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        monospace: ["Fira\\ Code", "monospace"],
      },
      colors: {
        background: "var(--background)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
