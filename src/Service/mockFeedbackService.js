import {
  base_url,
  post,
  commonError,
  get,
  deleteService,
  put
} from "./httpService";

export const sendMockFeedbackFormToEmail = async (url, sendData) => {
  try {
    let { data } = await post(base_url + url, sendData);
    return data;
  } catch (ex) {
    commonError(ex);
  }
};

export const sendTextMessage = async (url) => {
  try {
    let { data } = await get(base_url + url);
    return data;
  } catch (error) {
    commonError(error);
  }
}

export const saveNewMockFeedbackForm = async (url, sendData) => {
  try {
    let { data } = await post(base_url + url, sendData);
    return data;
  } catch (error) {
    commonError(error);
  }
};

export const getMockFeedbackFormList = async (url) => {
  try {
    let { data } = await get(base_url + url);
    return data;
  } catch (error) {
    commonError(error);
  }
};

export const getMockFeedbackFormListByStudent = async(url,sendData) => {
  try {
    let {data} = await post(base_url+url,sendData);
    return data;
  } catch (error) {
    commonError(error);
  }
};
export const getMockFeedbackFormDetailsByStudent = async(url,sendData) => {
  try {
    let {data} = await post(base_url+url,sendData);
    return data;
  } catch (error) {
    commonError(error);
  }
};

export const getMockFeedbackFormByID = async (url, _id) => {
  try {
    let { data } = await post(base_url + url, { _id: { _id } });
    console.log(_id);
    return data;
  } catch (error) {
    commonError(error);
  }
}

export const getMockSubmitCountOfStudent = async (url, _id) => {
  try {
    let { data } = await post(base_url + url, { student_id:  _id  });
    console.log(data);
    return data;
  } catch (error) {
    commonError(error);
  }
}

export const setMockSubmitCountOfStudent = async (url, sendData) => {
  try {
    let { data } = await put(base_url + url, sendData);
    return data;
  } catch (error) {
    commonError(error);
  }
}

export const decrementMockSubmitCountOfStudent = async(url,sendData) => {
  try {
    let {data} = await put(base_url+url, sendData);
    return data;
  } catch (error) {
    commonError(error);
  }
}

export const deleteMockFeedbackForm = async (url, _id) => {
  try {
    let { data } = await deleteService(base_url + url, { data: { _id } });
    return data;
  } catch (error) {
    commonError(error);
  }
}