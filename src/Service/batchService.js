import {
  base_url,
  get,
  post,
  put,
  deleteService,
  commonError,
} from "./httpService";
import { toast } from "react-toastify";

export const getBatchList = async (url) => {
  try {
    let { data } = await get(base_url + url);
    return data;
  } catch (ex) {
    commonError(ex);
  }
};

export const getBatchByID = async (url, _id) => {
  try {
    let { data } = await post(base_url + url, { _id: _id });
    return data;
  } catch (error) {
    commonError(error);
  }
}

export const createNewBatch = async (url, sendData) => {
  try {
    let { data } = await post(base_url + url, sendData);
    toast.success("Created New Batch Successfully!")
    return data;
  } catch (error) {
    commonError(error);
  }
};
export const removeBatch = async (url, _id) => {
  try {
    let { data } = await deleteService(base_url + url, { data: { _id } });
    toast.success("Deleted a Batch!")
    return data;
  } catch (error) {
    commonError(error);
  }
};

export const getTrainerList = async (url, sendData) => {
  try {
    let { data } = await post(base_url + url, sendData);
    return data;
  } catch (error) {
    commonError(error);
  }
};

export const updateBatch = async (url, sendData) => {
  try {
    let { data } = await put(base_url + url, sendData);
    toast.success("Batch Record Updated Successfully.");
    return data;
  } catch (error) {
    commonError(error);
  }
};

export const updateBatchStudent = async (url, sendData) => {
  try {
    let { data } = await put(base_url + url, sendData);
    return data;
  } catch (error) {
    commonError(error);
  }
};