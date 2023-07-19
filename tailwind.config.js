module.exports = {
  content: ["./src/**/*.{html,ts,css,scss,sass,less,style}"],
  theme: {
    extend: {
      colors: {
        "color-dark": "var(--color-dark)",
        "color-light": "var(--color-light)",
        "color-primary": "var(--color-primary)",
        "color-stroke": "var(--color-stroke)",
        "color-cancel": "var(--color-cancel)",
      },
    },
  },
  plugins: [],
};
