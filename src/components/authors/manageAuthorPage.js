"use strict";

var React = require('react');
var createReactClass = require('create-react-class');
var ReactRouter = require('react-router-dom');
var withRouter = ReactRouter.withRouter;
var browserHistory = ReactRouter.browserHistory;
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var Redirect = ReactRouter.Redirect;
var Prompt = ReactRouter.Prompt;

var ManageAuthorPage = createReactClass({
	componentDidMount: function() {
		var authorId = this.props.match.params.id; //from the path '/author:id'
		if (authorId) {
			this.setState({author: AuthorStore.getAuthorById(authorId) });
		}
	},

	getInitialState: function() {
		return {
			author: { id: '', firstName: '', lastName: '' },
			errors: {},
			dirty: false,
			redirect: false
		};
	},

	setAuthorState: function(event) {
		// copy state since it's immutable
		var author = Object.assign({}, this.state.author);
		author[event.target.name] = event.target.value;
		this.setState({author: author, dirty: true});
	},

	authorFormIsValid: function() {
		var formIsValid = true;
		this.state.errors = {}; //clear any previous errors.

		if (this.state.author.firstName.length < 3) {
			this.state.errors.firstName = 'First name must be at least 3 characters.';
			formIsValid = false;
		}

		if (this.state.author.lastName.length < 3) {
			this.state.errors.lastName = 'Last name must be at least 3 characters.';
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	saveAuthor: function(event) {
		event.preventDefault();

		if (!this.authorFormIsValid()) {
			return;
		}

		if (this.state.author.id) {
			AuthorActions.updateAuthor(this.state.author);
		} else {
			AuthorActions.createAuthor(this.state.author);
		}
		
		this.setState({dirty: false, redirect: true}, function() {
			toastr.success('Author saved.');
		});
	},

	render: function() {
		return (
			<div>
				{ this.state.redirect && <Redirect to="/authors" />}
				<Prompt when={this.state.dirty} message="Leave without saving?" />
				<AuthorForm
					author={this.state.author}
					onChange={this.setAuthorState}
					onSave={this.saveAuthor}
					errors={this.state.errors} />
			</div>
		);
	}
});

// Using withRouter higher order component to wrap ManageAuthorPage
// to notify the user when attempting to navigate away when the form is dirty.
module.exports = ManageAuthorPage;