import { base_url, commonError, get, post } from "./httpService";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

export const getAdminLogin = async (url, sendData) => {
  try {
    let data = await post(base_url + url, sendData);
    toast.success("Login Successfully");
    return data;
  } catch (error) {
    commonError(error);
  }
};

export const saveAdminRegister = async (url, sendData) => {
  try {
    let data = await post(base_url + url, sendData);
    toast.success("Registered Successfully");
    return data;
  } catch (error) {
    commonError(error);
  }
};
export const getAdminUsersList = async (url) => {
  try {
    let data = await get(base_url + url);
    // toast.success("Registered Successfully");
    console.log(data);
    return data;
  } catch (error) {
    commonError(error);
  }
};

export const saveAuthToken = (token) => {
  localStorage.setItem("token", token);
  window.location.replace("/");
};

export const isAdminValid = () => {
  return localStorage.getItem("token") === null ? false : true;
};

export const getUserDetails = () => {
  let token = localStorage.getItem("token");
  return token === null ? false : jwt_decode(token);
};

export const removeAuthToken = (token) => {
  localStorage.removeItem("token")
  window.location.replace("/");
}

export const uploadProfile = async (url, sendData) => {
  try {
    console.log(sendData);
    let data = await post(base_url + url, sendData);
    console.log(data);
    toast.success("Uploaded Successfully");
    return data;
  } catch (error) {
    commonError(error);
  }
};