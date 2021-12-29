import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FormControl from "./../forms/FormControl";
import { useDispatch } from "react-redux";
import { createNewTemplate, getTemplateList } from "./../../Service/templateService";
import { addNewTemplateAction, deleteQuestionSet } from "./../../redux/action/TemplateAction";
import { getStudentByID, getStudentList } from "../../Service/studentService";
import { saveAllMockStudentDetailsAction } from './../../redux/action/MockStudentAction';


function SharableTemplateForm({ history, match }) {
  console.log(match.params.shareTemplate);

  let mockStudentsList = useSelector((state) => state.studentDetails.students);

  let dispatch = useDispatch();

  let [studentID, setStudentID] = useState();
  let [studentListOptions, setStudentListOptions] = useState([]);
  let [studentsList, setStudentsList] = useState([]);

  let [studentEmailID, setStudentEmailID] = useState("");
  let [studentPhoneNumber, setStudentPhoneNumber] = useState("");

  useEffect(() => {
    getStudentList("get-student-list").then(
      (result) => {
        if (result === undefined) return false;
        // studentsList = result.studentList;
        // setStudentsList([...studentsList]);
        dispatch(saveAllMockStudentDetailsAction(result.studentList));
      });
    studentListOptions = [];
    studentListOptions.push({ value: 0, name: "-Select Student-" });
    if (mockStudentsList.length === 0)
      studentListOptions.push({ value: undefined, name: "No Student found!" });
    else {
      mockStudentsList.forEach(student => {
        studentListOptions.push({ value: student._id, name: student.student_name });
      });
    }
    setStudentListOptions([...studentListOptions]);
  }, []);


  let changeStudentDetails = (event) => {
    let _id = event.target.value;

    getStudentByID("get-student-by-id", _id).then(
      (result) => {
        if (result === undefined) return false;
        let studentDetails = result.students[0];
        setStudentEmailID(studentDetails.email_id);
        setStudentPhoneNumber(studentDetails.phone_number);
      }
    );
  }

  let initialValues = {
    studentEmail: studentEmailID,
    studentPhone: studentPhoneNumber
  }


  return (
    <div className="content">
      <div className="formComponent flex flex-direction-column align-items-center">
        <h4 className="text-align-center">Mock Template</h4>
        <div className="sTemplateContainer">
          <Formik initialValues={initialValues} enableReinitialize>
            <Form>
              <div className="sTemplate_header flex flex-direction-column justify-content-center" title="Enter Student Details">
                <div><label>Student Name</label>
                  <Field
                    name="student_id"
                    as="select"
                    title="Student Name"
                    onChange={(event) => {
                      setStudentID(event.target.value);
                      changeStudentDetails(event);
                    }}
                    value={studentID}
                  >
                    {
                      studentListOptions.map((student, index) => (
                        <option key={index} value={student.value}>
                          {student.name}
                        </option>
                      ))
                    }
                  </Field>
                </div>
                <div>
                  <label>Email ID</label>
                  <Field
                    name="studentEmail"
                    autoComplete="off"
                    type="email"
                    readOnly
                    title="Student Email ID"
                  />
                </div>
                <div>
                  <label>Phone Number</label>
                  <Field
                    name="studentPhone"
                    autoComplete="off"
                    type="number"
                    readOnly
                    title="Student Phone Number"
                  />
                </div>
              </div>

              <div className="sTemplate_body" title="Template Container">
                <div>
                  <h4>Template Name</h4>
                  <label>Question1</label>
                  <Field
                    name="answer"
                    autoComplete="off"
                    title="Enter answer"
                  />
                </div>
                <div>
                  <label>Question2</label>
                  <Field
                    name="answer"
                    autoComplete="off"
                    title="Enter answer"
                  />
                </div>
                <div>
                  <label>Question3</label>
                  <Field
                    name="answer"
                    autoComplete="off"
                    title="Enter answer"
                  />
                </div>
                <div>
                  <label>Question4</label>
                  <Field
                    name="answer"
                    autoComplete="off"
                    title="Enter answer"
                  />
                </div>
                <div>
                  <label>Question5</label>
                  <Field
                    name="answer"
                    autoComplete="off"
                    title="Enter answer"
                  />
                </div>
                <div>
                  <label>Question6</label>
                  <Field
                    name="answer"
                    autoComplete="off"
                    title="Enter answer"
                  />
                </div>
                <div>
                  <label>Question5</label>
                  <Field
                    name="answer"
                    autoComplete="off"
                    title="Enter answer"
                  />
                </div>


              </div>
              <div className="sTemplate_footer flex justify-content-space-around align-items-center">
                <div className="flex justify-content-space-around">
                  <span onClick={() => history.push("/mock/template/interviewer/list")} title="Back to Interviewer List"><i className="fa fa-2x fa-hand-o-left" aria-hidden="true"></i></span>
                  <span><i className="fa fa-2x fa-pencil-square-o" aria-hidden="true"></i></span>
                  <span><i className="fa fa-2x fa-share-square-o" aria-hidden="true"></i></span>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default SharableTemplateForm;