import React from 'react';
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
          <Grid item md={6} xs={6}>
            <ListItemText primary={item} />
          </Grid>
        </Grid>

      </ListItem>
  );
}

export default function ShowKeywords({ project, setProject }) {
  const [word, setWord] = useState("");
  const [errDictionaryW, setErrDictionaryW] = useState('');

  const handleRemove = (item) => {
    const updatedKeywords = project.keywords.filter((i) => i !== item);
    setProject(prevProject => ({
      ...prevProject,
      keywords: updatedKeywords
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const validWord = new RegExp(
        '^[a-zA-Z0-9 ]*$'
    );
    if (validWord.test(word) && word.length > 0) {
      if (word) {
        if(!project.keywords) {
          project.keywords = [];
        }
        setProject(prevProject => ({
          ...prevProject,
          keywords: [...project.keywords, word]
        }));
      }
      setWord('')
      setErrDictionaryW('')
    }else{
      setErrDictionaryW('')
      if (!validWord.test(word) || !(word.length > 0)){
        setErrDictionaryW('Kľúčové slovné spojenie môže obsahovať iba slová, číslice a medzery, nesmie obsahovať iné znaky.');
      }
    }
  };

  return (
      <div>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Typography variant="h6" style={{ fontWeight: 600, marginBottom: 16 }}>
              3. Pridať kľúčové slová
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
            <Grid item md={9} xs={12}>
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
        </Box>
        {project.keywords && (
            <Box sx={{ mt: 1 }}>
              <Grid container spacing={3}>
                <Grid item md={9} xs={12}>
                  <List>
                    <TransitionGroup>
                      {project.keywords.map((item) => (
                          (<Collapse key={item}>
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