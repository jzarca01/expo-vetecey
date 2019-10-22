import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { capitalize } from 'lodash';

const fixServiceName = serviceName => capitalize(serviceName);


const PriceResultsRow = ({
  title = "Service unique",
  subtitle,
  price,
  onClickOrder
}) => (
  <View style={styles.container}>
    <View style={styles.tierContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
    <View style={styles.priceContainer}>
      <Text style={styles.title}>{price ? `${price} €` : null}</Text>
    </View>
    <View style={styles.buttonContainer}>
      <Button title={"Commander"} style={styles.order} onPress={onClickOrder} />
    </View>
  </View>
);

const SpecialPriceResultsRow = ({
  price,
  onClickOrder,
  tierProperty,
  priceProperty,
  serviceName
}) => {
  const fixedServiceName = fixServiceName(serviceName);
  return (
  <View style={styles.container}>
    <Text>Le moins cher</Text>
    <View style={styles.tierContainer}>
      <Text style={styles.title}>{fixedServiceName}</Text>
      <Text style={styles.subtitle}>{price[tierProperty]}</Text>
    </View>
    <View style={styles.priceContainer}>
      <Text style={styles.title}>{price ? `${price[priceProperty]} €` : null}</Text>
    </View>
    <View style={styles.buttonContainer}>
      <Button title={"Commander"} style={styles.order} onPress={() => onClickOrder(price, fixedServiceName)} />
    </View>
  </View>
);
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  tierContainer: {
    flex: 1,
    flexDirection: "column"
  },
  priceContainer: {},
  buttonContainer: {},
  order: {},
  title: {
    fontSize: 15,
    color: "black",
    textTransform: "capitalize"
  },
  subtitle: {
    fontSize: 13,
    color: "#A4A4AC"
  }
});

export { PriceResultsRow, SpecialPriceResultsRow };
