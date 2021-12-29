import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewBatchAction } from "../../../redux/action/BatchAction";
import { createNewBatch } from "../../../Service/batchService";
import { toast } from "react-toastify";
import { getTrainerList } from "../../../Service/trainerService";
import { saveAllTrainerDetailsAction } from "../../../redux/action/TrainerAction";
import { getBatchList } from "./../../../Service/batchService";
import { saveAllBatchDetailsAction } from "./../../../redux/action/BatchAction";
import InputError from "./../../InputError";

function NewBatch({ history }) {
  let batchList = useSelector((state) => state.batchDetails.batches);
  let trainerList = useSelector((state) => state.trainerDetails.trainers);
  let dispatch = useDispatch();
  let initialValues = {
    batch_name: "",
    course_name: "",
    batch_trainer: {},
  };

  let [trainerID, setTrainerID] = useState([]);
  let [trainerOptions, setTrainerOptions] = useState([]);

  let onSubmit = (values, onSubmitProps) => {
    var trainerData = trainerOptions.filter((trainer)=>trainer.value===trainerID);    
    let newBatchDetails = {
      batch_name: values.batch_name,
      course_name: values.course_name,
      batch_trainer:{trainer_id:trainerData[0].value,trainer_name:trainerData[0].name},
      students: []
    };
    console.log(newBatchDetails);
    createNewBatch("create-new-batch", newBatchDetails).then((result) => {
      if (result === undefined) {
        toast.error("Unable to Create New Batch")
      }
      dispatch(addNewBatchAction(result.result));
      onSubmitProps.resetForm();
    });
  };

  let [extraRequestCall, setExtraRequestCall] = useState(false);

  useEffect(() => {
    getTrainerList("get-trainer-list").then((result) => {
      if (result === undefined) return false;
      let _trainerList = result.trainerList;

      trainerOptions = [];
      trainerOptions.push({ value: 0, name: "-Select Trainer" });

      if (_trainerList.length === 0)
        trainerOptions.push({ value: undefined, name: "No Trainer Found!" });
      else {
        console.log(_trainerList);
        _trainerList.forEach((trainer) => {
          trainerOptions.push({
            value: trainer._id,
            name: trainer.trainer_name,
          });
        });
      }

      setTrainerOptions([...trainerOptions]);
      dispatch(saveAllTrainerDetailsAction(result.trainerList));
      setExtraRequestCall(true);
    });
  }, []);

  let validationSchema = yup.object().shape({
    batch_name: yup.string().required("Batch name is required"),
    course_name: yup.string().required("Course Name is required"),
    batch_trainer: yup.object().required("Select Trainer"),
  });

  useEffect(() => {
      getBatchList("get-batch-list").then((result) => {
        if (result === undefined) return false;
        else {
          dispatch(saveAllBatchDetailsAction(result.batchList));
        }
      });
  }, []);

  useEffect(() => {
    if (extraRequestCall && trainerList.length === 0) {
      alert("Trainer list is empty");
      if (window.confirm("Do you want to add a trainer?"))
        history.push("/trainer/new");
      else history.replace("/trainer/list");
    }
  }, [extraRequestCall]);


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
              <ErrorMessage
                name="batch_name"
                className="error"
                component={InputError}
              />
            </div>
            <div className="form-group">
              <Field
                name="course_name"
                id="course_name"
                autoComplete="off"
                placeholder="Course Name"
              />
              <ErrorMessage
                name="course_name"
                className="error"
                component={InputError}
              />
            </div>

            <div className="form-group">
              <Field
                name="batch_trainer"
                as="select"
                onChange={(event) => setTrainerID(event.target.value)}
                value={trainerID}
                title="Trainer Name"
              >
                {trainerOptions.map((trainer, index) => (
                  <option key={index} value={trainer.value}>
                    {trainer.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="batch_trainer"
                className="error"
                component={InputError}
              />
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
    </div>
  );
}

export default NewBatch;
