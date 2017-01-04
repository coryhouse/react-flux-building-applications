"use strict";

var React = require('react');

var Footer = React.createClass({
	render: function() {
		return (
				<footer className="navbar navbar-default">
					<p className="container-fluid">
						&copy; Pluralsight
					</p>
				</footer>
		);
	}
});

module.exports = Footer;