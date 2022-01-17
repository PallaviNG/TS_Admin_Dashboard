let initState = {
    feedbackForms: [],
};

export const FeedbackFormReducer = (state = initState, action) => {
    var { type, payload } = action;
    switch (type) {
        case "SAVE_ALL_FEEDBACK_FORMS":
            return { ...state, feedbackForms: payload };
        case "DELETE_FEEDBACK_FORM":
            let removeFeedbackForm = [...state.feedbackForms];
            removeFeedbackForm.splice(payload, 1);
            return { ...state, feedbackForms: removeFeedbackForm };
        default:
            return { ...state };
    }
};