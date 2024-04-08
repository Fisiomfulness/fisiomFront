import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          // https://www.tints.dev/
          alter: {
            50: { value: "#F2FBFD" },
            100: { value: "#E9F8FB" },
            200: { value: "#CBEFF6" },
            300: { value: "#ACE5F1" },
            400: { value: "#89DBEB" },
            500: { value: "#62CFE4" }, // 500
            600: { value: "#2ABDDA" },
            700: { value: "#22A9C4" },
            800: { value: "#1C8BA1" },
            900: { value: "#146576" },
            950: { value: "#0E4753" },
          },
          aqua: {
            50: { value: "#F0FAF8" },
            100: { value: "#DCF4EF" },
            200: { value: "#B6E7DE" },
            300: { value: "#84D7C8" },
            400: { value: "#4AC4AE" },
            500: { value: "#36A793" }, // 800
            600: { value: "#319684" },
            700: { value: "#2A8373" },
            800: { value: "#236C5F" },
            900: { value: "#194D44" },
            950: { value: "#11362F" },
          },
          palette: {
            100: { value: "#112732" },
            200: { value: "#225f7c" },
            300: { value: "#3397c6" },
            400: { value: "#30a9d9" },
            500: { value: "#62cfe4" },
            600: { value: "#cfe9f3" },
            700: { value: "#f2f8fa" },
            800: { value: "#36a793" },
          },
          primary: {
            DEFAULT: { value: "#218BB5" },
            50: { value: "#E9F6FB" },
            100: { value: "#D4EDF7" },
            200: { value: "#ADDDF0" },
            300: { value: "#82CBE8" },
            400: { value: "#5BBBE1" },
            500: { value: "#30A9D9" }, // 400
            600: { value: "#218BB5" }, // 300 - primary
            700: { value: "#196786" }, // 200 v
            800: { value: "#11465A" }, // 200 ^
            900: { value: "#08212B" }, // 100 - secondary
            950: { value: "#041116" },
          },
          secondary: {
            DEFAULT: { value: "#08212B" },
            50: { value: "#D8EFF8" },
            100: { value: "#B2DFF1" },
            200: { value: "#64BEE2" },
            300: { value: "#2598C6" },
            400: { value: "#165D78" },
            500: { value: "#08212B" },
            600: { value: "#061A22" },
            700: { value: "#05141A" },
            800: { value: "#030D11" },
            900: { value: "#020709" },
            950: { value: "#010304" },
          },
          white: { value: "#FAFAFA" },
          black: { value: "#0D0D0D" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",

  layers: {
    reset: "panda_reset",
    base: "panda_base",
    tokens: "panda_tokens",
    recipes: "panda_recipes",
    utilities: "panda_utilities",
  },
});
