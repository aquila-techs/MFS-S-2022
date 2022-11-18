import createReducer from '../../../../Lib/createReducer';
import * as types from '../Actions/types';

export const SESSION_STATUS = createReducer([],{
  [types.SESSION_STATUS](state, action) {
    return {
      sessionStatus: action.sessionStatus
    }
  }
});

export const SESSION_KEY = createReducer([],{
  [types.SESSION_KEY](state, action) {
    return {
      sessionKey: action.sessionKey
    }
  }
});

export const USER_DATA = createReducer([],{
  [types.USER_DATA](state, action) {
    return {
      user: action.user
    }
  }
});

export const USER_DATA_NAME = createReducer([],{
  [types.USER_DATA_NAME](state, action) {
    return {
      userDataName: action.userDataName
    }
  }
});
export const USER_DATA_ID = createReducer([],{
  [types.USER_DATA_ID](state, action) {
    return {
      userDataId: action.userDataId
    }
  }
});
export const USER_SIGNUP_CHECK = createReducer([],{
  [types.USER_SIGNUP_CHECK](state, action) {
    return {
      userSignUpCheck: action.userSignUpCheck
    }
  }
});

