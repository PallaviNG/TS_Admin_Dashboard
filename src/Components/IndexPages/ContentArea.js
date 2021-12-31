import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAllTemplateFormsAction } from "../../redux/action/TemplateAction";
import { getTemplateList } from "./../../Service/templateService";
import { Link } from "react-router-dom";
import { getStudentList } from "../../Service/studentService";
import { saveAllMockStudentDetailsAction } from "../../redux/action/MockStudentAction";
import { getInterviewerDetailsByID, getInterviewerList } from "../../Service/interviewerService";
import { saveAllInterviewersAction } from "../../redux/action/InterviewerAction";
import { getBatchList } from "../../Service/batchService";
import { saveAllBatchDetailsAction } from "../../redux/action/BatchAction";

function ContentArea({ user }) {
  let templateForms = useSelector(
    (state) => state.templateDetails.templateList
  );
  let batchList = useSelector((state) => state.batchDetails.batches);
  let studentsList = useSelector((state) => state.studentDetails.students);
  let inetrviewersList = useSelector(
    (state) => state.template_interviewerDetails.interviewers
  );
  let dispatch = useDispatch();

  // console.log(user);

  let [interviewerDetails, setInterviewerDetails] = useState({});
  let [interviewerBatches, setInterviewerBatches] = useState([]);

  useEffect(() => {
    if (user.admin_role === "interviewer") {
      // console.log("Interviewer");
      let _interviewerID = user.id;
      getInterviewerDetailsByID("get-interviewer-by-id", _interviewerID).then((result) => {
        if (result === undefined) return false;
        interviewerDetails = result.interviewers[0];
        setInterviewerDetails({ ...interviewerDetails });
        // console.log(interviewerDetails);
        interviewerBatches = [];
        if (interviewerDetails !== {}) {
          interviewerBatches = interviewerDetails.batches;
          setInterviewerBatches([...interviewerBatches]);
        }
      });
      // console.log(interviewerBatches);
      // console.log(interviewerDetails);
    }
  }, [user.admin_role]);

  useEffect(() => {
    console.log(user.admin_role);
    if (user.admin_role === "admin") {
      getTemplateList("get-template-list").then((result) => {
        if (result === undefined) return false;
        dispatch(saveAllTemplateFormsAction(result.templateList));
      });

      getStudentList("get-student-list").then((result) => {
        if (result === undefined) return false;
        dispatch(saveAllMockStudentDetailsAction(result.studentList));
      });

      getInterviewerList("get-interviewer-list").then((result) => {
        if (result === undefined) return false;
        dispatch(saveAllInterviewersAction(result.interviewerList));
      });

      getBatchList("get-batch-list").then((result) => {
        if (result === undefined) return false;
        dispatch(saveAllBatchDetailsAction(result.batchList));
      });
    }
  }, []);

  return (
    <>
      <div className="content">
        <div className="formComponent flex content_area_cards justify-content-flex-start align-items-center">

          {/* {user.admin_role === "admin" ?  */}

          {(() => {
            switch (user.admin_role) {
              case "admin":
                return (
                  <div className="flex width-100 flex-direction-column align-items-center">
                    <div>Welcome, {user.admin_name}</div>
                    <div className="adminDetailsContainer">
                      <div className="main_page_cards template_cards">
                        <span className="mr-1 listCount">{templateForms.length} </span>
                        <Link to="/mock/template/list" title="Click to See Template List">Templates</Link>

                        <Link to="/mock/template/new">
                          <span
                            className="main_page_cards_icon"
                            title="Create New Template"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </span>
                        </Link>
                      </div>
                      <div className="main_page_cards interviewers_cards">
                        <span className="mr-1 listCount">
                          {inetrviewersList.length}
                        </span>
                        <Link to="/mock/template/interviewer/list" title="Click to See Interviewer List">Interviewers</Link>
                        <Link to="/mock/template/interviewer/new">
                          <span
                            className="main_page_cards_icon"
                            title="Add New Interviewer"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </span>
                        </Link>
                      </div>

                      <div className="main_page_cards batch_cards">
                        <span className="mr-1 listCount">{batchList.length} </span>
                        <Link to="/batch/list" title="Click to See Batch List">Batches</Link>
                        <Link to="/batch/new">
                          <span
                            className="main_page_cards_icon"
                            title="Add New Batch"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </span>
                        </Link>
                      </div>

                      <div className="main_page_cards mock_submitted_cards">
                        <span className="mr-1 listCount">{studentsList.length} </span>
                        <Link to="/mock/student/list" title="Click to See Student List">Students</Link>
                        <Link to="/mock/student/new">
                          <span
                            className="main_page_cards_icon"
                            title="Add New Student for Mock"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </span>
                        </Link>
                      </div>
                    </div>


                  </div>);

              case "interviewer":
                return (
                  <div className="interviewerDetailsContainer flex flex-direction-column">

                    <div className="flex justify-content-center">Welcome {user.admin_name}</div>
                    <div className="main_page_cards batch_cards ">
                      <span className="mr-1 listCount">{interviewerBatches.length} </span>
                      <Link to="/interviewer/login/batch/list" title="Click to See Batch List">Batches</Link>
                      <Link to="/batch/new">
                        <span
                          className="main_page_cards_icon"
                          title="Add New Batch"
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                );
            }
          })()}


          {/* : null

          } */}

          {/* {
            user.admin_role === "interviewer" ?
              <div className="interviewerDetailsContainer flex flex-direction-column">

                <div className="flex justify-content-center">Welcome {user.admin_name}</div>
                <div className="main_page_cards batch_cards ">
                  <span className="mr-1 listCount">{interviewerBatches.length} </span>
                  <Link to="/batch/list" title="Click to See Batch List">Batches</Link>
                  <Link to="/batch/new">
                    <span
                      className="main_page_cards_icon"
                      title="Add New Batch"
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </span>
                  </Link>
                </div>
              </div>
              : null

          } */}

        </div>
      </div>
    </>
  );
}

export default ContentArea;
