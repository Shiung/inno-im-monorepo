/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/ui/**/*.{js,svelte,ts}',
  ],
  presets: [
    require('./tailwind.present.cjs')
  ],
  plugins: []
};
