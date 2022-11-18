import * as types from './types';
import {API_URL} from '../../../Actions';
import RNFetchBlob from 'rn-fetch-blob';

export function getRecipesList(bodyData, token) {
 
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // alert('getRecipesList')
      RNFetchBlob.fetch(
        'POST',
        API_URL + '/recipe/get/all',
        {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDMzZDhlOGU2YjM0MDFiOTc4MmI3YWEiLCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwidHlwZSI6ImN1IiwiaWF0IjoxNjI4MTc4NjgwfQ.kj9Hj-WDiR4-ddruC-6pgBj2q1RiUN8MnO1_5XqzEeY",
          'auth-token': token,
        },
        bodyData && JSON.stringify(bodyData),
      )
        .then(response => {
        
          const data = JSON.parse(response.data);
        
          if (data.status) {
            if (data?.data?.length !== 0) {
              resolve({
                status: true,
                data: data.data,
              });
              dispatch(setRecipesListData(data.data));
              dispatch(setRecipesListCheck(true));
            } else {
              dispatch(setRecipesListData([]));
              dispatch(setRecipesListCheck(true));
            }
            
          } else {
            resolve({
              status: false,
              //error: data.message
            });
            dispatch(setRecipesListCheck(false));
          }
        })
        .catch(() => {
          dispatch(setRecipesListCheck(false));
          resolve({
            status: false,
          });
        });
    });
  };
}
export function getRecipesTypeList(token, type) {
  let bodyData = {
    recipeType: type,
  };
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.fetch(
        'POST',
        API_URL + '/recipe/get/all',
        {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        JSON.stringify(bodyData),
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

export function setRecipesListData(data) {
  return {
    type: types.RECIPES_LIST_SHOW,
    recipesList: data,
  };
}
export function setRecipesListCheck(data) {
  return {
    type: types.RECIPES_LIST_CHECK,
    recipesListCheck: data,
  };
}
