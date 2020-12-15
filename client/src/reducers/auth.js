import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticaded: null,
  loading: true,
  user: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticaded: true,
        loading: false,
        user: payload,
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        ...payload,
        isAuthenticaded: false,
        loading: false,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticaded: true,
        loading: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
