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
    secondary: '#3d3d3d',
    background: '#1c1c1c',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  components: {
    Text: () => ({
      style: {
        fontFamily: FONTS.INTER,
      },
    }),
  },
});
