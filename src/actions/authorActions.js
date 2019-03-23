import dispatcher from "../dispatcher/appDispatcher";
import * as authorApi from "../api/authorApi";
import actionTypes from "../constants/actionTypes";

export function loadAuthors() {
  authorApi.getAllAuthors().then(authors => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_AUTHORS,
      authors
    });
  });
}

export function createAuthor(author) {
  const newAuthor = authorApi.saveAuthor(author);

  //Hey dispatcher, go tell all the stores that an author was just created.
  dispatcher.dispatch({
    actionType: actionTypes.CREATE_AUTHOR,
    author: newAuthor
  });
}

export function updateAuthor(author) {
  const updatedAuthor = authorApi.saveAuthor(author);

  dispatcher.dispatch({
    actionType: actionTypes.UPDATE_AUTHOR,
    author: updatedAuthor
  });
}

export function deleteAuthor(id) {
  authorApi.deleteAuthor(id);

  dispatcher.dispatch({
    actionType: actionTypes.DELETE_AUTHOR,
    id: id
  });
}
