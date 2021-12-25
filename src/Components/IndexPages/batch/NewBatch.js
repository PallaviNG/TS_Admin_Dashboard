import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewBatchAction } from "../../../redux/action/BatchAction";
import { createNewBatch } from "../../../Service/batchService";
import { toast } from 'react-toastify';
import { getTrainerList } from "../../../Service/trainerService";
import { saveAllTrainerDetailsAction } from "../../../redux/action/TrainerAction";
import { getBatchList } from './../../../Service/batchService';
import { saveAllBatchDetailsAction } from './../../../redux/action/BatchAction';
import InputError from './../../InputError';

function NewBatch({ history }) {
  let batchList = useSelector((state) => state.batchDetails.batches);
  let trainerList = useSelector((state) => state.trainerDetails.trainers);
  let dispatch = useDispatch();
  let initialValues = {
    batch_name: "",
    course_name: "",
    trainer_id: "",
    no_of_students: "",
  };



  let [trainerID, setTrainerID] = useState([]);
  let [trainerOptions, setTrainerOptions] = useState([]);

  let onSubmit = (values, onSubmitProps) => {
    console.log(values);
    createNewBatch("create-new-batch", values).then((result) => {
      if (result === undefined) {
        toast.error("Unable to Create New Batch")
      }
      dispatch(addNewBatchAction(result.result));
      // history.push("/batch/list");
      onSubmitProps.resetForm();
    });
  };

  let [extraRequestCall, setExtraRequestCall] = useState(false);

  useEffect(() => {
    if (trainerList.length === 0) {
      getTrainerList("get-trainer-list").then((result) => {
        if (result === undefined) return false;
        let _trainerList = result.trainerList;

        trainerID = [];
        trainerID.push({value:0,name:'-Select Trainer-'});
        _trainerList.forEach(trainer => {
          trainerID.push({ value: trainer._id, name: trainer.trainer_name });
        });
        console.log(trainerID);
        setTrainerID([...trainerID]);

        dispatch(saveAllTrainerDetailsAction(result.trainerList));
        setExtraRequestCall(true);
      });
    }
  }, [trainerList, trainerID]);

  useEffect(() => {

    let trainerOptions = [...trainerID];
    setTrainerOptions([...trainerOptions]);
  }, [trainerID]);


  let validationSchema = yup.object().shape({
    batch_name: yup.string().required("Batch name is required"),
    course_name: yup.string().required("Course Name is required"),
    trainer_id: yup.string().required("Select Trainer"),
    no_of_students: yup.number().required("Input number of students")
  });


  useEffect(() => {
    if (batchList.length !== 0) {
      getBatchList("get-batch-list").then((result) => {
        if (result === undefined) return false;
        else {
          dispatch(saveAllBatchDetailsAction(result.batchList));
        }
      });
    }
  }, [batchList]);


  useEffect(() => {
    if (extraRequestCall && trainerList.length === 0) {
      alert('Trainer list is empty');
      if (window.confirm("Do you want to add a trainer?"))
        history.push("/trainer/new");
      else history.replace("/trainer/list");
    }
  }, [extraRequestCall])

  return (
    <div className="content">
      <div className="formComponent">
        <h4 className="text-align-center">Create New Batch</h4>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form>
            <div className="form-group">
              <Field
                name="batch_name"
                id="batch_name"
                autoComplete="off"
                placeholder="Batch Name"
              />
              <ErrorMessage name="batch_name" className="error" component={InputError} />
            </div>
            <div className="form-group">
              <Field
                name="course_name"
                id="course_name"
                autoComplete="off"
                placeholder="Course Name"
              />
              <ErrorMessage name="course_name" className="error" component={InputError} />
            </div>

            <div className="form-group">
              <Field name="trainer_id" as="select" title="ID - Trainer Name">
                {trainerOptions.map((trainer, index) =>
                  <option key={index}
                    value={trainer.value}>{trainer.name}</option>
                )}
              </Field>
              <ErrorMessage name="trainer_id" className="error" component={InputError} />
            </div>

            {/* <div className="form-group">
              <Field name="trainer_id" as="select" title="ID - Trainer Name">
                {trainerOptions.map((trainer, index) =>
                  <option key={index}
                    value={trainer.value}>{trainer.name}</option>
                )}
              </Field>
              <ErrorMessage name="trainer_id" className="error" component={InputError} />
            </div>
           */}

            <div className="form-group">
              <Field
                name="no_of_students"
                id="no_of_students"
                type="number"
                autoComplete="off"
                placeholder="Number of Students"
              />
              <ErrorMessage name="trainer_id" className="error" component={InputError} />
            </div>
            <div className="form-buttons">
              <button type="submit">Save New Batch</button>
              <button onClick={() => history.push("/batch/list")}>
                View Batch List
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div >
  );
}

export default NewBatch;