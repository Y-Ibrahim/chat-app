import React, { createContext, useReducer } from "react";
import io from "socket.io-client";
export const ctx = createContext();

/**
  initState = {
    topic1: [
      {form: "", msg: "hi"}
    ]
  }
 */

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
const initialState = {
  hangout: [
    
  ],
  techChat: [
    
  ]
};
const reducer = (state, action) => {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }]
      };
    default:
      return state;
  }
};

let socket;

const name = prompt('What is your name?');


const user = name;

function sendMessageAction(value) {
  socket.emit("chat message", value);
}

const Store = props => {
  const [allCharts, dispatch] = useReducer(reducer, initialState);

  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", function(msg) {
      dispatch({ type: RECEIVE_MESSAGE, payload: msg });
    });
  }

  return (
    <ctx.Provider value={{ allCharts, sendMessageAction, user }}>
      {props.children}
    </ctx.Provider>
  );
};
export default Store;

console.log(user);