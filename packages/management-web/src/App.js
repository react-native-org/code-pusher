import './App.css';

import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { routes } from './routes';

const initialState = {
  isLogged: false,
  user: {
    userName: ''
  }
};

const appContextReducer = function(state = initialState, action) {
  switch (action.type) {
    case `appContext/bb`:
      return { ...state, ...action.payload, isLogged: true };
    case `appContext/test`:
      return { ...state, isLogged: false, user: {} };
    default:
      return state;
  }
};

const store = createStore(appContextReducer, initialState);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            {routes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                render={props => <route.component {...props} routes={route.routes} />}
              />
            ))}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
