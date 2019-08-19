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
          placeholder="search..."
          class="search-box-input"
          value={this.props.query}
          onChange={this.handleQuery}
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
