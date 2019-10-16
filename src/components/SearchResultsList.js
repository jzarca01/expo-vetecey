import React from "react";
import { FlatList, StyleSheet, TouchableHighlight } from "react-native";

import SearchResultsRow from "./SearchResultsRow";

const SearchResultsList = ({ list, onPressResult }) => {
  renderRow = ({ item, index }) => {
    const { title, description, subtitle, icon } = item;

    return (
      <TouchableHighlight onPress={onPressResult}>
        <SearchResultsRow
          key={index}
          title={title ? title : description}
          subtitle={""}
          icon={icon}
        />
      </TouchableHighlight>
    );
  };

  console.log("list", list);
  return (
    <FlatList
      style={styles.container}
      data={list}
      renderItem={this.renderRow}
      keyExtractor={item => item.id}
    />
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

export default SearchResultsList;
