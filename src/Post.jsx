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
      <div>   
        <h1>booktitle is:{this.props.contents.booktitle}</h1>
        <img src={this.props.contents.img} height="100px" />
        <div>isbn:{this.props.contents.isbn}</div>
        <div>Price:{this.props.comtents.price}</div>
        
      </div>
    );
  };
}
export default Post;