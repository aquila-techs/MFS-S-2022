import * as types from './types';
import {API_URL} from '../../../Actions';
import RNFetchBlob from 'rn-fetch-blob';

export function addUpdateActivities(reqData, token) {
 
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fetch(
        'PUT',
        API_URL + '/user/feature/add/activities',
        {
          'Content-Type': 'multipart/form-data',
          'auth-token': token,
        },
        reqData,
      ).then(response => {
        const data = JSON.parse(response.data);
        
        if (data.status) {
          dispatch(setAddUpdateActivities(data.data));
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
    
      RNFetchBlob.config({
        trusty: true,
      })
        .fetch(
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

export function setDailyActivityMeal(value, token, blogItem) {

  // alert('Hello');
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fetch(
        'POST',
        API_URL + '/user/activity/recipe/or/product/create',
        {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        JSON.stringify(value),
      )
        .then(response => {
          
          const data = JSON.parse(response.data);

          if (data.success) {
            resolve({
              status: true,
              data: data.message,
            });
            if (value.type === 'breakfast') {
              dispatch(getBreakfastDailyActivity(blogItem));
              dispatch(setBreakfastDailyResponse(data));
              dispatch(setBreakfastActive(true));
            } else if (value.type === 'lunch') {
              dispatch(getLunchDailyActivity(blogItem));
              dispatch(setLunchDailyResponse(data));
              dispatch(setLunchActive(true));
            } else if (value.type === 'dinner') {
              dispatch(getDinnerDailyActivity(blogItem));
              dispatch(setDinnerDailyResponse(data));
              dispatch(setDinnerActive(true));
            } else if (value.type === 'snack') {
              dispatch(getSnackDailyActivity(blogItem));
              dispatch(setSnackDailyResponse(data));
              dispatch(setSnackActive(true));
            }
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

export function setUpdateDailyActivityMeal(value, token, blogItem, activityId) {

  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fetch(
        'PUT',
        API_URL + '/user/activity/recipe/update/' + activityId,
        {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        JSON.stringify(value),
      )
        .then(response => {
          const data = JSON.parse(response.data);
         
  
          if (data.success) {
            resolve({
              status: true,
              data: data.message,
            });
            if (value.type === 'breakfast') {
              dispatch(getBreakfastDailyActivity(blogItem));
              dispatch(setBreakfastDailyResponse(data));
              dispatch(setBreakfastActive(true));
            } else if (value.type === 'lunch') {
              dispatch(getLunchDailyActivity(blogItem));
              dispatch(setLunchDailyResponse(data));
              dispatch(setLunchActive(true));
            } else if (value.type === 'dinner') {
              dispatch(getDinnerDailyActivity(blogItem));
              dispatch(setDinnerDailyResponse(data));
              dispatch(setDinnerActive(true));
            } else if (value.type === 'snack') {
              dispatch(getSnackDailyActivity(blogItem));
              dispatch(setSnackDailyResponse(data));
              dispatch(setSnackActive(true));
            }
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

export function setDeleteDailyActivityMeal(type, token, activityId) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fetch(
        'DELETE',
        API_URL + '/user/activity/recipe/delete/' + activityId,
        {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      )
        .then(response => {
         
          const data = JSON.parse(response.data);
          //alert(JSON.stringify(response))

 
          if (data.success) {
            resolve({
              status: true,
              data: data.message,
            });
            if (type == 'breakfast') {
              dispatch(setBreakfastDailyResponse(''));
              dispatch(setBreakfastActive(false));
            } else if (type == 'lunch') {
              dispatch(setLunchDailyResponse(''));
              dispatch(setLunchActive(false));
            } else if (type == 'dinner') {
              dispatch(setDinnerDailyResponse(''));
              dispatch(setDinnerActive(false));
            } else if (type == 'snack') {
              dispatch(setSnackDailyResponse(''));
              dispatch(setSnackActive(false));
            }
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

export function addUpdateCustomRecipe(reqData, token, type, userData) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fetch(
        'POST',
        API_URL + '/recipe/create',
        {
          //  'Content-Type': 'multipart/form-data',
          'auth-token': token,
        },
        JSON.stringify(reqData),
      ).then(response => {
        const data = JSON.parse(response.data);
      
        if (data.status) {
          //   dispatch(setAddUpdateCustomRecipe(data.data))
          resolve({
            status: true,
          });
          if (type === 'breakfast') {
            dispatch(setCustomBreakfastDailyResponse(userData));
            dispatch(setCustomBreakfastActive(true));
          } else if (type === 'lunch') {
            dispatch(setCustomLunchDailyResponse(userData));
            dispatch(setCustomLunchActive(true));
          } else if (type === 'dinner') {
            dispatch(setCustomDinnerDailyResponse(userData));
            dispatch(setCustomDinnerActive(true));
          } else if (type === 'snack') {
            dispatch(setCustomSnackDailyResponse(userData));
            dispatch(setCustomSnackActive(true));
          }
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

export function updateCustomRecipe(reqData, token, value, userData) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fetch(
        'POST',
        API_URL + '/recipe/create',
        {
          'Content-Type': 'multipart/form-data',
          'auth-token': token,
        },
        JSON.stringify(reqData),
      ).then(response => {
        const data = JSON.parse(response.data);
        
        if (data.status) {
          dispatch(setUpdateCustomRecipe(data.data));
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

export function setUpdateDailyActivityProduct(bodyData, token, reqData, type) {

  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fetch(
        'POST',
        'https://api.myfitspot.com/api/user/activity/recipe/or/product/create',
        {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        JSON.stringify(bodyData),
      ).then(response => {
        const data = JSON.parse(response.data);
       
  
        if (data.success) {
          //    dispatch(setAddUpdateCustomRecipe(data.data))
          resolve({
            status: true,
            data: data.data,
          });
          if (type == 'breakfast') {
            dispatch(setProductBreakfastDailyData(reqData));
            dispatch(setProductBreakfastDailyResponse(data));
            dispatch(setProductBreakfastActive(true));
          } else if (type == 'lunch') {
            dispatch(setProductLunchDailyData(reqData));
            dispatch(setProductLunchDailyResponse(data));
            dispatch(setProductLunchActive(true));
          } else if (type == 'dinner') {
            dispatch(setProductDinnerDailyData(reqData));
            dispatch(setProductDinnerDailyResponse(data));
            dispatch(setProductDinnerActive(true));
          } else if (type == 'snack') {
            dispatch(setProductSnackDailyData(reqData));
            dispatch(setProductSnackDailyResponse(data));
            dispatch(setProductSnackActive(true));
          }
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

export function deleteCustomRecipe(reqData, token) {

  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fetch(
        'POST',
        API_URL + '/recipe/create',
        {
          'Content-Type': 'multipart/form-data',
          'auth-token': token,
        },
        reqData,
      ).then(response => {
        const data = JSON.parse(response.data);
        if (data.status) {
          dispatch(setDeleteCustomRecipe(data.data));
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

export function setRouteNameFunc(name) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setRouteName(name));
    });
  };
}

export function getBreakfastDailyActivity(value) {
  return (dispatch, getState) => {
    dispatch(setBreakfastDailyActivity(value));
    dispatch(setBreakfastActive(true));
  };
}

export function getLunchDailyActivity(value) {
  return (dispatch, getState) => {
    dispatch(setLunchDailyActivity(value));
    dispatch(setLunchActive(true));
  };
}

export function getDinnerDailyActivity(value) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setDinnerDailyActivity(value));
      dispatch(setDinnerActive(true));
    });
  };
}

export function getSnackDailyActivity(value) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setSnackDailyActivity(value));
      dispatch(setSnackActive(true));
    });
  };
}

export function getDailyActivityType(value) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setDailyActivityType(value));
      dispatch(setDailyActivityActive(true));
      resolve({
        status: true,
      });
    });
  };
}

export function setBreakfastDailyActivity(data) {
  return {
    type: types.BREAKFAST_DAILY_ACTIVITY,
    breakfastDailyActivity: data,
  };
}
export function setBreakfastDailyResponse(data) {
  return {
    type: types.BREAKFAST_DAILY_RESPONSE,
    breakfastDailyResponse: data,
  };
}
export function setBreakfastActive(data) {
  return {
    type: types.BREAKFAST_ACTIVE,
    breakfastActive: data,
  };
}

export function setLunchDailyActivity(data) {
  return {
    type: types.LUNCH_DAILY_ACTIVITY,
    lunchDailyActivity: data,
  };
}
export function setLunchDailyResponse(data) {
  return {
    type: types.LUNCH_DAILY_RESPONSE,
    lunchDailyResponse: data,
  };
}
export function setLunchActive(data) {
  return {
    type: types.LUNCH_ACTIVE,
    lunchActive: data,
  };
}
export function setDinnerDailyActivity(data) {
  return {
    type: types.DINNER_DAILY_ACTIVITY,
    dinnerDailyActivity: data,
  };
}
export function setDinnerDailyResponse(data) {
  return {
    type: types.DINNER_DAILY_RESPONSE,
    dinnerDailyResponse: data,
  };
}
export function setDinnerActive(data) {
  return {
    type: types.DINNER_ACTIVE,
    dinnerActive: data,
  };
}
export function setSnackDailyActivity(data) {
  return {
    type: types.SNACK_DAILY_ACTIVITY,
    snackDailyActivity: data,
  };
}
export function setSnackDailyResponse(data) {
  return {
    type: types.SNACK_DAILY_RESPONSE,
    snackDailyResponse: data,
  };
}
export function setSnackActive(data) {
  return {
    type: types.SNACK_ACTIVE,
    snackActive: data,
  };
}
export function setDailyActivityType(data) {
  return {
    type: types.DAILY_ACTIVITY_TYPE,
    dailyActivityType: data,
  };
}
export function setDailyActivityActive(data) {
  return {
    type: types.DAILY_ACTIVITY_ACTIVE,
    dailyActivityActive: data,
  };
}
export function setDailyActivity(data) {
  return {
    type: types.DAILY_ACTIVITY,
    dailyActivity: data,
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
export function setAddUpdateActivities(data) {
  return {
    type: types.ADD_UPDATE_ACTIVITIES,
    addUpdateActivities: data,
  };
}
export function setAddUpdateCustomRecipe(data) {
  return {
    type: types.ADD_UPDATE_CUSTOM_RECIPE,
    addUpdateCustomRecipe: data,
  };
}
export function setUpdateCustomRecipe(data) {
  return {
    type: types.UPDATE_CUSTOM_RECIPE,
    updateCustomRecipe: data,
  };
}
export function setDeleteCustomRecipe(data) {
  return {
    type: types.DELETE_CUSTOM_RECIPE,
    deleteCustomRecipe: data,
  };
}

export function setAllListActivities(data) {
  return {
    type: types.ALL_LIST_ACTIVITIES,
    allListActivities: data,
  };
}

// custom recipe Core
export function setCustomBreakfastActive(data) {
  return {
    type: types.CUSTOM_BREAKFAST_ACTIVE,
    customBreakfastActive: data,
  };
}
export function setCustomBreakfastDailyResponse(data) {
  return {
    type: types.CUSTOM_BREAKFAST_DAILY_RESPONSE,
    customBreakfastDailyResponse: data,
  };
}
export function setCustomLunchActive(data) {
  return {
    type: types.CUSTOM_LUNCH_ACTIVE,
    customLunchActive: data,
  };
}
export function setCustomLunchDailyResponse(data) {
  return {
    type: types.CUSTOM_LUNCH_DAILY_RESPONSE,
    customLunchDailyResponse: data,
  };
}
export function setCustomDinnerActive(data) {
  return {
    type: types.CUSTOM_DINNER_ACTIVE,
    customDinnerActive: data,
  };
}
export function setCustomDinnerDailyResponse(data) {
  return {
    type: types.CUSTOM_DINNER_DAILY_RESPONSE,
    customDinnerDailyResponse: data,
  };
}

export function setCustomSnackActive(data) {
  return {
    type: types.CUSTOM_SNACK_ACTIVE,
    customSnackActive: data,
  };
}
export function setCustomSnackDailyResponse(data) {
  return {
    type: types.CUSTOM_SNACK_DAILY_RESPONSE,
    customSnackDailyResponse: data,
  };
}
export function setProductBreakfastActive(data) {
  return {
    type: types.PRODUCT_BREAKFAST_ACTIVE,
    productBreakfastActive: data,
  };
}
export function setProductBreakfastDailyResponse(data) {
  return {
    type: types.PRODUCT_BREAKFAST_ACTIVE_RESPONSE,
    productBreakfastResponse: data,
  };
}
export function setProductBreakfastDailyData(data) {
  return {
    type: types.PRODUCT_BREAKFAST_ACTIVE_DATA,
    productBreakfastData: data,
  };
}

export function setProductLunchActive(data) {
  return {
    type: types.PRODUCT_LUNCH_ACTIVE,
    productLunchActive: data,
  };
}
export function setProductLunchDailyResponse(data) {
  return {
    type: types.PRODUCT_LUNCH_ACTIVE_RESPONSE,
    productLunchResponse: data,
  };
}
export function setProductLunchDailyData(data) {
  return {
    type: types.PRODUCT_LUNCH_ACTIVE_DATA,
    productLunchData: data,
  };
}

export function setProductDinnerActive(data) {
  return {
    type: types.PRODUCT_DINNER_ACTIVE,
    productDinnerActive: data,
  };
}
export function setProductDinnerDailyResponse(data) {
  return {
    type: types.PRODUCT_DINNER_ACTIVE_RESPONSE,
    productDinnerResponse: data,
  };
}
export function setProductDinnerDailyData(data) {
  return {
    type: types.PRODUCT_DINNER_ACTIVE_DATA,
    productDinnerData: data,
  };
}

export function setProductSnackActive(data) {
  return {
    type: types.PRODUCT_SNACK_ACTIVE,
    productSnackActive: data,
  };
}
export function setProductSnackDailyResponse(data) {
  return {
    type: types.PRODUCT_SNACK_ACTIVE_RESPONSE,
    productSnackResponse: data,
  };
}
export function setProductSnackDailyData(data) {
  return {
    type: types.PRODUCT_SNACK_ACTIVE_DATA,
    productSnackData: data,
  };
}
////Product calories data
export const setBreakfastCalories =(data)=> {
  return {
    type: types.BREAKFAST_CALORIES,
    breakfastData: data,
  };
}
export const setlunchCalories =(data)=> {
  return {
    type: types.LUNCH_CALORIES,
    lunchData: data,
  };
}
export const setdinnerCalories =(data)=> {
  return {
    type: types.DINNER_CALORIES,
    dinnerData: data,
  };
}
export const setsnackCalories =(data)=> {
  return {
    type: types.SNACK_CALORIES,
    snackData: data,
  };
}

/////// Product Activity
export const setsnackProduct =(data)=> {
  return {
    type: types.SNACK_PRODUCT,
    snackProduct: data,
  };
}
export const setBreakfastProduct =(data)=> {
  return {
    type: types.BREAKFAST_PRODUCT,
    breakfastProduct: data,
  };
}
export const setlunchProduct =(data)=> {
  return {
    type: types.LUNCH_PRODUCT,
    lunchProduct: data,
  };
}
export const setdinnerProduct =(data)=> {
  return {
    type: types.DINNER_PRODUCT,
    dinnerProduct: data,
  };
}
