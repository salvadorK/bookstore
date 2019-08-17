import React, { Component } from "react";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  addcart = async () => {
    let data = new FormData();
    data.append("booktitle", this.props.contents.booktitle);
    data.append("price", this.props.contents.price);
    data.append("img", this.props.contents.img);
    data.append("id", this.props.contents._id);
    let response = await fetch("/addcart", { method: "POST", body: data });
    let responsebody = await response.text();
    let text = JSON.parse(responsebody);
    console.log(text.success);
    if (text.success) {
      alert("added to cart");
      return;
    }
    alert("please login");
  };

  render = () => {
    return (
      <div>
        <img src={this.props.contents.img} height="320px" width="320px" />
        <div>booktitle is:{this.props.contents.booktitle}</div>
        <div>isbn:{this.props.contents.isbn}</div>
        <div>Price:{this.props.contents.price}</div>
        <button
          type="button"
          a
          href="./cart.png"
          onClick={this.addcart}
          id="add-to-cart-button"
          data-a8n="item-page__button-add-to-cart"
          class="common-button add-to-cart-button__primary 
         "
        >
          add to cart
        </button>
      </div>
    );
  };
}
export default Post;
