import {request, chooseUrl} from '../../request'

// FETCH MOVIES
export const  fetchMoviesBegin = () => ({
  type: 'FETCH_MOVIES_BEGIN',
});

export const  fetchMoviesLoadMoreBegin = () => ({
  type: 'FETCH_MOVIES_LOADMORE_BEGIN',
});

export const  fetchMoviesSuccess = (data) => ({
  type: 'FETCH_MOVIES_SUCCESS',
  payload: data
});

export const  fetchMoviesError = (data) => ({
  type: 'FETCH_MOVIES_ERROR',
  payload: data
});

export const fetchMovies = (type, page, keyword) => {
  return async (dispatch) => {
    if (page > 1) {
      dispatch(fetchMoviesLoadMoreBegin());
    } else {
      dispatch(fetchMoviesBegin());
    }
    const urlSearch = type === 'search' ?`&query=${keyword}&page=${page}` : `&page=${page}`;
    await request
      .get(chooseUrl(type)+urlSearch)
      .then((res) => {
        dispatch(fetchMoviesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchMoviesError(err.response?.data));
      });
  };
};

// FETCH MOVIES BANNER
export const  fetchMoviesBannerBegin = () => ({
  type: 'FETCH_MOVIES_BANNER_BEGIN',
});

export const  fetchMoviesBannerSuccess = (data) => ({
  type: 'FETCH_MOVIES_BANNER_SUCCESS',
  payload: data
});

export const  fetchMoviesBannerError = (data) => ({
  type: 'FETCH_MOVIES_BANNER_ERROR',
  payload: data
});

export const fetchMoviesBanner = () => {
  return async (dispatch) => {
    dispatch(fetchMoviesBannerBegin());
    await request
      .get(chooseUrl('now-playing'))
      .then((res) => {
        const results = res?.data?.results
        const resultHasBackDrop = results.filter(item => item.backdrop_path)
        dispatch(fetchMoviesBannerSuccess(resultHasBackDrop[Math.floor(Math.random() * resultHasBackDrop.length - 1)]));
      })
      .catch((err) => {
        dispatch(fetchMoviesBannerError(err.response?.data));
      });
  };
};