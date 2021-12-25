import {
    base_url,
    get,
    put,
    post,
    deleteService,
    commonError,
  } from "./httpService";
  import { toast } from "react-toastify";
  
  export const createNewCourse = async (url, sendData) => {
    try {
      let { data } = await post(base_url + url, sendData);
      toast.success("added new course successfully");
      return data;
    } catch (error) {
      commonError(error);
    }
  };
  export const removeCourse = async (url, _id) => {
    try {
      let { data } = await deleteService(base_url + url, { data: { _id } });
      toast.success("removed course successfully");
      return data;
    } catch (error) {
      commonError(error);
    }
  };
  
  export const getCourseList = async (url) => {
    try {
      let { data } = await get(base_url + url);
      return data;
    } catch (error) {
      commonError(error);
    }
  }; 

  export const updateCourse = async (url, sendData) => {
    try {
        let { data } = await put(base_url + url, sendData);
        toast.success("Course Record Updated Successfully.");
        return data;
    } catch (error) {
        commonError(error);
    }
};