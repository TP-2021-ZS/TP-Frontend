import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
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
import { mainListItems, secondaryListItems } from '../../Layout/components/LeftNavbar/listItems';
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {LOGGED, NOT_LOGGED} from "../../constants";
import AuthorityComponent from "../../components/AuthorityComponent/AuthorityComponent";
import WelcomeComponet from "../../Layout/components/Welcome/WelcomeComponent";
import ProjectTable from "../../Layout/components/ProjectTable/ProjectTable";
import {Link} from "react-router-dom";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";



const logout = (e) => {
    e.preventDefault();
    window.location.assign('/login');
    localStorage.clear();
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
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
        MuiLink: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        color: "#E5C604 !important",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
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
        "&:hover": { color: "#151515"
        },
    }
}));

function AllProjectsContent() {
    const [projectName, setProjectName] = useState('');
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const classes = useStyles();

    // USERS DATA
    //const [user, setUser] = useState("");
    const [projects, setProjects] = useState([]);

    useEffect(() => {
      axios.get('/api/projects', {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        }
      })
          .then((response) => setProjects(
              response.data))
          .catch((error) => console.log(error));
    },[]);

    if (projects.length > 0) {
        return (
            <ThemeProvider theme={theme}>
                <Box sx={{backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto', display: 'flex' }}>
                    <CssBaseline>
                        <AuthorityComponent roles={LOGGED}>
                            <AppBar position="absolute" open={open}>
                                <Toolbar
                                    sx={{
                                        pr: '24px',
                                    }}
                                >
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={toggleDrawer}
                                        sx={{
                                            marginRight: '36px',
                                            ...(open && { display: 'none' }),
                                        }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography
                                        component="h1"
                                        variant="h6"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                    >
                                        Projekty
                                    </Typography>
                                    <IconButton className={classes.customHoverFocus} component={Link} to="/help" color="inherit">
                                        <HelpOutlineIcon />
                                    </IconButton>
                                    <IconButton  onClick={logout} color="inherit">
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
                                    <Divider sx={{ my: 1 }} />
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
                                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                                    <Grid container spacing={3}>
                                        {/* Recent Orders */}
                                        <Grid item xs={12}>
                                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: '84vh' }}>
                                                <ProjectTable projects={projects} setProjects={setProjects} />
                                            </Paper>
                                        </Grid>
                                    </Grid>

                                </Container>
                            </Box>
                        </AuthorityComponent>
                        <AuthorityComponent roles={NOT_LOGGED}>
                            <WelcomeComponet/>
                        </AuthorityComponent>
                    </CssBaseline>
                </Box>
            </ThemeProvider>
        );
    }else{
        return (
            <ThemeProvider theme={theme}>
                <Box sx={{backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto', display: 'flex' }}>
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
                                            ...(open && { display: 'none' }),
                                        }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography
                                        component="h1"
                                        variant="h6"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                    >
                                        Projekty
                                    </Typography>
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
                                    <Divider sx={{ my: 1 }} />
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
                                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                                    <Grid container spacing={3}>
                                        {/* Recent Orders */}
                                        <Grid item xs={12}>
                                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: '84vh' }}>
                                                <Typography variant="h4" textAlign="center" style={{ marginTop: 10 , marginBottom: 16 }}>
                                                    Doposiaľ nebol vytvorený žiadny projekt
                                                </Typography>
                                                <Box textAlign="center">
                                                    <Button
                                                        type="submit"
                                                        color="primary"
                                                        variant="contained"
                                                        justify="center"
                                                        sx={{ mt: 3, mb: 2, fontSize:20}}
                                                        component={Link} to="/addproject"
                                                    >
                                                        Vytvoriť projekt
                                                    </Button>
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

}

export default function AllProjects() {
    return <AllProjectsContent />;
}