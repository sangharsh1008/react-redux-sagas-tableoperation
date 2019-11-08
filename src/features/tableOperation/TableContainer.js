import React from "react";
import TableRowDisplay from "./components/TableRowDisplay";
import { users } from "./mockData";
import { selectRemainingRows } from "./tableSelector";
import { connect } from "react-redux";
import type { globalState } from "../../utils/globalize";
import { deleteRowAction, insertRowAction } from "./tableAction";
import { TestComponent, TestComponentClass } from "./components/TestComponent";
// import Button from "../buttons/Button";
import { Scroll } from "../scroll/scroll";
type Props = {
  data: Object
};
type State = {};

class TableContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.value = 100;
  }
  componentWillReceiveProps(nextProps) {
    nextProps && console.log("nextProps");
  }
  render() {
    const { selectRemainingRows } = this.props;
    const ab = new TestComponentClass("abc", "xyz");
    //  const fun1 = ab.displayValue.bind(this);
    console.log(ab, <TestComponentClass abc="abc" />);
    return (
      <div>
        {
          //   <Scroll>
          //   <div>hello</div>
          // </Scroll>
        }
        <TestComponentClass />
      </div>
    );

    // return (
    //   <div>
    //     {selectRemainingRows && <TableRowDisplay data={selectRemainingRows} />}
    //     <button
    //       onClick={() => {
    //         this.props.deleteRow();
    //       }}
    //     >
    //       Hide
    //     </button>
    //     <button
    //       onClick={() => {
    //         this.props.insertRow();
    //       }}
    //     >
    //       Display
    //     </button>
    //   </div>
    // );
  }
}

export const mapStateToProps = (globalState: GlobalState) => ({
  selectRemainingRows: selectRemainingRows(globalState)
});

const mapDispatchToprops = {
  deleteRow: deleteRowAction,
  insertRow: insertRowAction
};
export default connect(
  mapStateToProps,
  mapDispatchToprops
)(TableContainer);
