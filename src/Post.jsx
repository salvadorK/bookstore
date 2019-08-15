import React, { Component } from "react";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  render = () => {
    return (
      <p id="product">
        <div class="container-img">
          <img src={this.props.contents.img} height="100px" width="100px" />
          <div>booktitle is:{this.props.contents.booktitle}</div>
          <div>isbn:{this.props.contents.isbn}</div>
          <div>Price:{this.props.contents.price}</div>
        </div>
      </p>
    );
  };
}
export default Post;
