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
            <ListItemText primary={item} />
        </ListItem>
    );
}

export default function ShowBlacklist({project, setProject}) {

    const [websiteForbidden, setWebsiteForbidden] = useState("");
    const [errForbidden, setErrForbidden] = useState('');

    const handleRemove = (item) => {
      const updatedBlacklist = project.forbiddenWebpages.filter((i) => i !== item);
      setProject(prevProject => ({
        ...prevProject,
        forbiddenWebpages: updatedBlacklist
      }));
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const validWebsite = new RegExp(
            'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)'
        );
        if (validWebsite.test(websiteForbidden)) {
            if (websiteForbidden) {
              if(!project.forbiddenWebpages) {
                project.forbiddenWebpages = [];
              }
              setProject(prevProject => ({
                ...prevProject,
                forbiddenWebpages: [...project.forbiddenWebpages, websiteForbidden]
              }));
            }
            setWebsiteForbidden('');
            setErrForbidden('');
        }else{
            setErrForbidden('Webová adresa nie je v správnom formáte (potrebný formát https:// alebo http://)');
        }

    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                    <Typography variant="h6" style={{ fontWeight: 600, marginBottom: 16 }}>
                        5. Pridať zakázané webstránky
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
                        Pridaj predvolené stránky
                    </Button>
                    <Button
                        type="button"
                        color="buttonLight"
                        variant="contained"
                        sx={{ ml: 2, mr: 2 }}
                        onClick={() => {
                            alert('Tu bude upload');
                        }}
                    >
                        Načítaj súbor
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
                            id="websiteForbidden"
                            label="Názov webovej stránky"
                            defaultValue={websiteForbidden}
                            fullWidth
                            value={websiteForbidden}
                            onChange={(e) => setWebsiteForbidden(e.target.value)}
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
                    sx = {{mt:1, ml:1}}
                >
                    {errForbidden}
                </Typography>
            </Box>
          {project.forbiddenWebpages && (
              <Box sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                  <Grid item md={9} xs={12}>
                    <List>
                      <TransitionGroup>
                        {project.forbiddenWebpages.map((item) => (
                            <Collapse key={item}>
                              {renderItem({ item, handleRemove })}
                            </Collapse>
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