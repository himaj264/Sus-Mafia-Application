import React from "react";
import "./chat.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
function DirectChat(props) {
    return (
        
        // <div className="App">
            
            <div className="app__body">
                <Sidebar/>
                <Chat />
            </div>
        //  </div> 
        
    );
}
export default DirectChat