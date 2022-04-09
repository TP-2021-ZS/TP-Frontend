import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";


export default function WelcomeComponet() {
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 10,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                            my: 8,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography variant="h2"
                                    color="primary.main">



                            Admin Project Tool
                        </Typography>
                    </Box>
                    <Typography variant="body1"
                                color="textBasic.main"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                    <Box
                        sx={{
                            mt: 8,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography variant="body1"
                                    color="textLight.main"
                        >
                            Lorem ipsum dolo.
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Button href="/login"
                                color="primary"

                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}>
                            Get Started
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://img.freepik.com/free-vector/email-business-illustration-newsletter-email-marketing-concept-vector-illustration-flat-style_7737-2326.jpg)',
                    backgroundRepeat: 'no-repeat',
                    //backgroundColor: (t) =>
                    //    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    //    backgroundColor: 'primary',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
        </Grid>
    );
}