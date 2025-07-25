// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,}", // Make sure Tailwind scans your files
  ],
  theme: {
    extend: {
      colors: {
        'color-96ac35': '#96ac35',
      },
    },
  },
  plugins: [],
}
