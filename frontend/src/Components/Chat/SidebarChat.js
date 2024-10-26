import React from 'react'
import "./SidebarChat.css";
 import {Avatar} from "@material-ui/core";
import { useState } from 'react';
import { useEffect } from 'react';
function SidebarChat({addNewChat}) {
   
  return(
    <div className='sidebarChat'>
        <Avatar />
        <div className='sidebarChat__info'>
            <h2>Talk to Community</h2>
            <p>Connect with others!</p>
        </div>

        </div>
  ) 
}

export default SidebarChat