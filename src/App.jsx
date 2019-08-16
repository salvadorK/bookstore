import React, { Component } from "react";
import NewPost from "./NewPost.jsx";
import Post from "./Post.jsx";
import { connect } from "react-redux";
import Search from "./Search.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import "./main.css";

class UnconnectedApp extends Component {
  constructor() {
    super();
    this.state = {
      usernameInput: "",
      passwordInput: "",
      username: undefined,
      posts: []
    };
  }
  reload = async () => {
    let response = await fetch("/all-posts");
    let body = await response.text();
    body = JSON.parse(body);
    this.setState({ posts: body });
  };
  usernameChange = evt => {
    this.setState({ usernameInput: evt.target.value });
  };
  passwordChange = evt => {
    this.setState({ passwordInput: evt.target.value });
  };
  // signUpsubmitHandler = async evt => {
  //   evt.preventDefault();
  //   console.log("username", this.state.username);
  //   console.log("password", this.state.passwordInput);
  //   let name = this.state.usernameInput;
  //   let data = new FormData();
  //   data.append("username", name);
  //   data.append("password", this.state.passwordInput);
  //   let response = await fetch("/sign-up", { method: "POST", body: data });
  //   let body = await response.text();
  //   console.log("/sign up response", body);
  //   body = JSON.parse(body);
  //   if (body.success) {
  //     alert("sign -up done");
  //     return;
  //   }
  //   alert("use a different username");
  // };
  loginsubmitHandler = async evt => {
    evt.preventDefault();
    console.log("username", this.state.username);
    console.log("password", this.state.passwordInput);
    let name = this.state.usernameInput;
    let data = new FormData();
    data.append("username", name);
    data.append("password", this.state.passwordInput);
    let response = await fetch("/login", { method: "POST", body: data });
    let body = await response.text();
    console.log("/login response", body);
    body = JSON.parse(body);
    if (body.success) {
      alert("login done");
      return;
    }
    alert("user name and password don't match");
  };
  render = () => {
    this.reload();
    let results = this.state.posts.filter(item => {
      return item.booktitle.includes(this.props.query);
    });
    return (
      <div id="signup">
        <div>
          {/* <Signup /> */}
          {/* <Login /> */}
          <Search />
        </div>
        <form class="login-signup-grid" onSubmit={this.loginsubmitHandler}>
          <input
            type="text"
            placeholder="Username"
            onChange={this.usernameChange}
          />
          <input
            type="text"
            placeholder="Password"
            onChange={this.passwordChange}
          />
          <input type="submit" value="login" />
        </form>
        {/* 
        <form onSubmit={this.signUpsubmitHandler}>
          <input
            type="text"
            placeholder="Username"
            onChange={this.usernameChange}
          />
          <input
            type="text"
            placeholder="Password"
            onChange={this.passwordChange}
          />
          Don't have an account yet?
          <input type="submit" value="sign-up" />
        </form> */}

        <div class="container-img">
          {results.map(p => (
            <Post contents={p} />
          ))}
        </div>
      </div>
    );
  };
}
let mapStateToProps = st => {
  return { query: st.searchQuery };
};

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
