let initState = {
  batches: [],
};

export const batchReducer = (state = initState, action) => {
  var { type, payload } = action;
  switch (type) {
    case "SAVE_ALL_BATCH_DETAILS":
      return { ...state, batches: payload };
    case "UPDATE_BATCH_DETAILS":
      return { ...state, batches: payload };
    case "SAVE_NEW_BATCH":
      return { ...state, batches: payload };
    case "DELETE_BATCH":
      let removeBatch = [...state.batches];
      removeBatch.splice(payload, 1);
      return { ...state, batches: removeBatch };
    default:
      return { ...state };
  }
};
