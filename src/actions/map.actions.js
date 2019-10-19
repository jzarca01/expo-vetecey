import {
  LOCATION_FOUND,
  LOCATION_ERROR,
  ADD_ADDRESS,
  UNSELECT_LOCATION
} from "../types";

import { isNil } from "lodash";

const wakeServer = api =>
  api({
    method: "GET",
    url: "/wakeup"
  });

export const setFormattedLocation = (place, isEndLocation = false) => async (
  dispatch,
  getState,
  { api }
) => {
  const {
    geometry,
    formatted_address,
    address_components,
    place_id
  } = place;

  const getZipcode = components => {
    const zipComponent = components.filter(comp =>
      comp.types.includes("postal_code")
    );
    return zipComponent.length ? zipComponent[0].long_name : null;
  };

  const getCountry = components => {
    const countryComponent = components.filter(comp =>
      comp.types.includes("country")
    );
    return countryComponent.length ? countryComponent[0].long_name : null;
  };

  try {
    if (getCountry(address_components) === "France") {
      const { location } = geometry; 
      const selectedAddress = {
        address: !isNil(formatted_address) ? formatted_address : null,
        zipCode: !isNil(address_components)
          ? getZipcode(address_components)
          : null,
        placeId: place_id,
        latitude: location.lat,
        longitude: location.lng,
        ...place
      };
      if (isEndLocation) {
        dispatch({
          type: ADD_ADDRESS,
          payload: {
            address: selectedAddress
          }
        });
      }

      if (!isEndLocation) {
        wakeServer(api);
      }
      const thePayload = isEndLocation
        ? {
            endLocation: selectedAddress
          }
        : {
            isLocationFound: true,
            currentLocation: selectedAddress,
            lastLocation: selectedAddress
          };
      dispatch({
        type: LOCATION_FOUND,
        payload: thePayload
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const pickHistoryLocation = (
  selectedAddress,
  isEndLocation = false
) => async (dispatch, getState, { api }) => {
  try {
    if (!isEndLocation) {
      wakeServer(api);
    }
    const thePayload = isEndLocation
      ? {
          endLocation: selectedAddress
        }
      : {
          isLocationFound: true,
          currentLocation: selectedAddress
        };

    dispatch({
      type: LOCATION_FOUND,
      payload: thePayload
    });
  } catch (err) {
    console.log(err);
  }
};

export const setLocationError = err => dispatch => {
  console.log(err);
  dispatch({
    type: LOCATION_ERROR,
    payload: {
      isLocationError: true
    }
  });
};

/*export function unselectLocation(isEndLocation = false) {
  return (dispatch, getState) => {
    dispatch({
      type: UNSELECT_LOCATION,
      payload: {
        currentLocation: isEndLocation ? getState().map.currentLocation : {},
        endLocation: isEndLocation ? {} : getState().map.endLocation
      }
    });
  };
}
*/
