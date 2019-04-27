import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";
import { EventEmitter } from "events";
const CHANGE_EVENT = "change";

let _courses = [];

class courseStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _courses;
  }

  getCourseById(id) {
    return _courses.find(c => c.id === parseInt(id, 10));
  }
}

const store = new courseStore();

Dispatcher.register(function(action) {
  switch (action.actionType) {
    case actionTypes.LOAD_COURSES:
      _courses = action.courses;
      store.emitChange();
      break;
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);
      store.emitChange();
      break;
    case actionTypes.UPDATE_COURSE:
      // Update the relevant course
      _courses = _courses.map(course => {
        if (course.id === action.course.id) {
          return action.course;
        }
        return course;
      });
      store.emitChange();
      break;
    case actionTypes.DELETE_COURSE:
      _courses = _courses.filter(c => c.id !== parseInt(action.id, 10));
      store.emitChange();
      break;
    default:
    // no op
  }
});

export default store;
