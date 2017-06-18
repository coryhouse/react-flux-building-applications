import Dispatcher from '../dispatcher/appDispatcher';
import AuthorApi from '../api/authorApi';
import ActionTypes from '../constants/actionTypes';

export function createAuthor(author) {
	var newAuthor = AuthorApi.saveAuthor(author);

	//Hey dispatcher, go tell all the stores that an author was just created.
	Dispatcher.dispatch({
		actionType: ActionTypes.CREATE_AUTHOR,
		author: newAuthor
	});
}

export function updateAuthor(author) {
	var updatedAuthor = AuthorApi.saveAuthor(author);

	Dispatcher.dispatch({
		actionType: ActionTypes.UPDATE_AUTHOR,
		author: updatedAuthor
	});
}

export function deleteAuthor(id) {
	AuthorApi.deleteAuthor(id);

	Dispatcher.dispatch({
		actionType: ActionTypes.DELETE_AUTHOR,
		id: id
	});
}