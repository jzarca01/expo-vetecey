import React from "react";
import { FlatList, StyleSheet, TouchableHighlight } from "react-native";

import SearchResultsRow from "./SearchResultsRow";

const SearchResultsList = ({
  list,
  isRecentList,
  onPressResult,
  fetchDetails
}) => {
  renderRow = ({ item, index }) => {
    const { title, address, icon, place_id, placeId } = item;

    return (
      <TouchableHighlight
        onPress={async () => {
          let touchedItem = item;
          const detailedItem = await fetchDetails(
            isRecentList ? placeId : place_id
          );
          touchedItem = { ...touchedItem, ...detailedItem };
          console.log("iteù", touchedItem);
          return onPressResult(touchedItem, isRecentList);
        }}
      >
        <SearchResultsRow
          key={index}
          title={isRecentList ? address : title}
          subtitle={""}
          icon={isRecentList ? null : icon}
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
      keyExtractor={item => (item.placeId ? item.placeId : item.place_id)}
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
