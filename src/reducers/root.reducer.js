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

import { promoCodes } from "./promo-codes";

const initialState = {
  isTutorialFinished: false,
  isShareLinkLoading: false,
  isShareLinkError: false,
  isSendLinkLoading: false,
  isSendLinkSuccess: false,
  isSendLinkError: false,
  isRetrieveShareLinkLoading: false,
  isRetrieveShareLinkSuccess: false,
  isRetrieveShareLinkError: false,
  isRetrievePromoCodesLoading: false,
  isRetrievePromoCodesSuccess: false,
  isRetrievePromoCodesError: false,
  shareLink: null,
  promoCodes: promoCodes,
  isNewUser: true
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FINISHED_TUTORIAL:
      return {
        ...state,
        isTutorialFinished: true
      };
    case CREATE_SHARE_LINK:
      return {
        ...state,
        isShareLinkLoading: true,
        isShareLinkError: false
      };
    case CREATE_SHARE_LINK_SUCCESS:
      return {
        ...state,
        isShareLinkLoading: false,
        isShareLinkError: false,
        shareLink: action.payload.shareLink
      };
    case CREATE_SHARE_LINK_ERROR:
      return {
        ...state,
        isShareLinkLoading: false,
        isShareLinkError: true
      };
    case FETCH_SHARE_LINK:
      return {
        ...state,
        isRetrieveShareLinkLoading: true,
        isRetrieveShareLinkSuccess: false,
        isRetrieveShareLinkError: false,
        shareLink: action.payload.shareLink
      };
    case FETCH_SHARE_LINK_SUCCESS:
      return {
        ...state,
        isRetrieveShareLinkLoading: false,
        isRetrieveShareLinkSuccess: true,
        isRetrieveShareLinkError: false
      };
    case FETCH_SHARE_LINK_ERROR:
      return {
        ...state,
        isRetrieveShareLinkLoading: false,
        isRetrieveShareLinkError: true
      };
    case FETCH_PROMO_CODES:
      return {
        ...state,
        isRetrievePromoCodesLoading: true,
        isRetrievePromoCodesSuccess: false,
        isRetrievePromoCodesError: false
      };
    case FETCH_PROMO_CODES_SUCCESS:
      return {
        ...state,
        isRetrievePromoCodesLoading: false,
        isRetrievePromoCodesSuccess: true,
        isRetrievePromoCodesError: false,
        promoCodes: { ...state.promoCodes, ...action.payload.promoCodes }
      };
    case FETCH_PROMO_CODES_ERROR:
      return {
        ...state,
        isRetrievePromoCodesLoading: false,
        isRetrievePromoCodesError: true
      };
    case SEND_LINK:
      return {
        ...state,
        isSendLinkLoading: true,
        isSendLinkSuccess: false,
        isSendLinkError: false
      };
    case SEND_LINK_SUCCESS:
      return {
        ...state,
        isSendLinkLoading: false,
        isSendLinkSuccess: true,
        isSendLinkError: false
      };
    case SEND_LINK_ERROR:
      return {
        ...state,
        isSendLinkLoading: false,
        isSendLinkSuccess: false,
        isSendLinkError: true
      };
    case SET_USER_NOT_NEW:
      return {
        ...state,
        isNewUser: false
      };
    default:
      return state;
  }
};

export default rootReducer;
