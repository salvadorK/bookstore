import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import Cartlist from "./cart-list.jsx";
import { connect } from "react-redux";
class unconnectedCart extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.setState({ posts: this.props.upurc });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.posts !== this.state.posts) {
      this.setState({ posts: this.props.upurc });
    }
  }

  onToken = token => {
    let data = new FormData();
    data.append("token", JSON.stringify(token));
    fetch("/save-stripe-token", {
      method: "POST",
      body: data
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business`);
      });
    });
  };

  clear() {
    fetch("/clear", { method: "POST" });
  }

  render() {
    let state = this.props.upurc;
    let results =
      state.length < 1
        ? "NO ITEMS ON CART"
        : state.map(p => <Cartlist key={p._id} contents={p} />);
    let numArr =
      state.length < 1
        ? "0.00"
        : state.map(p => p.qty * p.price).reduce(myFunc);
    function myFunc(total, num) {
      return total + num;
    }
    let totalqty =
      state.length < 1 ? "0" : state.map(p => p.qty).reduce(myFunc);
    console.log(this.props.upurc);
    return (
      <div className="shopping-cart">
        <div className="scart">
          <div>{results}</div>
          <div>Total is: ${numArr}</div>
          <div>Total items: {totalqty}</div>
          <div>
            <form>
              <input type="button" onClick={this.clear} value="clear cart" />
            </form>
          </div>
          <StripeCheckout
            token={this.onToken}
            stripeKey="pk_test_zbiNciQsHQOG0nNhUebQtTUY00KqyFosNe"
          />
        </div>
      </div>
    );
  }
}
let mapStateToProps = st => {
  return {
    query: st.searchQuery,
    username: st.username,
    totalqty: st.totalqty,
    upurc: st.upurc
  };
};

let Cart = connect(mapStateToProps)(unconnectedCart);
export default Cart;
