import {
  SET_LOADING,
  RESET_PRICES,
  FETCH_PRICES,
  FETCH_PRICES_SUCCESS,
  FETCH_PRICES_ERROR
} from "../types";

export const setLoading = isLoading => {
  return dispatch =>
    dispatch({
      type: SET_LOADING,
      payload: {
        isLoading: isLoading
      }
    });
};

export const getPrices = () => {
  return async (dispatch, getState, { api }) => {
    const { currentLocation, endLocation } = getState().map;

    function onSuccess(prices) {
      return dispatch({
        type: FETCH_PRICES_SUCCESS,
        payload: {
          isPricesFetched: true,
          ...prices
        }
      });
    }
    function onError(error) {
      dispatch({ type: FETCH_PRICES_ERROR, error });
      return error;
    }
    try {
      dispatch({
        type: FETCH_PRICES
      });

      const prices = await api({
        url: "/prices/calculate",
        method: "POST",
        data: {
          provider: "all",
          params: {
            currentLocation,
            endLocation
          }
        }
      });
      if (prices.data.length === 0) {
        return onError("no data");
      }
      return onSuccess(prices.data);
    } catch (err) {
      return onError(err);
    }
  };
};

export const resetPrices = () => dispatch =>
  dispatch({
    type: RESET_PRICES
  });
