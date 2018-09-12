import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const render = App => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  );
};
registerServiceWorker();

// 启动App
render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}

