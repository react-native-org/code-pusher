// import React from 'react';
// import ReactDOM from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// const render = App => {
//   ReactDOM.render(
//     <AppContainer>
//       <App />
//     </AppContainer>,
//     document.getElementById('root')
//   );
// };
// registerServiceWorker();
//
// // 启动App
// render(App);
//
// if (module.hot) {
//   module.hot.accept('./App', () => {
//     render(App);
//   });
// }

function fZero() {
  console.log("Starting with nothing");
  // 绝对不会在这里发动核打击。
  // 但是这个函数仍然不纯
  return 0;
}

function Effect(f) {
  return {
    map(g) {
      return Effect(x => g(f(x)));
    },
    runEffects(x) {
      return f(x);
    }
  };
}

const zero = Effect(fZero);
const increment = x => x + 1; // 只是一个普通的函数
const one = zero.map(increment).map((res) => console.log(res));

one.runEffects();
