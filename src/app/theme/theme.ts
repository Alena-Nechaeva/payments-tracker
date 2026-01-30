import { createTheme } from '@mui/material/styles';
import { Poppins } from 'next/font/google';

export const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap'
});

export const whiteColor = '#FFF';
export const blackColor = '#000';
// const darkColor = "208, 212, 241";

const theme = createTheme({
  palette: {
    common: {
      black: blackColor,
      white: whiteColor
    },
    primary: {
      light: '#f489ba',
      main: '#d6699b',
      dark: '#c55488',
      contrastText: whiteColor
    },
    secondary: {
      light: '#8cd4f3',
      main: '#78c3e3',
      dark: '#5ca4c3',
      contrastText: whiteColor
    },
    error: {
      light: '#ED6F70',
      main: '#EA5455',
      dark: '#CE4A4B',
      contrastText: whiteColor
    },
    warning: {
      light: '#FFAB5A',
      main: '#FF9F43',
      dark: '#E08C3B',
      contrastText: whiteColor
    },
    info: {
      light: '#1FD5EB',
      main: '#00CFE8',
      dark: '#00B6CC',
      contrastText: whiteColor
    },
    success: {
      light: '#3B9D64',
      main: '#219653',
      dark: '#1C7E46',
      contrastText: whiteColor
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161'
    }
  },
  typography: {
    fontFamily: `${poppins.style.fontFamily}, sans-serif`
  }
});

export default theme;
