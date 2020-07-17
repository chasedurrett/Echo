import axios from "axios";

const initialState = {
  isLoggedIn: false,
  user: {},
  subforum: {},
};

const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const GET_USER = "GET_USER";
const GET_CURRENT_SUBFORUM = "GET_CURRENT_SUBFORUM";

//action builder
export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: user,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: initialState,
  };
}

export function getUser() {
  const user = axios.get("/auth/users/current");

  return {
    type: GET_USER,
    payload: user,
  };
}

export function getCurrentSubforum(subforum) {
  return {
    type: GET_CURRENT_SUBFORUM,
    payload: subforum,
  };
}

//reducer function
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.payload, isLoggedIn: true };
    case LOGOUT_USER:
      return { ...state, ...action.payload };
    case GET_USER + "_PENDING":
      return state;
    case GET_USER + "_FULFILLED":
      return { ...state, user: action.payload.data, isLoggedIn: true };
    case GET_USER + "_REJECTED":
      return initialState;
    case GET_CURRENT_SUBFORUM:
      return { ...state, subforum: action.payload};
    default:
      return state;
  }
}
