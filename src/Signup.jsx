import React, { Component } from "react";
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

  handleUsernameChange = event => {
    console.log("new username", event.target.value);
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };

  handleSubmit = async evt => {
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
      <div className="popup">
        <form onSubmit={this.handleSubmit}>
          First Name
          <input type="text" onChange={this.firstnameChangeHandler} />
          Last Name
          <input type="text" onChange={this.lastnameChangeHandler} />
          Phone
          <input type="text" onChange={this.phoneChangeHandler} />
          Username
          <input type="text" onChange={this.handleUsernameChange} />
          Password
          <input type="text" onChange={this.handlePasswordChange} />
          <input type="submit" />
        </form>
      </div>
    );
  };
}
export default Signup;
