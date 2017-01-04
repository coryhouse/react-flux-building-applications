"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var CourseApi = require('../api/courseApi');

//Note: In a real app, you'd likely be making an async call here.
//You'd likely want to dispatch a "SAVINGCOURSE"
//action so that the UI could display a preloader
//And you might rename CREATE_COURSE to CREATED_COURSE
//so that stores are notified when the async call completes.
//A nice description of this approach: 
//http://fluxxor.com/guides/async-data.html
var CourseActions = {
	createCourse: function(course) {
		course = CourseApi.saveCourse(course);

		//This is the action creator.
		Dispatcher.dispatch({
			actionType: ActionTypes.CREATE_COURSE,
			course: course
		});
	},

	updateCourse: function(course) {
		course = CourseApi.saveCourse(course);

		//This is the action creator.
		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATE_COURSE,
			course: course
		});
	},

	deleteCourse: function(id) {
		CourseApi.deleteCourse(id);
		//This is the action creator.
		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_COURSE,
			id: id
		});		
	}
};

module.exports = CourseActions;