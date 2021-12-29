let initState = {
    interviewer_batches: [],
  };
  
  export const interviewerBatchReducer = (state = initState, action) => {
    var { type, payload } = action;
    switch (type) {
      case "SAVE_ALL_INTERVIEWER_BATCH_DETAILS":
        return { ...state, interviewer_batches: payload };
      default:
        return { ...state };
    }
  };
  