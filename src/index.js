import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();
render(
  <Router>
    <MuiThemeProvider>
      <Route path="/" component={App} />
    </MuiThemeProvider>
  </Router>, document.getElementById('root'));
registerServiceWorker();
