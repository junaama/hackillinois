module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      blue: {
        bold: "#1f6ff9",
        darkest: "#09215b",
      },
      red: {
        bold: "#fa6060",
        deeper: "#f93939"
      },
      purple: {
        lightest: "#cabfd0",
        normal: "#52539b",
        darker: "#424c95"
      }
    },
    //extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
