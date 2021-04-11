import {request, apiUrl} from '../../request'

export const  fetchMoviesBegin = () => ({
  type: 'FETCH_MOVIES_BEGIN',
});

export const  fetchMoviesSuccess = (data) => ({
  type: 'FETCH_MOVIES_SUCCESS',
  payload: data
});

export const  fetchMoviesError = (data) => ({
  type: 'FETCH_MOVIES_ERROR',
  payload: data
});

export const fetchMovies = () => {
  return async (dispatch) => {
    dispatch(fetchMoviesBegin());
    await request
      .get(apiUrl.fetchActionMovies)
      .then((res) => {
        dispatch(fetchMoviesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchMoviesError(err.response?.data));
      });
  };
};