import * as React from 'react';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  mainListItems,
  secondaryListItems
} from '../../Layout/components/LeftNavbar/listItems';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import ShowWebsites from "../../Layout/components/ShowWebsites/ShowWebsites"
import ShowDictionary
  from "../../Layout/components/ShowDictionary/ShowDictionary"
import ShowUsers from "../../Layout/components/ShowUsers/ShowUsers"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShowBlacklist from "../../Layout/components/ShowBlacklist/ShowBlacklist";
import ShowAdditionalSettings
  from "../../Layout/components/ShowAdditionalSettings/ShowAdditionalSettings";
import {LOGGED, NOT_LOGGED} from "../../constants";
import AuthorityComponent
  from "../../components/AuthorityComponent/AuthorityComponent";
import WelcomeComponet from "../../Layout/components/Welcome/WelcomeComponent";
import {makeStyles} from "@material-ui/core/styles";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {Link} from "react-router-dom";
import axios from "axios";
import routes from "../../routing/routes";
import {useNavigate} from "react-router";
import ShowKeywords from "../../Layout/components/ShowKeywords/ShowKeywords";

const logout = (e) => {
  e.preventDefault();
  window.location.assign('/login');
  localStorage.clear();
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer,
    {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
);

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
    },
    buttonLight: {
      main: '#e3e3e3'
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

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    color: "#151515",
    "&:hover": {
      color: "#151515"
    },
  }
}));

function AddNewProjectContent() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [project, setProject] = React.useState({
    title: null,
    active: false,
    webpages: null,
    dict: null,
    usersEmail: null,
    forbiddenWebpages: null,
    dateAfter: 'MONTH',
  });
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const updateField = (fieldName, value) => {
    setProject(prevState => ({...prevState, [fieldName]: value}));
  }
  const handleSubmitProject = (e) => {
    e.preventDefault();
    const bodyFormData = new FormData();
    project.webpages.forEach((item) => {
      bodyFormData.append('webpages[]', item);
    });
    bodyFormData.append('title', project.title);
    bodyFormData.append('active', project.active);
    bodyFormData.append('dateAfter', project.dateAfter);

    project.usersEmail.forEach((item) => {
      bodyFormData.append('usersEmail[]', item);
    });
    project.forbiddenWebpages.forEach((item) => {
      bodyFormData.append('forbiddenWebpages[]', item);
    });
    project.keywords.forEach((item) => {
      bodyFormData.append('keywords[]', item);
    });
    project.dict.forEach((item, index) => {
      bodyFormData.append('dict[' + index + '].word', item.word);
      bodyFormData.append('dict[' + index + '].rating', item.rating);
    });

    axios.post('/api/project', bodyFormData, {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      }
    })
        .then(() => {
          navigate(routes.allprojects)
        })
        .catch(() => {
          console.log("Niečo sa pokazilo");
        });

  }

  const validateForm = () => {
    if ((!project.webpages || !project.dict || !project.keywords
        || !project.usersEmail || !project.forbiddenWebpages
        || !project.dateAfter || !project.title) === false) {
      return (!project.webpages.length > 0 || !project.dict > 0
          || !project.usersEmail > 0 || !project.forbiddenWebpages > 0
          || !project.keywords > 0 )
    } else {
      return true
    }
  }

  return (
      <ThemeProvider theme={theme}>
        <Box sx={{
          backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto', display: 'flex'
        }}>
          <CssBaseline>
            <AuthorityComponent roles={LOGGED}>
              <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                      pr: '24px', // keep right padding when drawer closed
                    }}
                >
                  <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="open drawer"
                      onClick={toggleDrawer}
                      sx={{
                        marginRight: '36px',
                        ...(open && {display: 'none'}),
                      }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography
                      component="h1"
                      variant="h6"
                      color="inherit"
                      noWrap
                      sx={{flexGrow: 1}}
                  >
                    Vytvoriť nový projekt
                  </Typography>
                  <IconButton className={classes.customHoverFocus}
                              component={Link} to="/help" color="inherit">
                    <HelpOutlineIcon />
                  </IconButton>
                  <IconButton onClick={logout} color="inherit">
                    <ExitToAppIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
              <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      px: [1],
                    }}
                >
                  <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                  </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                  {mainListItems}
                  <Divider sx={{my: 1}} />
                  {secondaryListItems}
                </List>
              </Drawer>
              <Box
                  component="main"
                  sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                  }}
              >
                <Toolbar />
                <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Paper sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '84vh'
                      }}>
                        <Box component="form" noValidate
                             onSubmit={handleSubmitProject} sx={{mt: 1}}>
                          <TextField id="projectName"
                                     value={project.title == null ? "" : project.title}
                                     type="text"
                                     onChange={({target}) => updateField(
                                         'title', target.value)}
                                     placeholder="Názov projektu"
                                     variant="standard"
                                     InputProps={{
                                       style: {fontSize: 40},
                                       disableUnderline: true
                                     }} // font size of input text
                                     InputLabelProps={{style: {fontSize: 40}}}

                          >
                          </TextField>
                          <Divider light
                                   style={{marginTop: 12, marginBottom: 12}} />
                          <ShowWebsites
                              project={project}
                              setProject={setProject}
                          />
                          <Divider light style={{
                            marginTop: 12,
                            marginBottom: 12
                          }} />
                          <ShowDictionary
                              project={project}
                              setProject={setProject}
                          />
                          <Divider light style={{
                            marginTop: 12,
                            marginBottom: 12
                          }} />
                          <ShowKeywords
                              project={project}
                              setProject={setProject}
                          />
                          <Divider light style={{
                            marginTop: 12,
                            marginBottom: 12
                          }} />
                          <ShowUsers
                              project={project}
                              setProject={setProject}
                          />
                          <Divider light style={{
                            marginTop: 12,
                            marginBottom: 12
                          }} />
                          <ShowBlacklist project={project}
                                         setProject={setProject} />
                          <Divider light style={{
                            marginTop: 12,
                            marginBottom: 12
                          }} />
                          <ShowAdditionalSettings onChange={({target}) => updateField(
                            'dateAfter', target.value)} dateAfter={project.dateAfter}/>
                          <Box textAlign="center">
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                justify="center"
                                sx={{mt: 3, mb: 2, fontSize: 20}}
                                disabled={validateForm()}
                            >
                              Vytvoriť projekt
                            </Button>
                          </Box>
                        </Box>

                      </Paper>
                    </Grid>
                  </Grid>

                </Container>
              </Box>
            </AuthorityComponent>
            <AuthorityComponent roles={NOT_LOGGED}>
              <WelcomeComponet></WelcomeComponet>
            </AuthorityComponent>
          </CssBaseline>
        </Box>
      </ThemeProvider>
  );
}

export default function AddNewProject() {
  return <AddNewProjectContent />;
}