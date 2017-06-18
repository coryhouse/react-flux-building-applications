import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';

function AuthorForm({author, onChange, errors, onSave}) {
	return (
		<form>
			<h1>Manage Author</h1>
			<TextInput
				name="firstName"
				label="First Name"
				value={author.firstName}
				onChange={onChange}
				error={errors.firstName} />

			<TextInput
				name="lastName"
				label="Last Name"
				value={author.lastName}
				onChange={onChange}
				error={errors.lastName} />

			<input 
				type="submit" 
				value="Save" 
				className="btn btn-default" 
				onClick={onSave} />
		</form>
	);
};

AuthorForm.propTypes = {
	author:	PropTypes.object.isRequired,
	onSave:	PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	errors: PropTypes.object
};

export default AuthorForm;