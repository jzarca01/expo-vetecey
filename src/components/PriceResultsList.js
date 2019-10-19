import React from "react";
import {
  Animatable,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

import PriceResultsRow from './PriceResultsRow';

const PriceResultsList = ( {
    isError,
    isFetched,
    pricesArray,
    serviceName,
    tierProperty,
    priceProperty,
    cheapest
  }) => {
  renderRow = ({ item, index }) => {
    return (
      <TouchableHighlight
        onPress={async () => {
          console.log("price", item);
          return onPressResult(item);
        }}
      >
        <PriceResultsRow
          key={index}
          title={item[tierProperty]}
          price={item[priceProperty]}
        />
      </TouchableHighlight>
    );
  };

  console.log("list", pricesArray);
  return (
    <View style={styles.container}>
      <Text pointerEvents={"none"}>{serviceName}</Text>
      <FlatList
        style={styles.container}
        data={pricesArray}
        renderItem={this.renderRow}
        keyExtractor={(item, index) => `${serviceName}-${index}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
