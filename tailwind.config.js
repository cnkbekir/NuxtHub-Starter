module.exports = {
  purge: ['./app/**/*.vue', './app/**/*.ts'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
        accent: '#657786',
        background: '#E1E8ED',
        border: '#AAB8C2',
        hover: '#E8F5FE',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
