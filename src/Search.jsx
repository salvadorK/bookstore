import React, { Component } from "react";
import { connect } from "react-redux";

class UnconncectedSearch extends Component {
  handleQuery = evt => {
    this.props.dispatch({ type: "query", q: evt.target.value });
  };
  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleQuery}
          value={this.props.query}
        />
      </div>
    );
  }
}
let mapStateToProps = st => {
  return {
    query: st.searchQuery
  };
};

let Search = connect(mapStateToProps)(UnconncectedSearch);
export default Search;
