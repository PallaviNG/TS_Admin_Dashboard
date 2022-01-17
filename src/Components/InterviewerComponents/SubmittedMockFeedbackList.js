import React, { useEffect, useState } from "react";
import { decrementMockSubmitCountOfStudent, deleteMockFeedbackForm, getMockFeedbackFormList } from "../../Service/mockFeedbackService";
import { toast } from 'react-toastify';
import { getMockFeedbackFormListByStudent } from './../../Service/mockFeedbackService';
import { getStudentList } from './../../Service/studentService';
import { Link } from 'react-router-dom';

function SubmittedMockFeedbackList({ history, user }) {
  let [feedbackFormsByInterviewer, setFeedbackFormsByInterviewer] = useState([]);
  let [feedbackFormsByAdmin, setFeedbackFormsByAdmin] = useState([]);

  let [interviewerID, setInterviewerID] = useState();
  let [studentID, setStudentID] = useState();

  let [allStudents, setAllStudents] = useState([]);


  let deleteSubmittedFeedbackForm = (_id) => {
    deleteMockFeedbackForm('delete-feedback-form-by-id', _id).then((result) => {
      if (result.status === true && result !== undefined && result.feedbackForms.deletedCount === 1) {
        toast.success("Deleted feedback form details successfully!");
        let sendData = {
          student_id: studentID,
        }
        decrementMockSubmitCountOfStudent("decrement-mock-submit-count-of-student", sendData).then(
          (result) => {
            if (result === undefined) return false;
            console.log(result);
          }
        )
      }
      else toast.error("Unable to delete feedback form");
    });
    getMockFeedbackFormList('get-feedback-form-list').then((result) => {
      if (result === undefined) return false;
      let _feedbackFormsList = result.feedbackFormList;
      if (user.admin_role === 'interviewer') {
        feedbackFormsByInterviewer = _feedbackFormsList.filter(
          (feedbackForm) => feedbackForm.interviewer_details.interviewer_id === interviewerID
        );
        setFeedbackFormsByInterviewer([]);
        console.log(feedbackFormsByInterviewer);
        setFeedbackFormsByInterviewer([...feedbackFormsByInterviewer]);
      }

    });
  };

  useEffect(() => {
    console.log(feedbackFormsByAdmin);
  }, []);

  useEffect(() => {
    if (user.admin_role === 'interviewer') {
      interviewerID = user.id;
      setInterviewerID(interviewerID);
    }
    else if (user.admin_role === 'student') {
      studentID = user.id;
      setStudentID(studentID);
    }


    if (user.admin_role === 'interviewer') {
      getMockFeedbackFormList('get-feedback-form-list').then((result) => {
        if (result === undefined) return false;
        let _feedbackFormsList = result.feedbackFormList;
        console.log(_feedbackFormsList);
        if (user.admin_role === "interviewer") {
          feedbackFormsByInterviewer = _feedbackFormsList.filter(
            (feedbackForm) =>
              feedbackForm.interviewer_details.interviewer_id === interviewerID
          );
          setFeedbackFormsByInterviewer([]);
          console.log(feedbackFormsByInterviewer);
          setFeedbackFormsByInterviewer([...feedbackFormsByInterviewer]);
        }
      });
    }
    else if (user.admin_role === 'admin') {
      getStudentList("get-student-list").then((result) => {
        if (result === undefined) return false;
        console.log(result);
        setAllStudents([]);
        allStudents = result.studentList;
        setAllStudents([...allStudents]);
        console.log(allStudents);

        feedbackFormsByAdmin = [];
        setFeedbackFormsByAdmin([]);

        allStudents.forEach(student => {
          let sendData = { student_id: student._id };
          getMockFeedbackFormListByStudent("get-feedback-form-list-by-student-id", sendData).then(
            (result) => {
              if (result === undefined) return false;
              let _form = {
                student_id:student._id,
                student_name: student.student_name,
                phone_number: student.phone_number,
                submit_count: result.feedbackFormList.length,
                feedbackForm: result.feedbackFormList
              };
              console.log(_form);
              feedbackFormsByAdmin.push(_form);
              setFeedbackFormsByAdmin([...feedbackFormsByAdmin])
            });

        });
      });
    }

    else if (user.admin_role === "student") {
      let sendData = {
        student_id: studentID
      };
      getMockFeedbackFormListByStudent("get-feedback-form-list-by-student-id", sendData).then(
        (result) => {
          if (result === undefined) return false;
          console.log(result);
          let _feedbackFormsList = result.feedbackFormList;
          feedbackFormsByInterviewer = _feedbackFormsList.filter(
            (feedbackForm) => feedbackForm.student_details.student_id === studentID
          );
          
          setFeedbackFormsByInterviewer([]);
          console.log(feedbackFormsByInterviewer);
          setFeedbackFormsByInterviewer([...feedbackFormsByInterviewer]);
        }
      );
    }
  }, []);


  return (
    <div className="content">
      <div className="formComponent">
        <h4 className="text-align-center">List of Feedback Forms</h4>

        {(user.admin_role === "interviewer") ?
          (feedbackFormsByInterviewer.length === 0 ?
            <div>No Data Found!</div>
            :
            <>
              <div className="parent_feedback_list_container">
                {feedbackFormsByInterviewer.map((feedback, index) => {
                  return (
                    <div className="feedbackListContainer afContainer  card border" key={index}>
                      <div className="fbContent">
                        <p className="feedbackListDetails">Student Name: {feedback.student_details.student_name}</p>
                        <p className="feedbackListDetails">Batch Name: {feedback.batch_details.batch_name}</p>
                        <p className="feedbackListDetails">Conducted By: {feedback.interviewer_details.interviewer_name}</p>
                        {
                          feedback.feedBackForm.map((form1,fIndex) => {
                            return (
                              <div>
                              <p className="feedbackListDetails" key={fIndex}>Conducted Date: {form1.conductedDate.substr(0,form1.conductedDate.indexOf('T'))}</p>
                              <p className="feedbackListDetails" key={fIndex}>Score: {form1.score_student}</p>
                              {form1.feedbackFormDetails.map((templateForm,tIndex) => {
                                return (
                                  <p className="feedbackListDetails" key={tIndex}>Template : {templateForm.template_title}</p>

                                );
                              })
                            }
                            </div>
                              // { form1.feedbackFormDetails.map((template,tIndex) => {
                              //     return (
                              //     <p className="feedbackListDetails" key={fIndex}>Conducted Date: {form1.conductedDate}</p>
                              //     );
                              //   })
                              // }
                            );
                          })
                        }
                      </div>
                      <div className="feedbackListIcons rounded-bottom bg-info">
                        <span title="Delete" onClick={() => deleteSubmittedFeedbackForm(feedback._id, feedback.student_details.student_id)}>
                          <i className="fa fa-trash-o danger-color" aria-hidden="true"></i>
                        </span>
                      </div>
                    </div>

                  );
                })}
              </div>
            </>) : null
        }

        {(user.admin_role === "admin") ?
          (feedbackFormsByAdmin.length === 0 ? <div>No Student Found</div> :
            <>
              <div className="parent_feedback_list_container">
                {
                  feedbackFormsByAdmin.map((feedback, index) => {
                    return (
                      <div className="card feedbackListContainer" key={index}>
                        <div className="afbContent px-4">
                          <p className="feedbackListDetails">Student Name: {feedback.student_name}</p>
                          <p className="feedbackListDetails">Phone Number: {feedback.phone_number}</p>
                          <p className="feedbackListDetails">Mocks Attended: <Link to={`/students/feedback/${feedback.student_id}`}>{feedback.submit_count}</Link></p>
                        </div>
                        <div className="feedbackListIcons rounded-bottom bg-info">
                          <span title="Delete">
                            <i className="fa fa-trash-o danger-color" aria-hidden="true"></i>
                          </span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </>) : null}

      </div>
    </div>
  )
}

export default SubmittedMockFeedbackList;
