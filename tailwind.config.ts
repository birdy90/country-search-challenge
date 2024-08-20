import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      white: colors.white,
      black: colors.black,
      red: colors.red,
      gray: colors.gray,
      primary: colors.blue,
    },
    extend: {
      fontSize: {
        default: '1rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
