import axios from "axios";
import jwt_decode from "jwt-decode";
import { baseUrl } from "../serverUrl";
import setAuthToken from "../utils/setAuthToken";
import { SET_CURRENT_USER } from "./types";

export const registerUser = (userData) => (dispatch) => {
  return axios
    .post(`${baseUrl}/api/users/register`, userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const loginUser = (userData) => (dispatch) => {
  return axios
    .post(`${baseUrl}/api/users/login`, userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
