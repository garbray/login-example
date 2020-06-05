import API from '../api';
import { useCallback, useReducer, useEffect, useState } from 'react';
import isEmpty from 'lodash.isempty';

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'fetch':
      return {
        ...state,
        isFetching: true
      };
    case 'error':
      return {
        ...state,
        isFetching: false,
        error: payload.error
      };
    case 'data':
      return {
        ...state,
        isFetching: false,
        data: payload.data
      };
    default:
      throw new Error();
  }
};

const initialState = {
  isFetching: false,
  data: '',
  error: ''
};

const useDataApi = (initialUrl = '', initialData = '') => {
  const [{ url, data }, setConfig] = useState({
    url: initialUrl,
    data: initialData
  });
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      if (!isEmpty(url)) {
        dispatch({
          type: 'fetch'
        });
        const response = await API(url, data);
        if (response.status === 'success') {
          dispatch({
            type: 'data',
            payload: { data: response.data }
          });
        } else if (response.status === 'error') {
          dispatch({
            type: 'error',
            payload: { error: response.error }
          });
        }
      }
    })();
  }, [url, data]);

  const doSend = useCallback((url, sendData) => {
    setConfig({ url, data: { ...sendData } });
  }, []);

  return { ...state, doSend };
};

export default useDataApi;
