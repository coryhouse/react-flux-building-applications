import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
// Note: I don't technically need these imports since they're imported on ManageCoursePage.js, but 
// it's nice to import them here for clarity.
//import authorStore from './stores/authorStore'; // eslint-disable-line no-unused-vars
//import courseStore from './stores/courseStore'; // eslint-disable-line no-unused-vars
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';

loadAuthors();
loadCourses();

render(
  <Router>
    <Route path="/" component={App} />
  </Router>, document.getElementById('root'));
registerServiceWorker();
