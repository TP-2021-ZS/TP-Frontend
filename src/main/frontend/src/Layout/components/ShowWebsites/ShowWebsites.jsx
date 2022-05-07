import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import {TransitionGroup} from 'react-transition-group';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

function renderItem({item, handleRemove}) {
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

export default function ShowWebsites({project, setProject}) {
  const [website, setWebsite] = useState("");
  const [errWebsites, setErrWebsites] = useState('');
  const [defaultList, setDefaultList] = useState([
    "https://www.mpsr.sk/",
    "https://www.energie-portal.sk/",
    "https://www.voda-portal.sk/",
    "https://www.odpady-portal.sk/",
    "https://www.priemyseldnes.sk/",
    "https://camit.sk/sk",
    "https://www.fsok.sk/",
    "https://www.enviroportal.sk/sk/eia",
    "https://www.asb.sk/",
    "https://www.eea.europa.eu/sk/themes/human/highlights",
    "https://www.inovujme.sk/sk/novinky",
    "https://www.siea.sk/",
    "https://www.npc.sk/",
    "https://news.camit.sk/sk/",
    "https://www.stavebne-forum.sk/sk/newsroom/",
    "https://www.webnoviny.sk/",
    "https://www.finreport.sk/"]);

  const loadDictionary = () => {
      //let mergedList = props.addedWebsites.concat(defaultList);
      if(!project.webpages) {
          project.webpages = [];
      }
      const mergedList = project.webpages.concat(defaultList);
      console.log(mergedList)
      setProject(prevProject => ({
          ...prevProject,
          webpages: mergedList
      }));
  }

  const handleRemove = (item) => {
    const updatedWebpages = project.webpages.filter((i) => i !== item);
    setProject(prevProject => ({
      ...prevProject,
      webpages: updatedWebpages
    }));
  };

  const handleAdd = (e) => {

    e.preventDefault();
    const validWebsite = new RegExp(
        'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)'
    );
    if (validWebsite.test(website)) {
      if (website) {
        if(!project.webpages) {
          project.webpages = [];
        }
        setProject(prevProject => ({
          ...prevProject,
          webpages: [...project.webpages, website]
        }));
      }
      setWebsite('');
      setErrWebsites('');
    } else {
      setErrWebsites(
          'Webová adresa nie je v správnom formáte (potrebný formát https:// alebo http://)');
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
            <Typography variant="h6"
                        style={{fontWeight: 600, marginBottom: 16}}>
              1. Pridať webstránky
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
                  Pridaj predvolené stránky
              </Button>

          </Grid>
        </Grid>

        <Box
            component="form"
            onSubmit={handleAdd}
            sx={{
              '& .MuiTextField-root': {mt: 1},
            }}
            noValidate
            autoComplete="off"
        >
          <Grid container spacing={3}>
            <Grid item md={9} xs={12}>
              <TextField
                  id="website"
                  label="Názov webovej stránky"
                  defaultValue={website}
                  fullWidth
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <Button
                  color="primary"
                  variant="contained"
                  sx={{mt: 2, mb: 2}}
                  onClick={handleAdd}
              >
                Pridať
              </Button>
            </Grid>
          </Grid>
          <Typography
              variant="body2"
              color="danger.main"
              sx={{mt: 1, ml: 1}}
          >
            {errWebsites}
          </Typography>
        </Box>
        {project.webpages && (
            <Box sx={{mt: 1}}>
              <Grid container spacing={3}>
                <Grid item md={9} xs={12}>
                  <List>
                    <TransitionGroup>
                      {project.webpages.map((item) => (
                          <Collapse key={item}>
                            {renderItem({item, handleRemove: handleRemove})}
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