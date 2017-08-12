import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { deleteAuthor } from '../../actions/authorActions';
import toastr from 'toastr';

class AuthorList extends React.Component {
	onDeleteAuthorClick = event => {
		deleteAuthor(event.target.value);
		toastr.success('Author Deleted');
	}

	render() {
		const { authors } = this.props;
		return (
			<table className="table">
				<thead>
					<th></th>
					<th>ID</th>
					<th>Name</th>
				</thead>
				<tbody>
					{
						authors.map(author => {
							return (
								<tr key={author.id}>
									<td><button value={author.id} onClick={this.onDeleteAuthorClick}>Delete</button></td>
									<td><Link to="manageAuthor" params={{ id: author.id }}>{author.id}</Link></td>
									<td>{author.firstName} {author.lastName}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		)
	}
}

AuthorList.propTypes = {
	authors: PropTypes.array.isRequired
};

export default AuthorList;