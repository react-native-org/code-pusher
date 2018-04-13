import './less/all.less';

import { Provider } from 'mobx-react';
import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { routes } from './routes';
import { store } from './store';

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
