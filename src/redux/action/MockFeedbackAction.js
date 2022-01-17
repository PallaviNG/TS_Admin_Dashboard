export const saveAllFeedbackFormsAction = (feedbackFormList) => {
  return {
    type: "SAVE_ALL_FEEDBACK_FORMS",
    payload: feedbackFormList,
  };
};

export const removeFeedbackFormAction = (delete_index) => {
  return {
    type: "DELETE_FEEDBACK_FORM",
    payload: delete_index
  };
};