"use strict";

var React = require('react');
var ReactRouter = require('react-router');
var withRouter = ReactRouter.withRouter;
var browserHistory = ReactRouter.browserHistory;
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
	componentDidMount: function() {
		this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
	},

	routerWillLeave: function(nextLocation) {
		// Return false to prevent a transition w/o prompting the user,
		// or return a string to allow the user to decide:
		if (this.state.dirty) {
			return 'Leave without saving?';
		}
		return true;
	},

	getInitialState: function() {
		return {
			author: { id: '', firstName: '', lastName: '' },
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function() {
		var authorId = this.props.params.id; //from the path '/author:id'
		if (authorId) {
			this.setState({author: AuthorStore.getAuthorById(authorId) });
		}
	},

	setAuthorState: function(event) {
		this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;
		this.state.author[field] = value;
		return this.setState({author: this.state.author});
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
		
		this.setState({dirty: false}, function() {
			toastr.success('Author saved.');
			browserHistory.push('/authors');
		});
	},

	render: function() {
		return (
			<AuthorForm
				author={this.state.author}
				onChange={this.setAuthorState}
				onSave={this.saveAuthor}
				errors={this.state.errors} />
		);
	}
});

// Using withRouter higher order component to wrap ManageAuthorPage
// to notify the user when attempting to navigate away when the form is dirty.
module.exports = withRouter(ManageAuthorPage);