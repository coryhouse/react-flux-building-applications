"use strict";

var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router-dom');
var App = require('./components/app');

var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

ReactDom.render(
    <Router>
        <Route path="/" component={App} />
    </Router>, document.getElementById('app')
);
