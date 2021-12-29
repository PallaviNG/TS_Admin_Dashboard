export const saveAllMockStudentDetailsAction = (studentList) => {
    return {
      type: "SAVE_ALL_STUDENT_DETAILS",
      payload: studentList,
    };
  };
  
  
  export const addNewMockStudentAction = (newStudent) => {
    return {
      type: "SAVE_NEW_STUDENT",
      payload: newStudent
    };
  };
  
  export const deleteMockStudentAction = (deleteID) => {
    return {
      type: "DELETE_STUDENT",
      payload: deleteID
    };
  };

  