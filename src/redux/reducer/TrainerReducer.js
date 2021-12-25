let initState = {
  trainers: [],
};

export const trainerReducer = (state = initState, action) => {
  var { type, payload } = action;
  switch (type) {
    case "SAVE_NEW_TRAINER":
      return { ...state, trainers: payload };
    case "SAVE_ALL_TRAINER_DETAILS":
      return { ...state, trainers: payload };
    case "DELETE_TRAINER":
      let removeTrainer = [...state.trainers];
      removeTrainer.splice(payload, 1);
      return { ...state, trainers: removeTrainer };
    default:
      return { ...state };
  }
};
