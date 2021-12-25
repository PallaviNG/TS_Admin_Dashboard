import {
    base_url,
    get,
    post,
    deleteService,
    commonError,
  } from "./httpService";
  import { toast } from "react-toastify";
  
  export const createNewStudent = async (url, sendData) => {
    try {
      let { data } = await post(base_url + url, sendData);
      toast.success("added new student successfully");
      return data;
    } catch (error) {
      commonError(error);
    }
  };
  export const removeStudent = async (url, _id) => {
    try {
      let { data } = await deleteService(base_url + url, { data: { _id } });
      toast.success("removed student successfully");
      return data;
    } catch (error) {
      commonError(error);
    }
  };
  
  export const getStudentList = async (url) => {
    try {
      let { data } = await get(base_url + url);
      return data;
    } catch (error) {
      commonError(error);
    }
  };  