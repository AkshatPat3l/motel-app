const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    colors:{
      'knights-purple':'#5e267f'
    },
    extend: {},
  },
  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
};
