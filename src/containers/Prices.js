import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import { NavigationIcon, Animation, Loading, LocationSearchHeader, PriceResultsList } from "../components";

import { setLoading, getPrices, resetPrices } from "../actions/prices.actions";

class Prices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinationText: ""
    };
  }

  componentDidMount() {
    const { getPrices } = this.props;
    getPrices();
  }

  returnToMain() {
    const { resetPrices } = this.props;
    resetPrices();
    Actions.main();
  }

  render() {
    const {
      isPricesLoading,
      isPricesFetched,
      isPricesError,
      uberPrices,
      kaptenPrices,
      boltPrices,
      marcelPrices,
      heetchPrices,
      lecabPrices,
      currentLocation,
      endLocation,
      createShareLink,
      cheapest
    } = this.props;

    return (
      <View style={styles.container}>
        <NavigationIcon icon={"arrow-left"} onPress={() => this.returnToMain()} />
        {isPricesLoading && <Loading />}
        {isPricesError && <Animation isLoop={false} />}
        {isPricesFetched && <React.Fragment>
          <LocationSearchHeader
            expanded
            disabledInput
            sourceText={"test"}
            destinationText={"test1"}
            />
            <PriceResultsList
              key={"uber"}
              isError={uberPrices.length === 0}
              isFetched={isPricesFetched}
              pricesArray={uberPrices}
              serviceName={"Uber"}
              tierProperty={"tier"}
              priceProperty={"value"}
              cheapest={cheapest}
            />
        </React.Fragment>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEE"
  },
  map: {
    flex: 1,
    zIndex: -1
  }
});

const mapStateToProps = state => ({
  ...state.prices
});

const mapDispatchToProps = {
  setLoading,
  getPrices,
  resetPrices
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prices);
