import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
      "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
      "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe",
      "black", "luxury", "dracula"
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
