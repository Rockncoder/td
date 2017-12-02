import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import AppContainer from './AppContainer';
import reducer from './reducer';
import devToolsEnhancer from 'remote-redux-devtools';
const store = createStore(reducer, devToolsEnhancer());

export default class ToDo extends Component {
  render() {
    return (
      <Provider store={store} >
        <AppContainer />
      </Provider>
    );
  }
}