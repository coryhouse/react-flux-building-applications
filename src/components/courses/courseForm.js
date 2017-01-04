"use strict";

var React = require('react');
var TextInput = require('../common/textInput');
var SelectInput = require('../common/selectInput');

var CourseForm = React.createClass({

	//for validation. Can think of like a contract.
	//says what values are required in props when
	//calling this component.
	propTypes: {
		course: React.PropTypes.object.isRequired,
		allAuthors: React.PropTypes.array.isRequired,
		onSave: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	render: function() {
		return (
			<form>
				<h1>{this.props.course.id ? 'Edit' : 'Add'} Course</h1>
				<TextInput name="title"
					label="Title" 
					value={this.props.course.title}
					onChange={this.props.onChange}
					error={this.props.errors.title} />

				<SelectInput name="author"
					label="Author"
					value={this.props.course.author.id}
					defaultOption="Select Author"
					options={this.props.allAuthors}
					onChange={this.props.onChange} />

				<TextInput name="category"
					label="Category" 
					value={this.props.course.category}
					onChange={this.props.onChange}
					error={this.props.errors.category} />

				<TextInput name="length"
					label="Length" 
					value={this.props.course.length}
					onChange={this.props.onChange}
					error={this.props.errors.length} />

				<input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
			</form>
		);
	}
});

module.exports = CourseForm;