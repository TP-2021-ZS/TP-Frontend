import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default function ShowAdditionalSettings(props) {
    const handleAdd = (e) => {
        props.setReportType(e);
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                    <Typography variant="h6" style={{ fontWeight: 600, marginBottom: 16 }}>
                        5. Ďalšie parametre
                    </Typography>
                </Grid>
            </Grid>
            <Box
                component="form"
                onChange={handleAdd}
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
                                value={props.reportType}
                                label="Generovať report"
                                onChange={(e) => props.setReportType(e.target.value)}
                            >
                                <MenuItem value={'day'}>Denný</MenuItem>
                                <MenuItem value={'week'}>Týždenný</MenuItem>
                                <MenuItem value={'month'}>Mesačný</MenuItem>
                                <MenuItem value={'year'}>Ročný</MenuItem>
                                <MenuItem value={'all'}>Celkový</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

            </Box>

        </div>
    );
}