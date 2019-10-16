import {
  SET_LOADING,
  RESET_PRICES,
  FETCH_PRICES,
  FETCH_PRICES_SUCCESS,
  FETCH_PRICES_ERROR,
  FETCH_SHARE_LINK_SUCCESS
} from "../types";

const initialState = {
  isLoading: false,
  isPricesLoading: false,
  isPricesError: false,
  isPricesFetched: false,
  created_at: null,
  cheapest: null,

  uberPrices: [],
  kaptenPrices: [],
  boltPrices: [],
  marcelPrices: [],
  heetchPrices: [],
  lecabPrices: []
};

const pricesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        ...action.payload
      };
    case RESET_PRICES:
      return {
        ...state,
        ...initialState
      };
    case FETCH_PRICES:
      return {
        ...state,
        isPricesLoading: true
      };
    case FETCH_PRICES_SUCCESS:
      const {
        uberPrices,
        marcelPrices,
        boltPrices,
        kaptenPrices,
        heetchPrices,
        lecabPrices,
        cheapest
      } = action.payload;
      return {
        ...state,
        isPricesLoading: false,
        isPricesFetched: true,
        isPricesError: false,
        uberPrices: uberPrices,
        marcelPrices: marcelPrices,
        boltPrices: boltPrices,
        kaptenPrices: kaptenPrices,
        heetchPrices: heetchPrices,
        lecabPrices: lecabPrices,
        cheapest: cheapest
      };
    case FETCH_PRICES_ERROR:
      return {
        ...state,
        isPricesError: true,
        isPricesFetched: false,
        isPricesLoading: false
      };
    case FETCH_SHARE_LINK_SUCCESS:
      return {
        ...state,
        uberPrices: action.payload.uberPrices,
        kaptenPrices: action.payload.kaptenPrices,
        boltPrices: action.payload.boltPrices,
        marcelPrices: action.payload.marcelPrices,
        heetchPrices: action.payload.heetchPrices,
        lecabPrices: action.payload.lecabPrices,
        cheapest: action.payload.cheapest,
        created_at: action.payload.created_at
      };
    default:
      return state;
  }
};

export default pricesReducer;
