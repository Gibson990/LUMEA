/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lumea: {
          bg: '#FFF8FA',
          primary: '#D96C8A',
          primaryHover: '#c45775',
          dark: '#2B2024',
          muted: '#6e5f65',
          softPink: '#F4D8DF',
          dustyRose: '#C78A98',
          accent: '#E8A5B5'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
