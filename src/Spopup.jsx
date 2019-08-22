import React from "react";
import "./main.css";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import { connect } from "react-redux";

class UnconnectedSpopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowingSignup: false
    };
  }
  ShowSignup = () => {
    this.setState({ ShowingSignup: true });
  };

  CloseSignup = () => {
    this.setState({ ShowingSignup: false });
  };
  render() {
    return (
      <div className="spopup">
        <div className="spopup-inner">
          <h1>{this.props.text}</h1>
          {this.state.ShowingSignup ? (
            <Signup
              close={this.CloseSignup}
              closePopup={this.props.closePopup}
            />
          ) : (
            <Login open={this.ShowSignup} closePopup={this.props.closePopup} />
          )}
        </div>
      </div>
    );
  }
}

let Spopup = connect()(UnconnectedSpopup);
export default Spopup;
