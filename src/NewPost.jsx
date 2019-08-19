import React, { Component } from "react";

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      file: "",
      description: "",
      booktitle: "",
      qty: 0,
      isbn: "",
      price: ""
    };
  }
  descChangeHandler = e => {
    this.setState({ description: e.target.value });
  };
  fileChangeHandler = e => {
    this.setState({ file: e.target.files[0] });
  };
  bookChangeHandler = e => {
    this.setState({ booktitle: e.target.value });
  };
  quanChangeHandler = e => {
    this.setState({ qty: e.target.value });
  };
  isbnChangeHandler = e => {
    this.setState({ isbn: e.target.value });
  };
  priceChangeHandler = e => {
    this.setState({ price: e.target.value });
  };
  submitHandler = evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("img", this.state.file);
    data.append("booktitle", this.state.booktitle);
    data.append("qty", this.state.qty);
    data.append("isbn", this.state.isbn);
    data.append("description", this.state.description);
    data.append("price", this.state.price);
    fetch("/new-post", { method: "POST", body: data });
  };
  render() {
    return (
      <div className="popup">
        <form onSubmit={this.submitHandler}>
          <div>
            <label for="booktitle">Book Title</label>
            <br />
            <input
              type="text"
              name="booktitle"
              onChange={this.bookChangeHandler}
            />
          </div>
          <div>
            <label for="img">Book Cover Image</label>
            <br />
            <input type="file" name="img" onChange={this.fileChangeHandler} />
          </div>
          <div>
            <label for="description">Description</label>
            <br />
            <textarea
              name="description"
              onChange={this.descChangeHandler}
              cols="50"
              rows="5"
            />
          </div>
          <div>
            <label for="quantity">Quantity</label>
            <br />
            <input
              type="number"
              name="quantity"
              min="1"
              onChange={this.quanChangeHandler}
            />
          </div>
          <div>
            <label for="price">Price</label>
            <br />
            <input
              type="number"
              name="price"
              min="0.00"
              step="0.01"
              onChange={this.priceChangeHandler}
            />
          </div>
          <div>
            <label for="ISBN">ISBN</label>
            <br />
            <input type="text" name="ISBN" onChange={this.isbnChangeHandler} />
          </div>
          <div>
            <input type="submit" value="Submit" />
            <input type="reset" />
          </div>
        </form>
      </div>
    );
  }
}
