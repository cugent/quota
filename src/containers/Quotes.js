import React from "react";
import { connect } from "react-redux";
import { updateAuthors } from "../redux";
import { Link } from "react-router-dom";

class Quotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  addVotes = (i, l) => {
    let newState = JSON.parse(JSON.stringify(this.props.authors));
    newState[i].quotes[l].votes += 1;
    this.props.updateAuthors(newState);
  };
  decreaseVotes = (i, l) => {
    let newState = JSON.parse(JSON.stringify(this.props.authors));
    newState[i].quotes[l].votes -= 1;
    this.props.updateAuthors(newState);
  };
  deleteQuote = (i, l) => {
    let newState = JSON.parse(JSON.stringify(this.props.authors));
    newState[i].quotes.splice(l, 1);
    this.props.updateAuthors(newState);
  };

  render() {
    let index = this.props.authors.findIndex(obj => obj.name === this.props.match.params.name);
    console.log(index);
    return (
      <div className="container">
        <div>
          <h1 style={{ display: "inline-block" }}>Quotes</h1>
          <Link to={`/write/${this.props.match.params.name}`}>
            <button type="button" style={{ display: "inline-block", width: "150px", float: "right", marginRight: "20px" }} className="btn btn-primary btn-sm">
              Add Quote
            </button>
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Quotes</th>
              <th scope="col">Votes</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.authors[index].quotes.length > 0 &&
              this.props.authors[index].quotes.map((quote, location) => {
                return (
                  <tr>
                    <th scope="row">{quote.quote}</th>
                    <td>{quote.votes}</td>
                    <td>
                      <button onClick={() => this.addVotes(index, location)} type="button" style={{ width: "150px" }} className="btn btn-primary btn-sm">
                        Vote Up
                      </button>
                      <button onClick={() => this.decreaseVotes(index, location)} type="button" style={{ marginLeft: "10px", width: "150px" }} className="btn btn-primary btn-sm">
                        Vote Down
                      </button>
                      <button onClick={() => this.deleteQuote(index, location)} type="button" style={{ marginLeft: "10px", width: "150px" }} className="btn btn-primary btn-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quotes);
