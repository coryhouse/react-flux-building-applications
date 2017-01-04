"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/actionTypes');
var CourseApi = require('../api/courseApi');
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

//Private. By convention, private vars begin with an underscore.
var _courses = [];

// Extend Store with EventEmitter to add eventing capabilities
var CourseStore = assign({}, EventEmitter.prototype, {
	//These first 3 functions should be a part
	//of any store so that changes are emitted
	//and listeners can be registered and removed.
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},	

	//get the entire list of courses
	getAllCourses: function() {
		return _courses;
	},

	getCourseBySlug: function(slug) {
		return _.find(_courses, {slug: slug});
	},

	getCourseById: function(id) {
		return _.find(_courses, { id: id});
	}
});

// Register callbacks with Dispatcher
Dispatcher.register(function(action) {
	switch(action.actionType) {
		case ActionTypes.INITIALIZE:
			_courses = CourseApi.getAllCourses();
			break;
		case ActionTypes.CREATE_COURSE:
			_courses.push(action.course);
			CourseStore.emitChange();
			break;
		case ActionTypes.UPDATE_COURSE:
			var existingCourse = _.find(_courses, {id: action.course.id});
			var existingCourseIndex = _.indexOf(_courses, existingCourse); 
			_courses.splice(existingCourseIndex, 1, action.course);
			CourseStore.emitChange();
			break;
		case ActionTypes.DELETE_COURSE:
			_.remove(_courses, function(course) {
				return course.id === action.id;
			});
			CourseStore.emitChange();
			break;
		default:
			return true;
	}
});

module.exports = CourseStore;