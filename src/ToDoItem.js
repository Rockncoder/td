import React from 'react';
import PropTypes from 'prop-types';
import {Text, Icon, ListItem, CheckBox} from 'native-base';

const ToDoItem = ({toggle, remove, item}) => (
  <ListItem style={{flex: 1}}>
    <CheckBox onPress={toggle} checked={item.completed}/>
    <Text style={{alignSelf: 'center'}}>
      {item.text}
    </Text>
    <Icon name="md-trash" style={{color: '#000000'}} onPress={remove}/>
  </ListItem>
);

ToDoItem.propTypes = {
  toggle: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default ToDoItem;