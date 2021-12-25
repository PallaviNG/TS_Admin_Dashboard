import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.headers.common["x_auth_token"] = localStorage.getItem("token");

axios.interceptors.response.use(null, function (error) {
  const exError = error.response;
  if (!exError) {
    console.log("you can check error as", error);
    toast.error(`An unexpected error occurred`);
  }
  return Promise.reject(error);
});

export const base_url = "http://localhost:3333/api/";
export const get = axios.get;
export const post = axios.post;
export const put = axios.put;
export const deleteService = axios.delete;

export const commonError = (ex) => {
  let { response } = ex;
  if (response) {
    toast.error(
      // `${response.status} ${response.statusText} ${response.data.error}`
      `${response.status} ${response.statusText} ${response.data.error}`
    );
  }
};
