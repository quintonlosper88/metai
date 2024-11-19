/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B00",
        secondary: "#1A1A1A",
        accent: "#FF6B00",
        neutral: "#2A2A2A",
        "base-100": "#1A1A1A",
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#FF6B00",
          "secondary": "#1A1A1A",
          "accent": "#FF6B00",
          "neutral": "#2A2A2A",
          "base-100": "#1A1A1A",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
}