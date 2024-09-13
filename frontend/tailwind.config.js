/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'Fredericka-the-Great': ["'Fredericka the Great'"],
      },
      daisyui: {
        themes: ["light"],
      },
    },
  },
  plugins: [require("daisyui"),
    require('tailwind-scrollbar'),
  ],
};
