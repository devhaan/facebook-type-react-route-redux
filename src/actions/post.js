import { UPDATE_POSTS } from '../actions/actionType';
import { APIUrls } from '../helpers/urls';
export function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts();
    console.log('url', url);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(updatePosts(data.data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}
