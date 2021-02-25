import { grey } from "@material-ui/core/colors";

const customBlue = {
  50: "#e9f0fb",
  100: "#c8daf4",
  200: "#a3c1ed",
  300: "#7ea8e5",
  400: "#6395e0",
  500: "#4782da",
  600: "#407ad6",
  700: "#376fd0",
  800: "#2f65cb",
  900: "#2052c2 ",
};

const variant = {
  name: 'BLUE',
  palette: {
    type: "light",
    primary: {
      main: customBlue[700],
      contrastText: "#FFF",
    },
    secondary: {
      main: customBlue[500],
      contrastText: "#FFF",
    },
    background: {
      default: "#F7F9FC",
      paper: "#FFF",
    },
  },
  header: {
    color: grey[500],
    background: "#FFF",
    search: {
      color: grey[800],
    },
    indicator: {
      background: customBlue[600],
    },
  },
  footer: {
    color: grey[500],
    background: "#FFF",
  },
  sidebar: {
    color: "#FFF",
    background: customBlue[700],
    header: {
      color: "#FFF",
      background: customBlue[800],
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: customBlue[800],
      online: {
        background: "#FFF",
      },
    },
    badge: {
      color: "#000",
      background: "#FFF",
    },
  },
  custom: {
    palette: {
      white: '#ffffff',
      greyWhite: '#f7f9fc',
      grey: '#e0e0e0',
      black: '#000000',
      lightGreen: '#a6b884',
      border: '#f1f0f2'
    },
  }
};

export default variant;
