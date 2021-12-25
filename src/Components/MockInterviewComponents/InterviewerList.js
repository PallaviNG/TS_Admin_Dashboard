import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getInterviewerList,
  removeInterviewer,
} from "./../../Service/interviewerService";
import {
  deleteInterviewerAction,
  saveAllInterviewersAction,
} from "../../redux/action/InterviewerAction";

function InterviewerList({ history }) {
  let interviewerList = useSelector(
    (state) => state.template_interviewerDetails.interviewers
  );
  let dispatch = useDispatch();

  let deleteInterviewer = (index, _id) => {
    removeInterviewer("delete-interviewer-by-id", _id).then((result) => {
      if (
        result.status === true &&
        result.result.deletedCount === 1 &&
        result !== undefined
      ) {
        dispatch(deleteInterviewerAction(index));
        history.push("/mock/template/interviewer/list");
      } else toast.error("Unable to delete Interviewer");
    });
  };

  useEffect(() => {
    getInterviewerList("get-interviewer-list").then((result) => {
      if (result === undefined) return false;
      dispatch(saveAllInterviewersAction(result.interviewerList));
    });
  }, []);

  return (
    <div className="content">
      <div className="formComponent">
        <h4 className="text-align-center">List of Interviewers
        <strong onClick={() => history.push("/mock/template/interviewer/new")} title="Click to Add New Interviewer!" className="createIcon"><i className="fa fa-plus" aria-hidden="true"></i></strong>
        </h4>
        {interviewerList.length === 0 ? <div>No Interviewers Found</div> 
          :
          <>
            <div className=" flex flex-wrap align-items-center justify-content-center">
              {interviewerList.map((interviewer, index) => {
                return (
                  <div
                    className="card interviewer_card flex flex-direction-column justify-content-center"
                    key={index}
                  >
                    <Link to={`/mock/template/interviewer/detail/${interviewer._id}`}>
                      <p className="interviewer_details" title="Interviewer Name">
                        {interviewer.interviewer_name}
                      </p>

                      <p className="interviewer_details" title="Email ID">
                        {interviewer.email_id}
                      </p>

                      <p className="interviewer_details" title="Phone Number">
                        {interviewer.phone_number}
                      </p>
                    </Link>
                    <div
                      className="interviewerTemplatesCardContainer"
                      title="Template Set"
                    >
                      {(interviewer.templateAssignmentFormsList.length === 0) ?
                        <div className="interviewerTemplateCard mxy-1">
                          No Templates Assigned</div> :
                        interviewer.templateAssignmentFormsList.map(
                          (template, tIndex) => {
                            return (
                              <div className="interviewerTemplateCard" key={tIndex}>
                                <p
                                  className="interviewer_template_details flex align-content-center"
                                  title="Template Name"
                                >
                                  <Link to={`/mock/single/template/detail/${template._id}`}>
                                    {tIndex + 1} {template.template_title}
                                  </Link>
                                </p>
                              </div>
                            );
                          }
                        )}
                    </div>

                    <div className="templateIcons">
                      <span
                        className="assignIcon"
                        onClick={() =>
                          history.push("/mock/template/interviewer/new")
                        }
                        title="Back to Create New Interviewer"
                      >
                        <i
                          className="fa fa-2x fa-arrow-circle-o-left"
                          aria-hidden="true"
                        ></i>
                      </span>

                      <span className="assignIcon"
                        onClick={() => history.push("/mock/template/list") }
                        title="Back to Template List">
                        <i className="fa fa-2x fa-list-alt" aria-hidden="true"></i>
                      </span>

                      <span
                        className="deleteIcon"
                        onClick={() => deleteInterviewer(index, interviewer._id)}
                        title="Delete Interviewer">
                        <i className="fa fa-2x fa-trash" aria-hidden="true"></i>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>}
      </div>
    </div>
  );
}

export default InterviewerList;
