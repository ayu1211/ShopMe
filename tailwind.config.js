/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
          'red-gradient': 'linear-gradient(90deg, rgba(235, 9, 9, 1) 0%, rgba(85, 29, 22, 1) 49%, rgba(232, 14, 14, 1) 100%)',
          'warm-gradient': 'linear-gradient(135deg, #ff4e50 0%, #f9d423 100%)',
        'cool-gradient': 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
        'pink-purple-gradient': 'linear-gradient(135deg, #ff7eb3 0%, #8e2de2 100%)',
          "modern-gradient": "linear-gradient(135deg, #ff5858 0%, #f09819 50%, #ff5858 100%)",
      } , 
       colors: {
        primaryRed: "#ff5858",
        secondaryOrange: "#f09819",
      },
    },
  },
  plugins: [],
}

