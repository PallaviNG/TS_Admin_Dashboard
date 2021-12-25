import {
    base_url,
    get,
    post,
    deleteService,
    commonError,
  } from "./httpService";  
  import { toast } from "react-toastify";
  
  export const createNewNotification = async (url, sendData) => {
    try {
      let { data } = await post(base_url + url, sendData);
      toast.success("You got new notification!");
      return data;
    } catch (error) {
      commonError(error);
    }
  };
  export const removeNotification = async (url, _id) => {
    try {
      let { data } = await deleteService(base_url + url, { data: { _id } });
      toast.success("Removed notification/s successfully");
      return data;
    } catch (error) {
      commonError(error);
    }
  };
  
  export const geNotificationList = async (url) => {
    try {
      let { data } = await get(base_url + url);
      return data;
    } catch (error) {
      commonError(error);
    }
  };