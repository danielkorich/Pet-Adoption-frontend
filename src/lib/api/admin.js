import axios from "axios";
import { baseUrl } from "../../serverUrl";

export const addNewPet = (FormData) => {
  return axios
    .post(`${baseUrl}/api/pets/add`, FormData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const editPet = (FormData) => {
  return axios
    .put(`${baseUrl}/api/pets/edit`, FormData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getAllUsers = () => {
  return axios
    .get(`${baseUrl}/api/users/getallusers`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getUserById = (userId) => {
  return axios
    .get(`${baseUrl}/api/users/userdetails/${userId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
