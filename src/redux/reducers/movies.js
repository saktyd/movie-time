const initialState = {
  moviesBanner: null,
  isLoadingBanner: false,
  errorBanner: false,
  movies: null,
  currentPage: 1,
  totalPages: 0,
  isLoadingMovies: false,
  isLoadingLoadMoreMovies: false,
  errorMovies: false,
  detailMovie: null,
  isLoadingDetailMovie: false,
  errorMovie: false
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

    case 'FETCH_MOVIES_SUCCESS': {
      return {
        ...state,
        isLoadingMovies: false,
        movies: action.payload.results,
        totalPages: action.payload.total_pages,
        currentPage: action.payload.page,
      };
    }

    case 'FETCH_MOVIES_ERROR': {
      return {
        ...state,
        isLoadingMovies: false,
        errorMovies: action.payload,
      };
    }
    
    default: {
      return state;
    }
  }
};

export default moviesReducer;