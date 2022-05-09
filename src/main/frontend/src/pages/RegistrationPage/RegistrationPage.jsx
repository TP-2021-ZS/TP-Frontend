import React, {useState} from "react";
import axios from 'axios';
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
import obr from './registrationimg.png'

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

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [e1, setE1] = useState('');
  const [e2, setE2] = useState('');
  const [e3, setE3] = useState('');
  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validEmail = new RegExp(
        '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
    );
    const validUsername = new RegExp(
        '^[a-zA-Z0-9 ]*$'
    );

    if (validEmail.test(email) && validUsername.test(username) && password.length>=8) {
      axios.post('http://147.175.121.149:8080/TeamProject-1.0/api/registration', null,
          {params: {username: username, password: password, email: email}})
          .then(() => {
            navigate(routes.login)
          })
          .catch(() => {
            setError("Meno a/alebo email, už existujú.");
            setE1('');
            setE2('');
            setE3('');
          });
    }else{
      setError('');
      setE1('');
      setE2('');
      setE3('');

      if (!validEmail.test(email)){
        setE1("Nesprávny formát e-mailu. ");
      }
      if (!validUsername.test(username)){
        setE1("Meno nesmie obsahovať špeciálne znaky. ");
      }
      if (password.length<8){
        setE1("Heslo musí mať aspoň 8 znakov. ");
      }

      setError(e1+e2+e3);
    }


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
                backgroundImage: `url(${obr})`,
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
                REGISTRÁCIA
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
                    id="email"
                    label="E-mail"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  REGISTROVAŤ SA
                </Button>


                <Grid container>
                  <Grid item>
                    <Link href="/login" variant="body2">
                      {"Už máte vytvorený účet? Prihláste sa"}
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

export default RegistrationPage;
