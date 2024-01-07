/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue,ts}'],
  theme: {
    extend: {
      colors: {
        'base-table-border': '#4D4D4D',
        'nav-bar-back': '#5A5C5D',
        'base-black': '#222527',
        'base-red': '#EB5545',
        'base-white': '#DEDEDE',
        'current-date-bg': '#2A2C2D'
      }
    }
  },
  plugins: []
}
