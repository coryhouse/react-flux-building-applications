import dispatcher from "../dispatcher/appDispatcher";
import * as authorApi from "../api/authorApi";
import actionTypes from "../constants/actionTypes";

export function loadAuthors() {
  authorApi.getAuthors().then(authors => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_AUTHORS,
      authors
    });
  });
}
