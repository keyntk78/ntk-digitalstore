/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js, jsx, ts, tsx}', './public/index.html'],
  theme: {
    fontFamily: {
      main: ['Poppins', 'sans-serif'],
    },
    extend: {
      width: {
        main: '1220px',
      },
      backgroundColor: {
        main: '#0a68ff',
        secondary: '#f4f4f4',
      },
      colors: {
        main: '#0a68ff',
      },
      keyframes: {
        'slide-top': {
          '0% ': {
            '-webkit-transform': 'translateY(40px)',
            transform: 'translateY(20px)',
          },
          '100%': {
            '-webkit-transform': 'translateY(0)',
            transform: 'translateY(0)',
          },
        },
        'slide-bottom': {
          '0% ': {
            '-webkit-transform': 'translateY(0)',
            transform: 'translateY(0)',
          },
          '100%': {
            '-webkit-transform': 'translateY(40px)',
            transform: 'translateY(40px)',
          },
        },
      },
      animation: {
        'slide-top':
          'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-bottom':
          'slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
