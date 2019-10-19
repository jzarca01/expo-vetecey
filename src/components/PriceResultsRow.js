import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const PriceResultsRow = ({ title, subtitle, price, onClickOrder }) => (
  <View style={styles.container}>
    <View style={styles.tierContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
    <View style={styles.priceContainer}>
        <Text style={styles.title}>{price}</Text>
    </View>
    <View style={styles.buttonContainer}>
        <Button title={'Commander'} style={styles.order} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    height: 56,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  tierContainer: {
      flex: 1,
      flexDirection: "row"
  },
  priceContainer: {
  },
  buttonContainer: {
  },
  order: {
  },
  title: {
    fontSize: 15,
    color: "black"
  },
  subtitle: {
    fontSize: 13,
    color: "#A4A4AC"
  }
});

export default PriceResultsRow;
