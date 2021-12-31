import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { saveAllBatchDetailsAction } from "../../../redux/action/BatchAction";
import { getBatchList } from "./../../../Service/batchService";
import { Link } from "react-router-dom";

function BatchDetails({ history, match }) {
  let batchList = useSelector((state) => state.batchDetails.batches);

  let [initialValues, setInitialValues] = useState({
    batch_name: "",
    students: [],
  });

  let [batches, setBatches] = useState([]);
  let dispatch = useDispatch();

  useEffect(() => {
    getBatchList("get-batch-list").then((result) => {
      if (result === undefined) return false;
      // console.log(result);
      batches = [];
      batches = result.batchList;
      // console.log(batches);
      setBatches([...batches]);
      dispatch(saveAllBatchDetailsAction(result.batchList));

      if (batches.length > 0) {
        var singleBatchDetails = batches.filter(
          (batch) => batch._id === match.params.id
        );
        // console.log(singleBatchDetails);
        if (singleBatchDetails.length === 0) {
          toast.error("No Batch Found");
          history.replace("/batch/list");
        } else {
          setInitialValues({ ...initialValues });
          initialValues = singleBatchDetails[0];
          setInitialValues({ ...initialValues });
        }
      }
    });
  }, []);

  return (
    <div className="content">
      <div className="formComponent singleBatchParentContainer flex flex-direction-column align-items-center justify-content-center">
        <h4 className="text-align-center">Batch Details</h4>

        <div className="singleBatchContainer flex justify-content-center align-items-center flex-direction-column">
          <p className="batch_information">
            <label>Batch Name:</label>
            {initialValues.batch_name}
          </p>
          <p className="batch_information">
            <label>Course Name:</label>
            {initialValues.course_name}
          </p>
          <p className="mxy-1">Student Details</p>
          <div className="studentContainer ">

            {initialValues.students.length===0 ?<div>No Student Added</div>:
            initialValues.students.map((student, sIndex) => {
              return (
                <div key={sIndex}>
                  <Link
                    className="primary-color px-2"
                    to={`/single/student/details/${student._id}`}
                    title="Click to view Student Details"
                  >
                    <p className="my-1 mxy-2"><span className="pl-1">{sIndex + 1}
                    </span>{student.student_name}</p>
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="batch_information">
            <label>No. of Students:</label>
            {initialValues.students.length}
          </p>
        </div>
        {/* 
        <div className="titleComponent dc TextStyle">
          <p className="template_form_details" title="Template Title" >
            {initialValues.template_title}
          </p>
        </div>

        <div className="template_form_question_answer_details" title="Question Answer Set">
          {initialValues.questionSets.map((questionSet, qIndex) => {
            return (<div className="questionSetCard" key={qIndex}>
              <p className="question_answer_set_details" title="Question">
                {qIndex + 1} {questionSet.question}
              </p>
              <p className="question_answer_set_details" title="Answer">
                {questionSet.answer}
              </p>
            </div>)
          })
          }
        </div> */}
        {/* <div className="count_details">No. of Questions: {initialValues.questionSets.length}</div> */}
        <div className="form-buttons">
          <button onClick={() => history.push("/batch/list")}>
            <span className="backIcon">
              <i className="fa fa-hand-o-left" aria-hidden="true"></i>{" "}
            </span>{" "}
            Batch List
          </button>
          <button onClick={() => history.push("/mock/student/list")}>
            <span className="backIcon">
              <i className="fa fa-hand-o-left" aria-hidden="true"></i>{" "}
            </span>{" "}
            Student List
          </button>
        </div>
      </div>
    </div>
  );
}

export default BatchDetails;
