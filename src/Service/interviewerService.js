import {
    base_url,
    get,
    post,
    put,
    deleteService,
    commonError,
} from "./httpService";
import { toast } from "react-toastify";

export const getInterviewerList = async (url) => {
    try {
        let { data } = await get(base_url + url);
        return data;
    } catch (ex) {
        commonError(ex);
    }
};

export const getInterviewerDetailsByID = async (url, _id) => {
    try {
        let { data } = await post(base_url + url, { _id: _id });
        // console.log(_id);
        return data;
    } catch (ex) {
        commonError(ex);
    }
};

export const createNewInterviewer = async (url, sendData) => {
    try {
        let { data } = await post(base_url + url, sendData);
        toast.success("Interviewer Saved Successfully.");
        return data;
    } catch (error) {
        commonError(error);
    }
};


export const removeInterviewer = async (url, _id) => {
    try {
        let { data } = await deleteService(base_url + url, { data: { _id } });
        toast.success("Deleted an Interviewer Successfully.");
        return data;
    } catch (error) {
        commonError(error);
    }
};

export const updateInterviewerByID = async (url, sendData) => {
    try {
        let { data } = await put(base_url + url, sendData);
        if (data.modifiedCount > 0 && data.matchedCount === 1)
            toast.success("Interviewer Record Updated Successfully.");

        return data;
    } catch (error) {
        commonError(error);
    }
};

export const updateInterviewerBatches = async (url, sendData) => {
    try {
        let { data } = await put(base_url + url, sendData);
        if (data.modifiedCount > 0 && data.matchedCount === 1)
            toast.success("Batch Assigned to Interviewer");
        return data;
    } catch (error) {
        commonError(error);
    }
};