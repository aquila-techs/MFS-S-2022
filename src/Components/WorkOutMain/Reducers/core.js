import createReducer from '../../../Lib/createReducer';
import * as types from '../Actions/types';

export const WORKOUTS_LIST_SHOW = createReducer([], {
  [types.WORKOUTS_LIST_SHOW](state, action) {
    return {
      workoutsList: action.workoutsList,
    };
  },
});
export const WORKOUTS_LIST_CHECK = createReducer([], {
  [types.WORKOUTS_LIST_CHECK](state, action) {
    return {
      workoutsListCheck: action.workoutsListCheck,
    };
  },
});
export const PRODUCTS_LIST_SHOW = createReducer([], {
  [types.PRODUCTS_LIST_SHOW](state, action) {
    return {
      productsList: action.productsList,
    };
  },
});
export const PRODUCTS_LIST_CHECK = createReducer([], {
  [types.PRODUCTS_LIST_CHECK](state, action) {
    return {
      productsListCheck: action.productsListCheck,
    };
  },
});
