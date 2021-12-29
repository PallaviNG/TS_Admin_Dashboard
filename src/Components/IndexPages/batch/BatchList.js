import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBatchList, removeBatch } from "./../../../Service/batchService";
import { deleteBatchAction, saveAllBatchDetailsAction } from "./../../../redux/action/BatchAction";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

function BatchList({ history }) {
  let batchList = useSelector((state) => state.batchDetails.batches);
  let dispatch = useDispatch();

  let deleteBatch = (index, _id) => {
    removeBatch("delete-batch-by-id", _id).then((result) => {
      if (
        result.status === true &&
        result.result.deletedCount === 1 &&
        result !== undefined
      ) {
        dispatch(deleteBatchAction(index));
      } else toast.error("Unable to delete batch");
    });
  };


  useEffect(() => {
    if (batchList.length === 0) {
      getBatchList("get-batch-list").then((result) => {
        if (result === undefined) return false;
        dispatch(saveAllBatchDetailsAction(result.batchList));
      });
    }
  }, []);

  return (
    <div className="content">
      <div className="formComponent">
        <h4 className="text-align-center">List of Batches
          <strong onClick={() => history.push("/batch/new")} title="Click to Add New Batch!" className="createIcon"><i className="fa fa-plus" aria-hidden="true"></i></strong>
        </h4>
        {batchList.length === 0 ? <>
          <div>No Batch Found!</div>
        </> :
          <>
            <div className="parent_card">
              {batchList.map((batch, index) => {
                return (
                  <div
                    className="card batch_card flex flex-direction-column"
                    key={index}
                  >
                    <Link to={`/single/batch/details/${batch._id}`}>
                      <p className="batch_details" title="Batch Name">
                        {batch.batch_name}
                      </p>
                      <p className="batch_details" title="Course Name">
                        {batch.course_name}
                      </p>
                      <p className="batch_details" title="Trainer ID">
                        {batch.batch_trainer.trainer_name}
                      </p>
                      <p className="batch_details" title="Number of Students">
                        {batch.students.length}
                      </p>
                    </Link>
                    <div className="batchListIcons flex justify-content-space-around align-items-center">
                      <span onClick={() => history.replace(`/batch/add/student/${batch._id}`)} title="Add New Student to Batch">
                        <i className="fa fa-user-plus info-color" aria-hidden="true"></i>
                      </span>
                      <span title="View Students">
                        <i className="fa fa-users success-color" aria-hidden="true"></i>
                      </span>
                      <span
                        className="edit" title="Edit"
                        onClick={() => {
                          history.push("/batch/edit/" + batch._id);
                        }}
                      >
                        <i className="fa fa-pencil-square inverse-color" aria-hidden="true"></i>
                      </span>
                      <span title="Delete" onClick={() => deleteBatch(index, batch._id)}>
                        <i className="fa fa-trash-o danger-color" aria-hidden="true"></i>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>}
      </div>
    </div>
  )
}

export default BatchList;
