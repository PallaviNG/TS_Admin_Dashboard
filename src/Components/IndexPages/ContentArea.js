import template_icon from "../../assets/images/MainPageIcons/templates.png";
import interviewer_icon from "../../assets/images/MainPageIcons/interviewers.png";
import student_icon from "../../assets/images/MainPageIcons/students.png";
import submitted_icon from "../../assets/images/MainPageIcons/submitted.png";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAllTemplateFormsAction } from "../../redux/action/TemplateAction";
import { getTemplateList } from "./../../Service/templateService";
import { Link } from "react-router-dom";
import { getStudentList } from "../../Service/studentService";
import { saveAllMockStudentDetailsAction } from "../../redux/action/MockStudentAction";
import { getInterviewerList } from "../../Service/interviewerService";
import { saveAllInterviewersAction } from "../../redux/action/InterviewerAction";

function ContentArea() {
  let templateForms = useSelector(
    (state) => state.templateDetails.templateList
  );
  let studentsList = useSelector((state) => state.studentDetails.students);
  let inetrviewersList = useSelector(
    (state) => state.template_interviewerDetails.interviewers
  );
  let dispatch = useDispatch();

  useEffect(() => {
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
  }, []);

  return (
    <>
      <div className="content">
        <div className="formComponent flex content_area_cards justify-content-flex-start align-items-center">
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
            <Link to="/mock/student/new">
              <span
                className="main_page_cards_icon"
                title="Add New Interviewer"
              >
                <i className="fa fa-plus" aria-hidden="true"></i>
              </span>
            </Link>
          </div>
          <div className="main_page_cards student_cards">
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
      </div>
    </>
  );
}

export default ContentArea;
