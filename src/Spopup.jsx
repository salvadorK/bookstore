import React from "react";
import "./main.css";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";

class Spopup extends React.Component {
  render() {
    return (
      <div class="spopup">
        <div class="spopup-inner">
          <h1>{this.props.text}</h1>
          <Signup closePopup={this.props.closePopup} />
          <Login closePopup={this.props.closePopup} />
        </div>
        {/* document.getElementByClassName(registration-form).style ="block"
         */}
        {/* <script src="https://code.jquery.com/jquery-3.2.1.js" />
        <script>
          $(''.message a').click(function()
          {"form".animate({ height: "toggle", opacity: "toggle" }, "slow")})
        </script>
        } */}
      </div>
    );
  }
}
export default Spopup;
