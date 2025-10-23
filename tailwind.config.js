/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#003A70', // Dark blue from MoneyMart
          dark: '#002347',
          light: '#0052A3',
        },
        accent: {
          DEFAULT: '#E31837', // Red accent from MoneyMart
          dark: '#C11530',
          light: '#FF3850',
        },
        navy: {
          DEFAULT: '#0A1E42',
          dark: '#050F21',
          light: '#1A3A6B',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
