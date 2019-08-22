import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  // toggle = () => {
  //   document.getElementsByClassName("registration-form").style.display =
  //     "block";
  // };

  handleUsernameChange = event => {
    console.log("new username", event.target.value);
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };
  handleLoginSubmit = async evt => {
    evt.preventDefault();
    console.log("login form submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody from login", responseBody);
    let body = JSON.parse(responseBody);
    console.log("parsed body", body);
    if (!body.success) {
      alert("login failed");
      return;
    }
    alert("login - success");
    let itempurc = await fetch("/user-prepurchase");
    let bodypurc = await itempurc.text();
    bodypurc = JSON.parse(bodypurc);
    let totalqty =
      bodypurc.length < 1
        ? 0
        : bodypurc
            .map(p => p.qty)
            .reduce(function myFunc(total, num) {
              return total + num;
            });
    this.props.dispatch({
      type: "totalqty",
      totalquantity: totalqty
    });
    this.props.dispatch({
      type: "userpurchase",
      upurc: bodypurc
    });
    console.log(this.state.username);
    this.props.closePopup();
    this.props.dispatch({
      type: "login",
      username: this.state.username
    });
  };
  render = () => {
    return (
      <div id="popup">
        <form className="Login-form" onSubmit={this.handleLoginSubmit}>
          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            onChange={this.handleUsernameChange}
          />
          {/* Password */}
          <input
            type="text"
            placeholder="Password"
            onChange={this.handlePasswordChange}
          />
          <input className="submit-button" type="submit" value="login" />
          <p className="message">Don't have an account?</p>
        </form>
        <button className="btnSignup" onClick={this.props.open}>
          Create one
        </button>
      </div>
    );
  };
}
let Login = connect()(UnconnectedLogin);
export default Login;

// loginsubmitHandler = async evt => {
//     evt.preventDefault();
//     console.log("username", this.state.username);
//     console.log("password", this.state.passwordInput);
//     let name = this.state.usernameInput;
//     let data = new FormData();
//     data.append("username", name);
//     data.append("password", this.state.passwordInput);
//     let response = await fetch("/login", { method: "POST", body: data });
//     let body = await response.text();
//     console.log("/login response", body);
//     body = JSON.parse(body);
//     if (body.success) {
//       alert("login done");
//       return;
//     }
//     alert("user name and password don't match");
//   };
