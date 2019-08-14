import React, { Component } from "react";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  render = () => {
    console.log(this.props.contents.username);
    return (
      <div>
        <h1>booktitle is:{this.props.contents.booktitle}</h1>
      </div>
    );
  };
}
export default Post;
