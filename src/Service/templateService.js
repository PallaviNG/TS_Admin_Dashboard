import {
    base_url,
    get,
    post,
    put,
    deleteService,
    commonError,
} from "./httpService";
import { toast } from "react-toastify";

export const getTemplateList = async (url) => {
    try {
        let { data } = await get(base_url + url);
        return data;
    } catch (ex) {
        commonError(ex);
    }
};

export const createNewTemplate = async (url, sendData) => {
    try {
        let { data } = await post(base_url + url, sendData);
        toast.success("Template Saved Successfully.");
        return data;
    } catch (error) {
        commonError(error);
    }
};

export const removeTemplate = async (url, _id) => {
    try {
        let { data } = await deleteService(base_url + url, { data: { _id } });
        toast.success("Deleted Template Successfully.");
        return data;
    } catch (error) {
        commonError(error);
    }
};

export const updateTemplate = async (url, sendData) => {
    try {
        let { data } = await put(base_url + url, sendData);
        toast.success("Template Record Updated Successfully.");
        return data;
    } catch (error) {
        commonError(error);
    }
};