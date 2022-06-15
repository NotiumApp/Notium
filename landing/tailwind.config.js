module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        righteous: ["Righteous"],
        rubik: ["Inter"],
      },

      colors: {
        accent: {
          primary: {
            DEFAULT: "var(--color-primary)",
          },
        },
      },
    },
  },
  plugins: [],
};
