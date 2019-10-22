import React from "react";
import {
  Animatable,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

import { PriceResultsRow } from './PriceResultsRow';

const PriceResultsList = ( {
    isError,
    isFetched,
    pricesArray,
    serviceName,
    tierProperty,
    priceProperty,
    cheapest,
    onPressResult
  }) => {
  renderRow = ({ item, index }) => {
    return (
        <PriceResultsRow
          onClickOrder={() => onPressResult(item, serviceName)}
          key={index}
          title={item[tierProperty]}
          price={item[priceProperty]}
          cheapest={item === cheapest}
        />
    );
  };

  console.log("list", pricesArray);
  return (
    <View style={styles.container}>
      {isError && <React.Fragment>
        <Text>Une erreur est survenue avec {serviceName}</Text>
      </React.Fragment>}
      {isFetched && <React.Fragment>
        <Text pointerEvents={"none"}>{serviceName}</Text>
        <FlatList
          style={styles.list}
          data={pricesArray}
          renderItem={this.renderRow}
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={(item, index) => `${serviceName}-${index}`}
        />
      </React.Fragment>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 10
  },
  list: {
    flexGrow: 0,
    height: "auto"
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: "skyblue"
  },
  separator: {
    flex: 1,
    height: 2,
    backgroundColor: "#EDEDED"
  }
});

export default PriceResultsList;
