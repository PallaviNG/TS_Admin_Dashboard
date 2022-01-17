import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { getMockFeedbackFormDetailsByStudent, getMockFeedbackFormListByStudent } from './../../Service/mockFeedbackService';
import { getStudentByID, getStudentList } from './../../Service/studentService';
import { Link } from 'react-router-dom';

function StudentMockFeedback({ history, user, match }) {

  let [feedbackFormsByStudent, setFeedbackFormsByStudent] = useState([]);

  // let [studentNAME,setStudentNAME]= useState();

  useEffect(() => {
    console.log(match.params.id);
    let sendData = { student_id: match.params.id };
    if (user.admin_role === 'admin' ||user.admin_role==='student') {
      getMockFeedbackFormDetailsByStudent("get-feedback-form-details-by-student-id", sendData).then(
        (result) => {
          if (result === undefined) return false;
          console.log(result.feedbackFormList);
          setFeedbackFormsByStudent([]);
          feedbackFormsByStudent = result.feedbackFormList;
          setFeedbackFormsByStudent([...feedbackFormsByStudent]);
        });
    }
  }, []);


  useEffect(() => {
    console.log(feedbackFormsByStudent);
  }, [feedbackFormsByStudent]);

  return (
    <div className="content">
      <div className="formComponent">
        <h4 className="text-align-center">List of Feedback Forms</h4>
        {
          (feedbackFormsByStudent.length === 0) ?
            <>
              <div>No Data Found!</div>
            </>
            :
            <>
              <div className="parent_feedback_list_container">
                {/* <h4>Viewing Details for </h4> */}
                {feedbackFormsByStudent.map((feedback, index) => {
                  return (
                    <div className="feedbackListContainer smContainer card border" key={index}>
                      <div className="fbContent">

                        <p className="feedbackListDetails">Student Name: {feedback.student_details.student_name}</p>
                        <p className="feedbackListDetails">Batch Name: {feedback.batch_details.batch_name}</p>
                        <p className="feedbackListDetails">Conducted By: {feedback.interviewer_details.interviewer_name}</p>
                        {feedback.feedBackForm.map((details, index1) => {
                          return (
                            <div key={index1}>
                              {details.feedbackFormDetails.map((template, tIndex) => {
                                return (
                                  <div className="feedbackListDetails" key={tIndex}>Template Name:<span className=" text-align-center "> {template.template_title}</span> </div>
                                );
                              })
                              }
                              {details.score_student <= 4 ?
                                <p className="feedbackListDetails">Score:<b className="danger-color text-align-center "> {details.score_student}</b> </p> :
                                <p className="feedbackListDetails">Score:<b className="success-color text-align-center my-1 py-1">{details.score_student} </b></p>
                              }
                              <p className="feedbackListDetails">Conducted On: {details.conductedDate.substr(0,details.conductedDate.indexOf('T'))}</p>
                            </div>
                          );
                        })
                        }
                      </div>
                    </div>
                  );

                })
                }
              </div>
            </>
        }
      </div>
    </div>
  )
}

export default StudentMockFeedback;
