import * as types from './types';
import { API_URL } from '../../../../Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import { Alert } from 'react-native';
import { setMessagesListData } from '../../../HomeMain/Actions/core';
//import NavigationService from './../../../../Routes/NavigationService';

export function signin(signindata) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {

      // alert('A check')

      RNFetchBlob.fetch(
        'POST',
        API_URL + '/user/login',
        {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        JSON.stringify(signindata),
      )
        .then(response => {
          const data = JSON.parse(response.data);
          
          if (data.message == "Invalid Request! Your account is not Verified. Please Verify your account before Login.") {
            Alert.alert('Account not verified!','Invalid Request! Your account is not Verified. Please Verify your account before Login.')
            resolve({
              status: false,
              error: data.message,
            });
            return;
          }

          AsyncStorage.setItem('USERID', data.user._id)
          AsyncStorage.setItem('STATUSPROFILE', `${data.user.profileUpdate}`)
          AsyncStorage.setItem('PROFILETOKEN', `${data.token}`)

          if (data.token) {
            if (true) {
              var access_token = data.token;
              var user = JSON.stringify(data.user);
              let keys = [['accessToken', access_token], ['user', user]];
              AsyncStorage.multiSet(keys, (err, accesstoken) => {
                if (err) {
                  console.log('Err : ' + err);
                  alert('Err : ' + err);
                } else {
                }
              });

              dispatch(setUserDataTokenAction(data));
              dispatch(setSessionStatus(true));
              dispatch(setSessionKey(data.token));
              dispatch(setUserData(data.user));
              dispatch(setUserDataName(data.user.name));
              dispatch(setUserID(data.user._id));
              resolve({
                status: true,
              });
            }
            //  else {
            //     if (!data.user.isVerified) {
            //         resolve({
            //             status: false,
            //             showVerification: true,
            //             token: data.token,
            //             error: 'Account not verified yet. Please check the email associated with this account and follow the link it contains.'
            //         })
            //     } else {
            //         resolve({
            //             status: false,
            //             error: 'Account not approved yet.'
            //         })
            //     }
            // }
          } else {
            resolve({
              status: false,
              error: data.message,
            });
          }
          // });
        })
        .catch(e => {
          console.log('error:', e);
          resolve({
            status: false,
          });
        });
    });
  };
}

export function setUserSignUpCheck(data) {
  return {
    type: types.USER_SIGNUP_CHECK,
    userSignUpCheck: data,
  };
}

export function signup(signupdata) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {

      // alert('A check')

      RNFetchBlob.fetch(
        'POST',
        API_URL + '/user/register',
        {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        JSON.stringify(signupdata),
      )
        .then(response => {

          // response.json().then(data => {

          const data = JSON.parse(response.data);

          //  alert(JSON.stringify(data))
          if (data.success) {
            //alert(JSON.stringify(data))
            dispatch(setUserSignUpCheck(true));
            resolve({
              status: true,
              data: data,
            });
          } else {
            resolve({
              status: false,
              error: data.message,
            });
          }

          // });
        })
        .catch(e => {
          console.log('error:', e);
          resolve({
            status: false,
          });
        });
    });
  };
}

export function logOutUserDataAction() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      AsyncStorage.clear();
      AsyncStorage.setItem('splash', 'true')
        .then(() => { })
        .catch(err => console.log('error:', err));
      // var access_token = null;
      // var user = '';
      // let keys = [['accessToken', access_token], ['user', user]];
      // AsyncStorage.multiSet(keys, (err, accesstoken) => {
      //     if (err) {
      //     } else {
      //     }
      // });
      dispatch(setSessionStatus(false));
      dispatch(setSessionKey(''));
      dispatch(setUserData(''));
      resolve({
        status: true,
      });
    });
  };
}

export function setUserDataAction(data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      var access_token = data.accessToken;
      var user = JSON.stringify(data.user);
      let keys = [['accessToken', access_token], ['user', user]];
      AsyncStorage.multiSet(keys, (err, accesstoken) => {
        if (err) {
        } else {
        }
      });
      dispatch(setSessionStatus(true));
      dispatch(setSessionKey(data.accessToken));
      dispatch(setUserData(data.user));
      dispatch(setUserDataName(data.user.name));
      resolve({
        status: true,
      });
    });
  };
}

export function setUserDataTokenAction(data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      var access_token = data.token;
      var user = JSON.stringify(data.user);
      let keys = [['accessToken', access_token], ['user', user]];
      AsyncStorage.multiSet(keys, (err, accesstoken) => {
        if (err) {
        } else {
        }
      });
      dispatch(setSessionStatus(true));
      dispatch(setSessionKey(data.token));
      dispatch(setUserData(data.user));
      dispatch(setUserDataName(data.user.name));

      resolve({
        status: true,
      });
    });
  };
}

export function setSessionStatus(status) {
  return {
    type: types.SESSION_STATUS,
    sessionStatus: status,
  };
}

export function setSessionKey(key) {
  return {
    type: types.SESSION_KEY,
    sessionKey: key,
  };
}

export function setUserData(data) {
  return {
    type: types.USER_DATA,
    user: data,
  };
}

export function setUserDataName(data) {
  return {
    type: types.USER_DATA_NAME,
    userDataName: data,
  };
}

export function setUserID(data) {
  return {
    type: types.USER_DATA_ID,
    userDataId: data,
  };
}
export const LanguageTranslation = (data) => {
  return {
    type: types.LANGUAGE_TRANSLATE,
    languageget: data,
  };
}
