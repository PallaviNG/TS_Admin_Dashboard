let initState = {
    students: [],
  };
  
  export const studentReducer = (state = initState, action) => {
    var { type, payload } = action;
    switch (type) {
      case "SAVE_NEW_STUDENT":
        return { ...state, students: payload };
      case "SAVE_ALL_STUDENT_DETAILS":
        return { ...state, students: payload };
      case "DELETE_STUDENT":
        let removeStudent = [...state.students];
        removeStudent.splice(payload, 1);
        return { ...state, students: removeStudent };
      default:
        return { ...state };
    }
  };
  