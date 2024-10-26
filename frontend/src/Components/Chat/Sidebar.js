import React from 'react'
import "./Sidebar.css"
import {SearchOutlined} from "@material-ui/icons";
import "./Sidebar.css";
import SidebarChat from './SidebarChat';
function Sidebar() {
  return (
    <div className="sidebar">
        <div className="sidebar__header">

        </div>

        <div className='sidebar__search'>
            {/* <div className='sidebar__searchContainer'>
            <SearchOutlined />
            <input  placeholder='search converstation' type='text' />
            </div> */}
        </div>
        <div className="sidebar__chats">
            <SidebarChat />
            
            
        </div>
    </div>
  )
}

export default Sidebar