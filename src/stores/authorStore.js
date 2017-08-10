import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import {EventEmitter} from 'events';
import _ from 'lodash';
const CHANGE_EVENT = 'change';

const _authors = [];

const AuthorStore = Object.assign({}, EventEmitter.prototype, {
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
		case ActionTypes.LOAD_AUTHORS:
			_authors = action.authors;
			AuthorStore.emitChange();
			break;
		case ActionTypes.CREATE_AUTHOR:
			_authors.push(action.author);
			AuthorStore.emitChange();
			break;
		case ActionTypes.UPDATE_AUTHOR:
			var existingAuthor = _.find(_authors, {id: action.author.id});
			var existingAuthorIndex = _.indexOf(_authors, existingAuthor); 
			_authors.splice(existingAuthorIndex, 1, action.author);
			AuthorStore.emitChange();
			break;	
		case ActionTypes.DELETE_AUTHOR:
			_.remove(_authors, function(author) {
				return action.id === author.id;
			});
			AuthorStore.emitChange();
			break;
		default:
			// no op
	}
});

export default AuthorStore;