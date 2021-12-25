export const saveAllTrainerDetailsAction = (trainerList) => {
    return {
      type: "SAVE_ALL_TRAINER_DETAILS",
      payload: trainerList,
    };
  };
  
  export const addNewTrainerAction = (newTrainer) => {
    return {
      type: "SAVE_NEW_TRAINER",
      payload: newTrainer
    };
  };
  
  export const deleteTrainerAction = (deleteID) => {
    return {
      type: "DELETE_TRAINER",
      payload: deleteID
    };
  };