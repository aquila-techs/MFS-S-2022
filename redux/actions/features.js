import {
  CALORIES_BURN,
  FORGOT_PASSWORD,
  TOTAL_CALORIES,
  USER_WEIGHT,
} from "./types";
// //Local Types
// export const FEATURES_LOADING = "FEATURES_LOADING";
// export const FEATURES_FAILED = "FEATURES_FAILED";

// export const loginUser = (params, cbSuccess, cbFailure) => {
//   return async (dispatch) => {
//     dispatch(authLoading());
//     try {
//       const res = await axios.post(endPoints.login, params, {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       });
//       if (res?.data.success === 1) {
//         dispatch(loginSuccess(res.data.data.user));
//         cbSuccess(res.data.data.user);
//       } else if (res?.data.success === 0) {
//         cbFailure(res?.data?.data.error);
//         dispatch(authFailed(res?.data?.data.error));
//       }
//     } catch (err) {
//       dispatch(authFailed(err));
//     }
//   };
// };


export function Getvalue(res) {
  return {
    type: FORGOT_PASSWORD,
    payload: res,
  };
}
export function DailyCaloriesBurn(res) {
  return {
    type: CALORIES_BURN,
    payload: res,
  };
}
export function TotalDailyCalories(res) {
  return {
    type: TOTAL_CALORIES,
    payload: res,
  };
}
export function userweightaction(res) {
  return {
    type: USER_WEIGHT,
    payload: res,
  };
}
