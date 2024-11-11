/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'icon-white': '#ffffff',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
      addUtilities({
        '.icon-white': {
          filter: 'brightness(0) invert(1) contrast(50)',
        },
        '.icon-white-filled': {
          filter: 'brightness(0) invert(1) contrast(100)', // Makes it solid white
        },
      });
    }),
  ],
} satisfies Config;
