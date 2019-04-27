import dispatcher from "../appDispatcher";
import * as authorApi from "../api/authorApi";
import actionTypes from "./actionTypes";

export function loadAuthors() {
  authorApi.getAuthors().then(authors => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_AUTHORS,
      authors
    });
  });
}
