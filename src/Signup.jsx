import React, { Component } from "react";

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
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
  emailChangeHandler = e => {
    this.setState({ email: e.target.value });
  };
  passwordChangeHandler = e => {
    this.setState({ password: e.target.value });
  };
  submitHandler = evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("lastname", this.state.lastname);
    data.append("phone", this.state.phone);
    data.append("email", this.state.email);
    data.append("firstname", this.state.description);
    data.append("password", this.state.password);
    fetch("/sign-up", { method: "POST", body: data });
  };
  render() {
    return (
      <div className="popup">
        <form onSubmit={this.submitHandler}>
          <div>
            <label for="firstname">First Name</label>
            <br />
            <input
              type="text"
              name="firstname"
              onChange={this.firstnameChangeHandler}
            />
          </div>
          <div>
            <label for="lastname">Last Name</label>
            <br />
            <input
              type="text"
              name="lastname"
              onChange={this.lastnameChangeHandler}
            />
          </div>
          <div>
            <label for="phone">Phone</label>
            <br />
            <input
              type="text"
              name="phone"
              min="1"
              onChange={this.phoneChangeHandler}
            />
          </div>
          <div>
            <label for="password">Password</label>
            <br />
            <input
              type="test"
              name="password"
              onChange={this.passwordChangeHandler}
            />
          </div>
          <div>
            <label for="email">Email</label>
            <br />
            <input
              type="text"
              name="email"
              onChange={this.emailChangeHandler}
            />
          </div>
          <div>
            <input type="submit" value="Submit" />
            <input type="reset" />
          </div>
        </form>
      </div>
    );
  }
}
