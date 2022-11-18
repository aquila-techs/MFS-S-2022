import createReducer from '../../../Lib/createReducer';
import * as types from '../Actions/types';

export const USER_SUBSCRIPTION = createReducer([], {
  [types.USER_SUBSCRIPTION](state, action) {
    return {
      userSubscription: action.userSubscription,
      Subscription: action.Subscription,
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
