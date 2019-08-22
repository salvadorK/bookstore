import "./main.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Detail extends Component {
  constructor() {
    super();
    this.state = { makeReview: false, reviews: "" };
  }
  makeReview = () => {
    this.setState({ makeReview: !this.state.makeReview });
  };
  reviewChngeHandler = e => {
    this.setState({ reviews: e.target.value });
  };
  submitHandler = e => {
    e.preventDefault();
    let data = new FormData();
    data.append("reviews", this.state.reviews);
    data.append("booktitle", this.props.detail.booktitle);
    fetch("/makeReview", { method: "POST", body: data });
  };
  render() {
    console.log(this.props.detail.booktitle);
    return (
      <div id="detailpage">
        <div>{/* <img src={this.props.detail.img} /> */}</div>
        <div>{this.props.detail.booktitle}</div>
        <div>{this.props.detail.ISBN}</div>
        <div>{this.props.detail.qty}</div>
        <div>{this.props.detail.price}</div>
        <div>{this.props.detail.description}</div>
        <div>{this.props.detail.username}</div>
        <div>
          <Link to={"/"}> Back </Link>
        </div>
        <div>
          {this.props.detail.reviews.map(x => {
            return (
              <div>
                {x.username}:{x.reviews}
              </div>
            );
          })}
        </div>
        <button className="btn" onClick={this.makeReview}>
          {" "}
          Make a review
        </button>

        {this.state.makeReview ? (
          <div>
            <form onSubmit={this.submitHandler}>
              <textarea
                name="description"
                onChange={this.reviewChngeHandler}
                cols="50"
                rows="5"
              />
              <input type="submit" value="submit" />
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}
export default Detail;
