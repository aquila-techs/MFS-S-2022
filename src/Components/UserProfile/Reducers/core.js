import createReducer from "../../../Lib/createReducer";
import * as types from "../Actions/types";

export const UPDATE_GOAL = createReducer([], {
  [types.UPDATE_GOAL](state, action) {
    return {
      updateGoal: action.updateGoal,
    };
  },
});

export const UPDATE_PHYSICAL_ACTIVITY = createReducer([], {
  [types.UPDATE_PHYSICAL_ACTIVITY](state, action) {
    return {
      numberOfWorkouts: action.numberOfWorkouts,
    };
  },
});

export const UPDATE_RECIPE = createReducer([], {
  [types.UPDATE_RECIPE](state, action) {
    return {
      updaterecipe: action.updaterecipe,
    };
  },
});

export const UPDATE_GENDER = createReducer([], {
  [types.UPDATE_GENDER](state, action) {
    return {
      updateGender: action.updateGender,
    };
  },
});

export const UPDATE_AGE = createReducer([], {
  [types.UPDATE_AGE](state, action) {
    return {
      updateAge: action.updateAge,
    };
  },
});

export const UPDATE_HEIGHT = createReducer([], {
  [types.UPDATE_HEIGHT](state, action) {
    return {
      updateHeight: action.updateHeight,
    };
  },
});

export const UPDATE_WEIGHT = createReducer([], {
  [types.UPDATE_WEIGHT](state, action) {
    return {
      updateWeight: action.updateWeight,
    };
  },
});

export const UPDATE_CURRENTFAT = createReducer([], {
  [types.UPDATE_CURRENTFAT](state, action) {
    return {
      updateCurrentFat: action.updateCurrentFat,
    };
  },
});

export const UPDATE_TARGETWEIGHT = createReducer([], {
  [types.UPDATE_TARGETWEIGHT](state, action) {
    return {
      updateTargetWeight: action.updateTargetWeight,
    };
  },
});

export const UPDATE_LEVEL = createReducer([], {
  [types.UPDATE_LEVEL](state, action) {
    return {
      updateLevel: action.updateLevel,
    };
  },
});

export const UPDATE_USERSTATUS = createReducer([], {
  [types.UPDATE_USERSTATUS](state, action) {
    return {
      userStatus: action.userStatus,
    };
  },
});

export const UPDATE_USERDETAIL = createReducer([], {
  [types.UPDATE_USERDETAIL](state, action) {
    // alert(JSON.stringify(action.userDetail))
    return {
      ...state,
      EBF: action.userDetail.EBF,
      gender: action.userDetail.gender,
      age: action.userDetail.age,
      userdetail: action.userDetail,
      weight: action.userDetail.weight,
      height: action.userDetail.height,
      bmi: action.userDetail.bmi,
      isBoardingChecked: true ?? false,
      fatPercent: action.userDetail.fatPercent,
      activityLevel: action.userDetail.activityLevel,
      PA: action.userDetail.PA,
      RTEE: action.userDetail.RTEE,
      totalDailyKCal: action.userDetail.totalDailyKCal,
      totalWeeklyKCal: action.userDetail.totalWeeklyKCal,
    };
  },
});
export const UPDATE_USER_GENDER = createReducer([], {
  [types.UPDATE_USER_GENDER](state, action) {
    return {
      ...state,
      updateUserGender: action.updateUserGender,
    };
  },
});
export const REMAINING_CALORIES = createReducer([], {
  [types.REMAINING_CALORIES](state, action) {
  
    return {
      ...state,
      remainCalories: action.remain,
    };
  },
});

export const UPDATE_USER_AGE = createReducer([], {
  [types.UPDATE_USER_AGE](state, action) {
    return {
      ...state,
      updateUserAge: action.updateUserAge,
    };
  },
});

export const UPDATE_USER_WEIGHT = createReducer([], {
  [types.UPDATE_USER_WEIGHT](state, action) {
    return {
      ...state,
      updateUserWeight: action.updateUserWeight,
    };
  },
});

export const UPDATE_USER_HEIGHT = createReducer([], {
  [types.UPDATE_USER_HEIGHT](state, action) {
    return {
      ...state,
      updateUserHeight: action.updateUserHeight,
    };
  },
});

export const UPDATE_USER_EBF = createReducer([], {
  [types.UPDATE_USER_EBF](state, action) {
    return {
      ...state,
      updateUserEBF: action.updateUserEBF,
    };
  },
});

export const UPDATE_USER_BMI = createReducer([], {
  [types.UPDATE_USER_BMI](state, action) {
    return {
      updateUserBMI: action.updateUserBMI,
    };
  },
});

export const UPDATE_USER_ACTIVITYLEVEL = createReducer([], {
  [types.UPDATE_USER_ACTIVITYLEVEL](state, action) {
    return {
      updateUserActivityLevel: action.updateUserActivityLevel,
    };
  },
});

export const UPDATE_USER_TOTALDAILYKCAL = createReducer([], {
  [types.UPDATE_USER_TOTALDAILYKCAL](state, action) {
    return {
      updateUserTotalDailyKcal: action.updateUserTotalDailyKcal,
    };
  },
});

export const UPDATE_USER_TOTALWEEKLYKCAL = createReducer([], {
  [types.UPDATE_USER_TOTALWEEKLYKCAL](state, action) {
    return {
      updateUserTotalWeeklyKcal: action.updateUserTotalWeeklyKcal,
    };
  },
});

export const UPDATE_USER_ACTIVITIES = createReducer([], {
  [types.UPDATE_USER_ACTIVITIES](state, action) {
    return {
      updateUserTotalActivities: action.updateUserTotalActivities,
    };
  },
});
export const UPDATE_SPLASHSTATUS = createReducer([], {
  [types.UPDATE_SPLASHSTATUS](state, action) {
    return {
      splashStatus: action.splashStatus,
    };
  },
});
export const UPDATE_USERFEATURESTATUS = createReducer([], {
  [types.UPDATE_USERFEATURESTATUS](state, action) {
    return {
      userFeatureStatus: action.userFeatureStatus,
    };
  },
});
export const UPDATE_HOMESTATUS = createReducer([], {
  [types.UPDATE_HOMESTATUS](state, action) {
    return {
      homeStatus: action.homeStatus,
    };
  },
});
