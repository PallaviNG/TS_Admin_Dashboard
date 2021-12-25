import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateBatch } from "./../../../Service/batchService";

function EditBatch({ match, history }) {
  let allBatch = useSelector((state) => state.batchDetails.batches);
  let [initialValues, setInitialValues] = useState({
    batch_name: "",
    course_name: "",
    trainer_name: "",
    trainer_id: "",
    no_of_students: "",
    _id: "",
  });

  let onSubmit = (values, onSubmitProps) => {
    console.log(values);
    updateBatch("update-batch-details", values).then((result) => {
      if (result === undefined && result.result.modifiedCount === 0 && result.status === true ) return false;
      history.replace("/batch/list");
    });
  };

  useEffect(() => {
    var singleBatchDetails = allBatch.filter(
      (batch) => batch._id === match.params.id
    );
    if (singleBatchDetails.length === 0) {
      toast.error("Batch Not Found");
      history.replace("/batch/list");
    } else {
      setInitialValues(singleBatchDetails[0]);
    }
  },  []);
  return (
    <div className="content">
      <div className="formComponent">
        <h4 className="text-align-center">Edit Batch Details</h4>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize
        >
          <Form>
            <div className="form-group">
              <Field
                name="batch_name"
                id="batch_name"
                title="Batch Name"
                placeholder="Batch Name"
              />
            </div>
            <div className="form-group">
              <Field
                name="course_name"
                id="course_name"
                title="Course Name"
                placeholder="Course Name"
              />
            </div>
            {/* <div className="form-group">
              <Field
                name="trainer_name"
                id="trainer_name"
                title="Trainer Name"
                placeholder="Trainer Name"
              />
            </div> */}

            <div className="form-group">
              <Field
                name="no_of_students"
                id="no_of_students"
                title="Number of Students"
                placeholder="Number of Students"
              />
            </div>

            <div className="form-group">
              <Field
                name="_id"
                id="_id"
                readOnly
                title="Batch ID"
                placeholder="Batch ID"
              />
            </div>
            
            <div className="form-buttons">
              <button type="submit">Update Batch</button>
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

export default EditBatch;