import {
  FORGOT_PASSWORD,
  CALORIES_BURN,
  TOTAL_CALORIES,
  USER_WEIGHT,
  USER_LOGIN,
} from "../actions/types";

const initialState = {
  isLoggedIn: false,
  token: "",
  fcm: "",
  uid: "",
  user: "pass",
  roleId: "",
  tokenOTP: "",
  isLoading: false,
  burncalories: 0,
  totalcalories: 0,
  Userweightdata: [],
  isError: false,
  isSuccess: false,
  errMsg: null,
};

export const featuresreducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    case CALORIES_BURN:
      return {
        ...state,
        burncalories: action.payload,
      };
    case TOTAL_CALORIES:
      return {
        ...state,
        totalcalories: action.payload,
      };
    case USER_WEIGHT:
      return {
        ...state,
        Userweightdata: action.payload,
      };
    case USER_LOGIN:
      return {
        ...state,
       token: action.payload,
        isLoggedIn:true
      };
    default:
      return state;
  }
};
