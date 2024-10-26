import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { gray } from '../../colors';
import axios from 'axios';

function Create() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = await axios.post(
      'http://localhost:8080/graphql',
      {
        query: `
        mutation {
          updateUser(userId: "${user._id}", userInput: {
            name: "${user.name}",
            email: "${user.email}",
            bio: "${user.bio}"
          }) {
            _id
            name
            email
            walletAddress
            bio
            isAdmin
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
    console.log(data.data.data.updateUser);
    localStorage.setItem('user', JSON.stringify({
      ...data.data.data.updateUser,
      token: user.token,
      bio: ''
    }));
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      setName(user.name);
      setEmail(user.email);
      if(user.bio) setBio(user.bio);
      else setBio('');
    }
  }, [])

  return (
    <>
      <div style={{ marginTop: "40px", textAlign: "center" }}>
      
      <h1 className='list-item-header' style={{ fontSize: "20rem" }}>Edit Profile</h1>
      <br />
      <TextField
        variant="outlined"
        margin="normal"
        required
        id="name"
        label="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "410px" }}
      /><br />
      <TextField
        variant="outlined"
        margin="normal"
        required
        id="email"
        label="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "410px" }}
      /><br />
      <TextField
        variant="outlined"
        margin="normal"
        required
        id="bio"
        label="Bio"
        name="bio"
        value={bio ? "":bio}
        onChange={(e) => setBio(e.target.value)}
        style={{ width: "410px" }}
      />
      <br />
      <Button
        
        variant="contained"
        // color="primary"
        // className={classes.submit}
        className="nav-link color-border"
        style={{ background: 'transparent', color: "#fff", letterSpacing: "0.14rem", backgroundColor: gray, margin: "20px 0 20px 0", width: "410px" }}
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
      </div>
    </>
  )
}

export default Create;
