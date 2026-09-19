/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#5b2119',
          dark: '#35120e',
        },
        brick: '#833220',
        clay: '#bd8572',
        ivory: '#f4efe9',
        white: '#FFE600',
        gold: {
          DEFAULT: '#c9a45b',
          light: '#e6cb8c',
        },
        coal: '#2b2421',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
      letterSpacing: {
        'ultra-wide': '.28em',
        'wide-plus': '.18em',
      },
      keyframes: {
        rotateOrbit: {
          'to': {
            transform: 'rotate(360deg)',
          },
        },
      },
    },
  },
  plugins: [],
}
