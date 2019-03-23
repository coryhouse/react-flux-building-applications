import Dispatcher from "../dispatcher/appDispatcher";
import actionTypes from "../constants/actionTypes";
import { EventEmitter } from "events";
const CHANGE_EVENT = "change";

let _courses = [];

const courseStore = Object.assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getCourses: function() {
    return _courses;
  },

  getCourseById: function(id) {
    return _courses.find(c => c.id === parseInt(id, 10));
  }
});

Dispatcher.register(function(action) {
  switch (action.actionType) {
    case actionTypes.LOAD_COURSES:
      _courses = action.courses;
      courseStore.emitChange();
      break;
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);
      courseStore.emitChange();
      break;
    case actionTypes.UPDATE_COURSE:
      // Update the relevant course
      _courses = _courses.map(course => {
        if (course.id === action.course.id) {
          return action.course;
        }
        return course;
      });
      courseStore.emitChange();
      break;
    case actionTypes.DELETE_COURSE:
      _courses = _courses.filter(c => c.id !== parseInt(action.id, 10));
      courseStore.emitChange();
      break;
    default:
    // no op
  }
});

export default courseStore;
