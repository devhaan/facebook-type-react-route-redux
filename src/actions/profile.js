import {
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
  FETCH_USER_PROFILE,
} from './actionType.js';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

export function startUserProfileFetch() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function userProfileFailed(error) {
  
  return {
    type: USER_PROFILE_FAILURE,
    error,
  };
}

export function fetchUserProfile(userId) {
    return (dispatch) => {
      dispatch(startUserProfileFetch());
     
      const url = APIUrls.userProfile(userId);
      console.log('url prop',url);
      fetch(url, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("dd",data);
          if (data.success) {
            dispatch(userProfileSuccess(data.data.user));
            return;
          }
          dispatch(userProfileFailed(data.message));
        });
    };
  }
  
