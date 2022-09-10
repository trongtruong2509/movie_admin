/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         colors: {
            primary: "#3498DB",
            "primary-light": "#5DADE2",
            "primary-dark": "#2874A6",
            second: "#F1F1F1",
            "hover-1": "rgba(214, 234, 248,0.5)",
         },
      },
   },
   plugins: [],
};
