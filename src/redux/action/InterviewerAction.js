export const saveAllTemplateFormAssignmentAction = (templateFormSet) => {
    return {
        type: "SAVE_ALL_TEMPLATE_ASSIGNMENT_FORMS",
        payload: templateFormSet,
    };
};

export const saveAllBatchesOfInterviewerAction = (batchList) => {
    return {
        type:"SAVE_ALL_BATCHES_OF_INTERVIEWER",
        payload:batchList
    };
};

export const saveAllInterviewersAction = (interviewerList) => {
    return {
        type: "SAVE_ALL_INTERVIEWER_DETAILS",
        payload: interviewerList
    }
}

export const addNewInterviewerAction = (newInterviewer) => {
    return {
        type: "ADD_NEW_INTERVIEWER",
        payload: newInterviewer
    };
};
export const addNewTemplateAssignmentAction = (newTemplateAssignment) => {
    return {
        type: "ASSIGN_NEW_TEMPLATE",
        payload: newTemplateAssignment
    };
};

export const deleteTemplateAssignmentAction = (deleteID) => {
    return {
        type: "DELETE_TEMPLATE_ASSIGNMENT",
        payload: deleteID
    };
};

export const deleteInterviewerAction = (deleteID) => {
    return {
        type: "DELETE_INTERVIEWER_DETAILS",
        payload: deleteID
    };
};