import { createTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';
import { UI_CONFIGS } from 'src/configs/constants';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F4F6F8',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: '#5664d2'
    },
    secondary: {
      main: '#16a085'
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c'
    }
  },
  shadows,
  typography
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      contrastText: '#ffffff',
      main: '#5664d2'
    },
    secondary: {
      main: '#16a085'
    }
  },
  shadows,
  typography
});

export const getTheme = (themeType) => {
  switch (themeType) {
    case UI_CONFIGS.THEME_TYPE.light:
      return lightTheme;
    case UI_CONFIGS.THEME_TYPE.dark:
      return darkTheme;
    default:
      return lightTheme;
  }
};
