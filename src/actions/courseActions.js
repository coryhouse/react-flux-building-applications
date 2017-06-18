import Dispatcher from '../dispatcher/appDispatcher';
import AuthorApi from '../api/authorApi';
import ActionTypes from '../constants/actionTypes';

export function loadCourses() {
    AuthorApi.getAllAuthors().then( authors => {
        Dispatcher.dispatch({
            actionType: ActionTypes.LOAD_COURSES,
            authors
        });
    })
}

export function createCourse(course) {
    var newCourse = CourseApi.save(course);

    //Hey dispatcher, go tell all the stores that an author was just created.
    Dispatcher.dispatch({
        actionType: ActionTypes.CREATE_COURSE,
        author: newAuthor
    });
}

export function updateCourse(author) {
    var updatedCourse = AuthorApi.saveAuthor(author);

    Dispatcher.dispatch({
        actionType: ActionTypes.UPDATE_COURSE,
        author: updatedAuthor
    });
}

export function deleteAuthor(id) {
    CourseApi.del(id);

    Dispatcher.dispatch({
        actionType: ActionTypes.DELETE_COURSE,
        id: id
    });
}