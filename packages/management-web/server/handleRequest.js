module.exports = async ctx => {
  const indexContent = fs.readFileSync(path.join(__dirname, 'dist/index.html'), 'utf8');

  async function handleRequest(context) {
    let html = await renderToHtml();
    context.body = html;
  }

  async function renderToHtml() {
    const store = createAppStore({});
    const App = createApp(store);
    const initialState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
    const appString = renderToString(App);
    const helmet = Helmet.renderStatic();
    // console.log(helmet.bodyAttributes.toString(), helmet)
    return indexContent
      .replace(/<!--appContent-->/g, appString)
      .replace(/<!--appState-->/g, `<script>window.__INITIAL_STATE__ = ${initialState}</script>`);
  }
};
