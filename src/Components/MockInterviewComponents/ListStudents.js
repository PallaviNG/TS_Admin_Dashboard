import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeStudent } from "../../Service/studentService";
import { deleteMockStudentAction, saveAllMockStudentDetailsAction } from "../../redux/action/MockStudentAction";
import { getStudentList } from './../../Service/studentService';

function ListStudents({ history }) {
  let studentList = useSelector((state) => state.studentDetails.students);
  let dispatch = useDispatch();

  let deleteStudent = (index, _id) => {
    removeStudent("delete-student-by-id", _id).then((result) => {
      if (
        result.status === true &&
        result.result.deletedCount === 1 &&
        result !== undefined
      ) {
        toast.success("Deleted one student successfully!");
        dispatch(deleteMockStudentAction(index));
      } else toast.error("Unable to delete student!");
    });
  };


  useEffect(() => {
    getStudentList("get-student-list").then((result) => {
      if (result === undefined) return false;
      dispatch(saveAllMockStudentDetailsAction(result.studentList));
    });
  }, []);
  
  return (
    <div className="content">
      <div className="formComponent">
        <h4 className="text-align-center">List of Students</h4>
        <div className="parent_card">
          {studentList.map((student, index) => {
            return (
              <div
                className="card student_card flex flex-direction-column"
                key={index}
              >
                <p className="batch_details" title="Student Name">
                  {student.student_name}
                </p>
                <p className="batch_details" title="Phone Number">
                  {student.phone_number}
                </p>
                <p className="batch_details" title="Email ID">
                  {student.email_id}
                </p>
                <p className="batch_details" title="Batch Name">
                  {student.batch_name}
                </p>
                <p className="batch_details" title="Course Name">
                  {student.course_name}
                </p>
                <p className="batch_details" title="Fees Details">
                  {student.fees_details}
                </p>

                <div className="form-buttons">
                  <button onClick={() => deleteStudent(index, student._id)}>
                    DELETE
                  </button>
                  {/* <button
                    className="edit"
                    onClick={() => {
                      history.push("/student/edit/" + batch._id);
                    }}
                  >
                    EDIT
                  </button> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ListStudents;
