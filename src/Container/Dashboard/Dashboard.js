import React, { useContext, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classes from './Dashboard.module.css';
import TopicList from "./TopicList/TopicList";
import Dialog from "./Dialog/Dialog";
import io from "socket.io-client";
// import {user} from './Store';


import { ctx } from "./Store";



// const Box = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
// `;
// const Header = styled.div`
//   height: 64px;
// `;
// const Content = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: row;
// `;

// const SideLeft = styled.div`
//   border-right: 2px solid grey;
//   width: 300px;
//   background: #6a6767;
 
// `;
// const SideRight = styled.div`
//   padding: 5px;
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   background: #36393E;
  
// `;
// const DialogBox = styled.div`
//   flex: 1;
//   margin-top: 20px;
  
// `;

// const MessageInputBox = styled.div`
//   height: 60px;
//   margin-bottom: 20px;
//   background: #36393E;
//   border: 2px solid red;  
// `;

function Dashboard() {
  const { allCharts, sendMessageAction, user } = useContext(ctx);
  const topics = Object.keys(allCharts);
  const [activeTopic, changeActiveTopic] = useState(topics[0]);
  const [textValue, setTextValue] = useState("");
  console.log(textValue.length)
  console.log(Object.keys(allCharts))
  console.log(user);
 

 if(textValue <= 0) {

 }



  return (
    <div className={classes.Box}>
     
      <div className={classes.Content}>
        <div className={classes.SideLeft}>
          
          <h3 className={classes.title}>Chat app</h3>
          
          <TopicList {...{ topics, changeActiveTopic, activeTopic }} />
        </div>
        <div className={classes.SideRight}>
        <div className={classes.PageHeader}>
          
          {'#' + activeTopic}
        </div>
        
        
          <div className={classes.DialogBox}>
            <Dialog list={allCharts[activeTopic]} />
            
          </div>
                 
        
          <div className={classes.MessageInputBox}>
            <TextField
            id="standard-full-width"
            fullWidth
            className={classes.TextArea}
            placeholder="type your message here"
              rows={1}
              
              value={textValue}
              onChange={e => setTextValue(e.target.value)}
              onKeyDown={e => {
                //will only send a message if the text length is more than 0
  
                if(textValue.length > 0) {
                
                if (e.keyCode === 13) {     
                  
                 
                  sendMessageAction({
                    from: user,
                    msg: textValue,
                    topic: activeTopic
                  });
                  setTextValue("");
                
                }
              } else {
                
                if( e.keyCode === 13) {
                  alert("You need to send a message")
                }
                
              }
              }}
            />
            <Button
            type="submit"
             variant="contained"
             className={classes.button}
             label="filled"
              onClick={() => {
                if(textValue.length > 0) { 
                  sendMessageAction({
                    from: user,
                    msg: textValue,
                    topic: activeTopic
                  });
                  setTextValue("");

                }
                
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
