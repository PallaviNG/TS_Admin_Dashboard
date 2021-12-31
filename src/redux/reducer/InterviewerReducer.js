let initState = {
    interviewers: [],
    templateAssignments: [],
    batchesOfInterviewer:[]
  };
  
  export const InterviewerReducer = (state = initState, action) => {
    var { type, payload } = action;
    switch (type) {
      case "ASSIGN_NEW_TEMPLATE":
        let new_template_assignment_list = [...state.templateAssignments];
        new_template_assignment_list.push(payload);
        return { ...state, templateAssignments: new_template_assignment_list, interviewers: [] };

      case "ADD_NEW_INTERVIEWER":
        let new_interviewer = [...state.interviewers];
        new_interviewer.push(payload);
        return { ...state, interviewers: new_interviewer};
  
      case "SAVE_ALL_INTERVIEWER_DETAILS":
        return { ...state, interviewers: payload };
  
      case "SAVE_ALL_TEMPLATE_ASSIGNMENT_FORMS":
        return { ...state, templateAssignments: payload };

      case "SAVE_ALL_BATCHES_OF_INTERVIEWER":
        return {...state, batchesOfInterviewer:payload}
  
      case "DELETE_TEMPLATE_ASSIGNMENT":
        console.log(state.templateAssignments);
        console.log(payload);
        let removeAssignedTemplate = [...state.templateAssignments];
        removeAssignedTemplate.splice(payload, 1);
        console.log(removeAssignedTemplate);
        return { ...state, templateAssignments: removeAssignedTemplate };
  
      case "DELETE_INTERVIEWER_DETAILS":
        let removeInterviewerDetails = [...state.interviewers];
        removeInterviewerDetails.splice(payload, 1);
        return { ...state, interviewers: removeInterviewerDetails };
  
      default:
        return { ...state };
    }
  };
  