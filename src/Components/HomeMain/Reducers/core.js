import createReducer from '../../../Lib/createReducer';
import * as types from '../Actions/types';
export const ADD_UPDATE_CUSTOM_RECIPE = createReducer([], {
  [types.ADD_UPDATE_CUSTOM_RECIPE](state, action) {
    return {
      addUpdateCustomRecipe: action.addUpdateCustomRecipe,
    };
  },
});
export const UPDATE_CUSTOM_RECIPE = createReducer([], {
  [types.UPDATE_CUSTOM_RECIPE](state, action) {
    return {
      updateCustomRecipe: action.updateCustomRecipe,
    };
  },
});
export const DELETE_CUSTOM_RECIPE = createReducer([], {
  [types.DELETE_CUSTOM_RECIPE](state, action) {
    return {
      deleteCustomRecipe: action.deleteCustomRecipe,
    };
  },
});

export const BREAKFAST_DAILY_ACTIVITY = createReducer([], {
  [types.BREAKFAST_DAILY_ACTIVITY](state, action) {
    return {
      ...state,
      breakfastDailyActivity: [
        action.breakfastDailyActivity,
        ...state.breakfastDailyActivity,
      ],
    };
  },
});
export const BREAKFAST_DAILY_RESPONSE = createReducer([], {
  [types.BREAKFAST_DAILY_RESPONSE](state, action) {
    return {
      breakfastDailyResponse: action.breakfastDailyResponse,
    };
    // return {
    //   ...state,
    //   breakfastDailyResponse: [
    //     action.breakfastDailyResponse,
    //     ...state.breakfastDailyResponse,
    //   ],
    // };
  },
});
export const BREAKFAST_ACTIVE = createReducer([], {
  [types.BREAKFAST_ACTIVE](state, action) {
    return {
      breakfastActive: action.breakfastActive,
    };
  },
});
export const LUNCH_DAILY_ACTIVITY = createReducer([], {
  [types.LUNCH_DAILY_ACTIVITY](state, action) {
    return {
      lunchDailyActivity: action.lunchDailyActivity,
    };
  },
});
export const LUNCH_DAILY_RESPONSE = createReducer([], {
  [types.LUNCH_DAILY_RESPONSE](state, action) {
    return {
      lunchDailyResponse: action.lunchDailyResponse,
    };
  },
});
export const LUNCH_ACTIVE = createReducer([], {
  [types.LUNCH_ACTIVE](state, action) {
    return {
      lunchActive: action.lunchActive,
    };
  },
});

export const DINNER_DAILY_ACTIVITY = createReducer([], {
  [types.DINNER_DAILY_ACTIVITY](state, action) {
    return {
      dinnerDailyActivity: action.dinnerDailyActivity,
    };
  },
});
export const DINNER_DAILY_RESPONSE = createReducer([], {
  [types.DINNER_DAILY_RESPONSE](state, action) {
    return {
      dinnerDailyResponse: action.dinnerDailyResponse,
    };
  },
});
export const DINNER_ACTIVE = createReducer([], {
  [types.DINNER_ACTIVE](state, action) {
    return {
      dinnerActive: action.dinnerActive,
    };
  },
});

export const SNACK_DAILY_ACTIVITY = createReducer([], {
  [types.SNACK_DAILY_ACTIVITY](state, action) {
 
    return {
      snackDailyActivity: action.snackDailyActivity,
    };
  },
});
export const SNACK_DAILY_RESPONSE = createReducer([], {
  [types.SNACK_DAILY_RESPONSE](state, action) {
    return {
      snackDailyResponse: action.snackDailyResponse,
    };
  },
});
export const SNACK_ACTIVE = createReducer([], {
  [types.SNACK_ACTIVE](state, action) {
    return {
      snackActive: action.snackActive,
    };
  },
});
export const DAILY_ACTIVITY_TYPE = createReducer([], {
  [types.DAILY_ACTIVITY_TYPE](state, action) {
    return {
      dailyActivityType: action.dailyActivityType,
    };
  },
});
export const DAILY_ACTIVITY_ACTIVE = createReducer([], {
  [types.DAILY_ACTIVITY_ACTIVE](state, action) {
    return {
      dailyActivityActive: action.dailyActivityActive,
    };
  },
});
export const ROUTE_NAME = createReducer([], {
  [types.ROUTE_NAME](state, action) {
    return {
      routeName: action.routeName,
    };
  },
});

export const CURRENT_ORDER = createReducer([], {
  [types.CURRENT_ORDER](state, action) {
    return {
      currentOrder: action.currentOrder,
    };
  },
});

export const CURRENT_ORDER_REQUESTS = createReducer([], {
  [types.CURRENT_ORDER_REQUESTS](state, action) {
    return {
      currentOrderRequests: action.currentOrderRequests,
    };
  },
});

export const BLOG_LIST_SHOW = createReducer([], {
  [types.BLOG_LIST_SHOW](state, action) {
    return {
      blogsList: action.blogsList,
    };
  },
});

export const ADD_UPDATE_ACTIVITIES = createReducer([], {
  [types.ADD_UPDATE_ACTIVITIES](state, action) {
    return {
      addUpdateActivities: action.blogsList,
    };
  },
});
export const ALL_LIST_ACTIVITIES = createReducer([], {
  [types.ALL_LIST_ACTIVITIES](state, action) {
    return {
      allListActivities: action.blogsList,
    };
  },
});

//Custom recipe

export const CUSTOM_SNACK_ACTIVE = createReducer([], {
  [types.CUSTOM_SNACK_ACTIVE](state, action) {
    return {
      customSnackActive: action.customSnackActive,
    };
  },
});
// export const CUSTOM_SNACK_DAILY_RESPONSE = createReducer([], {
//   [types.CUSTOM_SNACK_DAILY_RESPONSE](state, action) {
//     return {
//       customBreakfastDailyResponse: action.customBreakfastDailyResponse,
//     };
//   },
// });
export const CUSTOM_SNACK_DAILY_RESPONSE = createReducer([], {
  [types.CUSTOM_SNACK_DAILY_RESPONSE](state, action) {
    return {
      customSnackDailyResponse: action.customSnackDailyResponse,
    };
  },
});
export const CUSTOM_DINNER_ACTIVE = createReducer([], {
  [types.CUSTOM_DINNER_ACTIVE](state, action) {
    return {
      customDinnerActive: action.customDinnerActive,
    };
  },
});
export const CUSTOM_DINNER_DAILY_RESPONSE = createReducer([], {
  [types.CUSTOM_DINNER_DAILY_RESPONSE](state, action) {
    return {
      customDinnerDailyResponse: action.customDinnerDailyResponse,
    };
  },
});

export const CUSTOM_LUNCH_ACTIVE = createReducer([], {
  [types.CUSTOM_LUNCH_ACTIVE](state, action) {
    return {
      customLunchActive: action.customLunchActive,
    };
  },
});
export const CUSTOM_LUNCH_DAILY_RESPONSE = createReducer([], {
  [types.CUSTOM_LUNCH_DAILY_RESPONSE](state, action) {
    return {
      customLunchDailyResponse: action.customLunchDailyResponse,
    };
  },
});

export const CUSTOM_BREAKFAST_ACTIVE = createReducer([], {
  [types.CUSTOM_BREAKFAST_ACTIVE](state, action) {
    return {
      customBreakfastActive: action.customBreakfastActive,
    };
  },
});
export const CUSTOM_BREAKFAST_DAILY_RESPONSE = createReducer([], {
  [types.CUSTOM_BREAKFAST_DAILY_RESPONSE](state, action) {
    return {
      customBreakfastDailyResponse: action.customBreakfastDailyResponse,
    };
  },
});

export const PRODUCT_BREAKFAST_ACTIVE = createReducer([], {
  [types.PRODUCT_BREAKFAST_ACTIVE](state, action) {
    return {
      productBreakfastActive: action.productBreakfastActive,
    };
  },
});
export const PRODUCT_BREAKFAST_ACTIVE_RESPONSE = createReducer([], {
  [types.PRODUCT_BREAKFAST_ACTIVE_RESPONSE](state, action) {
    return {
      productBreakfastResponse: action.productBreakfastResponse,
    };
  },
});
export const PRODUCT_BREAKFAST_ACTIVE_DATA = createReducer([], {
  [types.PRODUCT_BREAKFAST_ACTIVE_DATA](state, action) {
    return {
      productBreakfastData: action.productBreakfastData,
    };
  },
});

export const PRODUCT_LUNCH_ACTIVE = createReducer([], {
  [types.PRODUCT_LUNCH_ACTIVE](state, action) {
    return {
      productLunchActive: action.productLunchActive,
    };
  },
});
export const PRODUCT_LUNCH_ACTIVE_RESPONSE = createReducer([], {
  [types.PRODUCT_LUNCH_ACTIVE_RESPONSE](state, action) {
    return {
      productLunchResponse: action.productLunchResponse,
    };
  },
});
export const PRODUCT_LUNCH_ACTIVE_DATA = createReducer([], {
  [types.PRODUCT_LUNCH_ACTIVE_DATA](state, action) {
    return {
      productLunchData: action.productLunchData,
    };
  },
});

export const PRODUCT_DINNER_ACTIVE = createReducer([], {
  [types.PRODUCT_DINNER_ACTIVE](state, action) {
    return {
      productDinnerActive: action.productDinnerActive,
    };
  },
});
export const PRODUCT_DINNER_ACTIVE_RESPONSE = createReducer([], {
  [types.PRODUCT_DINNER_ACTIVE_RESPONSE](state, action) {
    return {
      productDinnerResponse: action.productDinnerResponse,
    };
  },
});
export const PRODUCT_DINNER_ACTIVE_DATA = createReducer([], {
  [types.PRODUCT_DINNER_ACTIVE_DATA](state, action) {
    return {
      productDinnerData: action.productDinnerData,
    };
  },
});

export const PRODUCT_SNACK_ACTIVE = createReducer([], {
  [types.PRODUCT_SNACK_ACTIVE](state, action) {
    return {
      productSnackActive: action.productSnackActive,
    };
  },
});
export const PRODUCT_SNACK_ACTIVE_RESPONSE = createReducer([], {
  [types.PRODUCT_SNACK_ACTIVE_RESPONSE](state, action) {
    return {
      productSnackResponse: action.productSnackResponse,
    };
  },
});
export const PRODUCT_SNACK_ACTIVE_DATA = createReducer([], {
  [types.PRODUCT_SNACK_ACTIVE_DATA](state, action) {
    return {
      productSnackData: action.productSnackData,
    };
  },
});
///////// Product Total Calories
export const BREAKFAST_CALORIES = createReducer([], {
  [types.BREAKFAST_CALORIES](state, action) {
    return {
      breakfastData: action.breakfastData,
    };
  },
});
export const LUNCH_CALORIES = createReducer([], {
  [types.LUNCH_CALORIES](state, action) {
    return {
      lunchData: action.lunchData,
    };
  },
});
export const DINNER_CALORIES = createReducer([], {
  [types.DINNER_CALORIES](state, action) {
    return {
      dinnerData: action.dinnerData,
    };
  },
});
export const SNACK_CALORIES = createReducer([], {
  [types.SNACK_CALORIES](state, action) {
    return {
      snackData: action.snackData,
    };
  },
});


////Product Catigory Reducers
export const SNACK_PRODUCT = createReducer([], {
  [types.SNACK_PRODUCT](state, action) {
    return {
      snackProduct: action.snackProduct,
    };
  },
});
export const BREAKFAST_PRODUCT = createReducer([], {
  [types.BREAKFAST_PRODUCT](state, action) {
    return {
      breakfastProduct: action.breakfastProduct,
    };
  },
});
export const LUNCH_PRODUCT = createReducer([], {
  [types.LUNCH_PRODUCT](state, action) {
    return {
      lunchProduct: action.lunchProduct,
    };
  },
});
export const DINNER_PRODUCT = createReducer([], {
  [types.DINNER_PRODUCT](state, action) {
    return {
      dinnerProduct: action.dinnerProduct,
    };
  },
});
