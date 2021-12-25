import { Field, Form, Formik,ErrorMessage } from "formik";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateTrainer } from "../../../Service/trainerService";
import InputError from './../../InputError';

function EditTrainer({ match, history }) {
  let trainerList = useSelector((state) => state.trainerDetails.trainers);
  let [initialValues, setInitialValues] = useState({
    trainer_name: "",
    phone_number: "",
    email_id: "",
    course_name: "",
    batch_name: "",
    id:""
  });

  let validationSchema = yup.object().shape({
    trainer_name: yup.string().min(3,'Too Short name!').max(30,'Too Long name!').required("Trainer Name is required"),
    phone_number: yup.string().min(3,'Too Short name!').max(30,'Too Long name!').required("Phone number is required"),
    email_id: yup.string().required("Email id is required"),
    course_name: yup.string().min(3,'Too Short name!').max(30,'Too Long name!').required("Course name is required"),
    batch_name:yup.string().min(3,'Too Short name!').max(30,'Too Long name!').required("Batch name is required")
  });

  let onSubmit = (values, onSubmitProps) => {
    console.log(values);
    updateTrainer("update-trainer-details", values).then((result) => {
      if (result === undefined && result.result.modifiedCount === 0 && result.status === true ) return false;
      history.replace("/trainer/list");
    });
    onSubmitProps.resetForm();
  };

  useEffect(() => {
    var singleTrainerDetails = trainerList.filter(
      (trainer) => trainer._id === match.params.id
    );
    if (singleTrainerDetails.length === 0) {
      toast.error("Trainer Not Found");
      history.replace("/trainer/list");
    } else {
      setInitialValues(singleTrainerDetails[0]);
    }
  },  []);
  return (
    <div className="content">
      <div className="formComponent">
        <h4 className="text-align-center">Edit Batch Details</h4>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form>
            <div className="form-group">
              <Field
                name="trainer_name"
                id="trainer_name"
                title="Trainer Name"
                placeholder="Trainer Name"
              />
              <ErrorMessage name="trainer_name" className="error" component={InputError} />
            </div>
            <div className="form-group">
              <Field
                name="phone_number"
                id="phone_number"
                title="Phone Number"
                placeholder="Phone Number"
              />
              <ErrorMessage name="phone_number" className="error" component={InputError} />
            </div>
            <div className="form-group">
              <Field
                name="email_id"
                id="email_id"
                title="Email ID"
                placeholder="Email ID"
              />
              <ErrorMessage name="email_id" className="error" component={InputError} />
            </div>

            <div className="form-group">
              <Field
                name="course_name"
                id="course_name"
                title="Course Name"
                placeholder="Course Name"
                />
              <ErrorMessage name="course_name" className="error" component={InputError} />
            </div>
            <div className="form-group">
              <Field
                name="batch_name"
                id="batch_name"
                title="Batch Name"
                placeholder="Batch Name"
              />
              <ErrorMessage name="batch_name" className="error" component={InputError} />
            </div>
            <div className="form-group">
              <Field
                name="_id"
                id="_id"
                readOnly
                title="Trainer ID"
                placeholder="Trainer ID"
              />
            </div>
            
            <div className="form-buttons">
              <button type="submit">Update Trainer</button>
              <button onClick={() => history.push("/trainer/list")}>
                View Trainer List
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default EditTrainer;