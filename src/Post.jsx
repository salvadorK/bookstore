import React, { Component } from "react";
//import { BrowserRouter, Route, Link } from "react-router-dom";//

import Login from "./Login.jsx";
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  addcart = () => {
    let data = new FormData();
    data.append("booktitle", this.props.contents.booktitle);
    data.append("price", this.props.contents.price);
    data.append("img", this.props.contents.img);
    data.append("id", this.props.contents._id);
    alert("added to cart");
    fetch("/addcart", { method: "POST", body: data });
  };

  render = () => {
    return (
      <div>
        <img src={this.props.contents.img} height="320px" width="320px" />
        <div>booktitle is:{this.props.contents.booktitle}</div>
        <div>isbn:{this.props.contents.isbn}</div>
        <div>Price:{this.props.contents.price}</div>
        <button
          type="submit"
          onClick={this.addcart}
          id="add-to-cart-button"
          data-a8n="item-page__button-add-to-cart"
          className="common-button add-to-cart-button__primary "
        >
          <img src="public/cart.png" />
        </button>
      </div>
    );
  };
}
export default Post;
