import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();
ReactDOM.render(
    <Router>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Router>, document.getElementById('root'));
registerServiceWorker();
