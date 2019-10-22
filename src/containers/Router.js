import React, { Component } from "react";
import { Router, Scene, Stack } from "react-native-router-flux";
import { connect } from "react-redux";

import Main from "./Main";
import Prices from "./Prices";
import Redirect from './Redirect';

class AppRouter extends Component {
  render() {
    return (
      <Router uriPrefix={'vetecey.fr'}>
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
          <Scene
            key={"staticPrices"}
            component={Prices}
            path={'/prices/:priceId'}
            title={"Prices"}
            hideNavBar
          />
          <Scene
            key={"redirect"}
            component={Redirect}
            title={"Redirect"}
            hideNavBar
          />
        </Stack>
      </Router>
    );
  }
}

export default connect()(AppRouter);
