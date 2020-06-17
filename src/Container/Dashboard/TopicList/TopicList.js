import React from "react";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';






function TopicList(props) {

  const style = {
    Background: '#36393E',
    
  }
  const { topics, changeActiveTopic, activeTopic } = props;
  return (
    <div>
    <MenuList>
      {topics.map((topic, index) => (
        <MenuItem
          onClick={e => {
            changeActiveTopic(topic);
          }}
          key={topic}
         style={style}
        >
          {topic}
        </MenuItem>
      ))}
    </MenuList>
    </div>
  );
}

export default TopicList;
