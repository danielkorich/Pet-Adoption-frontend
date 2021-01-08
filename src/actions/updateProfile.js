import axios from "axios";
import jwt_decode from "jwt-decode";
import { baseUrl } from "../serverUrl";
import setAuthToken from "../utils/setAuthToken";
import { SET_CURRENT_USER } from "./types";

export const updateEmail = (Data) => (dispatch) => {
  return axios
    .put(`${baseUrl}/api/users/updateemail`, Data)
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

export const updatePassword = (Data) => {
  return axios
    .put(`${baseUrl}/api/users/updatepassword`, Data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const updateName = (Data) => (dispatch) => {
  return axios
    .put(`${baseUrl}/api/users/updatename`, Data)
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

export const updateTelephone = (Data) => (dispatch) => {
  return axios
    .put(`${baseUrl}/api/users/updatetelephone`, Data)
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

export const updateBio = (Data) => (dispatch) => {
  return axios
    .put(`${baseUrl}/api/users/updatebio`, Data)
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
