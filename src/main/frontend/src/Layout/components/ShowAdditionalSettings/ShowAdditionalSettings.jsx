import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';


export default function ShowAdditionalSettings({onChange, dateAfter}) {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                    <Typography variant="h6" style={{ fontWeight: 600, marginBottom: 16 }}>
                        6. Ďalšie parametre
                    </Typography>
                </Grid>
            </Grid>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { mt: 1 },
                }}
                 noValidate
                autoComplete="off"
            >
                <Grid container spacing={3}>
                    <Grid item md={9} xs={12}>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel
                                id="demo-simple-select-label"
                            >Generovať report
                            </InputLabel>
                            <Select
                                labelId="reportType"
                                id="reportType"
                                value={dateAfter}
                                label="Generovať report"
                                onChange={onChange}
                            >
                                <MenuItem value='DAY'>Denný</MenuItem>
                                <MenuItem value='WEEK'>Týždenný</MenuItem>
                                <MenuItem value='MONTH'>Mesačný</MenuItem>
                                <MenuItem value='YEAR'>Ročný</MenuItem>
                                <MenuItem value='ALL'>Celkový</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

            </Box>

        </div>
    );
}