import React, { Component } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import MapView from "react-native-maps";
import { GoogleAutoComplete } from "react-native-google-autocomplete";

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import geocoder from "../api/geocoder";
import { GMAPS_APIKEY } from "../api/keys";

import {
  LocationButtonGroup,
  LocationSearchHeader,
  LocationSearchResults,
  SearchResultsList,
  NavigationIcon
} from "../components";

const mapStateToProps = state => ({
  recentLocations: state.recentLocations,
  shortcutLocations: state.recentLocations && state.recentLocations.length ? state.recentLocations.slice(0, 3) : []
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResultsOpen: false,
      sourceText: "Position actuelle",
      destinationText: "",
      position: {
        latitude: 48.503364,
        longitude: -0.127625
      },
      region: {
        latitude: 48.503364,
        longitude: -0.127625,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      },
      lastPosition: {}
    };
    this.watchID = null;
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  getCurrentLocation = async position => {
    const { coords } = position;
    const { latitude, longitude } = coords;
    const geo = await geocoder.fromLatLng(latitude, longitude);
    /*const selectedAddress = {
      lat: latitude,
      lng: longitude,
    };*/
    this.setState({
      position: {
        latitude: latitude,
        longitude: longitude,
        ...coords,
        ...geo.results[0]
      },
      sourceText: geo.results[0].formatted_address,
      region: {
        ...this.state.region,
        latitude: latitude,
        longitude: longitude
      }
    });
    console.log("position", this.state.position);
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getLocationAsync();
    }
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let position = await Location.getCurrentPositionAsync({ 
      accuracy: 6, // Accuracy.BestForNavigation
      maximumAge: 20000 // in ms
    });
    await this.getCurrentLocation(position);    
    this.watchID = Location.watchPositionAsync({
      accuracy: 6, // Accuracy.BestForNavigation
      timeInterval: 20000, // in ms
      distanceInterval: 10 // in meters
    }, async position => await this.getCurrentLocation(position));
  }

  toggleSearchResults = () => {
    const { searchResultsOpen } = this.state;

    this.setState({ searchResultsOpen: !searchResultsOpen });
  };

  onSourceTextChange = sourceText => {
    this.setState({ sourceText });
  };

  onDestinationTextChange = destinationText => {
    this.setState({ destinationText });
  };

  onDestinationChange = destination => {
    const { title } = destination;
    this.onDestinationTextChange(title);
  };

  isDestinationTextEmpty = () => {
    const { destinationText } = this.state;
    return destinationText.length === 0;
  };

  render() {
    const { recentLocations, shortcutLocations } = this.props;
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
          debounce={300}
          components="country:fr"
          language="fr"
          minLength={3}
        >
          {({ handleTextChange, locationResults }) => (
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
                locations={shortcutLocations}
                onPressLocation={this.onDestinationChange}
              />
              <LocationSearchResults visible={searchResultsOpen}>
                <SearchResultsList
                  list={
                    this.isDestinationTextEmpty()
                      ? recentLocations
                      : locationResults
                  }
                  onPressResult={item => console.log("clicked item", item)}
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

export default connect(mapStateToProps)(Main);
