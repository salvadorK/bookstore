import React, { Component } from "react";
import Login from "./Login.jsx";
import { connect } from "react-redux";

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      phone: "",
      username: "",
      password: ""
    };
  }

  firstnameChangeHandler = event => {
    this.setState({ firstname: event.target.value });
  };
  lastnameChangeHandler = event => {
    this.setState({ lastname: event.target.value });
  };
  phoneChangeHandler = event => {
    this.setState({ phone: event.target.value });
  };

  handleEmailChange = event => {
    console.log("new username", event.target.value);
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };

  handleSignSubmit = async evt => {
    evt.preventDefault();
    console.log("signup form submitted");
    let data = new FormData();
    data.append("firstname", this.state.firstname);
    data.append("lastname", this.state.lastname);
    data.append("phone", this.state.phone);
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/sign-up", { method: "POST", body: data });
    let responsebody = await response.text();
    let text = JSON.parse(responsebody);
    console.log(text.success);
    if (text.success) {
      alert("signup successful");
      return;
    }
    alert("username taken");
  };

  render = () => {
    return (
      <div id="popup">
        <form class="registration-form" onSubmit={this.handleSignSubmit}>
          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            onChange={this.firstnameChangeHandler}
          />
          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            onChange={this.lastnameChangeHandler}
          />
          {/* Phone */}
          <input
            type="text"
            placeholder="Phone"
            onChange={this.phoneChangeHandler}
          />
          {/* Username */}
          <input
            type="text"
            placeholder="Email"
            onChange={this.handleEmailChange}
          />
          {/* Password */}
          <input
            type="text"
            placeholder="Password"
            onChange={this.handlePasswordChange}
          />
          <input class="submit-button" type="submit" value="signup" />
          <p class="message">
            Already Registered? <a href="#">Login</a>
          </p>
        </form>
      </div>
    );
  };
}
let Signup = connect()(UnconnectedSignup);
export default Signup;
