import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1bbce4",
    },
    secondary: {
      main: "#f1b62b",
    },
    background: {
      default: "#07162d",
      paper: "#031531",
    },
    warning: {
      main: "#ff841e",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  transitions: {
    duration: {
      standard: 300,
    },
  },
});
