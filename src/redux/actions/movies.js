import {request, apiUrl, chooseUrl} from '../../request'

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

export const fetchMovies = (type) => {
  return async (dispatch) => {
    dispatch(fetchMoviesBegin());
    await request
      .get(chooseUrl(type))
      .then((res) => {
        dispatch(fetchMoviesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchMoviesError(err.response?.data));
      });
  };
};