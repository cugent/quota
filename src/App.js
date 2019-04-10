import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
//rimport axios from "axios";
import io from "socket.io-client";
import Navigation from "./components/Navigation";
import Home from "./containers/Home";
import NewAuthor from "./containers/NewAuthor";
import Quotes from "./containers/Quotes";
import AddQuotes from "./containers/AddQuotes";
import Edit from "./containers/Edit";

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io("http://localhost:1337");
  }

  componentDidMount = () => {
    this.socket.on("greeting", data => {
      //4
      console.log("CLIENT > socket.on greeting");
      console.log(data.msg); //5
      this.socket.emit("thankyou", { msg: "Thank you for connecting me! -Client" });
    });

    this.socket.on("usercountchanged", data => {
      //4
      console.log("usercountchanged");
      console.log(data);
      this.props.updateCount(data.count);
    });
    this.socket.on("itemchanged", data => {
      //4
      console.log("itemchanged");
      console.log(data);
      this.props.updateProducts(data.items);
    });
  };
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route
              exact
              path="/home"
              render={props => {
                return <Home {...props} />;
              }}
            />
            <Route
              exact
              path="/new"
              render={props => {
                return <NewAuthor />;
              }}
            />
            <Route
              exact
              path="/quotes/:name"
              render={props => {
                return <Quotes {...props} />;
              }}
            />

            <Route
              exact
              path="/write/:name"
              render={props => {
                return <AddQuotes {...props} />;
              }}
            />

            <Route
              exact
              path="/edit/:name"
              render={props => {
                return <Edit {...props} />;
              }}
            />

            {/* <Route path="/sell" />
          <Route path="/ledger" />
          <Route path="/transaction/:id" /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
