import React from 'react'
import "./Chatting.css";
import {Avatar} from "@material-ui/core";
import { useState ,useEffect,useParams, useRef} from 'react';
import {Box} from "@material-ui/core"
import {TextField} from '@material-ui/core';
import { Input } from '@material-ui/core';
import io from 'socket.io-client';
import axios from 'axios';

function Chat() {
    const bottomRef = useRef();

    const [update, setUpdate] = useState(true);
    const [input,setInput] = useState("");
    const [msgs,setMsgs] = useState([]);
    const [user, setUser] = useState(null);

    const scrollToBottom = () => {
        // if(typeof(chatId) !== 'undefined') {
          bottomRef.current.scrollIntoView({
            behaviour: 'smooth',
            block: 'nearest',
            inline: 'start',
          });
        // }
      };

const server = 'http://localhost:8080';
  const socket = io(server);

  const connectSocket = async () => {
    // await socket.on('Output Chat Message', (msgServer) => {
    //   console.log(msgServer);
    //   if(msgServer[0].chatMessage != null) {
    //     setMsgs(prev => {
    //       if(prev.length>0 && prev[prev.length-1]._id !== msgServer[0]._id) prev.push(msgServer[0]);
    //       else if(prev.length === 0) prev.push(msgServer[0]);

    //       return([
    //       ...prev
    //       ])
    //     });
    //   }
    // })
  };

  const getChats = async () => {
    const data = await axios.post(
        'http://localhost:8080/graphql',
        {
          query: `
          query {
            getChats{
              _id
              chatMessage
              sender {
                  _id
                  name
              }
              type
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
      setMsgs(data.data.data.getChats);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(input.trim() !== "") {
        let chatMessage,type,sender;

        chatMessage = input;
        type = 'Text'; 
        sender = user

        await socket.emit('Input Chat Message', {
            chatMessage,
            sender,
            type,
        });
        setInput('');
        setMsgs([...msgs, { chatMessage, sender, type }])
        // setVisible(false);
        setUpdate((prev) => !prev);
    }
  };

  useEffect(() => {
    connectSocket();
  },[update])

  useEffect(() => {
    getChats()
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  }, [])

  useEffect(() => {
    scrollToBottom();
  },[msgs])

  return (
    <div className="chat">
        <div className='chat__header'>
            <Avatar />
            <div className='chat__headerInfo'>
                <h3>Community Chat</h3>
                <p>SusMafia</p>
            </div>
            {/* <div className='chat__headerRight'>

            </div> */}
        </div>
        <div className='chat__body'>
            {
                msgs.map((msg, index) => (
                    <p className={`chat__message ${msg.sender._id === user._id && "chat__reciever"}`} key={index}>
                        <span className='chat__name'>{msg.sender.name}</span>
                            {msg.chatMessage}
                        {/* <span className='chat__timestamp'>3:20PM</span> */}
                        <br />
                    </p>
                ))
            }
            
            
         <div ref={bottomRef}></div>
        </div>
        <div className='chat__footer'>
            <form>
           
                {/* <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a Message' 
                type="text" /> */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  label="Type a message"
                  name="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  fullWidth
                />
                    <button onClick={(e) => handleSubmit(e)} type="submit">Send a Message</button>
                
            </form>
        </div>

    </div>
  )
}

export default Chat