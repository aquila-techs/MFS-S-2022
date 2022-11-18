import createReducer from '../../../Lib/createReducer';
import * as types from '../Actions/types';

export const RECIPES_LIST_SHOW = createReducer([], {
  [types.RECIPES_LIST_SHOW](state, action) {
    return {
      recipesList: action.recipesList,
    };
  },
});
export const RECIPES_LIST_CHECK = createReducer([], {
  [types.RECIPES_LIST_CHECK](state, action) {
    return {
      recipesListCheck: action.recipesListCheck,
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
