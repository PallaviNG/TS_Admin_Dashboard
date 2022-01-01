import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getInterviewerDetailsByID } from "../../Service/interviewerService";
import { saveAllInterviewer_BatchDetailsAction } from './../../redux/action/Interviewer_BatchAction';

function Interviewer_BatchList({ history, user }) {
  let interviewer_batchList = useSelector((state) => state.interviewer_batchListDetails.interviewer_batches);
  let dispatch = useDispatch();

  let [interviewerDetails, setInterviewerDetails] = useState({});

  let [interviewerBatchListDetails, setInterviewerBatchListDetails] = useState([]);
  useEffect(() => {
    // console.log(user);
    getInterviewerDetailsByID("get-interviewer-by-id", user.id).then((result) => {
      if (result === undefined) return false;
      // console.log(result);
      setInterviewerDetails({ ...interviewerDetails });
      interviewerDetails = result.interviewers[0];
      setInterviewerDetails({ ...interviewerDetails });
      setInterviewerBatchListDetails([...interviewerBatchListDetails]);
      interviewerBatchListDetails = interviewerDetails.batches;
      setInterviewerBatchListDetails([...interviewerBatchListDetails]);
      dispatch(saveAllInterviewer_BatchDetailsAction(interviewerBatchListDetails));
      // console.log(interviewer_batchList);
    });

  }, []);


  return (
    <div className="content">
      <div className="formComponent">
        <h4 className="text-align-center">List of Batches</h4>
        {interviewer_batchList.length === 0 ? <>
          <div>No Batch Found!</div>
        </> :
          <>
            <div className="parent_card">
              {interviewer_batchList.map((batch, index) => {
                return (
                  <div
                    className="card batch_card interviewer_batch_card flex flex-direction-column"
                    key={index}
                  >
                    <Link to={`/single/batch/details/${batch.batch_id}`}>
                      <p className="batch_details" title="Batch Name">
                        {batch.batch_name}
                      </p>
                    </Link>
                    <div className="batchListIcons flex justify-content-space-around align-items-center">
                      <span onClick={() => history.replace(`/batch/add/student/${batch.batch_id}`)} title="Add New Student to Batch">
                        <i className="fa fa-user-plus info-color" aria-hidden="true"></i>
                      </span>
                      <span title="View Students">
                        <i className="fa fa-users success-color" aria-hidden="true"></i>
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

export default Interviewer_BatchList;
