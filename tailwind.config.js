module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        myfont: ['Signika'], 
        myfont2: ['Radio Canada'], 
      }
    }, 
    container: {
      center: true, 
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
