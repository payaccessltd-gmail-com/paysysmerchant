/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./app/**/*.{js,ts,jsx,tsx}",
  "./src/**/*.{js,jsx,ts,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  theme: {
    extend: {
      colors:{
        primary:'#00acef',
        secondary: '#F5801F'
      },
      fontFamily: {
        'sfpro-regular': ['SF Pro Display Regular', 'sans'],
        'sfpro-ultralight-italic': ['SF Pro Display Ultralight Italic', 'sans'],
        'sfpro-thin-italic': ['SF Pro Display Thin Italic', 'sans'],
        'sfpro-light-italic': ['SF Pro Display Light Italic', 'sans'],
        'sfpro-medium': ['SF Pro Display Medium', 'sans'],
        'sfpro-bold': ['SF Pro Display Bold', 'sans'],
        'sfpro-heavy-italic': ['SF Pro Display Heavy Italic', 'sans'],
        'sfpro-black-italic': ['SF Pro Display Black Italic', 'sans'],
        // 'Helvetica':['Helvetica Neue', 'sans']
      },
      zIndex: {
        '60': 60,
        '70': 70,
        // Add more as needed
      },
    },
  },
  plugins: [],
}

