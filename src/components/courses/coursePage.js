"use strict";

var React = require('react');
var Router = require('react-router');
var Navigation = require('react-router').Navigation;
var CourseList = require('./courseList');
var CourseStore = require('../../stores/courseStore');

//Note that this is a controller view, which is why it gets data
//and passes it down to child components via props.
var CoursePage = React.createClass({
	//using this mixin to programmatically navigate
	mixins: [Navigation],

	componentWillMount: function() {
		CourseStore.addChangeListener(this._onChange);
	},

	//Clean up when this component is unmounted
	componentWillUnmount: function() {
		CourseStore.removeChangeListener(this._onChange);
	},

	//Event handler for 'change' events coming from the AuthorStore
	_onChange: function() {
		this.setState({	courses: CourseStore.getAllCourses() });
	},

	getInitialState: function() {
		//note, have to return an object here, since a list won't do. Show without object first to prove.
		return {
			courses: CourseStore.getAllCourses()
		};
	},

	render: function() {
		var self = this; //we need this for the click handler so we have a reference to the proper "this" inside the click handler.
		return (
			<div>
				<h2>Courses</h2>
				{/* Note that I have to create an anonymous function
				or the click handler will immediately fire!
				Also, note the structure of this comment, have to
				create an empty JS expression to comment since this is
				all parsed as JS */}
				<input type="submit" value="Add Course" className="btn btn-default" onClick={ function() { self.transitionTo('addCourse'); }} />
				<CourseList 
					deleteCourse={this.deleteCourse}
					courses={this.state.courses}/>
			</div>
			);
	}
});

module.exports = CoursePage;