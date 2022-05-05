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
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {useState} from "react";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {LOGGED, NOT_LOGGED} from "../../constants";
import AuthorityComponent from "../../components/AuthorityComponent/AuthorityComponent";
import WelcomeComponet from "../../Layout/components/Welcome/WelcomeComponent";
import DoneIcon from '@mui/icons-material/Done';
import {makeStyles} from "@material-ui/core/styles";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {Link} from "react-router-dom";




const logout = (e) => {
    e.preventDefault();

    //navigate(routes.index);
    window.location.assign('/login');
    localStorage.clear();
    //window.location.reload();
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
        "&:hover": { color: "#151515"
        },
    }
}));


function AccountSettingsContent() {
    const [projectName, setProjectName] = useState('');
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const classes = useStyles();

    const [errPassword, setErrPassword] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const handleEdit = (e) => {
        console.log(e)
        e.preventDefault();
        // DOBUDUCNA MOZNE NASTAVIT STRIKTNEJSIE PRAVIDLA
        //const validPassword = new RegExp(
        //    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
        //);
        //if (validPassword.test(password)) {
        if (password===password2 && password.length>=8){
            setPassword('');
            setPassword2('');
            setErrPassword('');
            setPasswordMessage('Heslo úspešne zmenené.');
        }
        else{
            setErrPassword('')
            setPasswordMessage('')
            if (password.length<8){
                setErrPassword('Heslo musí mať dĺžku aspoň 8 znakov.');
            }
            if (password!=password2){
                setErrPassword('Heslá sa musia zhodovať.');
            }
            if (password.length<8 && password!=password2){
                setErrPassword('Heslo musí mať dĺžku aspoň 8 znakov. Heslá sa musia zhodovať.');
            }

        }
    };

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
                                    Nastavenia účtu
                                </Typography>
                                <IconButton className={classes.customHoverFocus} component={Link} to="/help" color="inherit">
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
                                            <Typography variant="h6" style={{ fontWeight: 600, marginBottom: 16 }}>
                                                Upraviť prihlasovacie údaje
                                            </Typography>
                                            <Box
                                                component="form"
                                                sx={{
                                                    '& .MuiTextField-root': { mt: 1 },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <Typography variant="body2" style={{ fontWeight: 600, marginBottom: 5 }}>
                                                    HESLO
                                                </Typography>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={8}>
                                                        <TextField
                                                            id="password"
                                                            type="password"
                                                            label="Zadajte nové heslo"
                                                            defaultValue={password}
                                                            fullWidth
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <TextField
                                                            id="password"
                                                            type="password"
                                                            label="Zadajte nové heslo znova"
                                                            defaultValue={password2}
                                                            fullWidth
                                                            value={password2}
                                                            onChange={(e) => setPassword2(e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            sx={{ mt: 2, mb: 2 }}
                                                            onClick={handleEdit}
                                                        >
                                                            Aktualizovať heslo
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                                <Typography
                                                    variant="body2"
                                                    color="danger.main"
                                                    sx = {{ mt: 1, ml: 1}}
                                                >
                                                    {errPassword}
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    color="primary.main"
                                                    sx = {{ mt: 1, ml: 1}}
                                                >
                                                    <DoneIcon sx={{marginRight: 3, display: passwordMessage != ''? 'inline': 'none'}}/>{passwordMessage}
                                                </Typography>
                                            </Box>
                                            <Divider light style={{ marginTop: 12, marginBottom: 12 }}/>

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

export default function AccountSettings() {
    return <AccountSettingsContent />;
}