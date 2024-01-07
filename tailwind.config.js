/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue,ts}'],
  theme: {
    extend: {
      colors: {
        'table-border-light': '#C7C7CB',
        'table-border-dark': '#4D4D4D',
        'nav-bar-back': '#5A5C5D',
        'base-black': '#222527',
        'base-red': '#EB5545',
        'base-white': '#DEDEDE',
        'current-date-bg-dark': '#2A2C2D',
        'current-date-bg-light': '#F5F5F5',
        'nav-grey': '#E6E6E6'
      }
    }
  },
  plugins: []
}
