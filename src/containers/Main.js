import React, { Component } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import MapView from "react-native-maps";
import { GoogleAutoComplete } from "react-native-google-autocomplete";

import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import geocoder from "../api/geocoder";
import { GMAPS_APIKEY } from "../api/keys";

import {
  setFormattedLocation,
  pickHistoryLocation,
  setLocationError
} from "../actions/map.actions";

import {
  LocationButtonGroup,
  LocationSearchHeader,
  LocationSearchResults,
  SearchResultsList,
  NavigationIcon
} from "../components";

class Main extends Component {
  constructor(props) {
    super(props);
    const { lastLocation } = this.props;
    this.state = {
      searchResultsOpen: false,
      sourceText: "Position actuelle",
      destinationText: "",
      position: lastLocation,
      region: {
        ...lastLocation,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }
    };
    this.watchID = null;
  }

  componentWillUnmount() {
    this.clearWatch();
  }

  async startWatch() {
    this.watchID = await Location.watchPositionAsync(
      {
        accuracy: 6, // Accuracy.BestForNavigation
        distanceInterval: 30000 // in meters
      },
      async position => await this.getCurrentLocation(position)
    );
  }

  clearWatch() {
    this.watchID != null && this.watchID.remove();
  }

  getCurrentLocation = async position => {
    const { setFormattedLocation } = this.props;
    const { coords } = position;
    const { latitude, longitude } = coords;
    const geo = await geocoder.fromLatLng(latitude, longitude);
    const selectedAddress = {
      ...coords,
      ...geo.results[0]
    };
    this.setState({
      position: selectedAddress,
      sourceText: geo.results[0].formatted_address,
      region: {
        ...this.state.region,
        latitude,
        longitude
      }
    });
    console.log("position", this.state.position);
    setFormattedLocation(selectedAddress);
  };

  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this.getLocationAsync();
    }
  }

  getLocationAsync = async () => {
    const { setLocationError } = this.props;
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
      setLocationError();
    }
    let position = await Location.getCurrentPositionAsync({
      accuracy: 6, // Accuracy.BestForNavigation
      maximumAge: 30000 // in ms
    });
    await this.getCurrentLocation(position);
    await this.startWatch();
  };

  toggleSearchResults = () => {
    const { searchResultsOpen } = this.state;

    if (!searchResultsOpen) {
      this.clearWatch();
    } else {
      this.startWatch();
    }

    this.setState({ searchResultsOpen: !searchResultsOpen });
  };

  onSourceTextChange = sourceText => {
    this.setState({ sourceText });
  };

  onDestinationTextChange = destinationText => {
    this.setState({ destinationText });
  };

  isDestinationTextEmpty = () => {
    const { destinationText } = this.state;
    return destinationText.length === 0;
  };

  selectAddressFromList = (address, isRecentList = false) => {
    if(isRecentList) {
      return this.selectAddressFromRecent(address);
    }
    const { setFormattedLocation } = this.props;
    const { description } = address;
    this.onDestinationTextChange(description);
    setFormattedLocation(address, true);
    Actions.prices();
  };

  selectAddressFromRecent = recent => {
    const { pickHistoryLocation } = this.props;
    const { address } = recent;
    this.onDestinationTextChange(address);
    pickHistoryLocation(recent, true);
    Actions.prices();
  };

  render() {
    const { recentAddresses } = this.props;
    console.log(this.props);
    const {
      searchResultsOpen,
      sourceText,
      destinationText,
      region,
      position
    } = this.state;

    return (
      <View style={styles.container}>
        {searchResultsOpen && (
          <NavigationIcon
            icon={"arrow-left"}
            onPress={this.toggleSearchResults}
          />
        )}
        <GoogleAutoComplete
          apiKey={GMAPS_APIKEY}
          debounce={800}
          components="country:fr"
          language="fr"
          minLength={3}
        >
          {({ handleTextChange, locationResults, fetchDetails }) => (
            <React.Fragment>
              <LocationSearchHeader
                onPress={this.toggleSearchResults}
                expanded={searchResultsOpen}
                sourceText={sourceText}
                destinationText={destinationText}
                onSourceTextChange={text => {
                  handleTextChange(text);
                  this.onSourceTextChange(text);
                }}
                onDestinationTextChange={text => {
                  handleTextChange(text);
                  this.onDestinationTextChange(text);
                }}
              />
              <LocationButtonGroup
                visible={!searchResultsOpen}
                locations={recentAddresses}
                onPressLocation={this.selectAddressFromRecent}
              />
              <LocationSearchResults visible={searchResultsOpen}>
                <SearchResultsList
                  isRecentList={this.isDestinationTextEmpty()}
                  list={
                    this.isDestinationTextEmpty()
                      ? recentAddresses
                      : locationResults
                  }
                  fetchDetails={fetchDetails}
                  onPressResult={this.selectAddressFromList}
                />
              </LocationSearchResults>
            </React.Fragment>
          )}
        </GoogleAutoComplete>
        <MapView style={styles.map} region={region}>
          {position && (
            <MapView.Circle
              center={position}
              radius={10}
              strokeColor={"transparent"}
              fillColor={"#3594BC"}
            />
          )}
        </MapView>
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
  ...state.addresses,
  lastLocation: state.map.lastLocation
});

const mapDispatchToProps = {
  setFormattedLocation,
  pickHistoryLocation,
  setLocationError
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
