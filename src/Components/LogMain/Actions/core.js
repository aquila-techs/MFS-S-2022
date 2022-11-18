import * as types from './types';
import {API_URL} from '../../../Actions';
import RNFetchBlob from 'rn-fetch-blob';

export function uploadOrder(reqData, token) {

  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fetch(
        'POST',
        API_URL + '/order/customer/create',
        {
          'Content-Type': 'multipart/form-data',
          'auth-token': token,
        },
        reqData,
      ).then(response => {
        const data = JSON.parse(response.data);
        if (data.status) {
          dispatch(setCurrentOrder(data.data));
          resolve({
            status: true,
            data: data.data,
          });
        } else {
          resolve({
            status: false,
            message: data.message ? data.message : 'Something went wrong!',
          });
        }
        // });
      });
    });
  };
}

export function getCurrentOrderRequests(reqData, token) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
     
      RNFetchBlob.fetch(
        'POST',
        API_URL + '/order/get/all/requests/against/order/for/customer',
        {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        JSON.stringify(reqData),
      )
        .then(response => {
         
          const data = JSON.parse(response.data);
       
          if (data.status) {
            resolve({
              status: true,
              data: data.data,
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

export function getBlogListRequests(token) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fetch('POST', API_URL + '/post/get/all', {
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
            dispatch(setBlogsListData(data.data));
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

export function setRouteNameFunc(name) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setRouteName(name));
      resolve({
        status: true,
      });
    });
  };
}
export function setBlogsListData(data) {
  return {
    type: types.BLOG_LIST_SHOW,
    blogsList: data,
  };
}

export function setMessagesListData(data) {
  return {
    type: types.MESSAGES_LIST,
    messagesList: data,
  };
}

export function setRouteName(data) {
  return {
    type: types.ROUTE_NAME,
    routeName: data,
  };
}

export function setRootNavigation(navigation) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setRootNavigationDispatch(navigation));
      resolve({
        status: true,
        data: navigation,
      });
    });
  };
}

export function setRootNavigationDispatch(navigation) {
  return {
    type: types.NAVIGATION,
    navigation: navigation,
  };
}

export function setCurrentOrder(data) {
  return {
    type: types.CURRENT_ORDER,
    currentOrder: data,
  };
}

export function setCurrentOrderRequests(data) {
  return {
    type: types.CURRENT_ORDER_REQUESTS,
    currentOrderRequests: data,
  };
}
