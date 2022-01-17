import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { getStudentByID } from "../../Service/studentService";
import { getTemplateByID } from "./../../Service/templateService";
import FormControl from "./../forms/FormControl";
import { toast } from 'react-toastify';
import { getMockSubmitCountOfStudent, saveNewMockFeedbackForm, sendMockFeedbackFormToEmail, setMockSubmitCountOfStudent } from './../../Service/mockFeedbackService';
import { getBatchByID } from "../../Service/batchService";

function PreviewFeedbackForm({ history, match, user }) {
  let [studentID, setStudentID] = useState();
  let [studentNAME, setStudentNAME] = useState("");
  let [studentEmailID, setStudentEmailID] = useState("");
  let [studentPhoneNumber, setStudentPhoneNumber] = useState("");

  let [interviewerID, setInterviewerID] = useState();
  let [interviewerNAME, setInterviewerNAME] = useState("");

  let [batchID, setBatchID] = useState();
  let [batchNAME, setBatchNAME] = useState("");

  let [templateID, setTemplateID] = useState();
  let [templateDetails, setTemplateDetails] = useState({});
  let [templateTITLE, setTemplateTITLE] = useState("");
  let [questionSETS, setQuestionSETS] = useState([]);

  let [scoreOptions, setScoreOptions] = useState(
    [
      { value: 1, name: 1 },
      { value: 2, name: 2 },
      { value: 3, name: 3 },
      { value: 4, name: 4 },
      { value: 5, name: 5 },
      { value: 6, name: 6 },
      { value: 7, name: 7 },
      { value: 8, name: 8 },
      { value: 9, name: 9 },
      { value: 10, name: 10 },
    ]
  );

  let [scoreOfStudent, setScoreOfStudent] = useState(1);

  let [rate, setRate] = useState(0);

  useEffect(() => {
    setTemplateDetails({ ...templateDetails });
    templateDetails.questionSets = questionSETS;
    setTemplateDetails({ ...templateDetails });
    batchID = match.params.batch_id;
    setBatchID(batchID);
    templateID = match.params.template_id;
    setTemplateID(templateID);
    studentID = match.params.student_id;
    setStudentID(studentID);


    getBatchByID("get-batch-by-id", batchID).then((result) => {
      if (result === undefined) return false;
      let batchDetails = result.batches[0];
      if (batchDetails) {
        batchNAME = batchDetails.batch_name;
        setBatchNAME(batchNAME);
      }
    });

    getTemplateByID("get-template-by-id", templateID).then((result) => {
      if (result === undefined) return false;
      templateDetails = {};
      templateDetails = result.templates[0];
      setTemplateDetails({ ...templateDetails });
      templateTITLE = templateDetails.template_title;
      setTemplateTITLE(templateTITLE);
      questionSETS = [];
      questionSETS = templateDetails.questionSets;
      setQuestionSETS([...questionSETS]);
    });
    getStudentByID("get-student-by-id", studentID).then((result) => {
      if (result === undefined) return false;
      let studentDetails = result.students[0];
      setStudentNAME(studentDetails.student_name);
      setStudentEmailID(studentDetails.email_id);
      setStudentPhoneNumber(studentDetails.phone_number);
    });

    setInterviewerID(user.id);
    setInterviewerNAME(user.admin_name);
  }, []);


  useEffect(() => {
    let iObject = [];
    questionSETS.forEach((_input) => {
      iObject[_input.name] = _input.value;
      console.log(iObject);
    });
    // console.log(iObject);
    // setQuestionSETS(iObject);
  }, []);


  let initialValues = {
    student_id: match.params.student_id,
    student_name: studentNAME,
    studentEmail: studentEmailID,
    studentPhone: studentPhoneNumber,
    interviewer_id: user.id,
    interviewer_name: interviewerNAME,
    template_id: match.params.template_id,
    template_title: templateTITLE,
    questionSets: questionSETS,
    answer: "",
    score: 0
  };

  let changeGrade= (value) => {
    console.log(value);
    rate=value/2;
    setRate(rate);
  };

  let [iValue,setIValue]= useState({});
  let onChange = () => {
    // console.log(event.target.value);
    // setIValue(iValue);
    console.log(iValue);
    
  };

  let handleShareFeedbackForm = () => {
    // console.log(scoreOfStudent);

    let iObject = [];
    questionSETS.forEach((_input) => {
      iObject[_input.name] = _input.value;
      console.log(iObject);
    });


    console.log(initialValues);
    let sendFeedbackFormData = {
      interviewer_details: {
        interviewer_id: interviewerID,
        interviewer_name: interviewerNAME,
      },
      batch_details: { batch_id: batchID, batch_name: batchNAME },
      student_details: {
        student_id: studentID,
        student_name: studentNAME,
        student_phone: studentPhoneNumber,
        student_email: studentEmailID,
      },
      feedBackForm: {feedbackFormDetails:templateDetails,score_student: scoreOfStudent}
    };

    let emailData = {
      interviewer_name: interviewerNAME,
      student_name: studentNAME,
      student_email: studentEmailID,
      batch_name: batchNAME,
      feedbackForm: templateDetails,
    };

    
    sendMockFeedbackFormToEmail("send-email", emailData).then((result) => {
      if (result === undefined) return false;
      toast.success("Email Sent Successfully");
    });

    saveNewMockFeedbackForm("create-new-feedback-form", sendFeedbackFormData)
      .then((result) => {
        if (result === undefined) return false;
        toast.success("New Feedback form saved");       
        let sendData={
          student_id:studentID,
        };
        console.log(sendData);
        setMockSubmitCountOfStudent("set-mock-submit-count-of-student",sendData).then(
          (result)=> {
            if(result===undefined) return false;
            console.log(result);

          }
        )
      });
  };

  return (
    <div className="content">
      <div className="formComponent flex flex-direction-column align-items-center">
        <h4 className="text-align-center">Preview Feedback Form</h4>
        <div className="previewFeedbackFormContainer">
          <Formik initialValues={initialValues} enableReinitialize>
            <Form>
              <div
                className="pTemplateHeader flex flex-direction-column justify-content-center"
                title="Enter Student Details"
              >
                <div>
                  <label>Student Name</label>
                  <Field
                    name="student_name"
                    readOnly
                    autoComplete="off"
                    title="Student Name"
                  ></Field>
                </div>
                <div>
                  <label>Email ID</label>
                  <Field
                    name="studentEmail"
                    autoComplete="off"
                    type="email"
                    readOnly
                    title="Student Email ID"
                  />
                </div>
                <div>
                  <label>Phone Number</label>
                  <Field
                    name="studentPhone"
                    autoComplete="off"
                    type="number"
                    readOnly
                    title="Student Phone Number"
                  />
                </div>
                <div>
                  <label>Conducted By</label>
                  <Field
                    name="interviewer_name"
                    readOnly
                    autoComplete="off"
                    title="Interviewer Name"
                  ></Field>
                </div>
              </div>

              <div className="pTemplateBody" title="Template Container">
                <div>
                  <h4 name="template_title">
                    {templateDetails.template_title}
                  </h4>
                  {questionSETS.map((field, index) => {
                    return (
                      <div
                        key={index}
                        className="previewFeedbackTemplate flex flex-direction-column align-items-center justify-content-center"
                      >
                        <div className="qaInputs ">
                          <div className="questionAnswerBox flex align-items-center">
                            <FormControl onChange={(event) => onChange(event)} {...field} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="studentMockRating">
                <div className="rating">
                  Rating
                  {
                    [...Array(5)].map((item, index) => {
                      const givenRating = index + 1;
                      //https://www.geeksforgeeks.org/how-to-create-a-rating-component-in-reactjs/
                      //https://javascript.plainenglish.io/how-to-build-a-star-rating-component-in-react-dad06b05679b
                      return (
                        <span className="fa fa-star" key={index} color={givenRating < rate || givenRating === rate ? "black" : "orange"} ></span>
                      ); }
                    ) }

                </div>
                <div className="score_box">
                  <label htmlFor="score_student">Score:</label>
                  <Field as="select"
                    name="score_student"
                    onChange={(e) => { setScoreOfStudent(e.target.value); changeGrade(e.target.value); }}
                    value={scoreOfStudent}
                  >
                    {scoreOptions.map((score, index) => (
                      <option key={index} value={score.value}>
                        {score.name}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>

              <div className="sTemplate_footer flex justify-content-space-around align-items-center">
                <div className="flex justify-content-space-around">
                  <span
                    onClick={() =>
                      history.push(
                        `/single/student/details/${batchID}/${studentID}`
                      )
                    }
                    title="Back to Student Details"
                  >
                    <i
                      className="fa fa-2x fa-hand-o-left"
                      aria-hidden="true"
                    ></i>
                  </span>
                  <span title="View Submitted Mock List">
                    <i className="fa fa-2x fa-building" onClick={() => history.push("/interviewer/batch/mock/feedback/form/list")} aria-hidden="true"></i>
                  </span>
                  <span onClick={() => handleShareFeedbackForm()} title="Share">
                    <i
                      className="fa fa-2x fa-share-square-o"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default PreviewFeedbackForm;
