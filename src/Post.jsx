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
      </div>
    );
  };
}
export default Post;
