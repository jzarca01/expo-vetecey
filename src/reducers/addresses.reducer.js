import { ADD_ADDRESS } from "../types";
import { uniqWith, isEqual } from "lodash";

const initialState = {
  recentAddresses: null
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESS:
      const addresses =
        state.recentAddresses && state.recentAddresses.length
          ? state.recentAddresses
          : [];
      const { address } = action.payload;
      const uniqueSet = uniqWith([...addresses, address].reverse(), isEqual);
      return {
        ...state,
        recentAddresses: uniqueSet
      };
    default:
      return state;
  }
};

export default historyReducer;
