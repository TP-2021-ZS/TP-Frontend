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
                                    Návod
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
                                                 Pre gerovanie reportov potrebujete mať založený aspoň jeden projekt. Vrámci projektov sa môžete orientovať na vami zvolenú tému, alebo prehľadávať články z rozličných odvetví. Projekt založíte v časti "Vytvoriť projekt". Pre každú sekciu je potrebné vyplniť údaje.
                                            </Typography>
                                            <Divider light style={{ marginTop: 12, marginBottom: 12 }}/>
                                            <Typography
                                                variant="h6"
                                                color="inherit"
                                            >
                                                Pridať webstránky
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={2}
                                            >
                                                Zoznam webstránok, ktoré budú uprednostnené pre vyhľadávanie článkov. Zoznam môžete vytvoriť pridávaním stránok, načítaním pripraveného zoznamu overených stránok. K týmto stránkam môže doplniť ďalšie vami preferované loaklity.
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={1}
                                            >
                                                Obmedzenia: Webové stránky pridávajte vo formáte http/https.
                                            </Typography>
                                            <Divider light style={{ marginTop: 12, marginBottom: 12 }}/>
                                            <Typography
                                                variant="h6"
                                                color="inherit"
                                            >
                                                Pridať slovník a rating
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={2}
                                            >
                                                Zoznam slov alebo slovných spojení, ktoré si želáte prehľadávať v článkoch. Každé slovné spojenie musí mať pridelený rating (dôležitosť vrámci vyhľadávania).
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={1}
                                            >
                                                Obmedzenia: Slovné spojenia nesmú obsahovať špeciálne znaky. Rating môže mať rozmedzie hodnôt od 0 do 100, pre prvotné nastavenie je vhodné nastaviť hodnotu 100 pre všetky slovné spojenia.
                                            </Typography>
                                            <Divider light style={{ marginTop: 12, marginBottom: 12 }}/>
                                            <Typography
                                                variant="h6"
                                                color="inherit"
                                            >
                                                Pridať používateľov
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={2}
                                            >
                                                Zoznam e-mailových adries používateľov, pre ktorých bude generovaný report. Administrátor je automaticky priradený do zoznamu.
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={1}
                                            >
                                                Obmedzenia: Adresa musí spĺňať formát e-mailových adries.
                                            </Typography>
                                            <Divider light style={{ marginTop: 12, marginBottom: 12 }}/>
                                            <Typography
                                                variant="h6"
                                                color="inherit"
                                            >
                                                Pridať zakázané webstránky
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={2}
                                            >
                                                Zoznam webstránok, ktoré budú zakázané pri vyhľadávaní článkov (napr. z dôvodu neoverených zdrojov alebo častých hoaxov). Zoznam môžete vytvoriť pridávaním stránok, alebo načítaním pripraveného zoznamu stránok. K týmto stránkam môže doplniť ďalšie webové loaklity, ktoré považujete za nedôveryhodné.
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={1}
                                            >
                                                Obmedzenia: Webové stránky pridávajte vo formáte http/https.
                                            </Typography>
                                            <Divider light style={{ marginTop: 12, marginBottom: 12 }}/>
                                            <Typography
                                                variant="h6"
                                                color="inherit"
                                            >
                                                Ďalšie parametre
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={2}
                                            >
                                                Nastavenie frekvencie generovania reportov. Na základe vami zvoleného režimu budú vám a vami pridaným používateľom zasielané reporty článkov vo formáte CSV.
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={1}
                                            >
                                                Obmedzenia: Povinné zvoliť režim generovania reportov.
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
                                                Po vytvorení projektu/ov môžete v sekcii "Projekty" môžete dodatočne pozmeniť parametre, ak si želáte vylepšiť vyhľadávanie, alebo chcete spravovať používateľov, ktorí dostávajú reporty. Pred každým generovaním reportu sa aktualizujú nastavenia.
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="inherit"
                                                mt={1}
                                            >
                                                Projekty môžete editovať, zmazať alebo pozastaviť. Pri zmazaní projektu stratíte všetky vaše doterajšie nastavenia. Pri pozastavení projektu nebudú generované žiadne reporty, ale všae nastavenia zostanú uložené a projekt môžete kedykoľvek opätovne spustiť.
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