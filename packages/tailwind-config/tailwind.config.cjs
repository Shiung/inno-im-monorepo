/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/ui/**/*.{html,js,svelte,ts}',
    './node_modules/library/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
