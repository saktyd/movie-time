const initialState = {
  suggest: null,
  isLoadingSuggest: false,
  errorSuggest: false
};

const suggestReducer = (state = initialState, action) => {
  switch (action.type) {
    // FETCH SUGGEST
    case 'FETCH_SUGGEST_BEGIN': {
      return {
        ...state,
        isLoadingSuggest: true,
        errorSuggest: false,
      };
    }

    case 'FETCH_SUGGEST_SUCCESS': {
      return {
        ...state,
        isLoadingSuggest: false,
        suggest: action.payload,
      };
    }

    case 'FETCH_SUGGEST_ERROR': {
      return {
        ...state,
        isLoadingSuggest: false,
        errorSuggest: action.payload,
      };
    }
    
    default: {
      return state;
    }
  }
};

export default suggestReducer;