import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import AuthorApi from '../api/authorApi';

const InitializeActions = {
	initApp: function() {
		Dispatcher.dispatch({
			actionType: ActionTypes.INITIALIZE,
			initialData: {
				authors: AuthorApi.getAllAuthors()
			}
		});
	}
};

export default InitializeActions;