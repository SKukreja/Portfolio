import { useEffect, useReducer } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    Authorization: "bearer " + import.meta.env.VITE_APP_API_TOKEN,
  },
});

// Define action types
const FETCH_INIT = 'FETCH_INIT';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

// Define reducer
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      throw new Error();
  }
};

// Custom hook to fetch data from API
const use = (url) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    data: null,
    loading: false,
    error: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: FETCH_INIT });

      try {
        const res = await API.get(url);
        dispatch({ type: FETCH_SUCCESS, payload: res.data.data });
      } catch (err) {
        dispatch({ type: FETCH_FAILURE });
      }
    };

    fetchData();
  }, [url]);

  return state;
};

export default use;
