import { userLogin } from "../utils/api/account";
import createDataContext from "./createDataContext";
import { LOGIN_SUCCESS, LOGOUT_USER, SET_LOADING } from "./types";

const mainReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.loader
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      };

    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false
      };

    default:
      return state;
  }
};

const logIn = (dispatch) => {
  return async (data) => {
    // console.log("SignIn");
    const res = await userLogin(data);
    if (res?.data?.token) {
      sessionStorage.setItem("token", res?.data?.token);
      dispatch({
        type: LOGIN_SUCCESS
      });
    } else {
      alert("An Error Occured. Please try again.");
    }
    return res;
  };
};

const logOut = (dispatch) => {
  return () => {
    sessionStorage.removeItem("token");
    dispatch({
      type: LOGOUT_USER
    });
  };
};

const setLoading = (dispatch) => {
  return (loader) => {
    dispatch({
      type: SET_LOADING,
      loader
    });
  };
};

export const { Provider, Context } = createDataContext(
  mainReducer,
  {
    logIn,
    logOut,
    setLoading
  },
  {
    isLoggedIn: false,
    data: {},
    loading: false
  }
);
