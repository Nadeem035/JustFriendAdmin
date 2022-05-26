import { API } from "../backend";
import axios from "axios";
import Constants from "./constant";
import { isAuthenticated } from "./auth";

export const getData = (url) => {
  return axios
    .get(Constants.BASE_URL + url.toString(), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${isAuthenticated()}`,
      },
    })
    .then((response) => {
      if (response.status === 401) {
        localStorage.removeItem("jwt");
      }
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.removeItem("jwt");
      }
      return error;
    });
};
export const postData = (url, body) => {
  return axios
    .post(Constants.BASE_URL + url.toString(), body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${isAuthenticated()}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const putData = (url, body) => {
  return axios
    .put(Constants.BASE_URL + url.toString(), body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${isAuthenticated()}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const deleteData = (url, body) => {
  return axios
    .delete(
      Constants.BASE_URL + url.toString(),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isAuthenticated()}`,
        },
      },
      body
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const uploadFile = (url, body) => {
  return axios
    .post(
      Constants.BASE_URL + url.toString()(),
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${isAuthenticated()}`,
        },
      },
      body
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
