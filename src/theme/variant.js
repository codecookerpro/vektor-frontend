import { grey } from '@material-ui/core/colors';

const variant = {
  name: 'BLUE',
  palette: {
    type: 'light',
    primary: {
      main: '#5A83BB',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#5A83BB',
      contrastText: '#FFF',
    },
    background: {
      default: '#F7F9FC',
      paper: '#FFF',
    },
  },
  header: {
    color: grey[500],
    background: '#FFF',
    search: {
      color: grey[800],
    },
    indicator: {
      background: '#5A83BB',
    },
  },
  footer: {
    color: grey[500],
    background: '#FFF',
  },
  sidebar: {
    color: '#FFF',
    background: '#5A83BB',
    header: {
      color: '#FFF',
      background: '#5A83BB',
      brand: {
        color: '#FFFFFF',
      },
    },
    footer: {
      color: '#FFF',
      background: '#5A83BB',
      online: {
        background: '#FFF',
      },
    },
    badge: {
      color: '#000',
      background: '#FFF',
    },
  },
  custom: {
    palette: {
      white: '#ffffff',
      blue: '#7aa3d0',
      greyWhite: '#f7f9fc',
      grey: '#e0e0e0',
      lightGreen: '#a6b884',
      red: '#d32f2f',
      black: '#000000',
      border: '#f1f0f2',
    },
  },
};

export default variant;
