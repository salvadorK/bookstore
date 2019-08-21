import React, { Component } from "react";

export default class Cartlist extends Component {
  constructor(props) {
    super(props);
    this.state = { qty: this.props.contents.qty };
  }
  incquantity = () => {
    this.setState({ qty: this.props.contents.qty + 1 });
    let data = new FormData();
    data.append("qty", this.state.qty);
    data.append("booktitle", this.props.contents.booktitle);
    fetch("/updatepurchase", { method: "POST", body: data });
  };
  decquantity = () => {
    this.setState({ qty: this.props.contents.qty - 1 });
    let data = new FormData();
    data.append("qty", this.state.qty);
    data.append("booktitle", this.props.contents.booktitle);
    fetch("/decpurchase", { method: "POST", body: data });
  };
  deleteOne = e => {
    let data = new FormData();
    data.append("booktitle", this.props.contents.booktitle);
    fetch("/deleteOne", { method: "POST", body: data });
  };
  render = () => {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.contents.img} height="10px" width="10px" />
          <div className="flex">
            <h4>{this.props.contents.booktitle}</h4>

            <div className="flex">
              <button onClick={this.incquantity}>+</button>
              <input type="text" value={this.state.qty} />
              <button onClick={this.decquantity}>-</button>
            </div>
          </div>
          <div className="flex">
            <h4>CAD ${+this.props.contents.price * this.state.qty}</h4>
          </div>
          <div className="flex">
            <form>
              <input type="button" onClick={this.deleteOne} value="delete" />
            </form>
          </div>
        </div>
      </div>
    );
  };
}
