import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Linking,
  Button
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import Clipboard from "@react-native-community/react-native-clipboard";
import AppLink from "react-native-app-link";

import { NavigationIcon } from "../components";

class Prices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCopied: false
    };
    console.log(props);
    this.onClickOrder = this.onClickOrder.bind(this);
    this.onClickStore = this.onClickStore.bind(this);
  }

  returnToPrices() {
    Actions.pop();
  }

  async onClickOrder() {
    const { deeplink, serviceName } = this.props;
    AppLink.maybeOpenURL(deeplink.mobile, {
      appName: serviceName,
      appStoreId: deeplink.ios,
      appStoreLocale: "fr",
      playStoreId: deeplink.android
    }).catch(err => {
      console.log("err", err);
    });
  }

  async onClickStore() {
    const { deeplink, serviceName } = this.props;
    AppLink.openInStore({
      appName: serviceName,
      appStoreId: deeplink.ios,
      appStoreLocale: "fr",
      playStoreId: deeplink.android
    }).catch(err => {
      console.log("err", err);
    });
  }

  clickCopy(code) {
    Clipboard.setString(code);
    this.setState({ isCopied: true });
  }

  render() {
    const { promoCodes, tier, serviceName, value } = this.props;
    const { isCopied } = this.state;
    const promo = promoCodes[serviceName];
    return (
      <View style={styles.container}>
        <NavigationIcon
          icon={"arrow-left"}
          onPress={() => this.returnToPrices()}
        />
        <View style={styles.redirectContainer}>
          <Text>{serviceName}</Text>
          <Text>{tier}</Text>
          <Text>{value ? `${value} €` : null}</Text>

          <Text>{promo.description}</Text>
          <Text onPress={() => this.clickCopy(promo.code)}>{promo.code}</Text>
          {isCopied && <Text>Le code a été copié</Text>}
        </View>
        <View>
          <Button onPress={this.onClickOrder} title={"Commander"} />
        </View>
        <View>
          <Button
            onPress={this.onClickStore}
            title={"Télécharger l'application"}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#EEE",
    color: "#000"
  },
  redirectContainer: {
    marginTop: 136
  }
});

const mapStateToProps = state => ({
  promoCodes: state.root.promoCodes
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prices);
