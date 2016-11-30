"use strict";

var React = require('react');
var ReactDom = require('react-dom');
var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

Router.run(routes, function(Handler) {
	ReactDom.render(<Handler/>, document.getElementById('app'));
});
