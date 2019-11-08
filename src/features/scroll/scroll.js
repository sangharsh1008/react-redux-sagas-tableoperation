import React, { Component } from "react";

export class Scroll extends Component {
  render() {
    console.log(this.props.children, "this.props.children");
    return <div>{this.props.children}</div>;
  }
}
