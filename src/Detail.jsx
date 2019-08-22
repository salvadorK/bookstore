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
        <div className="container">
          <div className="page-container">
            <div className="card">
              <h2 class="l-heading">About</h2>
              <img src={this.props.detail.img} />
              <p>ISBN:{this.props.detail.ISBN}</p>
              <p>Price:${this.props.detail.price}</p>
              <p>Quantity:{this.props.detail.qty}</p>
            </div>
            <div className="review-bg-primary">
              Title:<h2>{this.props.detail.booktitle}</h2>
              <h4>{this.props.detail.description}</h4>
              <button className="btnreview" onClick={this.makeReview}>
                {" "}
                Make a review
              </button>
            </div>
          </div>
        </div>
        <div>Username:{this.props.detail.username}</div>
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

        {this.state.makeReview ? (
          <div>
            <form onSubmit={this.submitHandler}>
              <textarea
                name="description"
                onChange={this.reviewChngeHandler}
                cols="10"
                rows="2"
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
