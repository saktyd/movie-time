const initialState = {
  moviesBanner: null,
  isLoadingBanner: false,
  errorBanner: false,
  movies: null,
  currentPage: 0,
  totalPages: 0,
  isLoadingMovies: false,
  isLoadingLoadMoreMovies: false,
  errorMovies: false,
  detailMovie: null,
  isLoadingDetailMovie: false,
  errorDetailMovie: false,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    // FETCH MOVIES BANNER
    case 'FETCH_MOVIES_BANNER_BEGIN': {
      return {
        ...state,
        isLoadingBanner: true,
        errorBanner: false,
      };
    }

    case 'FETCH_MOVIES_BANNER_SUCCESS': {
      return {
        ...state,
        isLoadingBanner: false,
        moviesBanner: action.payload,
      };
    }

    case 'FETCH_MOVIES_BANNER_ERROR': {
      return {
        ...state,
        isLoadingBanner: false,
        errorBanner: action.payload,
      };
    }

    // FETCH MOVIES 
    case 'FETCH_MOVIES_BEGIN': {
      return {
        ...state,
        isLoadingMovies: true,
        errorMovies: false,
      };
    }

    case 'FETCH_MOVIES_LOADMORE_BEGIN': {
      return {
        ...state,
        isLoadingLoadMoreMovies: true,
        errorBanner: false,
      };
    }

    case 'FETCH_MOVIES_SUCCESS': {
      let movies = null;
      const { results, page, total_pages} = action.payload;
      if (page > 1) {
        let filter = []
        state.movies.map((item) => {
          filter = results.filter((el) => el.id !== item.id);
          return null
        });
        movies = state.movies.concat(filter);
      } else {
        movies = results?.length > 0 ? results : state.movies;
      }

      return {
        ...state,
        isLoadingMovies: false,
        isLoadingLoadMoreMovies: false,
        movies: movies,
        totalPages: total_pages,
        currentPage: page,
      };
    }

    case 'FETCH_MOVIES_ERROR': {
      return {
        ...state,
        isLoadingMovies: false,
        errorMovies: action.payload,
      };
    }

    // FETCH DETAIL MOVIE
    case 'FETCH_DETAIL_MOVIE_BEGIN': {
      return {
        ...state,
        isLoadingDetailMovie: true,
        errorDetailMovie: false,
        detailMovie: null
      };
    }

    case 'FETCH_DETAIL_MOVIE_SUCCESS': {
      return {
        ...state,
        isLoadingDetailMovie: false,
        detailMovie: action.payload,
      };
    }

    case 'FETCH_DETAIL_MOVIE_ERROR': {
      return {
        ...state,
        isLoadingDetailMovie: false,
        errorDetailMovie: action.payload,
      };
    }
    
    default: {
      return state;
    }
  }
};

export default moviesReducer;