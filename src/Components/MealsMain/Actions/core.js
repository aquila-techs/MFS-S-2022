import * as types from './types';
import { API_URL } from '../../../Actions';
import RNFetchBlob from 'rn-fetch-blob';
import { Alert } from 'react-native';

export function createStripeCustomer(reqData, token) {
  //alert('createStripeCustomer = '+reqData);
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fetch(
        'POST',
        'https://api.myfitspot.com/api/payment/stripeSubscription/customers',
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        JSON.stringify(reqData),
      ).then(response => {
        //    alert(reqData + " Token " + token + " Create Stripe Customer = " + JSON.stringify(response))
        const data = JSON.parse(response.data);
        if (data.status) {
          // dispatch(setCurrentOrder(data.data))
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
      });
    });
  };
}
export function addCardStripe(reqData, token) {
  //alert('createStripeCustomer = '+reqData);
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fetch(
        'POST',
        'https://api.myfitspot.com/api/payment/stripeSubscription/customers/addCard',
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        JSON.stringify(reqData),
      ).then(response => {
        const data = JSON.parse(response.data);
        //   alert("Add Card Stripe Customer = " + JSON.stringify(data))
        if (data.status) {
          // dispatch(setCurrentOrder(data.data))
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
      });
    });
  };
}

export function createSubscriptionCustomer(reqData, token) {
  //alert('Create Subscription Customer : '+reqData);
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fetch(
        'POST',
        API_URL + '/payment/subscription/create',
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        JSON.stringify(reqData),
      ).then(response => {
        const data = JSON.parse(response.data);

        console.log('+++++++++++++')
        console.log(data)
        console.log('+++++++++++++')

        if (data.status == true) {

          let condition = 'Subcribe';
          dispatch(setUserSubscription(true, condition));
          resolve({
            status: true,
            data: data,
          });

        } else {
          Alert.alert('Sorry!',"Subscription has been failed please try again in a while.")
          resolve({
            status: false,
            data: data,
          });
        }

        // if (!data.status) {

        //   let condition = 'Subcribe';
        //   dispatch(setUserSubscription(true, condition));
        //   resolve({
        //     status: true,
        //     data: data,
        //   });
        // } else {
        //   resolve({
        //     status: false,
        //     data: data,
        //   });
        // }


      });
    });
  };
}

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

export function setUserSubscription(value, res) {
  return {
    type: types.USER_SUBSCRIPTION,
    userSubscription: value,
    Subscription: res,
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
