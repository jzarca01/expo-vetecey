import { ADD_ADDRESS } from "../types";
import { uniqWith, isEqual } from "lodash";

const initialState = {
  recentAddresses: []
};

const addressesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESS:
      const addresses = state.recentAddresses;
      const { address } = action.payload;
      const uniqueSet = uniqWith([...addresses, address].reverse(), isEqual).slice(0,3);
      return {
        ...state,
        recentAddresses: uniqueSet
      };
    default:
      return state;
  }
};

export default addressesReducer;
