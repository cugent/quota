import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <h1>Home</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Author</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.authors.length > 0 &&
              this.props.authors.map((author, index) => {
                return (
                  <tr>
                    <th scope="row">{author.name}</th>
                    <td>
                      <Link to={`/quotes/${author.name}`}>
                        <button type="button" style={{ width: "150px" }} className="btn btn-primary btn-sm">
                          View Quotes
                        </button>
                      </Link>
                      <Link to={`/edit/${author.name}`}>
                        <button type="button" style={{ marginLeft: "10px", width: "150px" }} className="btn btn-primary btn-sm">
                          Edit
                        </button>
                      </Link>
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

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
