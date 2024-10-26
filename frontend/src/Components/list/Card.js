import React ,{useState, useEffect} from 'react'
import { TextField, Card, CardContent, Typography } from '@material-ui/core';
import { Chip, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, List, ListItem, ListItemText, Tooltip, ListItemSecondaryAction, IconButton, Grid, InputAdornment, Button } from '@material-ui/core';
import { GetAppOutlined } from '@material-ui/icons';
import './Card1.css'
import Fuse from 'fuse.js';
import axios from 'axios'; 
import { downloadCSV2 } from '../../helper';     

 function CardList(){
  const [fuse, setFuse] = useState(null); 
  const [query, updateQuery] = useState('');
   const [resources, setResources] = useState([]);
   const [searchedResources, setSearchedResources] = useState([]);
  
  useEffect(() => {
    const fus = new Fuse(resources, {
      keys: [
        'name',
        'bio'
      ],
      includeScore: true
    });
    setFuse(fus);
  }, [resources])

  useEffect(() => {
    if(!query || query === "") {
      setSearchedResources(resources);
    }
    else if(fuse && resources) {
      const result = fuse.search(query);
      setSearchedResources(result.map((res) => res.item));
    }
  }, [query, resources])

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await axios.post(
        'http://localhost:8080/graphql',
        {
          query: `
          query {
            getResources{
              name
              bio
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
      setResources(data.data.data.getResources)
    }
    fetchDetails();
  }, [])

    return(
        <>

        {/* this is for search bar */}

         {/* <div className='search-bar-container'> */}
              {/* <form> */}
                  
               {/* <input type='text'  className='searchbar' placeholder='SEARCH' value={query} onChange={onSearch}/> */}
              

               <TextField
                  variant="outlined"
                  margin="normal"
                  id="search"
                  label="Search Resources"
                  name="search"
                  value={query}
                  onChange={(e) => updateQuery(e.target.value)}
                  fullWidth
                />
              {/* <button type='submit' className='submit-button'>Search</button>  */}
               
            {/* </form> */}
 
          {/* </div>  */}
          <List>
                <ListItem>
                  <ListItemText
                    disableTypography
                    primary={<Typography variant="h6" style={{cursor: 'default',marginRight: '920px'}}>Number of Results: {searchedResources.length}</Typography>}
                  />
                    <ListItemSecondaryAction>
                      <Tooltip title="CSV Export" aria-label="download">
                        <IconButton edge="end" style={{border:'none',outline:'none'}}
                          onClick={() => downloadCSV2(searchedResources)}
                        >
                          <GetAppOutlined fontSize="large" />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                </ListItem>      
              </List>
         
         {/* this is for card  style*/}
         {searchedResources.map((user, index) =>(
           <Card key={index} style={{ maxWidth: "350px", minWidth: "250px", display: "inline-block", margin: "20px" }}>
           <CardContent>
             <Typography gutterBottom variant="h6" component="h6" style={{ color: user.isAdmin && '#ff0000' }}>
               Name: {user.name}
             </Typography>
             <Typography variant="body2" color="textSecondary" component="p">
               {user.bio}
             </Typography><br />
           </CardContent>
       </Card>
         ))}


            </>
    )
}

export default CardList;