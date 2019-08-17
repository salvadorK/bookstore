import React, { Component } from "react";

export default class Cartlist extends Component {
  constructor(props) {
    super(props);
    this.state = { qty: this.props.contents.qty };
  }
  quantity = e => {
    this.setState({ qty: e.target.value });
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
        </div>
      </div>
    );
  };
}
