import { createTheme } from '@rneui/themed';

import { FONTS } from '@/constants/fonts';

export const theme = createTheme({
  lightColors: {
    primary: '#A3B18A',
    secondary: '#ECE5DA',
    background: '#F6F3EE',
  },
  darkColors: {
    primary: '#A3B18A',
    secondary: '#ECE5DA',
    background: '#1c1c1c',
  },
  components: {
    Text: () => ({
      style: {
        fontFamily: FONTS.INTER,
      },
    }),
  },
  mode: 'light',
});
