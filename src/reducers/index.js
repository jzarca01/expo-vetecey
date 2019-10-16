import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import { AsyncStorage } from 'react-native';

import mapReducer from "./map.reducer";
import rootReducer from "./root.reducer";
import pricesReducer from "./prices.reducer";
import addressesReducer from "./addresses.reducer";

const rootConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["isTutorialFinished, isNewUser"]
};

const addressesConfig = {
  key: "address",
  storage: AsyncStorage
};

export default combineReducers({
  root: persistReducer(rootConfig, rootReducer),
  map: mapReducer,
  prices: pricesReducer,
  addresses: persistReducer(addressesConfig, addressesReducer)
});
