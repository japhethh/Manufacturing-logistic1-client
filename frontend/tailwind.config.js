/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      blueberry: '#202564', // navbar backround, button, 
      luminescent:'#F5F6FF' // main bg 
    },
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
