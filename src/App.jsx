import React, { Component } from "react";
import NewPost from "./NewPost.jsx";
import Post from "./Post.jsx";
import { connect } from "react-redux";
import Search from "./Search.jsx";

import Cart from "./cart.jsx";

import "./main.css";

import Spopup from "./Spopup.jsx";
import Detail from "./Detail.jsx";

import { BrowserRouter, Route, Link } from "react-router-dom";

class UnconnectedApp extends Component {
  constructor() {
    super();
    this.state = {
      usernameInput: "",
      passwordInput: "",
      username: undefined,
      posts: [],
      showPopup: false,
      showCart: false,
      showBuy: false,
      newpost: false
    };
  }
  async componentDidMount() {
    let response = await fetch("/get-cookie");
    let body = JSON.parse(await response.text());
    console.log(body.username);
    if (body.success) {
      this.props.dispatch({
        type: "login-success",
        loggedIn: body.username
      });
      return;
    }
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  carttoggle() {
    this.setState({
      showCart: !this.state.showCart
    });
  }

  selltoggle = () => {
    this.props.loggedIn !== ""
      ? this.setState({ showBuy: false })
      : this.togglePopup();
  };

  buytoggle = () => {
    this.props.loggedIn !== ""
      ? this.setState({ showBuy: true })
      : this.togglePopup();
  };

  reload = async () => {
    let response = await fetch("/all-posts");
    let body = await response.text();
    body = JSON.parse(body);
    this.setState({ posts: body });
  };

  newpost = () => {
    this.props.loggedIn !== ""
      ? this.setState({ newpost: !this.state.newpost })
      : this.togglePopup;
  };

  render = () => {
    this.reload();
    let renderAllitems = () => {
      return (
        <div id="signup">
          <div>
            <nav class="navbar">
              <div class="container">
                <h1 class="logo">
                  <a href="#">Le Bookstore</a>
                </h1>

                <ul>
                  <li>
                    <h2 class="search" />
                    <Search />
                  </li>
                  <li>
                    <button class="btn" onClick={this.buytoggle.bind(this)}>
                      Buy
                    </button>
                  </li>
                  <li>
                    <button class="btn" onClick={this.selltoggle.bind(this)}>
                      Sell
                    </button>
                  </li>
                  <li>
                    <button class="btn" onClick={this.carttoggle.bind(this)}>
                      Cart
                    </button>
                    {this.props.totalqty}
                  </li>
                  <li>{showsellbutt}</li>
                </ul>
              </div>
            </nav>

            <header id="showcase">
              <div class="container">
                <div class="showcase-container">
                  <div class="showcase-content">
                    <div class="category-kids">Kids</div>
                    <h1>
                      <span class="text-primary">BOOKS</span> FOR NEW BEGINNINGS
                    </h1>
                    <p class="lead">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Cum quaerat quae natus distinctio corrupti cupiditate!
                    </p>
                    {/* <a
                      href="articles.html"
                      class="btn
                  btn-primary"
                    >
                      More details
                    </a> */}
                  </div>
                </div>
              </div>
            </header>

            <div>
              <button onClick={this.togglePopup.bind(this)} />
              {this.state.showPopup ? (
                <Spopup closePopup={this.togglePopup.bind(this)} />
              ) : null}
              {this.state.showCart ? (
                <Cart closePopup={this.togglePopup.bind(this)} />
              ) : null}
            </div>

            <div class="container-img">
              {results.map(p => (
                <Post contents={p} />
              ))}
            </div>
          </div>
        </div>
      );
    };
    let renderDetail = rd => {
      let detailId = rd.match.params.did;
      let candetails = this.state.posts.filter(details => {
        return details._id === detailId;
      });
      console.log(candetails);
      return <Detail detail={candetails[0]} />;
    };

    let showsellbutt =
      this.props.loggedIn !== "" ? (
        <div>
          <button class="btn" onClick={this.newpost.bind(this)}>
            Sell one?
          </button>
          {this.state.newpost ? <NewPost /> : null}
        </div>
      ) : null;

    let seller = this.state.showBuy
      ? this.state.posts.filter(user => {
          return user.username !== this.props.loggedIn;
        })
      : this.state.posts.filter(user => {
          return user.username === this.props.loggedIn;
        });

    let results =
      this.props.loggedIn !== ""
        ? seller.filter(item => {
            return item.booktitle
              .toLowerCase()
              .includes(this.props.query.toLowerCase());
          })
        : this.state.posts.filter(item => {
            return item.booktitle
              .toLowerCase()
              .includes(this.props.query.toLowerCase());
          });
    return (
      <BrowserRouter>
        <Route exact={true} path="/" render={renderAllitems} />

        <Route exact={true} path="/detail/:did" render={renderDetail} />
      </BrowserRouter>
    );
  };
}

let mapStateToProps = st => {
  return {
    query: st.searchQuery,
    loggedIn: st.loggedIn,
    totalqty: st.totalqty
  };
};

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
