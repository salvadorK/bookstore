import React, { Component } from "react";

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
<<<<<<< HEAD
      <div>
        <img src={this.props.contents.img} height="320px" width="320px" />
        <div>booktitle is:{this.props.contents.booktitle}</div>
        <div>isbn:{this.props.contents.isbn}</div>
        <div>Price:{this.props.contents.price}</div>
      </div>
=======
      <p id="product">
        <div class="container-img">
          <img src={this.props.contents.img} height="100px" width="100px" />
          <div>booktitle is:{this.props.contents.booktitle}</div>
          <div>isbn:{this.props.contents.isbn}</div>
          <div>Price:{this.props.contents.price}</div>
        </div>
      </p>
>>>>>>> 8164de115d50a0c9d4410ec5698325bdf412cf67
    );
  };
}
export default Post;
