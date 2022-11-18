import * as types from './types';
import { API_URL } from '../../../../Actions';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setMessagesListData } from '../../../HomeMain/Actions/core';
//import NavigationService from './../../../../Routes/NavigationService';

export function signin(signindata) {

  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {

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

          alert(JSON.stringify(data))
          if (data.token) {
            if (true) {
              var access_token = data.token;
              var user = JSON.stringify(data.user);
              let keys = [['accessToken', access_token], ['user', user]];
              AsyncStorage.multiSet(keys, (err, accesstoken) => {
                if (err) {
                  console.log('Err : ' + err);
                  alert('Err : ' + err);
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
          const data = JSON.parse(response.data);


          if (data.success) {

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

export function sendVerificationLinkFunc(authtoken, data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {

      RNFetchBlob.fetch('GET', API_URL + '/user/email/verification', {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'auth-token': authtoken,
      })
        .then(response => {
          const data = JSON.parse(response.data);

          // const postRequest = fetch(API_URL + '/user/email/verification', {
          //     method: 'GET',
          //     headers: {
          //         'Accept': 'application/json, text/plain, */*',
          //         'Content-Type': 'application/json',
          //         'auth-token': authtoken
          //     },
          // }).then((response) => {

          // response.json().then(data => {

          if (data.message == 'Password is Changed!') {
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
          console.log(e);
          resolve({
            status: false,
          });
        });
    });
  };
}

export function sendForgotEmailFunc(dataForgot) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fetch(
        'POST',
        API_URL + '/user/send/reset/password/email',
        {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        JSON.stringify(dataForgot),
      )
        .then(response => {
          const data = JSON.parse(response.data);

          // const postRequest = fetch(API_URL + '/user/changePassword', {
          //     const postRequest = fetch(API_URL + '/user/send/reset/password/email', {
          //     method: 'POST',
          //     headers: {
          //         'Accept': 'application/json, text/plain, */*',
          //         'Content-Type': 'application/json',
          //         // 'auth-token': authtoken
          //     },
          //     body: JSON.stringify(data)
          // }).then((response) => {

          // response.json().then(data => {
        
          if (response.status == 200) {
            resolve({
              status: true,
              message: data.message,
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
        .catch(() => {
          resolve({
            status: false,
          });
        });
    });
  };
}

export function addUserDevice(dataDevice) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('accessToken').then(res => {
        if (res !== null) {
          const authtoken = JSON.parse(res);

          RNFetchBlob.fetch(
            'POST',
            API_URL + '/user/fcm/token',
            {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'auth-token': authtoken,
            },
            JSON.stringify(dataDevice),
          )
            .then(response => {
              const data = JSON.parse(response.data);

              // const postRequest = fetch(API_URL + '/user/fcm/token', {
              //     method: 'POST',
              //     headers: {
              //         'Accept': 'application/json, text/plain, */*',
              //         'Content-Type': 'application/json',
              //         'auth-token': authtoken
              //     },
              //     body: JSON.stringify(data)
              // }).then((response) => {
          
              if (
                data &&
                (data.message == 'Success!' || data.message == 'Updated!')
              ) {
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
            .catch(() => {
              resolve({
                status: false,
              });
            });
        }
      });
    });
  };
}
export function deleteUserDevice(dataDevice) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('accessToken').then(res => {
        if (res !== null) {
          const authtoken = JSON.parse(res);

          RNFetchBlob.fetch(
            'DELETE',
            API_URL + '/user/fcm/token',
            {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'auth-token': authtoken,
            },
            JSON.stringify(dataDevice),
          )
            .then(response => {
              const data = JSON.parse(response.data);

              // const postRequest = fetch(API_URL + '/user/fcm/token', {
              //     method: 'DELETE',
              //     headers: {
              //         'Accept': 'application/json, text/plain, */*',
              //         'Content-Type': 'application/json',
              //         'auth-token': authtoken
              //     },
              //     body: JSON.stringify(data)
              // }).then((response) => {
           
              if (data && data.message == 'Removed Token!') {
                dispatch(setSessionStatus(false));
                dispatch(setSessionKey(''));
                dispatch(setUserData(''));
                dispatch(setMessagesListData([]));

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
            .catch(() => {
              resolve({
                status: false,
              });
            });
        }
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
