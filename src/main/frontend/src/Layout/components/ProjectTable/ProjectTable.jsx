import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import Divider from "@mui/material/Divider";
import {createTheme} from "@mui/material/styles";


export default function ProjectTable(props) {

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

    const handleRemove = (item) => {
        props.setAddedProjects((prev) => [...prev.filter((i) => i !== item)]);
    };

    const handleEdit = (item) => {
        localStorage.setItem("editedProjectID", item[0]);
        //item.preventDefault();
        window.location.assign('/editproject');
    };


    function renderItem({ item, handleEdit, handleRemove }) {

        return (
            <ListItem>
                <Grid container spacing={2}>
                    <Grid item  xs={1}>
                        <ListItemText primary={item[0]} />
                    </Grid>
                    <Grid item  xs={4}>
                        <ListItemText primary={item[1]} />
                    </Grid>
                    <Grid item  xs={5}>
                        <ListItemText
                            primary={<Typography type="body2" style={{ fontWeight: 600, color: item[2] != "Aktívny"? '#d76811':'#E5C604' }}>{item[2]}</Typography>}
                        />
                    </Grid>
                    <Grid item  xs={1}>
                        <IconButton
                            edge="end"
                            aria-label="edit"
                            title="Edit"
                            onClick={() => handleEdit(item)}
                        >
                            <EditIcon />
                        </IconButton>
                    </Grid>
                    <Grid item  xs={1}>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            title="Delete"
                            onClick={() => handleRemove(item)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>

                </Grid>

            </ListItem>

        );
    }


    return (
        <div>
            <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                    <Typography variant="h6" style={{ fontWeight: 600, marginBottom: 16 }}>
                        Zoznam vašich projektov
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>

                        <List>
                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item  xs={1}>
                                        <ListItemText
                                            primary={<Typography type="body2" style={{ fontWeight: 600 }}>ID</Typography>}
                                        />
                                    </Grid>
                                    <Grid item  xs={4}>
                                        <ListItemText
                                            primary={<Typography type="body2" style={{ fontWeight: 600 }}>Názov projektu</Typography>}
                                        />
                                    </Grid>
                                    <Grid item  xs={5}>
                                        <ListItemText
                                            primary={<Typography type="body2" style={{ fontWeight: 600 }}>Stav</Typography>}
                                        />
                                    </Grid>

                                </Grid>

                            </ListItem>
                            <TransitionGroup>
                                {props.addedProjects.map((item) => (
                                    <Collapse key={item}>
                                        <Divider light style={{  marginBottom: 2 }}/>
                                        {renderItem({ item, handleEdit, handleRemove })}

                                    </Collapse>
                                ))}
                            </TransitionGroup>
                            <Divider light style={{  marginBottom: 2 }}/>
                        </List>

                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}