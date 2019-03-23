import dispatcher from "../dispatcher/appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "../constants/actionTypes";

export function loadCourses() {
  courseApi.getCourses().then(courses => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses
    });
  });
}

export function createCourse(course) {
  courseApi.saveCourse(course).then(newCourse => {
    //Hey dispatcher, go tell all the stores that an author was just created.
    dispatcher.dispatch({
      actionType: actionTypes.CREATE_COURSE,
      course: newCourse
    });
  });
}

export function updateCourse(course) {
  courseApi.saveCourse(course).then(updatedCourse => {
    dispatcher.dispatch({
      actionType: actionTypes.UPDATE_COURSE,
      course: updatedCourse
    });
  });
}

export function deleteCourse(id) {
  courseApi.deleteCourse(id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_COURSE,
      id: id
    });
  });
}
