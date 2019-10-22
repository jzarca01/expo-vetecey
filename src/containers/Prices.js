import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { isEqual } from 'lodash';

import {
  NavigationIcon,
  Animation,
  Loading,
  LocationSearchHeader,
  PriceResultsList,
  SpecialPriceResultsRow
} from "../components";

import { setLoading, getPrices, resetPrices } from "../actions/prices.actions";

import deeplinks from '../config/deeplinks';

class Prices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinationText: ""
    };
    this.onClickOrder = this.onClickOrder.bind(this)
  }

  componentDidMount() {
    const { getPrices, isPricesLoading } = this.props;
    if (!isPricesLoading) {
      getPrices();
    }
  }

  returnToMain() {
    const { resetPrices } = this.props;
    resetPrices();
    Actions.main();
  }

  async onClickOrder(item, serviceName) {
    const { provider } = item;
    const { currentLocation, endLocation } = this.props;
    if(provider) {
      const deeplink = deeplinks[provider].deeplink(currentLocation, endLocation)
      Actions.push('redirect', {
        deeplink,
        provider,
        serviceName,
        ...item
      })
    }
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
        <NavigationIcon
          icon={"arrow-left"}
          onPress={() => this.returnToMain()}
        />
        {isPricesLoading && <Loading />}
        {isPricesError && <Animation isLoop={false} />}
        {isPricesFetched && (
          <ScrollView>
            <LocationSearchHeader
              expanded
              disabledInput
              sourceText={currentLocation.address}
              destinationText={endLocation.address}
            />
            <View style={styles.prices}>
              {cheapest && <SpecialPriceResultsRow                 
                isError={isEqual(cheapest, {})}
                isFetched={isPricesFetched}
                serviceName={cheapest.provider}
                price={cheapest}
                tierProperty={"tier"}
                priceProperty={"value"}
                deeplink={deeplinks[cheapest.provider].deeplink(
                  currentLocation,
                  endLocation
                )}
                deeplinkAdditional={deeplinks[cheapest.provider].additional}
                onClickOrder={this.onClickOrder}
            />}
              <PriceResultsList
                key={"uber"}
                isError={uberPrices.length === 0}
                isFetched={isPricesFetched}
                pricesArray={uberPrices}
                serviceName={"Uber"}
                tierProperty={"tier"}
                priceProperty={"value"}
                cheapest={cheapest}
                onPressResult={this.onClickOrder}
              />
              <PriceResultsList
                key={"kapten"}
                isError={kaptenPrices.length === 0}
                isFetched={isPricesFetched}
                pricesArray={kaptenPrices}
                serviceName={"Kapten"}
                tierProperty={"tier"}
                priceProperty={"value"}
                cheapest={cheapest}
                onPressResult={this.onClickOrder}
              />
              <PriceResultsList
                key={"bolt"}
                isError={boltPrices.length === 0}
                isFetched={isPricesFetched}
                pricesArray={boltPrices}
                serviceName={"Bolt"}
                tierProperty={"tier"}
                priceProperty={"value"}
                cheapest={cheapest}
                onPressResult={this.onClickOrder}
              />
              <PriceResultsList
                key={"marcel"}
                isError={marcelPrices.length === 0}
                isFetched={isPricesFetched}
                pricesArray={marcelPrices}
                serviceName={"Marcel"}
                tierProperty={"tier"}
                priceProperty={"value"}
                cheapest={cheapest}
                onPressResult={this.onClickOrder}
              />
              <PriceResultsList
                key={"heetch"}
                isError={heetchPrices.length === 0}
                isFetched={isPricesFetched}
                pricesArray={heetchPrices}
                serviceName={"Heetch"}
                tierProperty={"tier"}
                priceProperty={"value"}
                cheapest={cheapest}
                onPressResult={this.onClickOrder}
              />
              <PriceResultsList
                key={"lecab"}
                isError={lecabPrices.length === 0}
                isFetched={isPricesFetched}
                pricesArray={lecabPrices}
                serviceName={"Lecab"}
                tierProperty={"tier"}
                priceProperty={"value"}
                cheapest={cheapest}
                onPressResult={this.onClickOrder}
              />
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#EEE"
  },
  prices: {
    marginTop: 136,
    height: "auto",
    width: windowWidth,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#EEE"
  }
});

const mapStateToProps = state => ({
  ...state.prices,
  currentLocation: state.map.currentLocation,
  endLocation: state.map.endLocation
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
