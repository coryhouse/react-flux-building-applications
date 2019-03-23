import React from "react";
import Router from "react-router";
import AuthorForm from "./authorForm";
import AuthorActions from "../../actions/authorActions";
import AuthorStore from "../../stores/authorStore";
import toastr from "toastr";

class ManageAuthorPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      author: { id: "", firstName: "", lastName: "" },
      errors: {},
      dirty: false
    };
  }

  componentDidMount() {
    var authorId = this.props.params.id; //from the path '/author:id'
    if (authorId) {
      this.setState({ author: AuthorStore.getAuthorById(authorId) });
    }
  }

  setAuthorState({ target }) {
    // copy state since it's immutable
    const author = Object.assign({}, this.state.author);
    author[target.name] = target.value;
    this.setState({ author, dirty: true });
  }

  authorFormIsValid = () => {
    var formIsValid = true;
    const errors = {};
    const { author } = this.state;

    if (author.firstName.length < 3) {
      errors.firstName = "First name must be at least 3 characters.";
      formIsValid = false;
    }

    if (author.lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters.";
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  };

  saveAuthor(event) {
    event.preventDefault();

    if (!this.authorFormIsValid()) {
      return;
    }

    if (this.state.author.id) {
      AuthorActions.updateAuthor(this.state.author);
    } else {
      AuthorActions.createAuthor(this.state.author);
    }

    this.setState({ dirty: false });
    toastr.success("Author saved.");
    this.transitionTo("authors");
  }

  render() {
    return (
      <AuthorForm
        author={this.state.author}
        onChange={this.setAuthorState}
        onSave={this.saveAuthor}
        errors={this.state.errors}
      />
    );
  }
}

export default ManageAuthorPage;
