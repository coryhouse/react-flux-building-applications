import React from 'react';
import Router from 'react-router';
import {Link} from Router;
import AuthorStore from '../../stores/authorStore';
import AuthorActions from '../../actions/authorActions';
import AuthorList from './authorList';

class AuthorPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			authors: []
		};
	}

	componentDidMount() {
		return {
			authors: AuthorStore.getAllAuthors()
		};
	}

	componentWillMount() {
		AuthorStore.addChangeListener(this._onChange);
	}

	//Clean up when this component is unmounted
	componentWillUnmount() {
		AuthorStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		this.setState({ authors: AuthorStore.getAllAuthors() });
	}

	render() {
		return (
			<div>
				<h1>Authors</h1>
				<Link to="addAuthor" className="btn btn-default">Add Author</Link>
				<AuthorList authors={this.state.authors} />
			</div>
		);
	}
}

export default AuthorPage;