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
import { METHODS } from "http";

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
        type: "login",
        username: body.username
      });
      this.reload();
      return;
    }
  }
  async logout() {
    let response = await fetch("/logout");
    let body = JSON.parse(await response.text());
    if (body.success) {
      this.props.dispatch({
        type: "logout"
      });
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
    this.props.username !== ""
      ? this.setState({ showBuy: false })
      : this.togglePopup();
  };

  buytoggle = () => {
    this.props.username !== ""
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
    this.props.username !== ""
      ? this.setState({ newpost: !this.state.newpost })
      : this.togglePopup;
  };

  render = () => {
    this.reload();
    let renderAllitems = () => {
      return (
        <div id="signup">
          <div>
            <nav className="navbar">
              <div className="container">
                <h1 className="logo">
                  <a href="#">Le Bookstore</a>
                </h1>

                <ul>
                  <li>{showSignOut}</li>
                  <li>
                    <h2 className="search" />
                    <Search />
                  </li>
                  <li>
                    <button className="btn" onClick={this.buytoggle.bind(this)}>
                      Buy
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn"
                      onClick={this.selltoggle.bind(this)}
                    >
                      Sell
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn"
                      onClick={this.carttoggle.bind(this)}
                    >
                      Cart
                    </button>
                    {this.props.totalqty}
                  </li>
                  <li>{showsellbutt}</li>
                </ul>
              </div>
            </nav>

            <header id="showcase">
              <div className="container">
                <div className="showcase-container">
                  <div className="showcase-content">
                    <div className="category-kids">Kids</div>
                    <h1>
                      <span className="text-primary">BOOKS</span> FOR NEW
                      BEGINNINGS
                    </h1>
                    <p className="lead">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Cum quaerat quae natus distinctio corrupti cupiditate!
                    </p>
                    {/* <a
                      href="articles.html"
                      className="btn
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

            <div className="container-img">
              {results.map(p => (
                <Post
                  key={p._id}
                  contents={p}
                  openPopup={this.togglePopup.bind(this)}
                  closePopup={this.togglePopup.bind(this)}
                />
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
      this.props.username !== "" ? (
        <div>
          <button className="btn" onClick={this.newpost.bind(this)}>
            Sell one?
          </button>
          {this.state.newpost ? <NewPost /> : null}
        </div>
      ) : null;

    let showSignOut =
      this.props.username !== "" ? (
        <button className="btn" onClick={this.logout.bind(this)}>
          Sign Out
        </button>
      ) : null;

    let seller = this.state.showBuy
      ? this.state.posts.filter(user => {
          return user.username !== this.props.username;
        })
      : this.state.posts.filter(user => {
          return user.username === this.props.username;
        });

    let results =
      this.props.username !== ""
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
    username: st.username,
    totalqty: st.totalqty
  };
};

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
