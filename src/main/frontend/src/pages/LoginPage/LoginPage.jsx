import React, {useState} from "react";
import "./loginPage.scss";
import axios from 'axios';
import parseJwt from "../../components/helpers/parseJwt";
import routes from "../../routing/routes";
import {useNavigate} from "react-router";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { ThemeProvider , createTheme } from '@mui/material/styles';

function Copyright(props) {
  return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}



const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      }
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
    },
  });

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/login", {
      method: 'POST',
      body: JSON.stringify({username: username, password: password})
    })
        .then(res => {
          const jwtToken = res.headers.get('Authorization');

          if (jwtToken !== null) {
            let jwtParsed = parseJwt(jwtToken);
            localStorage.setItem("jwt", jwtToken);
            localStorage.setItem("username", jwtParsed.sub);
            localStorage.setItem("role", jwtParsed.role);
            navigate(routes.allprojects);
          } else {
            setError(
                'Nesprávne prihlasovacie údaje!')
          }
        })
        .catch(error => {
          setError(error.response.data)
        })
  };

  return (
      <ThemeProvider  theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                //backgroundColor: (t) =>
                //    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                //    backgroundColor: 'primary',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
            >
              <Avatar sx={{ m: 8, bgcolor: '#E5C604' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                PRIHLÁSENIE
              </Typography>




              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Grid container>
                  <Grid item>
                    <Typography
                        variant="body2"
                        color="danger.main"
                    >
                      {error}
                    </Typography>
                  </Grid>
                </Grid>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Používateľské meno"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Heslo"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    type="submit"
                    color="primary"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!validateForm()}

                >
                  PRIHLÁSIŤ SA
                </Button>

                <Grid container>
                  <Grid item>
                    <Link href="/registration" variant="body2">
                      {"Nemáte ešte účet? Registrujte sa"}
                    </Link>
                  </Grid>
                </Grid>
                {/*<Copyright sx={{ mt: 5 }} />*/}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider >



  );
}

export default LoginPage;