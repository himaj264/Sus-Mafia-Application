import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { CssBaseline, Drawer, Box, AppBar, Toolbar, List, Typography, Divider, IconButton, Container, Button } from '@material-ui/core';
import { Menu, ChevronLeft } from '@material-ui/icons';
import { useStyles } from './styles';
import Copyright from '../Copyright';
import MyList from "./MyList";

import Card from '../list/Card';
import Walllet from "../Wallet/Walllet";
import Chat from '../Chat/Chat';
import Create from '../Create/Create';
import Profile from '../Profile/Profile';

export default function Dashboard() {
  let history = useHistory();
  const classes = useStyles();

  const [section, setSection] = useState('Dashboard');

  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    // On Success
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <Menu />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} id="mainTitle">
            SusMafia
          </Typography>
          <Button
            onClick={() => handleSignOut()}
            variant="contained"
            className="nav-link color-border"
            style={{ marginRight: "20px", background: 'transparent', color: "#fff", letterSpacing: "0.14rem"  }}
          >
          Logout
        </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MyList setSection={setSection} section={section} />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
          {
            section === 'Dashboard' && 
            <Card />
          }
          {
            section === 'Wallet' && 
            <Walllet />
          }
          {
            section === 'Chat' && 
            <Chat />
          }
          {
            section === 'Share' &&
            <Create />
          }
          {
            section === 'Profile' &&
            <Profile />
          }
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}