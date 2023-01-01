// import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'

import { createTheme, responsiveFontSizes } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#228CD9", //Blue
      light: "#e3edf5", // light blue
      text: "#000000",
      secondaryText: "#808080", //grey text
      secondary: "#D4D4D4", //grey
      table: "#8CC1E8",
    },
    success: {
      main: "#64CC34",
      dark: "#3d7d20",
      light: "#96d57a",
    },
    error: {
      main: "#E74C3C",
      dark: "#a51d0f",
      light: "#f57f73",
    },
    info: {
      main: "#3498DB",
    },
    warning: {
      main: "#FBA75A",
    },
    paper: {
      main: "#fff",
    },
    grey: {
      light: "#F7F7F8",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontSize: 13,
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#E74C3C",
          "&$error": {
            color: "#db3131",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        backgroundColor: "#000",
      },
    },
    MuiButtonBaseRoot: {
      styleOverrides: {
        width: 100,
      },
    },
  },
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  light: responsiveFontSizes(lightTheme),
};
