import Dispatcher from '../dispatcher/appDispatcher';
import * as courseApi from '../api/courseApi';
import actionTypes from '../constants/actionTypes';

export function loadCourses() {
    courseApi.getAllCourses().then(courses => {
        Dispatcher.dispatch({
            actionType: actionTypes.LOAD_COURSES,
            courses
        });
    })
}

export function createCourse(course) {
    courseApi.saveCourse(course).then(newCourse => {
        //Hey dispatcher, go tell all the stores that an author was just created.
        Dispatcher.dispatch({
            actionType: actionTypes.CREATE_COURSE,
            course: newCourse
        });
    });
}

export function updateCourse(course) {
    courseApi.saveCourse(course).then(updatedCourse => {
        Dispatcher.dispatch({
            actionType: actionTypes.UPDATE_COURSE,
            course: updatedCourse
        });
    });
}

export function deleteCourse(id) {
    courseApi.deleteCourse(id).then( () => {
        Dispatcher.dispatch({
            actionType: actionTypes.DELETE_COURSE,
            id: id
        });
    });

}