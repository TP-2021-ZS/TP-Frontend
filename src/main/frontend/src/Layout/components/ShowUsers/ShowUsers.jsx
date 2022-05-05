import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

 
function renderItem({ item, handleRemove }) {
    return (
        <ListItem
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    title="Delete"
                    onClick={() => handleRemove(item)}
                >
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemText primary={item} />
        </ListItem>
    );
}

export default function ShowUsers(props) {
    
    const handleRemove = (item) => {
        props.setAddedEmails((prev) => [...prev.filter((i) => i !== item)]);
    };

    const handleAdd = (e) => {
        console.log(e)
        e.preventDefault();
        const validEmail = new RegExp(
            '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
        );
        if (validEmail.test(props.user)) {
            const nextHiddenItem = props.user;
            if (nextHiddenItem) {
                props.setAddedEmails((prev) => [nextHiddenItem, ...prev]);
            }
            props.setUser('');
            props.setErrUser('');

        }
        else{
            props.setErrUser('E-mailová adresa nie je v správnom formáte');
        }
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                    <Typography variant="h6" style={{ fontWeight: 600, marginBottom: 16 }}>
                        3. Pridať používateľov
                    </Typography>
                </Grid>
            </Grid>

            <Box
                component="form"
                onSubmit={handleAdd}
                sx={{
                    '& .MuiTextField-root': { mt: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={3}>
                    <Grid item md={9} xs={12}>
                        <TextField
                            id="user"
                            type="email"
                            label="E-mailová adresa používateľa"
                            defaultValue={props.user}
                            fullWidth
                            value={props.user}
                            onChange={(e) => props.setUser(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Button

                            color="primary"
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                            onClick={handleAdd}
                        >
                            Pridať
                        </Button>
                    </Grid>
                </Grid>
                <Typography
                    variant="body2"
                    color="danger.main"
                    sx = {{ mt: 1, ml: 1}}
                >
                    {props.errUser}
                </Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                    <Grid item md={9} xs={12}>
                        <List>
                            <TransitionGroup>
                                {props.addedEmails.map((item) => (
                                    <Collapse key={item}>
                                        {renderItem({ item, handleRemove })}
                                    </Collapse>
                                ))}
                            </TransitionGroup>
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}