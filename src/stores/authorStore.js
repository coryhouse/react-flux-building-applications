import Dispatcher from '../dispatcher/appDispatcher';
import actionTypes from '../constants/actionTypes';
import {EventEmitter} from 'events';
import _ from 'lodash';
const CHANGE_EVENT = 'change';

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

	getAllAuthors: function() {
		return _authors;
	},

	getAuthorById: function(id) {
		return _.find(_authors, {id: id});
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case actionTypes.LOAD_AUTHORS:
			_authors = action.authors;
			authorStore.emitChange();
			break;
		case actionTypes.CREATE_AUTHOR:
			_authors.push(action.author);
			authorStore.emitChange();
			break;
		case actionTypes.UPDATE_AUTHOR:
			var existingAuthor = _.find(_authors, {id: action.author.id});
			var existingAuthorIndex = _.indexOf(_authors, existingAuthor); 
			_authors.splice(existingAuthorIndex, 1, action.author);
			authorStore.emitChange();
			break;	
		case actionTypes.DELETE_AUTHOR:
			_.remove(_authors, function(author) {
				return action.id === author.id;
			});
			authorStore.emitChange();
			break;
		default:
			// no op
	}
});

export default authorStore;