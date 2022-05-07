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
import {useState} from "react";


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
                    <ListItemText primary={item.word} />
                </Grid>
                <Grid item md={3} xs={6}>
                    <ListItemText primary={item.rating} />
                </Grid>
            </Grid>

        </ListItem>
    );
}

export default function ShowDictionary({ project, setProject }) {
  const [word, setWord] = useState("");
  const [rating, setRating] = useState("");
  const [errDictionaryW, setErrDictionaryW] = useState('');
  const [errDictionaryR, setErrDictionaryR] = useState('');

  const [defaultList, setDefaultList] = useState([
      {word:"investícia",rating: 100},
      {word:"ohlásila",rating: 100},
      {word:"významný",rating: 100},
      {word:"zahraničný",rating: 100},
      {word:"projekt",rating: 100},
      {word:"nový",rating: 100},
      {word:"investičný",rating: 100},
      {word:"zámer",rating: 100},
      {word:"investovať",rating: 100},
      {word:"rozšírenie",rating: 100},
      {word:"expanzia",rating: 100},
      {word:"expandovať",rating: 100},
      {word:"výroby",rating: 100},
      {word:"zvýšenie",rating: 100},
      {word:"výrobná",rating: 100},
      {word:"kapacitný",rating: 100},
      {word:"vybudovala",rating: 100},
      {word:"výstavba",rating: 100},
      {word:"vstup",rating: 100},
      {word:"Slovenský",rating: 100},
      {word:"trh",rating: 100},
      {word:"akvizícia",rating: 100},
      {word:"prebieha",rating: 100},
      {word:"pripravovaná",rating: 100},
      {word:"kúpa",rating: 100},
      {word:"spoločnosť",rating: 100},
      {word:"M&A",rating: 100},
      {word:"SPV",rating: 100},
      {word:"zlúčenie",rating: 100},
      {word:"management",rating: 100},
      {word:"buy-out",rating: 100},
      {word:"odkúpi",rating: 100},
      {word:"akcie",rating: 100},
      {word:"podiel",rating: 100},
      {word:"obchodných",rating: 100},
      {word:"podielov",rating: 100},
      {word:"emisia",rating: 100},
      {word:"dlhopisov",rating: 100},
      {word:"emisia",rating: 100},
      {word:"fond",rating: 100},
      {word:"etf",rating: 100},
      {word:"dlhopis",rating: 100},
      {word:"cenných",rating: 100},
      {word:"papierov",rating: 100},
      {word:"cenný",rating: 100},
      {word:"papier",rating: 100},
      {word:"crowdfunding",rating: 100},
      {word:"reštrukturalizácia",rating: 100},
      {word:"konkurz",rating: 100}
      ]);


    const loadDictionary = () => {
        //let mergedList = props.addedWebsites.concat(defaultList);
        if(!project.dict) {
            project.dict = [];
        }
        const mergedList = project.dict.concat(defaultList);
        setProject(prevProject => ({
            ...prevProject,
            dict: mergedList
        }));
    }

    const handleRemove = (item) => {
      const updatedDict = project.dict.filter((i) => i.word !== item.word);
      setProject(prevProject => ({
        ...prevProject,
        dict: updatedDict
      }));
    };

    const handleAdd = (e) => {
        console.log(project.dict)
        e.preventDefault();
        const validWord = new RegExp(
            '^[a-zA-Z0-9 ]*$'
        );
        const validRating = new RegExp(
            '^[1-9][0-9]?$|^100$'
        );
        if (validWord.test(word) && word.length > 0 && validRating.test(rating)) {

            const dictionaryItem = {word: word, rating: rating};
            if (dictionaryItem) {
              if(!project.dict) {
                project.dict = [];
              }
              setProject(prevProject => ({
                ...prevProject,
                dict: [...project.dict, dictionaryItem]
              }));
            }
            setWord('')
            setRating('')
            setErrDictionaryR('')
            setErrDictionaryW('')
        }else{
            setErrDictionaryR('')
            setErrDictionaryW('')
            if (!validRating.test(rating)){
                setErrDictionaryR('Hodnoty musia byť v rozmedzí 0-100');
            }
            if (!validWord.test(word) || !(word.length > 0)){
                setErrDictionaryW('Kľúčové slovné spojenie môže obsahovať iba slová, číslice a medzery, nesmie obsahovať iné znaky.');
            }
        }
    };

    return (
        <div>
            <Box
                component="form"
                onSubmit={loadDictionary}
            >
            </Box>
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
                        onClick={loadDictionary}
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
                            defaultValue={word}
                            fullWidth
                            value={word}
                            onChange={(e) => setWord(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <TextField
                            id="rating"
                            label="Rating vrámci vyhľadávania"
                            defaultValue={rating}
                            fullWidth
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
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
                    {errDictionaryW}
                </Typography>
                <Typography
                    variant="body2"
                    color="danger.main"
                    sx = {{ mt: 1, ml: 1}}
                >
                    {errDictionaryR}
                </Typography>
            </Box>
          {project.dict && (
              <Box sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                  <Grid item md={9} xs={12}>
                    <List>
                      <TransitionGroup>
                        {project.dict.map((item) => (
                            (<Collapse key={item.word}>
                              {renderItem({item, handleRemove})}
                            </Collapse>)
                        ))}
                      </TransitionGroup>
                    </List>
                  </Grid>
                </Grid>
              </Box>
          )}
        </div>
    );
}