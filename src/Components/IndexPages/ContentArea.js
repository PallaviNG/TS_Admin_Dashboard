import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAllTemplateFormsAction } from "../../redux/action/TemplateAction";
import { getTemplateList } from "./../../Service/templateService";
import { Link } from "react-router-dom";
import { getStudentList } from "../../Service/studentService";
import { saveAllMockStudentDetailsAction } from "../../redux/action/MockStudentAction";
import {
  getInterviewerDetailsByID,
  getInterviewerList,
} from "../../Service/interviewerService";
import { saveAllInterviewersAction } from "../../redux/action/InterviewerAction";
import { getBatchList } from "../../Service/batchService";
import { saveAllBatchDetailsAction } from "../../redux/action/BatchAction";
import NewYearPopup from "./../Event_Celebrations/NewYearPopup";
import { getMockFeedbackFormList } from "./../../Service/mockFeedbackService";
import { saveAllFeedbackFormsAction } from "./../../redux/action/MockFeedbackAction";
import { Chart } from "react-google-charts";
import NewMockPopup from "./../InterviewerComponents/NewMockPopup";

function ContentArea({ user,history }) {
  let templateForms = useSelector(
    (state) => state.templateDetails.templateList
  );
  let batchList = useSelector((state) => state.batchDetails.batches);
  let studentsList = useSelector((state) => state.studentDetails.students);
  let inetrviewersList = useSelector(
    (state) => state.template_interviewerDetails.interviewers
  );
  let dispatch = useDispatch();

  //Admin
  let [adminBarChart, setAdminBarChart] = useState([]);
  let [adminPieChart, setAdminPieChart] = useState([]);

  //Interviewer
  let [interviewerDetails, setInterviewerDetails] = useState({});
  let [interviewerTemplates, setInterviewerTemplates] = useState([]);
  let [interviewerBatches, setInterviewerBatches] = useState([]);
  let [feedbackFormsByInterviewer, setFeedbackFormsByInterviewer] = useState(
    []
  );
  let [mockPopup, setMockPopup] = useState(false);

  //Events
  let [newYear, setNewYear] = useState(false);

  let [studentID, setStudentID] = useState();
  let [mockSubmittedFormsByStudent, setMockSubmittedFormsByStudent] = useState(
    []
  );
  let [studentMockScores, setStudentMockScores] = useState([]);

  useEffect(() => {
    if (user.admin_role === "interviewer") {
      let _interviewerID = user.id;
      getInterviewerDetailsByID("get-interviewer-by-id", _interviewerID).then(
        (result) => {
          if (result === undefined) return false;
          interviewerDetails = result.interviewers[0];
          setInterviewerDetails({ ...interviewerDetails });
          interviewerBatches = [];
          if (interviewerDetails !== {}) {
            interviewerBatches = interviewerDetails.batches;
            setInterviewerBatches([...interviewerBatches]);
          }
          console.log(interviewerDetails.templateAssignmentFormsList);
          interviewerTemplates = interviewerDetails.templateAssignmentFormsList;
          setInterviewerTemplates([]);
          setInterviewerTemplates([...interviewerTemplates]);
        }
      );
    }
  }, [user.admin_role]);

  useEffect(() => {
    let today = new Date();
    newYear = today.getDate() === 1 && today.getMonth() === 0;
    setNewYear(newYear);
    if (user.admin_role === "admin") {
      getTemplateList("get-template-list").then((result) => {
        if (result === undefined) return false;
        dispatch(saveAllTemplateFormsAction(result.templateList));
      });

      getStudentList("get-student-list").then((result) => {
        if (result === undefined) return false;
        dispatch(saveAllMockStudentDetailsAction(result.studentList));
        let _students = result.studentList;
        adminBarChart = [];
        adminBarChart.push(["Student Name", "Mocks Attended"]);
        _students.forEach((student, index) => {
          adminBarChart.push([
            student.student_name,
            student.mock_submitted_count,
          ]);
        });
        setAdminBarChart([...adminBarChart]);
      });

      getInterviewerList("get-interviewer-list").then((result) => {
        if (result === undefined) return false;
        dispatch(saveAllInterviewersAction(result.interviewerList));
      });

      getBatchList("get-batch-list").then((result) => {
        if (result === undefined) return false;
        dispatch(saveAllBatchDetailsAction(result.batchList));
        console.log(result);
        let _batchList = result.batchList;
        console.log(_batchList);
        adminPieChart = [];
        adminPieChart.push(["Batch Name", "Number of Students"]);
        _batchList.forEach((batch) => {
          adminPieChart.push([batch.batch_name, batch.students.length]);
        });
        setAdminPieChart([...adminPieChart]);
      });
    } else if (user.admin_role === "student") {
      studentID = user.id;
      setStudentID(studentID);

      getMockFeedbackFormList("get-feedback-form-list").then((result) => {
        if (result === undefined) return false;
        let mockFeedbackFormsList = result.feedbackFormList;
        dispatch(saveAllFeedbackFormsAction(result.feedbackFormList));
        var mockSubmittedStudents = mockFeedbackFormsList.filter(
          (student) => student.student_details.student_id === studentID
        );

        mockSubmittedFormsByStudent = mockSubmittedStudents;
        setMockSubmittedFormsByStudent([...mockSubmittedFormsByStudent]);

        studentMockScores = [];
        studentMockScores.push(["count", "score"]);
        mockSubmittedFormsByStudent.forEach((element, index) => {
          console.log(index, element.feedBackForm[0].score_student);
          studentMockScores.push([
            index + 1,
            element.feedBackForm[0].score_student,
          ]);
        });
        setStudentMockScores([...studentMockScores]);
      });
    } else if (user.admin_role === "interviewer") {
      let interviewerID = user.id;
      getMockFeedbackFormList("get-feedback-form-list").then((result) => {
        if (result === undefined) return false;
        let _feedbackFormsList = result.feedbackFormList;
        feedbackFormsByInterviewer = _feedbackFormsList.filter(
          (feedbackForm) =>
            feedbackForm.interviewer_details.interviewer_id === interviewerID
        );
        setFeedbackFormsByInterviewer([]);
        setFeedbackFormsByInterviewer([...feedbackFormsByInterviewer]);
      });
    }
  }, []);

  return (
    <>
      <div className="content">
        <div className="formComponent flex content_area_cards justify-content-flex-start align-items-center">
          {
            <div>
              {newYear ? (
                <NewYearPopup open={newYear}>
                  <button
                    className="btn btn-danger"
                    onClick={() => setNewYear(false)}
                  >
                    X
                  </button>
                </NewYearPopup>
              ) : null}
            </div>
          }

          {(() => {
            switch (user.admin_role) {
              case "admin":
                return (
                  <div className="flex width-100 flex-direction-column align-items-center">
                    <div>Welcome, {user.admin_name}</div>
                    <div className="adminDetailsContainer">
                      <div className="main_page_cards template_cards">
                        <span className="mr-1 listCount">
                          {templateForms.length}{" "}
                        </span>
                        <Link
                          to="/mock/template/list"
                          title="Click to See Template List"
                        >
                          Templates
                        </Link>

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
                        <Link
                          to="/mock/template/interviewer/list"
                          title="Click to See Interviewer List"
                        >
                          Interviewers
                        </Link>
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
                        <span className="mr-1 listCount">
                          {batchList.length}{" "}
                        </span>
                        <Link to="/batch/list" title="Click to See Batch List">
                          Batches
                        </Link>
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
                        <span className="mr-1 listCount">
                          {studentsList.length}{" "}
                        </span>
                        <Link
                          to="/interviewer/batch/mock/feedback/form/list"
                          title="Click to See Student List"
                        >
                          Students
                        </Link>
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
                    <div className="adminPageCharts">
                      <div className="aBarChart">
                        <Chart
                          chartType={"Bar"}
                          data={adminBarChart}
                          width="100%"
                          height="12rem"
                          legendToggle
                        />
                      </div>
                      <div className="aPieChart">
                        <Chart
                          chartType={"PieChart"}
                          data={adminPieChart}
                          height="12rem"
                          width="100%"
                        />
                      </div>
                    </div>
                  </div>
                );

              case "interviewer":
                return (
                  <div className="flex width-100 flex-direction-column align-items-center ">
                    <div>Welcome, {user.admin_name}</div>
                    <div className="interviewerDetailsContainer">
                      <div className="main_page_cards batch_cards ">
                        <span className="mr-1 listCount">
                          {interviewerBatches.length}{" "}
                        </span>
                        <Link
                          to="/interviewer/login/batch/list"
                          title="Click to See Batch List"
                        >
                          Batches
                        </Link>
                        <Link to="/batch/new">
                          <span
                            className="main_page_cards_icon"
                            title="Add New Batch"
                          ></span>
                        </Link>
                      </div>
                      <div
                        className="main_page_cards mock_submitted_cards"
                        title="Mocks Conducted"
                      >
                        <span className="mr-1 listCount">
                          {feedbackFormsByInterviewer.length}{" "}
                        </span>
                        <Link
                          to="/interviewer/batch/mock/feedback/form/list"
                          title="Click to See Mocks Conducted"
                        >
                          Mocks
                        </Link>
                        <span
                          className="main_page_cards_icon"
                          title="Create New Template"
                          onClick={() => setMockPopup(true)}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </span>
                      </div>
                      {mockPopup ? (
                        <NewMockPopup
                          open={mockPopup}
                          user={user}
                          history={history}
                        >
                          <button
                            className="btn btn-danger"
                            onClick={() => setMockPopup(false)}
                          >
                            X
                          </button>
                        </NewMockPopup>
                      ) : null}


                      <div className="main_page_cards template_cards">
                        <span className="mr-1 listCount">
                          {interviewerTemplates.length}{" "}
                        </span>
                        <Link
                          to="/mock/template/list"
                          title="Click to See Template List"
                        >
                          Templates
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              case "student":
                return (
                  <div className="studentHomePageContainer flex flex-direction-column">
                    <div className="flex justify-content-center">
                      Welcome, {user.admin_name}
                    </div>
                    <div
                      className="main_page_cards mock_submitted_cards"
                      title="Mock Attended"
                    >
                      <span className="mr-1 listCount">
                        {mockSubmittedFormsByStudent.length}{" "}
                      </span>
                      <Link
                        to={`/students/feedback/${studentID}`}
                        title="Click to see mocks attended"
                      >
                        Mocks
                      </Link>
                    </div>

                    <div className="studentPageCharts mx-5">
                      <Chart
                        chartType={"Bar"}
                        data={studentMockScores}
                        width="80%"
                        height="12rem"
                        legendToggle
                        //   options = {chart: {
                        //     title: 'Mock Performance',
                        //     // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                        //   },
                        //   bars: 'horizontal'
                        // }
                      />
                    </div>
                  </div>
                );
            }
          })()}
        </div>
      </div>
    </>
  );
}

export default ContentArea;
