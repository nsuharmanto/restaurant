import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Nunito', 'Arial', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    colors: {
      ...colors, // <-- merge semua warna default Tailwind!
      primary: '#C12116',
      accent: {
        pink: '#D9206E',
        green: '#079455',
        yellow: '#FDB022',
      },
      success: '#079455',
      warning: '#FDB022',
      // custom gray override jika ingin
      gray: {
        50: '#FDFDFD',
        100: '#FAFAFA',
        200: '#F5F5F5',
        300: '#E9EAEB',
        400: '#D5D7DA',
        500: '#A4A7AE',
        600: '#717680',
        700: '#535862',
        800: '#414651',
        900: '#252B37',
        950: '#181D27',
      },
      white: '#ffffff',
    },
    extend: {
      borderRadius: {
        none: '0px',
        xxs: '2px',
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '10px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
        full: '9999px',
      },
      spacing: {
        none: '0px',
        xxs: '2px',
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '40px',
        '6xl': '48px',
        '7xl': '64px',
        '8xl': '80px',
        '9xl': '96px',
        '10xl': '128px',
        '11xl': '140px',
      },
    },
  },
  plugins: [],
};