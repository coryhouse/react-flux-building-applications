"use strict";

//This is a "controller-view" in Facebook Jargon.
//It listens for changes in the CourseStore
//If passes data on to its children via props as well.
var React = require('react');
var Router = require('react-router');
var toastr = require('toastr');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var CourseForm = require('./courseForm');

var _getCourseState = function(id) {
	return CourseStore.getCourseById(id);
};

var _getAuthorFormattedForDropdown = function(author) {
	return {
		value: author.id,
		text: author.firstName + ' ' + author.lastName
	};
};

var ManageCoursePage = React.createClass({
	mixins: [
		Router.Navigation,
		Router.State
	],

	getInitialState: function() {
		return {
			course: { id: null, watchHref: '', title: '', author: '', length: '', category: '' },
			dirty: false,
			errors: {}
		};
	},

	componentWillMount: function() {
		CourseStore.addChangeListener(this._onChange);

		//need to transform author list into an array of objects
		//for use in the author dropdown.
		this.setState({allAuthors: AuthorStore.getAllAuthors().map(_getAuthorFormattedForDropdown) });

		var id = this.props.params.id; // from the path `/course/:id`

		if (id) {
			this.setState({course: _getCourseState(id)});
		}
	},

	statics: {
		//these two static functions are called by react-router by convention.
		willTransitionTo: function (transition, params, query, callback) {
			//not doing anything, but could add an auth check here
			//before calling the callback. It won't transition until you call the callback
			callback();
		},

		willTransitionFrom: function (transition, component) {
			//Note that I have to use component.state instead of this.state, since static.
			if (!this.hasErrors && component.state.dirty && !confirm('Leave without saving?')) {
				transition.abort();
			}
		}
	},

	//Clean up when this component is unmounted
	componentWillUnmount: function() {
		CourseStore.removeChangeListener(this._onChange);
	},

	validCourseForm: function() {
		var formIsValid = true;

		if (this.state.course.length < 5) {
			this.state.errors.title = 'Title must be at least 5 characters.';
			formIsValid = false;
		}

		if (!this.state.course.author) {
			this.state.errors.author = 'Author is required';
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	saveCourse: function(event) {
		event.preventDefault();

		if (!this.validCourseForm()) {
			return;
		}

		this.setState({dirty: false});

		if (this.state.course.id) {
			CourseActions.updateCourse(this.state.course);
		} else {
			CourseActions.createCourse(this.state.course);
		}

		toastr.success('Course saved.');
		this.transitionTo('courses'); //this works because of the mixin defined above.
	},

	//This is a centralized change handler
	//Could have validate method delegate to this
	//This is useful for elements that want validation
	//onBlur instead of onChange (which is where the validate
	//function is typically mapped)
	updateCourseState: function(event) {
		this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;

		//since author is an object rather than a string, 
		//need to get corresponding author object.
		if (field === 'author') {
			var author = AuthorStore.getAuthorById(value);
			value = _getAuthorFormattedForDropdown(author);
		}

		this.state.course[field] = value;
		return this.setState({course: this.state.course});
	},

	//Event handler for 'change' events coming from the CourseStore
	_onChange: function() {
		this.setState(_getCourseState());
	},

	render: function() {
		return (
			<CourseForm 
				course={this.state.course}
				onChange={this.updateCourseState}
				onSave={this.saveCourse}
				allAuthors={this.state.allAuthors}
				validate={this.validate}
				errors={this.state.errors} />
		);
	}
});

module.exports = ManageCoursePage;