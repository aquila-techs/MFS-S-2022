import {
  CALORIES_BURN,
  FORGOT_PASSWORD,
  TOTAL_CALORIES,
  USER_WEIGHT,
  USER_LOGIN,
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

// export const forgotPassword = (params, cbSuccess, cbFailure) => {
//   return async (dispatch) => {
//     dispatch(authLoading());
//     try {
//       const res = await axios.post(endPoints.forgetPassword, params, {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       });

//       if (res?.data.success === 1) {
//         console.log(res.data.data?.user);
//         cbSuccess(res?.data.data.user);
//         dispatch(forgotSuccess(res?.data.data.user));
//       } else if (res?.data.success === 0) {
//         cbFailure(res.data.message);
//         dispatch(authFailed(res.data.message));
//       }
//     } catch (err) {
//       dispatch(authFailed(err));
//     }
//   };
// };
// //helper Functions
// const authLoading = () => ({
//   type: FEATURES_LOADING,
// });

// const authFailed = (err) => ({
//   type: FEATURES_FAILED,
//   payload: err,
// });

// const loginSuccess = (res) => ({
//   type: LOGIN_USER,
//   payload: res,
// });
// // const forgotSuccess = (res) => ({
// //   type: FORGOT_PASSWORD,
// //   payload: res,
// // });
export function Getvalue(res) {
  return {
    type: FORGOT_PASSWORD,
    payload: res,
  };
}
export function UserAuthCheck(res) {
  return {
    type: USER_LOGIN,
    payload: res,
  };
}
export function Logout(res) {
  return {
    type: USER_LOGOUT,
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
