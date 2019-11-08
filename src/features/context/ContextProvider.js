import React, { createContext } from "react";

export const ContextTest = createContext();

class ContextProvider extends React.Component {
  state = {
    color: "red"
  };

  render() {
    return (
      <ContextTest.Provider value={{ ...this.state }}>
        {this.props.children}
      </ContextTest.Provider>
    );
  }
}
export default ContextProvider;
