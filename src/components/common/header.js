"use strict";

var React = require('react');
var createReactClass = require('create-react-class');
var Link = require('react-router-dom').Link;

var Header = createReactClass({
	render: function() {
		return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            <img src="/images/pluralsight-logo.png" />
          </Link>
          <div className="navbar-nav">
            <Link to="/" className="nav-item nav-link">Home</Link>
            <Link to="/authors" className="nav-item nav-link">Authors</Link>
            <Link to="/about" className="nav-item nav-link">About</Link>
          </div>
        </nav>
		);
	}
});

module.exports = Header;
