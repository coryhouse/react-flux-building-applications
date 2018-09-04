"use strict";

var React = require('react');
var createReactClass = require('create-react-class');
var ReactRouter = require('react-router-dom');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');

var Redirect = ReactRouter.Redirect;
var Prompt = ReactRouter.Prompt;

var ManageAuthorPage = createReactClass({
	getInitialState: function() {
		return {
			author: { id: '', firstName: '', lastName: '' },
			errors: {},
			dirty: false,
			redirect: false
		};
	},

	componentDidMount: function() {
		var authorId = this.props.match.params.id; //from the path '/author:id'
		if (authorId) {
			this.setState({author: AuthorStore.getAuthorById(authorId) });
		}
	},

	setAuthorState: function(event) {
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
		
		this.setState({dirty: false, redirect: true});
		// TODO: display author saved
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

module.exports = ManageAuthorPage;