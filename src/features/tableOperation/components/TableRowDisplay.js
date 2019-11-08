import React from "react";
type Props = {
  data: Object
};
type state = {};

class TableRowDisplay extends React.Component<Props, State> {
  inputRef = React.createRef();
  displayRow() {
    const rows = this.props.data;
    return rows.map((value, key) => {
      return (
        <div
          style={{
            border: "1px solid black",
            display: "table",
            margin: "2px"
          }}
          key={key}
        >
          <input
            ref={this.inputRef}
            onChange={() => {
              console.log("onchange");
            }}
            type="checkbox"
          />
          <div style={{ display: "table-cell", padding: "0 5px 0 5px" }}>
            {value.id}
          </div>
          <div style={{ display: "table-cell", padding: "0 5px 0 5px" }}>
            {value.name}
          </div>
        </div>
      );
    });
  }
  render() {
    const displayRow = this.displayRow();
    return <div>{displayRow}</div>;
  }
}
export default TableRowDisplay;
