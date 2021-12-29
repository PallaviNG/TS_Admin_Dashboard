import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { addNewMockStudentAction, saveAllMockStudentDetailsAction } from "../../redux/action/MockStudentAction";
import { getStudentList, createNewStudent } from './../../Service/studentService';
import InputError from './../InputError';


function AddMockStudent({ history }) {
  let studentList = useSelector((state) => state.studentDetails.students);

  let dispatch = useDispatch();
  let initialValues = {
    student_name: "",
    phone_number: "",
    email_id: "",
    fees_details: "",
  };
  
  let validationSchema = yup.object().shape({
    student_name: yup.string().required("Student Name is required"),
    phone_number: yup.number()
      .positive("A phone number can't start with a minus")
      .required("Phone number is required"),
    email_id: yup.string().required("Email id is required"),
    fees_details: yup.string().required(),
  });

  let onSubmit = (values, onSubmitProps) => {
    console.log(values);
    createNewStudent("create-new-student", values).then((result) => {
      if (result === undefined) {
        toast.error("Unable to Create New Student");
      }
      console.log(result);
      dispatch(addNewMockStudentAction(result.result));
      // history.replace("/mock/student/list");
      onSubmitProps.resetForm();
    });
  };
  
  useEffect(() => {
    if (studentList.length === 0) {
      getStudentList("get-student-list").then((result) => {
        if (result === undefined) return false;
        dispatch(saveAllMockStudentDetailsAction(result.studentList));
      });
    }
  }, []);


  return (
    <div className="content">
      <div className="formComponent">
        <h4 className="text-align-center">Create New Student</h4>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form>
            <div className="form-group">
              <Field
                name="student_name"
                id="student_name"
                autoComplete="off"
                placeholder="Student Name"
              />
              <ErrorMessage name="student_name" className="error" component={InputError} />
            </div>
            <div className="form-group">
              <Field
                name="phone_number"
                id="phone_number"
                type="number"
                autoComplete="off"
                placeholder="Phone Number"
              />
              <ErrorMessage name="phone_number" className="error" component={InputError} />
            </div>
            <div className="form-group">
              <Field
                name="email_id"
                id="email_id"
                type="email"
                placeholder="Email ID"
                className="text-transform-lowercase"
              />
              <ErrorMessage name="email_id" className="error" component={InputError} />
            </div>

            <div className="form-group">
              <Field
                name="fees_details"
                id="fees_details"
                placeholder="Fees Details"
              />
              <ErrorMessage name="fees_details" className="error" component={InputError} />
            </div>
            <div className="form-buttons">
              <button type="submit">Add New Student</button>
              <button onClick={() => history.push("/mock/student/list")}>
                View Student List
              </button>
              <button onClick={() => history.push("/batch/list")}>
                Batch List
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div >
  );
}

export default AddMockStudent;