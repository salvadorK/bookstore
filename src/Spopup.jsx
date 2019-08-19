import React from "react";
import "./main.css";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";

class Spopup extends React.Component {
  render() {
    return (
      <div className="spopup">
        <div className="spopup-inner">
          <h1>{this.props.text}</h1>
          <Signup closePopup={this.props.closePopup} />
          <Login closePopup={this.props.closePopup} />
          <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}
export default Spopup;
