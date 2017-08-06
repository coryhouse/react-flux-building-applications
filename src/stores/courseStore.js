import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import { EventEmitter } from 'events';
import _ from 'lodash';
const CHANGE_EVENT = 'change';

let _courses = [];

const courseStore = Object.assign({}, EventEmitter.prototype, {
	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},

	getAllCourses: function () {
		return _courses;
	},

	getCourseById: function (id) {
		return _.find(_courses, { id: id });
	}
});

Dispatcher.register(function (action) {
	switch (action.actionType) {
		case ActionTypes.LOAD_COURSES:
			_courses = action.courses;
			courseStore.emitChange();
			break;
		case ActionTypes.CREATE_COURSE:
			_courses.push(action.course);
			courseStore.emitChange();
			break;
		case ActionTypes.UPDATE_COURSE:
			const existingCourse = _.find(_courses, { id: action.course.id });
			const existingCourseIndex = _.indexOf(_courses, existingCourse);
			_courses.splice(existingCourseIndex, 1, action.course);
			courseStore.emitChange();
			break;
		case ActionTypes.DELETE_COURSE:
			_.remove(_courses, function (course) {
				return action.id === course.id;
			});
			courseStore.emitChange();
			break;
		default:
		// no op
	}
});

export default courseStore;