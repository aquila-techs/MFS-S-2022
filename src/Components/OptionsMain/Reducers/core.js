import createReducer from '../../../Lib/createReducer';
import * as types from '../Actions/types';


export const UPDATE_SUBSCRIPTIONPLAN = createReducer([],{
  [types.UPDATE_SUBSCRIPTIONPLAN](state, action) {
    return {
      subscriptionPlan: action.subscriptionPlan
    }
  }
});
export const UPDATE_PROFILEPICTURE = createReducer([],{
  [types.UPDATE_PROFILEPICTURE](state, action) {
    return {
      profilePicture: action.profilePicture
    }
  }
});
export const GET_PROFILEPICTURE = createReducer([],{
  [types.GET_PROFILEPICTURE](state, action) {
    return {
      getProfilePicture: action.getProfilePicture
    }
  }
});

export const ROUTE_NAME = createReducer([],{
  [types.ROUTE_NAME](state, action) {
    return {
      routeName: action.routeName
    }
  }
});


export const CURRENT_ORDER = createReducer([],{
  [types.CURRENT_ORDER](state, action) {
    return {
      currentOrder: action.currentOrder
    }
  }
});

export const CURRENT_ORDER_REQUESTS = createReducer([],{
  [types.CURRENT_ORDER_REQUESTS](state, action) {
    return {
      currentOrderRequests: action.currentOrderRequests
    }
  }
});