import { registerRootComponent } from "expo";
import React from "react";
import App from './src/App';

class Main extends React.Component {
  render() {
    return <App />;
  }
}

registerRootComponent(Main);
