import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import FSStorage from 'redux-persist-expo-fs-storage';

import mapReducer from "./map.reducer";
import rootReducer from "./root.reducer";
import pricesReducer from "./prices.reducer";
import addressesReducer from "./addresses.reducer";

const storage = FSStorage();

const rootConfig = {
  key: "root",
  storage: storage,
  whitelist: ["isTutorialFinished, isNewUser"]
};

const addressesConfig = {
  key: "address",
  storage: storage
};

const mapConfig = {
  key: 'location',
  storage: storage,
  whitelist: ['lastLocation']
}

export default combineReducers({
  root: persistReducer(rootConfig, rootReducer),
  map: persistReducer(mapConfig, mapReducer),
  prices: pricesReducer,
  addresses: persistReducer(addressesConfig, addressesReducer)
});
