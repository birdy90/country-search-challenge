import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: colors.purple,
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
