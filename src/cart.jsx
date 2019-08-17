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
  reload = async () => {
    let response = await fetch("/user-prepurchase");
    let body = await response.text();
    body = JSON.parse(body);
    this.setState({ posts: body });
  };
  render() {
    return (
      <div>
        <div>
          {this.state.posts.map(p => (
            <Cartlist key={p._id} contents={p} />
          ))}
        </div>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_zbiNciQsHQOG0nNhUebQtTUY00KqyFosNe"
        />
      </div>
    );
  }
}
