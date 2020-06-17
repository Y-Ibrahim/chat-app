import React, { useContext, useState } from "react";
import styled from "styled-components";
import {Input, Button } from "antd";
import classes from './Dashboard.module.css';
import TopicList from "./TopicList/TopicList";
import Dialog from "./Dialog/Dialog";

import { ctx } from "./Store";

const { TextArea } = Input;

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
  console.log(allCharts)


  


  return (
    <div className={classes.Box}>
     
      <div className={classes.Content}>
        <div className={classes.SideLeft}>
          {/* <img src="https://w7.pngwing.com/pngs/179/462/png-transparent-black-power-button-logo-computer-icons-button-power-symbol-on-off-button-window-symbol-on-off-button-thumbnail.png" width="100px"/> */}
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
            <TextArea
            className={classes.TextArea}
              rows={1}
              value={textValue}
              onChange={e => setTextValue(e.target.value)}
            />
            <button
             className={classes.button}
              onClick={() => {
                sendMessageAction({
                  from: user,
                  msg: textValue,
                  topic: activeTopic
                });
                setTextValue("");
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
