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
import {useState, useEffect} from "react";
import ShowWebsites from "../../Layout/components/ShowWebsites/ShowWebsites"
import ShowDictionary from "../../Layout/components/ShowDictionary/ShowDictionary"
import ShowUsers from "../../Layout/components/ShowUsers/ShowUsers"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShowBlacklist from "../../Layout/components/ShowBlacklist/ShowBlacklist";
import ShowAdditionalSettings from "../../Layout/components/ShowAdditionalSettings/ShowAdditionalSettings";
import {NOT_LOGGED, LOGGED} from "../../constants";
import AuthorityComponent from "../../components/AuthorityComponent/AuthorityComponent";
import WelcomeComponet from "../../Layout/components/Welcome/WelcomeComponent";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {makeStyles} from "@material-ui/core/styles";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {Link} from "react-router-dom";


const logout = (e) => {
    e.preventDefault();
    window.location.assign('/login');
    localStorage.clear();
}

const back = (e) => {
    e.preventDefault();
    localStorage.removeItem('editedProjectID');
    window.location.assign('/allprojects');
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

function EditProjectContent() {
    const classes = useStyles();
    const [projectName, setProjectName] = useState('Projekt 1');
    const [open, setOpen] = React.useState(true);

    // PROJECT
    const [projectID, setProjectID] = useState('');
    const [projectState, setProjectState] = useState('Aktívny');
    //const [projectState, setProjectState] = useState('Pozastavený');

    // WEBSITES DATA
    const [website, setWebsite] = useState("");
    const [websitesList, setWebsitesList] = useState([]);
    const [errWebsites, setErrWebsites] = useState('');
    const [addedWebsites, setAddedWebsites] = React.useState(websitesList.slice());

    // DICTIONARY AND RATING DATA
    const [word, setWord] = useState("");
    const [rating, setRating] = useState("");
    const [dictionaryList, setDictionaryList] = useState([]);
    const [dictionaryWords, setDictionaryWords] = React.useState(dictionaryList.slice());
    const [errDictionaryW, setErrDictionaryW] = useState('');
    const [errDictionaryR, setErrDictionaryR] = useState('');

    // USERS DATA
    const [user, setUser] = useState("");
    const [emailAddresses, setEmailAddresses] = useState([]);
    const [addedEmails, setAddedEmails] = React.useState(emailAddresses.slice());
    const [errUser, setErrUser] = useState('');

    // FORBIDDEN WEBSITES
    const [websiteForbidden, setWebsiteForbidden] = useState("");
    const [blackList, setBlackList] = useState([]);
    const [forbiddenList, setForbiddenList] = React.useState(blackList.slice());
    const [errForbidden, setErrForbidden] = useState('');

    // ADDITIONAL SETTINGS
    const [reportType, setReportType] = React.useState("");

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleSubmitProject = (e) => {
        localStorage.removeItem('editedProjectID');
    }

    const validateForm = () => {
        return (!addedWebsites.length && !dictionaryWords.length && !addedEmails.length && !forbiddenList.length);
    }


    const [checked, setChecked] = useState( );

    useEffect(() => {
        if (projectState === 'Aktívny') {
            setChecked(true);
        }else{
            setChecked(false);
        }
    }, []);
    console.log(checked);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (projectState === 'Aktívny'){
            setProjectState('Pozastavený');
        }else{
            setProjectState('Aktívny');
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
                                    Editovanie projektu
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
                                            <Box>
                                                <IconButton onClick={back} sx={{backgroundColor: "#e3e3e3"}}>
                                                    <ChevronLeftIcon />
                                                </IconButton>
                                            </Box>
                                            <Box component="form" noValidate onSubmit={handleSubmitProject} sx={{ mt: 1 }}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={9}>
                                                        <TextField id="projectName"
                                                                   value={projectName}
                                                                   type="text"
                                                                   onChange={(e) => setProjectName(e.target.value)}
                                                                   placeholder="Názov projektu" variant="standard"
                                                                   InputProps={{style: {fontSize: 40}, disableUnderline: true}} // font size of input text
                                                                   InputLabelProps={{style: {fontSize: 40}}}
                                                            // font size of input label>
                                                        >
                                                        </TextField>
                                                    </Grid>
                                                    <Grid item xs={3} >
                                                        <FormControlLabel
                                                            component="fieldset"
                                                            variant="standard"
                                                            style={{marginTop: 18}}
                                                            control = {<Switch
                                                                checked={checked}
                                                                onChange={handleChange}
                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                            />}
                                                            label={projectState}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Divider light style={{ marginTop: 12, marginBottom: 12 }}/>
                                                <ShowWebsites website={website} addedWebsites={addedWebsites} setWebsite={setWebsite} setAddedWebsites={setAddedWebsites} websitesList={websitesList} setWebsitesList={setWebsitesList} errWebsites={errWebsites} setErrWebsites={setErrWebsites}/>
                                                <Divider light style={{ marginTop: 12, marginBottom: 12 }}/>
                                                <ShowDictionary word={word} setWord={setWord} rating={rating} setRating={setRating} dictionaryWords={dictionaryWords} setDictionaryWords={setDictionaryWords} dictionaryList={dictionaryList} setDictionaryList={setDictionaryList} errDictionaryW={errDictionaryW} setErrDictionaryW={setErrDictionaryW} errDictionaryR={errDictionaryR} setErrDictionaryR={setErrDictionaryR}/>
                                                <Divider light style={{ marginTop: 12, marginBottom: 12 }}/>
                                                <ShowUsers user={user} setUser={setUser} addedEmails={addedEmails} setAddedEmails={setAddedEmails} emailAddresses={emailAddresses} setEmailAddresses={setEmailAddresses} errUser={errUser} setErrUser={setErrUser}/>
                                                <Divider light style={{ marginTop: 12, marginBottom: 12 }}/>
                                                <ShowBlacklist websiteForbidden={websiteForbidden} setWebsiteForbidden={setWebsiteForbidden} blackList={blackList} setBlackList={setBlackList} forbiddenList={forbiddenList} setForbiddenList={setForbiddenList} errForbidden={errForbidden} setErrForbidden={setErrForbidden}/>
                                                <Divider light style={{ marginTop: 12, marginBottom: 12 }}/>
                                                <ShowAdditionalSettings reportType={reportType} setReportType={setReportType}/>
                                                <Box textAlign="center">
                                                    <Button
                                                        type="submit"
                                                        color="primary"
                                                        variant="contained"
                                                        justify="center"
                                                        sx={{ mt: 3, mb: 2, fontSize:20}}
                                                        disabled={validateForm()}
                                                    >
                                                        Aktualizovať
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

export default function EditProject() {
    return <EditProjectContent />;
}