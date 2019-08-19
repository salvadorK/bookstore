import React, { Component } from "react";

export default class Cartlist extends Component {
  constructor(props) {
    super(props);
    this.state = { qty: this.props.contents.qty };
  }
  quantity = e => {
    this.setState({ qty: e.target.value });
    let data = new FormData();
    data.append("qty", e.target.value);
    data.append("booktitle", this.props.contents.booktitle);
    fetch("/updatepurchase", { method: "POST", body: data });
  };
  deleteOne = e => {
    let data = new FormData();
    data.append("booktitle", this.props.contents.booktitle);
    fetch("/deleteOne", { method: "POST", body: data });
  };
  render = () => {
    return (
      <div>
        <div>
          <img src={this.props.contents.img} height="25px" />
          <h4>{this.props.contents.booktitle}</h4>
          <div>
            <form>
              <input
                type="number"
                defaultValue={this.props.contents.qty}
                onChange={this.quantity}
              />
            </form>
          </div>
          <div>
            <h4>CAD ${+this.props.contents.price * this.state.qty}</h4>
          </div>
          <div>
            <form>
              <input type="button" onClick={this.deleteOne} value="delete" />
            </form>
          </div>
        </div>
      </div>
    );
  };
}
