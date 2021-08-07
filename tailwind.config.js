const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: 'true',
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      colors: {
        teal: colors.teal,
        rose: colors.rose,
        'light-blue': colors.lightBlue,
        lime: colors.lime,
        cyan: colors.cyan,
      },
      spacing: {
        112: '28rem'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
