import Dispatcher from "../dispatcher/appDispatcher";
import actionTypes from "../constants/actionTypes";
import { EventEmitter } from "events";
const CHANGE_EVENT = "change";

let _authors = [];

const authorStore = Object.assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getAuthors: function() {
    return _authors;
  }
});

Dispatcher.register(function(action) {
  switch (action.actionType) {
    case actionTypes.LOAD_AUTHORS:
      _authors = action.authors;
      authorStore.emitChange();
      break;
    default:
    // no op
  }
});

export default authorStore;
