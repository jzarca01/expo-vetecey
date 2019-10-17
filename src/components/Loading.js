import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Animation from './Animation';

const Loading = ({ text = "Chargement..." }) => (
  <View style={styles.container}>
        <Text>{text}</Text>
    <Animation />
  </View>
);

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

export default Loading;