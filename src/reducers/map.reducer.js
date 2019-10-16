import {
  LOCATION_FOUND,
  LOCATION_ERROR,
  SET_END_LOCATION,
  UNSELECT_LOCATION,
  FETCH_SHARE_LINK_SUCCESS
} from "../types";

const initialState = {
  isLocationFound: false,
  isLocationError: false,
  currentLocation: {},
  endLocation: {}
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_FOUND:
      return {
        ...state,
        ...action.payload
      };
    case SET_END_LOCATION:
      return {
        ...state,
        ...action.payload
      };
    case LOCATION_ERROR:
      return {
        ...state,
        isLocationError: true
      };
    case UNSELECT_LOCATION:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_SHARE_LINK_SUCCESS:
      const { currentLocation, endLocation } = action.payload;
      return {
        ...state,
        currentLocation,
        endLocation
      };
    default:
      return state;
  }
};

export default mapReducer;
