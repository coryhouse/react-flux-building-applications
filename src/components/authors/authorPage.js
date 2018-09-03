"use strict";

var React = require('react');
var createReactClass = require('create-react-class');
var Router = require('react-router');
var Link = require('react-router-dom').Link;
var AuthorStore = require('../../stores/authorStore');
var AuthorActions = require('../../actions/authorActions');
var AuthorList = require('./authorList');

var AuthorPage = createReactClass({
	getInitialState: function() {
		return {
			authors: AuthorStore.getAllAuthors()
		};
	},

	componentWillMount: function() {
		AuthorStore.addChangeListener(this._onChange);
	},

	//Clean up when this component is unmounted
	componentWillUnmount: function() {
		AuthorStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({ authors: AuthorStore.getAllAuthors() });
	},

	render: function() {
		return (
			<div>
				<h1>Authors</h1>
				<Link to="author" className="btn btn-primary">Add Author</Link>
				<AuthorList authors={this.state.authors} />
			</div>
		);
	}
});

module.exports = AuthorPage;