import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      usernameInput: "",
      passwordInput: "",
      username: undefined
    };
  }
  usernameChange = evt => {
    this.setState({ usernameInput: evt.target.value });
  };
  passwordChange = evt => {
    this.setState({ passwordInput: evt.target.value });
  };
  signUpsubmitHandler = async evt => {
    evt.preventDefault();
    console.log("username", this.state.username);
    console.log("password", this.state.passwordInput);
    let name = this.state.usernameInput;
    let data = new FormData();
    data.append("username", name);
    data.append("password", this.state.passwordInput);
    let response = await fetch("/sign-up", { method: "POST", body: data });
    let body = await response.text();
    console.log("/sign up response", body);
    body = JSON.parse(body);
    if (body.success) {
      console.log("sign -up done");
      return;
    }
    alert("use a different username");
  };

  render = () => {
    return (
      <div>
        <form onSubmit={this.signUpsubmitHandler}>
          Username <input type="text" onChange={this.usernameChange} />
          Password <input type="text" onChange={this.passwordChange} />
          <input type="submit" value="sign-up" />
        </form>
      </div>
    );
  };
}

export default App;
