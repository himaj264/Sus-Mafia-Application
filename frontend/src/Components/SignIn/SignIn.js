import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import Copyright from '../Copyright';
import { useStyles } from './styles';
import { gray } from '../../colors';
import axios from 'axios';

export default function SignIn() {
  let history = useHistory();
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    // API call 
    const data = await axios.post(
      'http://localhost:8080/graphql',
      {
        query: `
        query {
          login(email: "${email}", password: "${password}"){
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
    
    localStorage.setItem('token', data.data.data.login.token);
    localStorage.setItem('user', JSON.stringify(data.data.data.login));
    // On success
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            // color="primary"
            // className={classes.submit}
            className="nav-link color-border"
            style={{ marginRight: "20px", background: 'transparent', color: "#fff", letterSpacing: "0.14rem", backgroundColor: gray, margin: "20px 0 20px 0"  }}
            onClick={() => handleSignIn()}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}