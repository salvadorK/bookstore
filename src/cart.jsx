import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import Cartlist from "./cart-list.jsx";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  reload = async () => {
    let response = await fetch("/user-prepurchase");
    let body = await response.text();
    body = JSON.parse(body);

    if (body.success) {
      this.setState({ posts: false });
      return;
    }
    this.setState({ posts: body });
  };
  componentDidMount() {
    this.reload();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.posts !== this.state.posts) {
      this.reload();
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
        alert(`We are in business, ${data.email}`);
      });
    });
  };

  clear() {
    fetch("/clear",{method: "POST"})
  }

  render() {
    let state = this.state.posts;
    let results = !state[0]
      ? "NO ITEMS ON CART"
      : this.state.posts.map(p => <Cartlist key={p._id} contents={p} />);
    let numArr = !state[0]
      ? "0.00"
      : this.state.posts.map(p => p.qty * p.price).reduce(myFunc);
    function myFunc(total, num) {
      return total + num;
    }
    return (
      <div>
        <div>{results}</div>
        <div>Total is ${numArr}</div>
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
    );
  }
}
