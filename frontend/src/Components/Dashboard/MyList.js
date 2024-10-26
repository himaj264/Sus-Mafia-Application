import React, { useState, useEffect } from 'react';
import { Avatar, Chip, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import { DashboardOutlined, Face, Create, Chat, ChatOutlined, CreateOutlined, AccountBalanceWalletOutlined, ShareOutlined } from '@material-ui/icons';

function MyList(props) {
  const { setSection, section } = props;

  const [name, setName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setName(user.name);
  }, [])

  return (
    <div>
      <ListItem style={{ marginTop: "10px", marginBottom: "15px" }}>
        <ListItemIcon>
          <Avatar src={""} />
        </ListItemIcon>
        <ListItemText primary={name} secondary={<Chip size="small" icon={<Face />} label="Mafioso" />} />
      </ListItem>
      <ListSubheader inset className='list-item-header'>Dashboard</ListSubheader>
      <ListItem button onClick={() => setSection('Dashboard')} className={section === 'Dashboard' ? 'highlight' : ''}>
        <ListItemIcon>
          <DashboardOutlined fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListSubheader inset className='list-item-header'>Account</ListSubheader>
      <ListItem button onClick={() => setSection('Profile')} className={section === 'Profile' ? 'highlight' : ''}>
        <ListItemIcon>
          <CreateOutlined fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button onClick={() => setSection('Wallet')} className={section === 'Wallet' ? 'highlight' : ''}>
        <ListItemIcon>
          <AccountBalanceWalletOutlined fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Wallet" />
      </ListItem>
      <ListSubheader inset className='list-item-header'>Community</ListSubheader>
      <ListItem button onClick={() => setSection('Chat')} className={section === 'Chat' ? 'highlight' : ''}>
        <ListItemIcon>
          <ChatOutlined fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Chat" />
      </ListItem>
      <ListItem button onClick={() => setSection('Share')} className={section === 'Share' ? 'highlight' : ''}>
        <ListItemIcon>
          <ShareOutlined fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Share" />
      </ListItem>
    </div>
  )
}

export default MyList;