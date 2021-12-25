let initState = {
    courses: [],
  };
  
  export const CourseReducer = (state = initState, action) => {
    var { type, payload } = action;
    switch (type) {
      case "SAVE_NEW_COURSE":
        return { ...state, courses: payload };
      case "SAVE_ALL_COURSE_DETAILS":
        return { ...state, courses: payload };
      case "DELETE_COURSES":
        let removeCourse = [...state.courses];
        removeCourse.splice(payload, 1);
        return { ...state, courses: removeCourse };
      default:
        return { ...state };
    }
  };
  