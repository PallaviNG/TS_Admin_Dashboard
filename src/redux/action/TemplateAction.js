export const saveAllTemplateDetailsAction = (templateQuestionSet) => {
    return {
        type: "SAVE_ALL_TEMPLATE_DETAILS",
        payload: templateQuestionSet,
    };
};

export const saveAllTemplateFormsAction = (templateForms) => {
    return {
        type: "SAVE_ALL_TEMPLATE_FORMS",
        payload: templateForms
    }
}

export const addNewTemplateAction = (newTemplate) => {
    return {
        type: "SAVE_NEW_TEMPLATE",
        payload: newTemplate
    };
};

export const deleteTemplateAction = (deleteID) => {
    return {
        type: "DELETE_TEMPLATE",
        payload: deleteID
    };
};

export const deleteQuestionSet = (deleteID) => {
    return {
        type: "DELETE_TEMPLATE_QUESTION_SET",
        payload: deleteID
    };
};

export const saveAllDynamicComponentDetailsAction = (dynamicComponentList) => {
    return {
        type: "SAVE_ALL_CYNAMIC_COMPONENT_DETAILS",
        payload: dynamicComponentList,
    };
};
export const addNewDynamicComponentAction = (newDynamicComponent) => {
    return {
        type: "SAVE_NEW_DYNAMIC_COMPONENT",
        payload: newDynamicComponent
    };
};

export const deleteDynamicComponentAction = (deleteID) => {
    return {
        type: "DELETE_DYNAMIC_COMPONENT",
        payload: deleteID
    };
};