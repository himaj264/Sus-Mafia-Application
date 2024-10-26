import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import Copyright from '../Copyright';
import { useStyles } from './styles';
import { gray } from '../../colors';
import axios from 'axios';

export default function SignUp() {
  let history = useHistory();
  const classes = useStyles();

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    // API call
    const data = await axios.post(
      'http://localhost:8080/graphql',
      {
        query: `
        mutation {
          registerUser(userInput: {name: "${fName} ${lName}", email: "${email}", password: "${password}"}){
            _id
            name
            email
            walletAddress
            bio
            isAdmin
            token
          }
        }
        `,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    
    console.log(data.data)
    localStorage.setItem('token', data.data.data.registeredUser.token);
    localStorage.setItem('user', JSON.stringify(data.data.data.registeredUser));
    // On Success
    history.push("/dashboard");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lName}
                onChange={(e) => setLName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            // color="primary"
            // className={classes.submit}
            className="nav-link color-border"
            style={{ marginRight: "20px", background: 'transparent', color: "#fff", letterSpacing: "0.14rem", backgroundColor: gray, margin: "20px 0 20px 0"  }}
            onClick={() => handleSignUp()}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}