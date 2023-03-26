import RalewayWoff2 from "./fonts/Raleway-Regular.woff2";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const theme = createTheme({
  typography: {
    fontFamily: "Raleway, Arial",
  },
});
