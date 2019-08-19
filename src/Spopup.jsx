import React from "react";
import "./main.css";
import Signup from "./Signup.jsx";

class Spopup extends React.Component {
  render() {
    return (
      <div className="spopup">
        <div className="spopup-inner">
          <h1>{this.props.text}</h1>
          <Signup />
          <button onClick={this.props.ClosePopup}>close me</button>
        </div>
      </div>
    );
  }
}
export default Spopup;
