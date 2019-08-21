import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spopup from "./Spopup.jsx";

import Login from "./Login.jsx";
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      showSpop: false
    };
  }
  addcart = async () => {
    let data = new FormData();
    data.append("booktitle", this.props.contents.booktitle);
    data.append("price", this.props.contents.price);
    data.append("img", this.props.contents.img);
    data.append("id", this.props.contents._id);
    data.append("qty", this.props.contents.qty);
    let response = await fetch("/addcart", { method: "POST", body: data });
    let responsebody = await response.text();
    let text = JSON.parse(responsebody);
    console.log(text.success);
    if (!text.success) {
      this.setState({ showSpop: true });
      return;
    }
    alert("added to cart");
  };

  render = () => {
    return (
      <section id="kids-books" class="py-2">
        {/* <h2>Employee Picks</h2> */}

        <div class="container">
          <div class="products-container">
            <product class="card">
              {this.state.showSpop ? <Spopup /> : null}
              <Link to={"/detail/" + this.props.contents._id}>
                <img class="img-size" src={this.props.contents.img} />
              </Link>
              <h3 class="text-primary">{this.props.contents.booktitle}</h3>
              <div>isbn:{this.props.contents.ISBN}</div>
              <div>Quantity:{this.props.contents.qty}</div>
              <div>Price:{this.props.contents.price}</div>
              <button
                type="submit"
                onClick={this.addcart}
                id="add-to-cart-button"
                data-a8n="item-page__button-add-to-cart"
                className="common-button add-to-cart-button__primary "
              >
                <img src="public/cart.png" />
              </button>
            </product>
          </div>
        </div>
      </section>
      // <div >
      //   <img src={this.props.contents.img} height="320px" width="320px" />
      //   <div>booktitle is:{this.props.contents.booktitle}</div>
      //   <div>isbn:{this.props.contents.isbn}</div>
      //   <div>Price:{this.props.contents.price}</div>
      //   <button
      //     type="submit"
      //     onClick={this.addcart}
      //     id="add-to-cart-button"
      //     data-a8n="item-page__button-add-to-cart"
      //     className="common-button add-to-cart-button__primary "
      //   >
      //     <img src="public/cart.png" />
      //   </button>
      // </div>
    );
  };
}
export default Post;
