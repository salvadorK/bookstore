import React, { Component } from "react";

export default class Cartlist extends Component {
  constructor(props) {
    super(props);
    this.state = { qty: this.props.contents.qty };
  }
  incquantity = e => {
    let data = new FormData();
    data.append("qty", this.state.qty);
    data.append("booktitle", this.props.contents.booktitle);
    fetch("/updatepurchase", { method: "POST", body: data });
    this.setState({ qty: this.props.contents.qty + 1 });
  };
  decquantity = e => {
    let data = new FormData();
    data.append("qty", this.state.qty);
    data.append("booktitle", this.props.contents.booktitle);
    fetch("/decpurchase", { method: "POST", body: data });
    this.setState({ qty: this.props.contents.qty - 1 });
  };
  deleteOne = e => {
    let data = new FormData();
    data.append("booktitle", this.props.contents.booktitle);
    fetch("/deleteOne", { method: "POST", body: data });
  };
  render = () => {
    return (
      <div id="CartItem">
        <ul className="image-frame">
          <li className="titleCart">
            <h4>{this.props.contents.booktitle}</h4>
          </li>

          <li>
            <img className="imagecart" src={this.props.contents.img} />

            <li className="quantitycart">
              <input type="text" value={this.state.qty} />
              <button onClick={this.incquantity}>+</button>
              <button onClick={this.decquantity}>-</button>
            </li>

            <li className="pricecart">
              <h4>CAD ${+this.props.contents.price * this.state.qty}</h4>
            </li>

            <li className="deletecart" />
            <li>
              <form>
                <input type="button" onClick={this.deleteOne} value="delete" />
              </form>
            </li>
          </li>
        </ul>
      </div>
    );
  };
}
