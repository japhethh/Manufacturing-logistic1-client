/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'Fredericka-the-Great': ["'Fredericka the Great'"],
        'Open-Sans': ["'Open Sans'"],
        'Roboto': ["'Roboto'"],
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
