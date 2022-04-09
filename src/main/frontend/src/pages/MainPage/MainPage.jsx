import React from "react";
import "./mainPage.scss";
import AuthorityComponent from "../../components/AuthorityComponent/AuthorityComponent";
import {LOGGED, NOT_LOGGED} from "../../constants";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/raleway"; //npm install @fontsource/raleway
import WelcomeComponet from "../../Layout/components/Welcome/WelcomeComponent";
import AllProjects from "../AllProjects/AllProjects";

// Or Create your Own theme:
const theme = createTheme({
  palette: {
    secondary: {
      main: '#E5C604'
    },
    primary: {
      main: '#E5C604',
    },
    dark: {
      main: '#E5C604'
    },
    danger: {
      main: '#d76811'
    },
    textBasic: {
      main: '#646464'
    },
    textLight: {
      main: '#9f9f9f'
    }

  },
  typography: {
    fontFamily: 'Raleway',
  },
  components: {

    // Name of the component
    MuiLink: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          "&:hover": {
            color: "#E5C604 !important",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          "&:hover": {
            color: "#E5C604 !important",
          },
        },
      },
    },
  },

});



const MainPage = () => (
    <ThemeProvider  theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <AuthorityComponent roles={LOGGED}>
          <AllProjects></AllProjects>


        </AuthorityComponent>
        <AuthorityComponent roles={NOT_LOGGED}>
          <WelcomeComponet></WelcomeComponet>


        </AuthorityComponent>
      </Grid>
    </ThemeProvider >
);

export default MainPage;