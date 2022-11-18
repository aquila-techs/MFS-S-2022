import * as types from './types';
import {API_URL} from '../../../Actions';
import RNFetchBlob from 'rn-fetch-blob';

export function setProfilePicture(userData, token, userId) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
     

      RNFetchBlob.fetch(
        'PUT',
        API_URL + '/user/update/profilePic/' + userId,
        {
          'auth-token': token,
        },
        [
          {
            name: 'profilePic',
            filename: 'avatar-profile.png',
            type: 'image/png',
            data: userData,
          },
        ],
      )
        .then(response => {
          const data = JSON.parse(response.data);

  
          if (data.success) {
            if (true) {
              dispatch(setProfile(data.user.profilePic));
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
        .catch(e => {
          console.log('error:', e);
          resolve({
            status: false,
          });
        });
    });
  };
}
export function setProfile(value) {
  return {
    type: types.UPDATE_PROFILEPICTURE,
    profilePicture: value,
  };
}
export function getProfile(value) {
  return {
    type: types.GET_PROFILEPICTURE,
    getProfilePicture: value,
  };
}

export function getProfilePicture(token, userId) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
     
      RNFetchBlob.fetch('GET', API_URL + '/user/' + userId, {
        'auth-token': token,
      })
        .then(response => {
          const data = JSON.parse(response.data);

          if (true) {
            dispatch(getProfile(data.profilePic));
            resolve({
              status: true,
              profile: data.profilePic,
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

export function updateProfile(updateProfileData, token, userID) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
    

      RNFetchBlob.fetch(
        'PUT',
        API_URL + '/user/' + userID,
        {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        JSON.stringify(updateProfileData),
      )
        .then(response => {
          const data = JSON.parse(response.data);

          if (data.success) {
            //alert("Before dispatch")
            resolve({
              status: true,
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
          console.log('updateFeatures error:', e);
          resolve({
            status: false,
          });
        });
    });
  };
}

export function updateSubscriptionPlan(value) {
  return {
    type: types.UPDATE_SUBSCRIPTIONPLAN,
    subscriptionPlan: value,
  };
}
export const userLogout=()=> {
  return {
    type: types.LOGOUT,
  };
}

export function deleteUserAccount(token, userId) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
   

      RNFetchBlob.fetch('DELETE', API_URL + '/user/' + userId, {
        'auth-token': token,
      })
        .then(response => {
          const data = JSON.parse(response.data);

         

          if (data.success) {
            dispatch(getProfile(data.profilePic));
            resolve({
              status: true,
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
