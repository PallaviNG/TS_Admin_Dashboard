import {
  base_url,
  get,
  post,
  put,
  deleteService,
  commonError,
} from "./httpService";
import { toast } from "react-toastify";

export const createNewTrainer = async (url, sendData) => {
  try {
    let { data } = await post(base_url + url, sendData);
    return data;
  } catch (error) {
    commonError(error);
  }
};

export const removeTrainer = async (url, _id) => {
  try {
    let { data } = await deleteService(base_url + url, { data: { _id } });
    return data;
  } catch (error) {
    commonError(error);
  }
};

export const getTrainerList = async (url) => {
  try {
    let { data } = await get(base_url + url);
    return data;
  } catch (error) {
    commonError(error);
  }
};

export const updateTrainer = async (url, sendData) => {
  try {
    let { data } = await put(base_url + url, sendData);
    toast.success("Trainer Record Updated Successfully.");
    return data;
  } catch (error) {
    commonError(error);
  }
};