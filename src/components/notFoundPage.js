"use strict";

var React = require('react');
var createReactClass = require('create-react-class');
var Link = require('react-router-dom').Link;

var NotFoundPage = createReactClass({
	render: function() {
		return (
			<div>
				<h1>Page Not Found</h1>
				<p>Whoops! Sorry, there is nothing to see here.</p>
				<p><Link to="/">Back to Home</Link></p>
			</div>
		);
	}
});

module.exports = NotFoundPage;