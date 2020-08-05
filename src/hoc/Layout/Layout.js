import React, { Component } from "react";
import Aux from "../Aux/Aux";
import "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  drawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClick={this.drawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerHandler}
        />
        <main className="content">{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
