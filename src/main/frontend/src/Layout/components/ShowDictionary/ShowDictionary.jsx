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
            <Grid container spacing={3}>
                <Grid item md={3} xs={6}>
                    <ListItemText primary={item[0]} />
                </Grid>
                <Grid item md={3} xs={6}>
                    <ListItemText primary={item[1]} />
                </Grid>
            </Grid>

        </ListItem>
    );
}

export default function ShowDictionary(props) {


    const handleRemove = (item) => {
        props.setDictionaryWords((prev) => [...prev.filter((i) => i !== item)]);
    };

    const handleAdd = (e) => {
        console.log(e)
        e.preventDefault();
        const validWord = new RegExp(
            '^[a-zA-Z0-9 ]*$'
        );
        const validRating = new RegExp(
            '^[1-9][0-9]?$|^100$'
        );
        console.log(validWord.test(props.word));
        console.log(validRating.test(props.rating));
        if (validWord.test(props.word) && props.word.length > 0 && validRating.test(props.rating)) {

            const dictionaryItem = [props.word, props.rating];
            const nextHiddenItem = dictionaryItem;
            if (nextHiddenItem) {
                props.setDictionaryWords((prev) => [nextHiddenItem, ...prev]);
            }
            props.setWord('')
            props.setRating('')
            props.setErrDictionaryR('')
            props.setErrDictionaryW('')
        }else{
            props.setErrDictionaryR('')
            props.setErrDictionaryW('')
            if (!validRating.test(props.rating)){
                props.setErrDictionaryR('Hodnoty musia byť v rozmedzí 0-100');
            }
            if (!validWord.test(props.word) || !(props.word.length > 0)){
                props.setErrDictionaryW('Kľúčové slovné spojenie môže obsahovať iba slová, číslice a medzery, nesmie obsahovať iné znaky.');
            }


        }
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                    <Typography variant="h6" style={{ fontWeight: 600, marginBottom: 16 }}>
                        2. Pridať slovník a rating
                    </Typography>
                </Grid>

                <Grid item md={8} xs={12}>
                    <Button
                        type="button"
                        color="buttonLight"
                        variant="contained"
                        sx={{ ml: 2, mr: 2 }}
                        onClick={() => {
                            alert('Tu budú predvolené stránky');
                        }}
                    >
                        Pridaj predvolený slovník
                    </Button>
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
                    <Grid item md={6} xs={12}>
                        <TextField
                            id="word"
                            label="Kľúčové slovo"
                            defaultValue={props.word}
                            fullWidth
                            value={props.word}
                            onChange={(e) => props.setWord(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <TextField
                            id="rating"
                            label="Rating vrámci vyhľadávania"
                            defaultValue={props.rating}
                            fullWidth
                            value={props.rating}
                            onChange={(e) => props.setRating(e.target.value)}
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
                    {props.errDictionaryW}
                </Typography>
                <Typography
                    variant="body2"
                    color="danger.main"
                    sx = {{ mt: 1, ml: 1}}
                >
                    {props.errDictionaryR}
                </Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                    <Grid item md={9} xs={12}>
                        <List>
                            <TransitionGroup>
                                {props.dictionaryWords.map((item) => (
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