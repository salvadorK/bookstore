import "./main.css";
import React, { Component } from "react";
// import {Link} from "react-router-dom";

class Detail extends Component {
  render() {
    return (
      <div class="">
        <div class="img-size"> {this.props.detail.img}</div>
        <div>{this.props.detail.booktitle}</div>
        <div>{this.props.detail.ISBN}</div>
        <div>{this.props.detail.qty}</div>
        <div>{this.props.detail.price}</div>
        <div>{this.props.detail.description}</div>
        <div>{this.props.detail.username}</div>
      </div>
    );
  }
}
export default Detail;
