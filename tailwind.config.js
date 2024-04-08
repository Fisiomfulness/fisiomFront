const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // https://www.tints.dev/
        alter: {
          50: "#F2FBFD",
          100: "#E9F8FB",
          200: "#CBEFF6",
          300: "#ACE5F1",
          400: "#89DBEB",
          500: "#62CFE4", // 500
          600: "#2ABDDA",
          700: "#22A9C4",
          800: "#1C8BA1",
          900: "#146576",
          950: "#0E4753",
        },
        aqua: {
          50: "#F0FAF8",
          100: "#DCF4EF",
          200: "#B6E7DE",
          300: "#84D7C8",
          400: "#4AC4AE",
          500: "#36A793", // 800
          600: "#319684",
          700: "#2A8373",
          800: "#236C5F",
          900: "#194D44",
          950: "#11362F",
        },
        palette: {
          100: "#112732",
          200: "#225f7c",
          300: "#3397c6",
          400: "#30a9d9",
          500: "#62cfe4",
          600: "#cfe9f3",
          700: "#f2f8fa",
          800: "#36a793",
        },
        // nextui
        primary: {
          DEFAULT: "#218BB5",
          50: "#E9F6FB",
          100: "#D4EDF7",
          200: "#ADDDF0",
          300: "#82CBE8",
          400: "#5BBBE1",
          500: "#30A9D9", // 400
          600: "#218BB5", // 300 - primary
          700: "#196786", // 200 v
          800: "#11465A", // 200 ^
          900: "#08212B", // 100 - secondary
          950: "#041116",
        },
        secondary: {
          DEFAULT: "#08212B",
          50: "#D8EFF8",
          100: "#B2DFF1",
          200: "#64BEE2",
          300: "#2598C6",
          400: "#165D78",
          500: "#08212B",
          600: "#061A22",
          700: "#05141A",
          800: "#030D11",
          900: "#020709",
          950: "#010304",
        },
        white: "#FAFAFA",
        black: "#0D0D0D",
      },
      animation: {
        "reverse-spin": "reverse-spin 1s linear infinite",
      },
      keyframes: {
        "reverse-spin": {
          from: {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FAFAFA",
            foreground: "#0D0D0D",
          },
        },
      },
    }),
  ],
};
