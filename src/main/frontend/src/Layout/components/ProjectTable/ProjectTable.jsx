import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import {TransitionGroup} from 'react-transition-group';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import Divider from "@mui/material/Divider";
import {createTheme} from "@mui/material/styles";
import {useNavigate} from "react-router";
import routes from "../../../routing/routes";
import axios from "axios";
import {BE_SERVER} from "../../../constants";

export default function ProjectTable({projects, setProjects}) {
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
    axios.delete(`${BE_SERVER}/api/projects/` + item.id, {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      }
    })
        .then((response) => setProjects(
            (prev) => [...prev.filter((i) => i !== item)]))
        .catch((error) => console.log(error));
  };

  const navigate = useNavigate();
  const handleEdit = (item) => {
    navigate(routes.editproject.withId(item.id))
  };

  function renderItem({index, item, handleEdit, handleRemove}) {

    return (
        <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <ListItemText primary={index + 1} />
            </Grid>
            <Grid item xs={4}>
              <ListItemText primary={item.title} />
            </Grid>
            <Grid item xs={5}>
              <ListItemText
                  primary={<Typography type="body2" style={{
                    fontWeight: 600,
                    color: item.active ? '#E5C604' : '#d76811'
                  }}>{item.active ? 'Aktívny' : 'Pozastavený'}</Typography>}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                  edge="end"
                  aria-label="edit"
                  title="Edit"
                  onClick={() => handleEdit(item)}
              >
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item xs={1}>
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
            <Typography variant="h6"
                        style={{fontWeight: 600, marginBottom: 16}}>
              Zoznam vašich projektov
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{mt: 1}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>

              <List>
                <ListItem>
                  <Grid container spacing={2}>
                    <Grid item xs={1}>
                      <ListItemText
                          primary={<Typography type="body2"
                                               style={{fontWeight: 600}}>ID</Typography>}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <ListItemText
                          primary={<Typography type="body2"
                                               style={{fontWeight: 600}}>Názov
                            projektu</Typography>}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <ListItemText
                          primary={<Typography type="body2"
                                               style={{fontWeight: 600}}>Stav</Typography>}
                      />
                    </Grid>

                  </Grid>

                </ListItem>
                <TransitionGroup>
                  {projects.map((item, index) => (
                      <Collapse key={item.id}>
                        <Divider light style={{marginBottom: 2}} />
                        {renderItem({index, item, handleEdit, handleRemove})}

                      </Collapse>
                  ))}
                </TransitionGroup>
                <Divider light style={{marginBottom: 2}} />
              </List>

            </Grid>
          </Grid>
        </Box>
      </div>
  );
}