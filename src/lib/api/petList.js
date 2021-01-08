import axios from "axios";
import { baseUrl } from "../../serverUrl";

export const getPetById = (id) => {
  return axios
    .get(`${baseUrl}/api/pets/id/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getLikedPets = () => {
  return axios
    .get(`${baseUrl}/api/pets/getlikedpets`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const searchByQuery = (parseContent) => {
  return axios
    .get(`${baseUrl}/api/pets/query?${parseContent}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const adoptPet = (petId) => {
  return axios
    .post(`${baseUrl}/api/pets/${petId}/adopt`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const fosterPet = (petId) => {
  return axios
    .post(`${baseUrl}/api/pets/${petId}/foster`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const returnPet = (petId) => {
  return axios
    .post(`${baseUrl}/api/pets/${petId}/return`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const likePet = (petId) => {
  return axios
    .post(`${baseUrl}/api/pets/${petId}/likepet`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const unlikePet = (petId) => {
  return axios
    .post(`${baseUrl}/api/pets/${petId}/unlikepet`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const userLikedPetsList = () => {
  return axios
    .get(`${baseUrl}/api/pets/getlistlikedpetsinfo`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const userPetsList = () => {
  return axios
    .get(`${baseUrl}/api/pets/getlistpetsinfo`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};
