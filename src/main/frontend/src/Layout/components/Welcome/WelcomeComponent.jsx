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
                        Aplikácia poskytuje získavanie a využitie informácií z verejne dostupných zdrojov. Poskytuje systém, ktorý vyhľadáva ohlásené investičné projekty, rozširovanie výroby, budovanie nových priemyselných a rezidenčných priestorov, akvizície spoločností a mnohé iné príležitosti. Tým uľahčí prácu, primárne tímov projektového financovania v spoločnosti VÚB. Softvér nahrádza manuálnu prácu pri vyhľadávaní obchodných príležitostí v online prostredí a získané dáta automaticky spracuje do pravidelného reportu, ktorý je odosielaný vo formáte CSV na e-mailové adresy poverených osôb.
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
                            Stante sa administrátorom projektov pre vyhľadávanie investičných príležitostí.
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
                            Poďme na to
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