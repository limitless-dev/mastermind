const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'coin-border-Img': "url('../src/assets/coin_border.svg')",
        'guess-column-Img': "url('../src/assets/guessColumn.svg')",
        'result-column-Img': "url('../src/assets/resultColumn.svg')",
        'result-cover-Img': "url('../src/assets/sliderAnimation/1.png')",
        'board-Img': "url('../src/assets/board.svg')",
        'channelTag-Img': "url('../src/assets/channelTag.svg')",
        'possibleColors-Img': "url('../src/assets/possibleColors.svg')",
        'hintOK-Img': "url('../src/assets/hints/ok.svg')",
        'hintMisplaced-Img': "url('../src/assets/hints/misplaced.svg')",
        'dukeTroll-Img': "url('../src/assets/troll/duke_dancing.gif')",
      }

    },
  },
  plugins: [require('@tailwindcss/forms')],
};
