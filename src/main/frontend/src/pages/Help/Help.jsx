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
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {LOGGED, NOT_LOGGED} from "../../constants";
import AuthorityComponent from "../../components/AuthorityComponent/AuthorityComponent";
import WelcomeComponet from "../../Layout/components/Welcome/WelcomeComponent";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";




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



function HelpContent() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const classes = useStyles();

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
                                    N??vod
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
                                            <Typography
                                                variant="h6"
                                                color="inherit"
                                                sx={{fontWeight: 600}}
                                            >
                                                Vytvorenie projektu
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={2}
                                            >
                                                 Pre gerovanie reportov potrebujete ma?? zalo??en?? aspo?? jeden projekt. Vr??mci projektov sa m????ete orientova?? na vami zvolen?? t??mu, alebo preh??ad??va?? ??l??nky z rozli??n??ch odvetv??. Projekt zalo????te v ??asti "Vytvori?? projekt". Pre ka??d?? sekciu je potrebn?? vyplni?? ??daje.
                                            </Typography>
                                            <Divider light style={{ marginTop: 12, marginBottom: 12 }}/>
                                            <Typography
                                                variant="h6"
                                                color="inherit"
                                            >
                                                Prida?? webstr??nky
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={2}
                                            >
                                                Zoznam webstr??nok, ktor?? bud?? uprednostnen?? pre vyh??ad??vanie ??l??nkov. Zoznam m????ete vytvori?? prid??van??m str??nok, na????tan??m pripraven??ho zoznamu overen??ch str??nok. K t??mto str??nkam m????e doplni?? ??al??ie vami preferovan?? loaklity.
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={1}
                                            >
                                                Obmedzenia: Webov?? str??nky prid??vajte vo form??te http/https.
                                            </Typography>
                                            <Divider light style={{ marginTop: 12, marginBottom: 12 }}/>
                                            <Typography
                                                variant="h6"
                                                color="inherit"
                                            >
                                                Prida?? slovn??k a rating
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={2}
                                            >
                                                Zoznam slov alebo slovn??ch spojen??, ktor?? si ??el??te preh??ad??va?? v ??l??nkoch. Zoznam m????ete vytvori?? prid??van??m slovn??ch spojen?? a ratingov, alebo na????tan??m pripraven??ho zoznamu. Ka??d?? slovn?? spojenie mus?? ma?? pridelen?? rating (d??le??itos?? vr??mci vyh??ad??vania).
                                                Odpor????ame zo za??iatku nastavi?? rating na hodnotu 100 pre v??etky slovn?? spojenia.
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={1}
                                            >
                                                Obmedzenia: Slovn?? spojenia nesm?? obsahova?? ??peci??lne znaky. Rating m????e ma?? rozmedzie hodn??t od 0 do 100, pre prvotn?? nastavenie je vhodn?? nastavi?? hodnotu 100 pre v??etky slovn?? spojenia.
                                            </Typography>
                                            <Divider light style={{ marginTop: 12, marginBottom: 12 }}/>
                                            <Typography
                                                variant="h6"
                                                color="inherit"
                                            >
                                                Prida?? pou????vate??ov
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={2}
                                            >
                                                Zoznam e-mailov??ch adries pou????vate??ov, pre ktor??ch bude generovan?? report. Administr??tor je automaticky priraden?? do zoznamu.
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={1}
                                            >
                                                Obmedzenia: Adresa mus?? sp????a?? form??t e-mailov??ch adries.
                                            </Typography>
                                            <Divider light style={{ marginTop: 12, marginBottom: 12 }}/>
                                            <Typography
                                                variant="h6"
                                                color="inherit"
                                            >
                                                Prida?? zak??zan?? webstr??nky
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={2}
                                            >
                                                Zoznam webstr??nok, ktor?? bud?? zak??zan?? pri vyh??ad??van?? ??l??nkov (napr. z d??vodu neoveren??ch zdrojov alebo ??ast??ch hoaxov). Zoznam m????ete vytvori?? prid??van??m str??nok, alebo na????tan??m pripraven??ho zoznamu str??nok. K t??mto str??nkam m????e doplni?? ??al??ie webov?? loaklity, ktor?? pova??ujete za ned??veryhodn??.
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={1}
                                            >
                                                Obmedzenia: Webov?? str??nky prid??vajte vo form??te http/https.
                                            </Typography>
                                            <Divider light style={{ marginTop: 12, marginBottom: 12 }}/>
                                            <Typography
                                                variant="h6"
                                                color="inherit"
                                            >
                                                ??al??ie parametre
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={2}
                                            >
                                                Nastavenie frekvencie generovania reportov. Na z??klade vami zvolen??ho re??imu bud?? v??m a vami pridan??m pou????vate??om zasielan?? reporty ??l??nkov vo form??te CSV.
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={1}
                                            >
                                                Obmedzenia: Povinn?? zvoli?? re??im generovania reportov.
                                            </Typography>
                                            <Divider light style={{ marginTop: 12, marginBottom: 12 }}/>
                                            <Typography
                                                variant="h6"
                                                color="inherit"
                                                sx={{fontWeight: 600, mt: 4}}
                                            >
                                                Spravovanie projektov
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={2}
                                            >
                                                Po vytvoren?? projektu/ov m????ete v sekcii "Projekty" m????ete dodato??ne pozmeni?? parametre, ak si ??el??te vylep??i?? vyh??ad??vanie, alebo chcete spravova?? pou????vate??ov, ktor?? dost??vaj?? reporty. Pred ka??d??m generovan??m reportu sa aktualizuj?? nastavenia.
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={1}
                                            >
                                                Projekty m????ete editova??, zmaza?? alebo pozastavi??. Pri zmazan?? projektu strat??te v??etky va??e doteraj??ie nastavenia. Pri pozastaven?? projektu nebud?? generovan?? ??iadne reporty, ale v??ae nastavenia zostan?? ulo??en?? a projekt m????ete kedyko??vek op??tovne spusti??.
                                            </Typography>
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

export default function Help() {
    return <HelpContent />;
}