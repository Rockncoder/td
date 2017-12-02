import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, Header, Footer, Title, Content, Form, Item, Input, List, Button, Icon} from 'native-base';
import {View, Text, Dimensions} from 'react-native';

import ToDoItem from './ToDoItem';

const {width} = Dimensions.get('window');

export default class ToDoList extends Component {

  static propTypes = {
    removeTodo: PropTypes.func,
    setVisibilityFilter: PropTypes.func,
    toggleTodo: PropTypes.func,
    todos: PropTypes.array,
    displayType: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {inputText: '', displayType: 'all'};
  }

  onSubmit() {
    if (this.state.inputText.length > 0) {
      this.props.addTodo(this.state.inputText);
      this.setState({
        inputText: '',
      });
    }
  }

  remove(id) {
    this.props.removeTodo(id);
  }

  toggle(id) {
    this.props.toggleTodo(id);
  }

  renderTodoList() {
    let filteredList = [];

    switch (this.props.displayType) {
      case 'all':
        filteredList = this.props.todos;
        break;
      case 'completed':
        filteredList = this.props.todos.filter(item => item.completed);
        break;
      default:
        filteredList = this.props.todos.filter(item => !item.completed);
    }

    return filteredList.map((item, index) =>
      <ToDoItem
        toggle={() => this.toggle(index)}
        remove={() => this.remove(index)}
        item={item}
        key={index}
      />
    );

    /*
        switch(this.props.displayType){
          case 'all':
            return this.props.todos.map((item, index) =>
              <TodoItem
                toggle={() => this.toggle(index)}
                remove={() => this.remove(index)}
                item={item}
                key={index}
              />
            );
          case 'completed':
            return this.props.todos.filter(item => item.completed).map((item, index) =>
              <TodoItem
                toggle={() => this.toggle(index)}
                remove={() => this.remove(index)}
                item={item}
                key={index}
              />
            );
          default:
            return this.props.todos.filter(item => !item.completed).map((item, index) =>
              <TodoItem
                toggle={() => this.toggle(index)}
                remove={() => this.remove(index)}
                item={item}
                key={index}
              />
            );
        }


        if ((this.props.displayType === 'all')) {
          return this.props.todos.map((item, index) =>
            <TodoItem
              toggle={() => this.toggle(index)}
              remove={() => this.remove(index)}
              item={item}
              key={index}
            />
          );
        } else if (this.props.displayType === 'completed') {
          const completed = this.props.todos.filter(item => item.completed).length;
          if (completed > 0) {
            return this.props.todos.map((item, index) => {
              if (item.completed === true) {
                return (<TodoItem
                  toggle={() => this.toggle(index)}
                  remove={() => this.remove(index)}
                  item={item}
                  key={index}
                />);
              }

              return null;
            });
          }
          return <View style={{alignItems: 'center', paddingTop: 10}}><Text>No Completed Data</Text></View>;
        }

        return this.props.todos.map((item, index) => {
          if (item.completed === false) {
            return (
              <TodoItem
                toggle={() => this.toggle(index)}
                remove={() => this.remove(index)}
                item={item}
                key={index}
              />
            );
          }
          return null;
        });
    */
  }

  render() {
    return (
      <Container>
        <Header>
          <Form
            style={{flex: 1}}
          >
            <Item last>
              <Input
                placeholder="Add a ToDo"
                value={this.state.inputText}
                onChangeText={inputText => this.setState({inputText})}
                onSubmitEditing={() => this.onSubmit()}
                maxLength={35}
              />
              <Icon
                name="md-add-circle"
                style={{color: '#000000'}}
                onPress={() => this.onSubmit()}
              />
            </Item>
          </Form>
        </Header>

        <Content contentContainerStyle={{justifyContent: 'space-between'}}>
          <View>
            <List>
              {this.renderTodoList()}
            </List>


          </View>


        </Content>
        <Footer>
          {
            this.props.todos.length > 0 && <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'space-around',
                width,
              }}
            >
              <Button
                transparent
                bordered={this.props.displayType === 'all'}
                onPress={() => this.props.setVisibilityFilter('all')}
              ><Text>All</Text></Button>

              <Button
                transparent
                bordered={this.props.displayType === 'completed'}
                onPress={() => this.props.setVisibilityFilter('completed')}
              ><Text>Completed</Text></Button>

              <Button
                transparent
                bordered={this.props.displayType === 'active'}
                onPress={() => this.props.setVisibilityFilter('active')}
              ><Text>Active</Text></Button>

            </View>
          }
        </Footer>
      </Container>
    );
  }
}
