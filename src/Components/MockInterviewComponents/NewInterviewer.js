import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { batch, useDispatch, useSelector } from "react-redux";
import { addNewInterviewerAction } from './../../redux/action/InterviewerAction';
import { createNewInterviewer } from "../../Service/interviewerService";
import { getBatchList } from "../../Service/batchService";
import { saveAllBatchDetailsAction } from "../../redux/action/BatchAction";


function NewInterviewer({ history }) {
  let batchList = useSelector((state) => state.batchDetails.batches);
  let dispatch = useDispatch();
  let initialValues = {
    interviewer_name: "",
    email_id: "",
    batch_id: "",
    batch_name: "",
    templateAssignmentFormsList: []
  };

  let [batchID, setBatchID] = useState("");
  let [batchNAME, setBatchNAME] = useState("");

  let [batchOptions, setBatchOptions] = useState([]);

  useEffect(() => {
    getBatchList("get-batch-list").then((result) => {
      if (result === undefined) return false;
      dispatch(saveAllBatchDetailsAction(result.batchList));
      batchOptions = [];
      batchOptions.push({ value: 0, name: "-Select Batch-" });
      if (batchList.length === 0)
        batchOptions.push({ value: undefined, name: "No Batch found!" });
      else {
        batchList.forEach((batch) => {
          batchOptions.push({
            value: batch._id,
            name: batch.batch_name,
          });
        });
      }
      setBatchOptions([]);
      setBatchOptions([...batchOptions]);
    });
  }, []);

  let onSubmit = (values, onSubmitProps) => {
    console.log(values);
    var sendData = {
      interviewer_name: values.interviewer_name,
      email_id: values.email_id,
      phone_number: values.phone_number,
      batch_id: batchID,
      batch_name: batchNAME,
      templateAssignmentForms: [],
    };

    createNewInterviewer("create-new-interviewer", sendData).then((result) => {
      if (result === undefined) return false;
      dispatch(addNewInterviewerAction(result.result));
      history.push("/mock/template/interviewer/list");
      onSubmitProps.resetForm();
    });
  };

  let changeBatchName = (event) => {
    console.log(event.target.value);
    setBatchID(event.target.value);
    let _batchID = event.target.value;
    console.log(_batchID);
    var singleBatchOption = batchOptions.filter(
      (batch) => batch.value === _batchID
    );

    if (singleBatchOption.length > 0) {
      console.log(singleBatchOption[0].name);
      setBatchNAME('');
      setBatchNAME(singleBatchOption[0].name);
    }
  }

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

            <div className="form-group">
              <Field
                name="batch_id"
                as="select"
                title="Batch ID"
                onChange={(event) => {
                  setBatchID(event.target.value);
                  changeBatchName(event);
                }}
                value={batchID}
              >
                {batchOptions.map((batch, index) => (
                  <option key={index} value={batch.value}>
                    {batch.name}
                  </option>
                ))}
              </Field>
            </div>

            <Field
              name="batch_name"
              readOnly
              type="hidden"
              // className="setInvisible"
              placeholder="Batch Name"
              value={batchNAME}
            />

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