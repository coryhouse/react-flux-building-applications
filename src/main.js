"use strict";

var React = require('react');
var ReactDom = require('react-dom');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

ReactDom.render(routes, document.getElementById('app'));
