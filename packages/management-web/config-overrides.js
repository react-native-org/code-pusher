const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = injectBabelPlugin(['transform-decorators-legacy'], config);
  config = rewireReactHotLoader(config, env);
  config = rewireLess.withLoaderOptions({
    // modifyVars: { '@primary-color': '#1DA57A' }
    javascriptEnabled: true
  })(config, env);
  return config;
};
