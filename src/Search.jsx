import React, { Component } from "react";
import { connect } from "react-redux";

class UnconncectedSearch extends Component {
  handleQuery = evt => {
    this.props.dispatch({ type: "query", q: evt.target.value });
  };
  render() {
    return (
      <div id="search-box-css">
        <input
          type="text"
          onChange={this.handleQuery}
          placeholder="search over 2 million products"
        />
      </div>
    );
  }
}

let Search = connect()(UnconncectedSearch);
export default Search;
