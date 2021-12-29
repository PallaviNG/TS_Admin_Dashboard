import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import React,{useEffect,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { addNewTrainerAction, saveAllTrainerDetailsAction } from "../../../redux/action/TrainerAction";
import { createNewTrainer, getTrainerList } from "../../../Service/trainerService";
import InputError from './../../InputError';


function NewTrainer({ history }) {
  let trainerList = useSelector((state) => state.trainerDetails.trainers);
  let dispatch = useDispatch();
  let initialValues = {
    trainer_name: "",
    phone_number: "",
    email_id: "",
    course_name: "",
    batch_name: "",
  };

  let validationSchema = yup.object().shape({
    trainer_name: yup.string().min(3,'Too Short name!').max(30,'Too Long name!').required("Trainer Name is required"),
    phone_number: yup.string().min(3,'Too Short name!').max(30,'Too Long name!').required("Phone number is required"),
    email_id: yup.string().required("Email id is required"),
    course_name: yup.string().min(3,'Too Short name!').max(30,'Too Long name!').required("Course name is required"),
    batch_name:yup.string().min(3,'Too Short name!').max(30,'Too Long name!').required("Batch name is required")
  });

  let onSubmit = (values, onSubmitProps) => {
    createNewTrainer("create-new-trainer", values).then((result) => {
      if (result === undefined) {
        toast.error("Unable to Create New Trainer");
      }
      dispatch(addNewTrainerAction(result.result));
      // history.replace("/trainer/list");
      onSubmitProps.resetForm();
    });
  };

  useEffect(() => {
    if (trainerList.length === 0) {
        getTrainerList("get-trainer-list").then((result) => {
          if (result === undefined) return false;
          dispatch(saveAllTrainerDetailsAction(result.trainerList));
        });
      }
  },[trainerList]);

  return (
    <div className="content">
      <div className="formComponent">
        <h4 className="text-align-center">Create New Trainer</h4>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form>
            <div className="form-group">
              <Field
                name="trainer_name"
                id="trainer_name"
                placeholder="Trainer Name"
              />
              <ErrorMessage name="trainer_name" className="error" component={InputError} />
            </div>
            <div className="form-group">
              <Field
                name="phone_number"
                id="phone_number"
                type="number"
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
                name="course_name"
                id="course_name"
                placeholder="Course Name"
              />
              <ErrorMessage name="course_name" className="error" component={InputError} />
            </div>
            <div className="form-group">
              <Field
                name="batch_name"
                id="batch_name"
                placeholder="Batch Name"
              />
              <ErrorMessage name="batch_name" className="error" component={InputError} />
            </div>
            <div className="form-buttons">
              <button type="submit">Save New Trainer</button>
              <button onClick={() => history.push("/trainer/list")}>
                View Trainer List
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div >
  );
}

export default NewTrainer;