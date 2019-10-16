import React, { Component } from "react";
import { Router, Scene, Stack } from "react-native-router-flux";
import { connect } from "react-redux";

import Main from "./Main";
import Prices from "./Prices";

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Stack key={"root"}>
          <Scene
            initial
            key={"main"}
            component={Main}
            title={"Main"}
            hideNavBar
          />
          <Scene
            key={"prices"}
            component={Prices}
            title={"Prices"}
            hideNavBar
          />
        </Stack>
      </Router>
    );
  }
}

export default connect()(AppRouter);
