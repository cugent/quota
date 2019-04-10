import React from "react";
import { connect } from "react-redux";
import { updateAuthors } from "../redux";
import { withRouter } from "react-router-dom";

class NewAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  addQuote = () => {
    let obj = {
      quote: this.state.quote,
      votes: 0
    };
    let index = this.props.authors.findIndex(obj => obj.name === this.props.match.params.name);
    let newState = JSON.parse(JSON.stringify(this.props.authors));
    newState[index].quotes.push(obj);
    this.props.updateAuthors(newState);
    this.props.history.push(`/quotes/${newState[index].name}`);
  };

  render() {
    return (
      <div style={{ marginTop: "20px" }} className="container">
        <h3>Add a new quote</h3>
        <div className="form-inline">
          <input onChange={this.handleChange} type="text" className="form-control" id="quote" aria-describedby="author" placeholder="Enter Quote" />
          <button onClick={this.addQuote} type="submit" className="btn btn-primary">
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
