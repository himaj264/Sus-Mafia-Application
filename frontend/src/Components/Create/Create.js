import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { gray } from '../../colors';
import axios from 'axios';

function Create() {

  const [url, setUrl] = useState('');

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [work, setWork] = useState('');

  const handleScrape = async () => {
    const data = await axios.get(`http://ee9c-106-51-243-64.ngrok.io/scrape?url=${url}`);
    setAbout(data.data.about);
    setName(data.data.name);
    setWork(data.data.works_at);
  }

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = await axios.post(
      'http://localhost:8080/graphql',
      {
        query: `
        mutation {
          createResource(resourceInput: {
            name: "${name}",
            bio: "${about} ${work}",
            userId: "${user._id}"
          }) {
            name
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
    console.log(data.data.data.createResource);
  }

  return (
    <>
      <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h1 className='list-item-header' style={{ fontSize: "20rem", marginBottom: "10px" }}>Share Resource</h1>
      <TextField
        variant="outlined"
        margin="normal"
        required
        id="url"
        label="LinkedIn"
        name="url"
        autoFocus
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "410px" }}
      />
      <Button
        // fullWidth
        variant="contained"
        // color="primary"
        // className={classes.submit}
        className="nav-link color-border"
        style={{ background: 'transparent', color: "#fff", letterSpacing: "0.14rem", backgroundColor: gray, margin: "25px 0 25px 30px" }}
        onClick={() => handleScrape()}
      >
        Get Details
      </Button>
      <br />
      <div>OR</div>
      
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
        id="about"
        label="About"
        name="about"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        style={{ width: "410px" }}
      /><br />
      <TextField
        variant="outlined"
        margin="normal"
        required
        id="work"
        label="Work"
        name="work"
        value={work}
        onChange={(e) => setWork(e.target.value)}
        style={{ width: "410px" }}
      />
      <br />
      <Button
        // fullWidth
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