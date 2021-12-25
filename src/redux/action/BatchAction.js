export const saveAllBatchDetailsAction = (batchList) => {
  return {
    type: "SAVE_ALL_BATCH_DETAILS",
    payload: batchList,
  };
};

export const editBatchDetailsAction = (updatedBatch) => {
  return {
    type: "UPDATE_BATCH_DETAILS",
    payload: updatedBatch
  };
};

export const addNewBatchAction = (newBatch) => {
  return {
    type: "SAVE_NEW_BATCH",
    payload: newBatch
  };
};

export const deleteBatchAction = (deleteID) => {
  return {
    type: "DELETE_BATCH",
    payload: deleteID
  };
};