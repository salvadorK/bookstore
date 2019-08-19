import React, { Component } from "react";
import Login from "./Login.jsx";
class Signup extends Component {
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

  firstnameChangeHandler = e => {
    this.setState({ firstname: e.target.value });
  };
  lastnameChangeHandler = e => {
    this.setState({ lastname: e.target.value });
  };
  phoneChangeHandler = e => {
    this.setState({ phone: e.target.value });
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
      <div class="popup">
        <form class="registration-form" onSubmit={this.handleSignSubmit}>
          {/* First Name */}
          <div>
            <input
              type="text"
              placeholder="First Name"
              onChange={this.firstnameChangeHandler}
            />
          </div>
          {/* Last Name */}
          <div>
            <input
              type="text"
              placeholder="Last Name"
              onChange={this.lastnameChangeHandler}
            />
          </div>
          {/* Phone */}
          <div>
            <input
              type="text"
              placeholder="Phone"
              onChange={this.phoneChangeHandler}
            />
          </div>
          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Email"
              onChange={this.handleEmailChange}
            />
          </div>
          {/* Password */}
          <div>
            <input
              type="text"
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
          </div>
          <div class="submit-button">
            <input type="submit" value="signup" />
          </div>
          <p class="message">
            {" "}
            Already Registered? <a href="#">Login</a>
          </p>
        </form>
      </div>
    );
  };
}
export default Signup;
