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
      <div>
        <h1>booktitle is:{this.props.contents.booktitle}</h1>
        <img src={this.props.contents.img} height="100px" />
        <div>isbn:{this.props.contents.isbn}</div>
        <div>Price:{this.props.contents.price}</div>
        <div>
          <img src="./cart.png" height="25px" onClick={this.addcart} />
        </div>
      </div>
    );
  };
}
export default Post;
