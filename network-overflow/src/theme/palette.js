import { colors } from "@material-ui/core";

const white = "#FFFFFF";
const black = "#000000";

const blue = "#003893";
const red = "#DC143C";

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: colors.red[800],
    // main: colors.red[500],
    main: "#e53935",
    light: colors.red[100]
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue["A400"],
    light: colors.blue["A400"]
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    // primary: colors.blueGrey[900],
    primary: white,
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  background: {
    default: "#F4F6F8",
    paper: white
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200]
};
