import Dispatcher from '../dispatcher/appDispatcher';
import {saveCourse, getAllCourses} from '../api/courseApi';
import actionTypes from '../constants/actionTypes';

export function loadCourses() {
    getAllCourses().then(courses => {
        Dispatcher.dispatch({
            actionType: actionTypes.LOAD_COURSES,
            courses
        });
    })
}

export function createCourse(course) {
    var newCourse = saveCourse(course);

    //Hey dispatcher, go tell all the stores that an author was just created.
    Dispatcher.dispatch({
        actionType: actionTypes.CREATE_COURSE,
        course: newCourse
    });
}

export function updateCourse(course) {
    var updatedCourse = saveCourse(course);

    Dispatcher.dispatch({
        actionType: actionTypes.UPDATE_COURSE,
        course: updatedCourse
    });
}

export function deleteCourse(id) {
    deleteCourse(id);

    Dispatcher.dispatch({
        actionType: actionTypes.DELETE_COURSE,
        id: id
    });
}