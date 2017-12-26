"use strict";

var React = require('react');
var createReactClass = require('create-react-class');
var Prompt = require('react-router-dom').Prompt;
var withRouter = require('react-router').withRouter;

var About = createReactClass({
	render: function () {
		return (
			<div>
				<Prompt message="Are you sure you want to leave a page this exiting?" />
				<h1>About</h1>
				<div>
					This application uses the following technologies:
					<ul>
						<li>React</li>
						<li>React Router</li>
						<li>Flux</li>
						<li>Node</li>
						<li>Gulp</li>
						<li>Browserify</li>
						<li>Bootstrap</li>
					</ul>
				</div>
			</div>
		); 
	}
});

module.exports = withRouter(About);