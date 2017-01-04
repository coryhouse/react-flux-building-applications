"use strict";

var React = require('react');
var Router = require('react-router');
var CourseActions = require('../../actions/courseActions');
var toastr = require('toastr');

var Link = Router.Link;

var CourseList = React.createClass({
	deleteCourse: function(id, event) {
		event.preventDefault();
		CourseActions.deleteCourse(id);
		toastr.success('Course Deleted');
	},

	render: function() {
		var createCourseRow = function(course) {
			return (
				//Note that you need to specify a key when iterating.
				<tr key={course.id}>
					<td><a href={course.watchHref}>Watch</a></td>
					<td><a href="#" onClick={this.deleteCourse.bind(this, course.id)}>Delete</a></td>
					<td><Link to="manageCourse" params={{id: course.id}}>{course.title}</Link></td>
					<td>{course.author.name}</td>
					<td>{course.category}</td>
					<td>{course.length}</td>
				</tr>
			);
		};

		return (
			<table className="table">
				<thead>
					<th></th>
					<th></th>
					<th>Title</th>
					<th>Author</th>
					<th>Category</th>
					<th>Length</th>
				</thead>
				<tbody>
					{this.props.courses.map(createCourseRow, this)}
				</tbody>
			</table>
		);
	}
});

module.exports = CourseList;