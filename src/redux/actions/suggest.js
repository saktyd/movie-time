import {request, chooseUrl} from '../../request'

// FETCH SUGGEST
export const  fetchSuggestBegin = () => ({
  type: 'FETCH_SUGGEST_BEGIN',
});

export const  fetchSuggestSuccess = (data) => ({
  type: 'FETCH_SUGGEST_SUCCESS',
  payload: data
});

export const  fetchSuggestError = (data) => ({
  type: 'FETCH_SUGGEST_ERROR',
  payload: data
});

export const fetchSuggest = (keyword) => {
  return async (dispatch) => {
    dispatch(fetchSuggestBegin());
    await request
      .get(chooseUrl('suggest')+`&query=${keyword}`)
      .then((res) => {
        const {results} = res.data
        const data = results.filter((item, i) => i <= 10)
        dispatch(fetchSuggestSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchSuggestError(err.response?.data));
      });
  };
};