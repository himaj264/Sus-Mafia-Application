import React, { useState, useEffect } from 'react'
import { Chip, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, List, ListItem, ListItemText, Typography, Tooltip, ListItemSecondaryAction, IconButton, Grid, Card, CardContent, TextField, InputAdornment, Button } from '@material-ui/core';
import { GetAppOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import abiDecoder from 'abi-decoder';
import axios from 'axios';
import './home.css'

import SusMafia from './SusMafia.json'

import { downloadCSV } from '../../helper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Walllet = (props) => {
  const [balance, setBalance] = useState('0');
  const [transactions, setTransactions] = useState([]);
  
  const classes = useStyles();

  useEffect(() => {
    const fetchDetails = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const data = await axios.post(
        'http://localhost:8080/graphql',
        {
          query: `
          query {
            getBalance(walletAddress: "${user.walletAddress}"){
              msg
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
        setBalance(data.data.data.getBalance.msg);
    
        const res = await axios.get(`https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=0x36e76d1163e55A401e7a4891Bf74740E7d612aa3&startblock=0&endblock=latest&page=1&offset=100&sort=desc&apikey=YourApiKeyToken`);
    
        if(res && res.data && res.data.result && user.walletAddress) {
          abiDecoder.addABI(SusMafia.abi);
          let txs = [];
          
          res.data.result.forEach((tx) => {
            console.log(tx.from.toLowerCase(), user.walletAddress)
            if(tx.to !== "") txs.push({
              hash: tx.hash,
              method: abiDecoder.decodeMethod(tx.input).name,
              age: (new Date(tx.timeStamp*1000)).toUTCString().replace(" GMT", ""),
              value: tx.value/1e18,
              fee: ((tx.gasPrice*tx.gasUsed)/1e18)
            })
          });
          console.log(txs)
          setTransactions(txs);
        }
    }
    fetchDetails();
  }, [])


  return (
    <>
    <div className="home-container">
      <div className="home-container1">
        <div className="home-stat">
          <h1 className="home-text">
            <span>{balance}</span>
          </h1>
          <span className="home-text2">SusMafia Coins Earned</span>
        </div>
        <label className="home-text3">Wallet</label>
      </div>
      
      {/* Download Transactions */}
      <List>
            <ListItem>
              <ListItemText
                disableTypography
                primary={<Typography variant="h6" style={{cursor: 'default',marginRight: '920px'}}>Number of Transactions: {transactions.length}</Typography>}
              />
                <ListItemSecondaryAction>
                  <Tooltip title="CSV Export" aria-label="download">
                    <IconButton edge="end" style={{border:'none',outline:'none'}}
                      onClick={() => downloadCSV(transactions)}
                    >
                      <GetAppOutlined fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>      
          </List>

          {/* Transactions */}
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead style={{ backgroundColor: '#f8fafd' }}>
                <TableRow>
                  <TableCell className='tableHeading'>Txn Hash</TableCell>
                  <TableCell className='tableHeading'>Method</TableCell>
                  <TableCell className='tableHeading'>Date Time (UTC)</TableCell>
                  <TableCell className='tableHeading'>Value</TableCell>
                  <TableCell className='tableHeading'>[Txn Fee]</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.hash}>
                    <TableCell onClick={() => window.open(`https://mumbai.polygonscan.com/tx/${tx.hash}`)} style={{ color: '#3f51b5', cursor: 'pointer' }}>
                      {tx.hash && tx.hash.substring(0,30)+'...'}
                    </TableCell>
                    <TableCell>
                      <Chip label={tx.method} style={{ backgroundColor: 'rgba(52,152,219,.1)' }} />
                    </TableCell>
                    <TableCell>{tx.age}</TableCell>
                    <TableCell>{tx.value} MATIC</TableCell>
                    <TableCell>{tx.fee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

    </div>
    </>
  )
}

export default Walllet
