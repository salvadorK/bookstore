import React, { Component } from "react";
import { connect } from "react-redux";

class UnconncectedSearch extends Component {
  handleQuery = evt => {
    this.props.dispatch({ type: "query", q: evt.target.value });
  };
  render() {
    return (
      <div>
        <input type="text" onChange={this.handleQuery} />
      </div>
    );
  }
}

mapStatetoProps = st => {
  return {};
};
let Search = connect()(UnconncectedSearch);
export default Search;
