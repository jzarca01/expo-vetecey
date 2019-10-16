import React, { Component } from 'react'
import { Provider } from 'react-redux'
import redux from './store';

import Router from './containers/Router'

export default class App extends Component {
  render() {
    return (
      <Provider store={redux.store}>
          <Router />
      </Provider>
    )
  }
}
