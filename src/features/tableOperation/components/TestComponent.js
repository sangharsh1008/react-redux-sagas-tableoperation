import React from "react";

export const TestComponent = () => {
  return <div>hello</div>;
};

export class TestComponentClass extends React.Component {
  constructor(...props) {
    super(props);

    this.value = 10;
    this.displayValue = this.displayValue.bind(this);
  }
  componentDidMount() {
    window.addEventListener("scroll", this.scrollHandel);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandel);
  }
  scrollHandel(e) {
    console.log("position", e);
  }
  displayValue() {
    console.log(this.value);
  }
  render(props) {
    console.log("constructor props", props);
    return <div style={{ height: "10005px", width: "10005px" }}>hello123</div>;
  }
}
