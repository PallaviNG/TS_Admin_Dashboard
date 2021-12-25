import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { addNewInterviewerAction } from './../../redux/action/InterviewerAction';
import { createNewInterviewer } from "../../Service/interviewerService";


function NewInterviewer({ history }) {
  let dispatch = useDispatch();
  let initialValues = {
    interviewer_name: "",
    email_id: "",
    templateAssignmentFormsList: []
  };


  let onSubmit = (values, onSubmitProps) => {
    console.log(values);
    var sendData = {
      interviewer_name: values.interviewer_name,
      email_id: values.email_id,
      phone_number: values.phone_number,
      templateAssignmentForms: [],
    };

    createNewInterviewer("create-new-interviewer", sendData).then((result) => {
      if (result === undefined) return false;
      dispatch(addNewInterviewerAction(result.result));
      history.push("/mock/template/interviewer/list");
      onSubmitProps.resetForm();
    });
  };

  return (
    <div className="content">
      <div className="formComponent">
        <h4 className="text-align-center">Create New Interviewer</h4>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize
        >
          <Form>
            <div className="form-group">
              <Field
                name="interviewer_name"
                autoComplete="off"
                placeholder="Interviewer Name"
              />
            </div>

            <div className="form-group">
              <Field
                name="email_id"
                type="email"
                autoComplete="off"
                placeholder="Email ID"
                className="text-transform-lowercase"
              />
            </div>

            <div className="form-group">
              <Field
                name="phone_number"
                type="number"
                autoComplete="off"
                placeholder="Phone Number"
              />
            </div>

            <div className="form-buttons">
              <button type="submit">SAVE</button>
              <button onClick={() => history.push("/mock/template/interviewer/list")}>
                View Interviewer List
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default NewInterviewer;