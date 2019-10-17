import {
    FINISHED_TUTORIAL,
    CREATE_SHARE_LINK,
    CREATE_SHARE_LINK_SUCCESS,
    CREATE_SHARE_LINK_ERROR,
    FETCH_SHARE_LINK,
    FETCH_SHARE_LINK_SUCCESS,
    FETCH_SHARE_LINK_ERROR,
    FETCH_PROMO_CODES,
    FETCH_PROMO_CODES_SUCCESS,
    FETCH_PROMO_CODES_ERROR,
    SEND_LINK,
    SEND_LINK_SUCCESS,
    SEND_LINK_ERROR,
    SET_USER_NOT_NEW
  } from "../types";
  
  import ReactGA from "react-ga";
  
  export const setFinishedTutorial = () => {
    return dispatch => {
      dispatch({
        type: FINISHED_TUTORIAL
      });
    };
  };
  
  export const createShareLink = () => {
    return async (dispatch, getState, { api }) => {
      const currentLocation = getState().map.currentLocation;
      const endLocation = getState().map.endLocation;
      const prices = getState().prices;
  
      function onSuccess(uuid) {
        ReactGA.event({
          category: "Share",
          action: "User created share link"
        });
        return dispatch({
          type: CREATE_SHARE_LINK_SUCCESS,
          payload: {
            shareLink: `https://vetecey.fr/prices/${uuid}`
          }
        });
      }
      function onError(error) {
        ReactGA.event({
          category: "Share",
          action: "Error creating share link",
          label: error
        });
        dispatch({ type: CREATE_SHARE_LINK_ERROR, error });
        console.log(error);
        return error;
      }
      try {
        ReactGA.event({
          category: "Share",
          action: "Creating share link"
        });
        dispatch({
          type: CREATE_SHARE_LINK
        });
        const share = await api({
          url: "/prices/save",
          method: "POST",
          data: {
            currentLocation: currentLocation,
            endLocation: endLocation,
            uberPrices: prices.uberPrices,
            kaptenPrices: prices.kaptenPrices,
            boltPrices: prices.boltPrices,
            marcelPrices: prices.marcelPrices,
            heetchPrices: prices.heetchPrices,
            cheapest: prices.cheapest
          }
        });
        onSuccess(share.data);
      } catch (err) {
        onError(err);
      }
    };
  };
  
  export const fetchShareLink = uuid => {
    return async (dispatch, getState, { api }) => {
      function onSuccess(data) {
        ReactGA.event({
          category: "Share",
          action: "User retrieved share link"
        });
        dispatch({
          type: FETCH_SHARE_LINK_SUCCESS,
          payload: data
        });
        return data;
      }
      function onError(error) {
        ReactGA.event({
          category: "Share",
          action: "Error creating share link",
          label: error
        });
        dispatch({ type: FETCH_SHARE_LINK_ERROR, error });
        console.log(error);
        return error;
      }
      try {
        ReactGA.event({
          category: "Share",
          action: "User comes from share link"
        });
        dispatch({
          type: FETCH_SHARE_LINK,
          payload: {
            shareLink: `https://vetecey.fr/prices/${uuid}`
          }
        });
        const share = await api({
          url: `/prices/${uuid}`,
          method: "GET"
        });
  
        onSuccess(share.data[0]);
      } catch (err) {
        onError(err);
      }
    };
  };
  
  export const setPromoCodes = code => {
    return async (dispatch, getState, { api }) => {
      function onSuccess(data) {
        dispatch({
          type: FETCH_PROMO_CODES_SUCCESS,
          payload: {
            promoCodes: data
          }
        });
        return data;
      }
      function onError(error) {
        dispatch({ type: FETCH_PROMO_CODES_ERROR, error });
        console.log(error);
        ReactGA.event({
          category: "Referral",
          action: "Error fetching referral ",
          label: code
        });
        return error;
      }
      try {
        dispatch({
          type: FETCH_PROMO_CODES
        });
        const codes = await api({
          url: `/referral/${code}`,
          method: "GET"
        });
  
        onSuccess(codes.data[0]);
      } catch (err) {
        onError(err);
      }
    };
  };