import * as types from "./types";
import { API_URL } from "../../../Actions";
import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserSignUpCheck } from "../../LoginSignupMain/LoginMain/Actions/core";
//import NavigationService from './../../../../Routes/NavigationService';

export function setGoalAction(data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setUpdateGoal(data));
      resolve({
        status: true,
      });
    });
  };
}
export function setPhysicalActivityAction(data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setUpdatePhysicalActivity(data));
      resolve({
        status: true,
      });
    });
  };
}
export function setRecipeAction(data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setUpdateRecipe(data));
      resolve({
        status: true,
      });
    });
  };
}
export function setUpdateRecipe(value) {
  return {
    type: types.UPDATE_RECIPE,
    updaterecipe: value,
  };
}


// export function setUpdateGoal(value) {
//     return {
//         type: types.UPDATE_GOAL,
//         updateGoal:value,

//     };
// }

export function setUpdateGoal(value) {
  return {
    type: types.UPDATE_GOAL,
    updateGoal: value,
  };
}

export function setUpdatePhysicalActivity(value) {
  return {
    type: types.UPDATE_PHYSICAL_ACTIVITY,
    numberOfWorkouts: value,
  };
}

export function setGenderAction(data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setUpdateGender(data));
      resolve({
        status: true,
      });
    });
  };
}

export function setUpdateGender(value) {
  return {
    type: types.UPDATE_GENDER,
    updateGender: value,
  };
}

export function setProfileUpdateStatus(data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setUpdateProfileStatus(data));
      resolve({
        status: true,
      });
    });
  };
}

export function setUpdateProfileStatus(value) {
  return {
    type: types.UPDATE_PROFILE_STATUS,
    updateProfileStatus: value,
  };
}

export function setAgeAction(data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setUpdateAge(data));
      resolve({
        status: true,
      });
    });
  };
}

export function setUpdateAge(value) {
  return {
    type: types.UPDATE_AGE,
    updateAge: value,
  };
}

export function setHeightAction(data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setUpdateHeight(data));
      resolve({
        status: true,
      });
    });
  };
}

export function setUpdateHeight(value) {
  return {
    type: types.UPDATE_HEIGHT,
    updateHeight: value,
  };
}

export function setWeightAction(data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setUpdateWeight(data));
      resolve({
        status: true,
      });
    });
  };
}

export function setUpdateWeight(value) {
  return {
    type: types.UPDATE_WEIGHT,
    updateWeight: value,
  };
}

export function setCurrentFatAction(data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setUpdateCurrentFat(data));
      resolve({
        status: true,
      });
    });
  };
}

export function setUpdateCurrentFat(value) {
  return {
    type: types.UPDATE_CURRENTFAT,
    updateCurrentFat: value,
  };
}

export function setTargetWeightAction(data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setUpdateTargetWeight(data));
      resolve({
        status: true,
      });
    });
  };
}

export function setUpdateTargetWeight(value) {
  return {
    type: types.UPDATE_TARGETWEIGHT,
    updateTargetWeight: value,
  };
}
export function setLevelAction(data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setUpdateLevel(data));
      resolve({
        status: true,
      });
    });
  };
}

export function setUpdateLevel(value) {
  return {
    type: types.UPDATE_LEVEL,
    updateLevel: value,
  };
}

export function setUserActivityUpdateAction(userData, token) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
    
      //alert(JSON.stringify(userData))

      RNFetchBlob.fetch(
        "PUT",
        API_URL + "/user/feature/add/activities",
        {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "auth-token": token,
        },
        JSON.stringify(userData)
      )
        .then((response) => {
          const data = JSON.parse(response.data);


         
          // response.json().then(data => {

        
          if (data.status) {
            if (true) {
              dispatch(
                setUpdateUserTotalDailyKcal(data.userFeatures.totalDailyKCal)
              );
              dispatch(
                setUpdateUserTotalWeeklyKcal(data.userFeatures.totalWeeklyKCal)
              );
              resolve({
                status: true,
              });
            }
          } else {
            resolve({
              status: false,
              error: data.message,
            });
          }
          // });
        })
        .catch((e) => {
          console.log("error:", e);
          resolve({
            status: false,
          });
        });
    });
  };
}

export function setUserFeatureAction(userData, token) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
     
      //alert(JSON.stringify(userData))
      RNFetchBlob.fetch(
        "POST",
        API_URL + "/user/feature/create",
        {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "auth-token": token,
        },
        JSON.stringify(userData)
      )
        .then((response) => {
          const data = JSON.parse(response.data);

    
          if (data.status) {
            if (true) {
              dispatch(setUserFeatureStatus(true));
              dispatch(setHomeStatus(true));
              dispatch(setUserSignUpCheck(false));
              dispatch(setUserStatus(data.status));
              dispatch(setUserDetail(data.userFeatures));
              dispatch(setUserFeaturesAsyncDataAction(data));
              dispatch(setUpdateUserAge(data.userFeatures.age));
              dispatch(setUpdateUserGender(data.userFeatures.gender));
              dispatch(setUpdateUserHeight(data.userFeatures.height));
              dispatch(setUpdateUserWeight(data.userFeatures.weight));
              dispatch(
                setUpdateUserActivityLevel(data.userFeatures.activityLevel)
              );
              dispatch(setUpdateUserEBF(data.userFeatures.EBF));
              dispatch(setUpdateUserBMI(data.userFeatures.bmi));
              dispatch(
                setUpdateUserTotalDailyKcal(data.userFeatures.totalDailyKCal)
              );
              dispatch(
                setUpdateUserTotalWeeklyKcal(data.userFeatures.totalWeeklyKCal)
              );
              dispatch(setUpdateUserActivities(data.userFeatures.activities));

              resolve({
                status: true,
              });
            }
          } else {
            resolve({
              status: false,
              error: data.message,
            });
          }
          // });
        })
        .catch((e) => {
          console.log("error:", e);
          resolve({
            status: false,
          });
        });
    });
  };
}

export function setUserFeatureUpdateAction(userData, token) {

  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {

      RNFetchBlob.fetch(
        "PUT",
        API_URL + "/user/feature/update",
        {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "auth-token": token,
        },
        JSON.stringify(userData)
      )
        .then((response) => {
          const data = JSON.parse(response.data);
          if (data.status) {
            if (true) {
              dispatch(setUserFeatureStatus(true));
              dispatch(setHomeStatus(true));
              dispatch(setUserStatus(data.status));
              dispatch(setUserFeaturesAsyncDataAction(data));
              dispatch(setUserDetail(data.userFeatures));
              dispatch(setUpdateUserAge(data.userFeatures.age));
              dispatch(setUpdateUserGender(data.userFeatures.gender));
              dispatch(setUpdateUserHeight(data.userFeatures.height));
              dispatch(setUpdateUserWeight(data.userFeatures.weight));
              dispatch(
                setUpdateUserActivityLevel(data.userFeatures.activityLevel)
              );
              dispatch(setUpdateUserEBF(data.userFeatures.EBF));
              dispatch(setUpdateUserBMI(data.userFeatures.bmi));
              dispatch(
                setUpdateUserTotalDailyKcal(data.userFeatures.totalDailyKCal)
              );
              dispatch(
                setUpdateUserTotalWeeklyKcal(data.userFeatures.totalWeeklyKCal)
              );
              dispatch(setUpdateUserActivities(data.userFeatures.activities));
              resolve({
                status: true,
              });
            }
          } else {
            resolve({
              status: false,
              error: data.message,
            });
          }
          // });
        })
        .catch((e) => {
          console.log("error:", e);
          resolve({
            status: false,
          });
        });
    });
  };
}

export function setUserFeaturesAsyncDataAction(data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      var userFeatures = JSON.stringify(data);
      //  let keys = [['userFeatures', userFeatures]];

      AsyncStorage.setItem("userFeatures", userFeatures)
        .then(() => {
          dispatch(setUserDetail(data.userFeatures));
          dispatch(setUpdateUserAge(data.userFeatures.age));
          dispatch(setUpdateUserGender(data.userFeatures.gender));
          dispatch(setUpdateUserHeight(data.userFeatures.height));
          dispatch(setUpdateUserWeight(data.userFeatures.weight));
          dispatch(setUpdateUserActivityLevel(data.userFeatures.activityLevel));
          dispatch(setUpdateUserEBF(data.userFeatures.EBF));
          dispatch(setUpdateUserBMI(data.userFeatures.bmi));
          dispatch(
            setUpdateUserTotalDailyKcal(data.userFeatures.totalDailyKCal)
          );
          dispatch(
            setUpdateUserTotalWeeklyKcal(data.userFeatures.totalWeeklyKCal)
          );
          dispatch(setUpdateUserActivities(data.userFeatures.activities));
        })
        .catch((err) => console.log("error:", err));
      dispatch(setUserFeatureStatus(true));
      dispatch(setHomeStatus(true));
      resolve({
        status: true,
      });
    });
  };
}

export function setUserFeaturesAsyncFalseDataAction() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      //  var userFeatures = JSON.stringify(data);
      //  let keys = [['userFeatures', userFeatures]];

      dispatch(setUserFeatureStatus(false));
      AsyncStorage.setItem("userFeatures", "false")
        .then(() => { })
        .catch((err) => console.log("error:", err));

      resolve({
        status: true,
      });
    });
  };
}
export function deleteUserFeaturesAsyncDataAction() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      var userFeatures = JSON.stringify("");
      //  let keys = [['userFeatures', userFeatures]];

      AsyncStorage.setItem("userFeatures", userFeatures)
        .then(() => {
          // dispatch(setUserDetail(""));
          dispatch(setUpdateUserAge(""));
          dispatch(setUpdateUserGender(""));
          dispatch(setUpdateUserHeight(""));
          dispatch(setUpdateUserWeight(""));
          dispatch(setUpdateUserActivityLevel(""));
          dispatch(setUpdateUserEBF(""));
          dispatch(setUpdateUserBMI(""));
          dispatch(setUpdateUserTotalDailyKcal(""));
          dispatch(setUpdateUserTotalWeeklyKcal(""));
          dispatch(setUpdateUserActivities(""));
          dispatch(setSessionKey(""));
          dispatch(setUserData(""));
        })
        .catch((err) => console.log("error:", err));
      dispatch(setUserFeatureStatus(false));
      dispatch(setHomeStatus(false));
      resolve({
        status: true,
      });
    });
  };
}

export function setSplashAction() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // var userFeatures = JSON.stringify(data);
      //  let keys = [['userFeatures', userFeatures]];
      dispatch(setSplashStatus(true));
      AsyncStorage.setItem("splash", "true")
        .then(() => { })
        .catch((err) => console.log("error:", err));

      resolve({
        status: true,
      });
    });
  };
}

export function setHomeStatus(value) {
  return {
    type: types.UPDATE_HOMESTATUS,
    homeStatus: value,
  };
}
export function setUserFeatureStatus(value) {
  return {
    type: types.UPDATE_USERFEATURESTATUS,
    userFeatureStatus: value,
  };
}

export function setSplashStatus(value) {
  return {
    type: types.UPDATE_SPLASHSTATUS,
    splashStatus: value,
  };
}

export function setUserStatus(value) {
  return {
    type: types.UPDATE_USERSTATUS,
    userStatus: value,
  };
}

export function setUserDetail(value) {
  return {
    type: types.UPDATE_USERDETAIL,
    userDetail: value,
  };
}
export const remaincalories = (value) => {
  return {
    type: types.REMAINING_CALORIES,
    remain: value,
  };
}

export function setUpdateUserAge(value) {
  return {
    type: types.UPDATE_USER_AGE,
    updateUserAge: value,
  };
}
export function setUpdateUserGender(value) {
  return {
    type: types.UPDATE_USER_GENDER,
    updateUserGender: value,
  };
}

export function setUpdateUserWeight(value) {
  return {
    type: types.UPDATE_USER_WEIGHT,
    updateUserWeight: value,
  };
}

export function setUpdateUserHeight(value) {
  return {
    type: types.UPDATE_USER_HEIGHT,
    updateUserHeight: value,
  };
}

export function setUpdateUserEBF(value) {
  return {
    type: types.UPDATE_USER_EBF,
    updateUserEBF: value,
  };
}

export function setUpdateUserBMI(value) {
  return {
    type: types.UPDATE_USER_BMI,
    updateUserBMI: value,
  };
}

export function setUpdateUserActivityLevel(value) {
  return {
    type: types.UPDATE_USER_ACTIVITYLEVEL,
    updateUserActivityLevel: value,
  };
}

export function setUpdateUserTotalDailyKcal(value) {
  return {
    type: types.UPDATE_USER_TOTALDAILYKCAL,
    updateUserTotalDailyKcal: value,
  };
}

export function setUpdateUserTotalWeeklyKcal(value) {
  return {
    type: types.UPDATE_USER_TOTALWEEKLYKCAL,
    updateUserTotalWeeklyKcal: value,
  };
}

export function setUpdateUserActivities(value) {
  return {
    type: types.UPDATE_USER_ACTIVITIES,
    updateUserTotalActivities: value,
  };
}
