module.exports = {
  darkMode: 'media',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      width: {
        '70': '16rem',
        '76': '19rem',
      },
      fontFamily: {
        'titles': ['Cormorant'],
        'body': ['Wittgenstein'],
      },
      backgroundImage: {
        'white-rose': "url('/img/white-rose.jpg')",
        'red-rose': "url('/img/red-rose.jpg')",
        'roses': "url('/img/bouquet.jpg')",
      },

    },
  },
  plugins: [],
}