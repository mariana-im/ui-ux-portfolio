/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-[#FFF7F1]',
    'text-[#FFF7F1]',
    'text-[#FF0080]',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
