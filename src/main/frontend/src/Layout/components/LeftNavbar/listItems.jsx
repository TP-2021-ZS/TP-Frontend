import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {Link} from "react-router-dom";

export const mainListItems = (
    <React.Fragment>
        {/*
        <ListItemButton component={Link} to="/dashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        */}
        <ListItemButton component={Link} to="/addproject">
            <ListItemIcon>
                <CreateNewFolderIcon />
            </ListItemIcon>
            <ListItemText primary="Vytvoriť nový projekt" />
        </ListItemButton>
        <ListItemButton component={Link} to="/allprojects">
            <ListItemIcon>
                <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="Projekty" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Účet
        </ListSubheader>
        <ListItemButton component={Link} to="/accountsettings">
            <ListItemIcon>
                <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="Nastavenia účtu" />
        </ListItemButton>
    </React.Fragment>

);
