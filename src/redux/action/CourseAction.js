export const saveAllCourseDetailsAction = (courseList) => {
    return {
      type: "SAVE_ALL_COURSE_DETAILS",
      payload: courseList,
    };
  };
  
  export const addNewCourseAction = (newCourse) => {
    return {
      type: "SAVE_NEW_COURSE",
      payload: newCourse
    };
  };
  
  export const deleteCourseAction = (deleteID) => {
    return {
      type: "DELETE_COURSE",
      payload: deleteID
    };
  };