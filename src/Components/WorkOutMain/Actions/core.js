import * as types from './types';
import { API_URL } from '../../../Actions';
import RNFetchBlob from 'rn-fetch-blob';

export function getWorkoutsList(token) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // alert('getWorkoutsList')
      RNFetchBlob.fetch('POST', API_URL + '/workout/get/all', {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'auth-token': token,
      })
        .then(response => {
          //   console.log('Response getWorkoutsList:', response);
          const data = JSON.parse(response.data);

          if (data.status) {
            resolve({
              status: true,
              data: data.data,
            });
            dispatch(setWorkoutsListData(data.data));
            dispatch(setWorkoutsListCheck(true));
          } else {
            resolve({
              status: false,
              //error: data.message
            });
            dispatch(setWorkoutsListCheck(false));
          }
        })
        .catch(() => {
          dispatch(setWorkoutsListCheck(false));
          resolve({
            status: false,
          });
        });
    });
  };
}
export function getWorkoutsTypeList(token, type) {
  let bodyData = {
    category: type,
  };
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // alert('getWorkoutsList')
      RNFetchBlob.fetch(
        'POST',
        API_URL + '/workout/get/all',
        {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        JSON.stringify(bodyData),
      )
        .then(response => {
         
          const data = JSON.parse(response.data);
          // alert(JSON.stringify(data))
       
          if (data.status) {
            resolve({
              status: true,
              data: data.data,
            });
          } else {
            resolve({
              status: false,
              //error: data.message
            });
          }
        })
        .catch(() => {
          resolve({
            status: false,
          });
        });
    });
  };
}
export function getProductList(token) {
 
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fetch('GET', API_URL + '/ingredient/all/ingredients', {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'auth-token': token,
      })
        .then(response => {
        
          const data = JSON.parse(response.data);

         
          if (data.status) {
            resolve({
              status: true,
              data: data.data,
            });
            dispatch(setProductsListData(data.data));
            dispatch(setProductsListCheck(true));
          } else {
            resolve({
              status: false,
              //error: data.message
            });
            dispatch(setProductsListCheck(false));
          }
        })
        .catch(() => {
          dispatch(setProductsListCheck(false));
          resolve({
            status: false,
          });
        });
    });
  };
}
export function setProductsListData(data) {
  return {
    type: types.PRODUCTS_LIST_SHOW,
    productsList: data,
  };
}
export function setProductsListCheck(data) {
  return {
    type: types.PRODUCTS_LIST_CHECK,
    productsListCheck: data,
  };
}
export function setWorkoutsListData(data) {
  return {
    type: types.WORKOUTS_LIST_SHOW,
    workoutsList: data,
  };
}
export function setWorkoutsListCheck(data) {
  return {
    type: types.WORKOUTS_LIST_CHECK,
    workoutsListCheck: data,
  };
}
