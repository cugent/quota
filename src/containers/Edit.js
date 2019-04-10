import React from "react";
import { connect } from "react-redux";
import { updateAuthors } from "../redux";
import { withRouter } from "react-router-dom";

class NewAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: this.props.match.params.name
    };
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  editAuthor = () => {
    let index = this.props.authors.findIndex(obj => obj.name === this.props.match.params.name);
    let newState = JSON.parse(JSON.stringify(this.props.authors));
    newState[index].name = this.state.author;
    this.props.updateAuthors(newState);
    this.props.history.push(`/home`);
  };
  render() {
    return (
      <div style={{ marginTop: "20px" }} className="container">
        <h3>Add a new author</h3>
        <div className="form-inline">
          <input value={this.state.author} onChange={this.handleChange} type="text" className="form-control" id="author" aria-describedby="author" placeholder="Enter Author" />
          <button onClick={this.editAuthor} type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authors: state.authors
});

const mapDispatchToProps = dispatch => ({
  updateAuthors: payload => dispatch(updateAuthors(payload))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewAuthor)
);
