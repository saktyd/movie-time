import {request, chooseUrl} from '../../request'
import {BASE_URL, API_KEY} from '../../constans/api'

// SET_TRAILER_YOUTUBE_KEY
export const  setTrailerYoutubeKey = (data) => ({
  type: 'SET_TRAILER_YOUTUBE_KEY',
  payload: data
});

export const fetchTailerMovie = (id) => {
  return async (dispatch) => {
    await request
      .get(BASE_URL+`/movie/${id}/videos?api_key=`+API_KEY)
      .then((res) => {
        if (res.data.results?.length > 0) {
          const key = res.data.results[0].key
          dispatch(setTrailerYoutubeKey(key))
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };
};

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

export const fetchMovies = (type, page, keyword, year) => {
  return async (dispatch) => {
    if (page > 1) {
      dispatch(fetchMoviesLoadMoreBegin());
    } else {
      dispatch(fetchMoviesBegin());
    }
    const urlSearch = type === 'search' ?`&query=${keyword}&page=${page}&year=${year}` : `&page=${page}`;
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

// FETCH MOVIES BANNER
export const  fetchDetailMovieBegin = () => ({
  type: 'FETCH_DETAIL_MOVIE_BEGIN',
});

export const  fetchDetailMovieSuccess = (data) => ({
  type: 'FETCH_DETAIL_MOVIE_SUCCESS',
  payload: data
});

export const  fetchDetailMovieError = (data) => ({
  type: 'FETCH_DETAIL_MOVIE_ERROR',
  payload: data
});

export const fetchDetailMovie = (id) => {
  return async (dispatch) => {
    dispatch(fetchDetailMovieBegin());
    await request
      .get(BASE_URL+`/movie/${id}?api_key=${API_KEY}`)
      .then((res) => {
        dispatch(fetchDetailMovieSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchDetailMovieError(err.response?.data))
      })
  };
};