import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeStudent } from "../../Service/studentService";
import {
  deleteMockStudentAction,
  saveAllMockStudentDetailsAction,
} from "../../redux/action/MockStudentAction";
import { getStudentList } from "./../../Service/studentService";
import { Link } from 'react-router-dom';

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


        {studentList.length === 0 ? (
          <div className="card student_card flex align-items-center">
            <Link to="/mock/student/new">
              <span>
                <i
                  className="fa fa-4x fa-plus-circle primary-color"
                  aria-hidden="true"
                ></i>
              </span>
            </Link>
          </div>
        ) : (
          <>
            
            <div className="parent_card">
            <div className="card student_card flex align-items-center">
              <Link to="/mock/student/new">
                <span>
                  <i
                    className="fa fa-2x fa-plus-circle primary-color"
                    aria-hidden="true"
                  ></i>
                </span>
              </Link>
            </div>
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
                    <p className="batch_details bg-transparent" title="Fees Details">
                      {student.fees_details}
                    </p>

                    <div className="form-buttons">
                      <span
                        onClick={() => deleteStudent(index, student._id)}
                      >
                        <i className="fa fa-trash dangerIcon font-size-x-large" aria-hidden="true"></i>
                      </span>
                    </div>
                  </div>
                );
              }) //map
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default ListStudents;