import React, { useEffect, useState } from 'react'
import preview_icon from "../../assets/images/buttonIcons/preview_template.png";
import { getInterviewerDetailsByID } from '../../Service/interviewerService';
import { Formik } from 'formik';
import { Form } from 'formik';
import { Field } from 'formik';
import { getBatchByID } from '../../Service/batchService';

function NewMockPopup({ children, user,history }) {

  let [interviewerDetails, setInterviewerDetails] = useState([]);

  let [interviewerBatches, setInterviewerBatches] = useState([]);
  let [batchOptions, setBatchOptions] = useState([]);
  let [studentOptions, setStudentOptions] = useState([]);
  let [templateOptions, setTemplateOptions] = useState([]);


  let [batchID, setBatchID] = useState(0);
  let [studentID, setStudentID] = useState(0);
  let [templateID, setTemplateID] = useState(0);
  let [interviewerID,setInterviewerID] = useState();

  let initialValues = {
    batch_id: 0,
    student_id: 0,
    template_id: 0
  };

  useEffect(() => {
    console.log(user.id);
    setInterviewerID(user.id);

    let _interviewerID = user.id;
    getInterviewerDetailsByID("get-interviewer-by-id", _interviewerID).then(
      (result) => {
        if (result === undefined) return false;
        interviewerDetails = result.interviewers[0];
        setInterviewerDetails({ ...interviewerDetails });

        interviewerBatches = [];
        interviewerBatches = interviewerDetails.batches;
        setInterviewerBatches([...interviewerBatches]);

        console.log(interviewerBatches);

        batchOptions = [];
        batchOptions.push({ value: 0, name: "-Select Batch-" });
        if (interviewerBatches.length === 0)
          batchOptions.push({ value: undefined, name: "No Batch found!" });
        else {
          interviewerBatches.forEach((batch) => {
            batchOptions.push({
              value: batch.batch_id,
              name: batch.batch_name,
            });
          });
        }
        setBatchOptions([...batchOptions]);

        let interviewerTemplates = interviewerDetails.templateAssignmentFormsList;
        console.log(interviewerTemplates);
        templateOptions = [];
        templateOptions.push({ value: 0, name: "-Select Template-" });
        if (interviewerTemplates.length === 0)
          templateOptions.push({ value: undefined, name: "No Template found!" });
        else {
          interviewerTemplates.forEach((template) => {
            templateOptions.push({
              value: template._id,
              name: template.template_title,
            });
          });
        }
        setTemplateOptions([...templateOptions]);
      }
    );

  }, []);

  let handleBatchID = (event) => {
    batchID = event.target.value;
    setBatchID(event.target.value);

    if (batchID !== 0 || batchID === undefined) {
      getBatchByID('get-batch-by-id', batchID).then((result) => {
        if (result === undefined) return false;
        console.log(result);
        let batchList = result.batches[0];
        let studentList = batchList.students;
        console.log(studentList);

        studentOptions = [];
        studentOptions.push({ value: 0, name: "-Select Student-" });
        if (studentList.length === 0)
          studentOptions.push({ value: undefined, name: "No Student Found!" });
        else {
          studentList.forEach((student) => {
            studentOptions.push({
              value: student._id,
              name: student.student_name
            });
          });
        }
        setStudentOptions([...studentOptions]);
      });
    }
  }

  return (
    <div className="fParentContainer">
      <div className="feedbackPopupContainer mockContainer">
        <div className="feedbackHeading">
          <h4>Mock FeedBack Form</h4>
          <div className="feedbackChild">{children}</div>
        </div>
        <div className="flex justify-content-center align-items-center">
          <div className="mock-pop-up-container">
            <Formik initialValues={initialValues}>
              <Form>
                <div className='mockSelector'>
                  <label htmlFor='batch_id'>Batch Name:</label>
                  <Field
                    name="batch_id"
                    as="select"
                    title="Batch Name"
                    onChange={(e) => handleBatchID(e)}
                    value={batchID}
                  >
                    {batchOptions.map((batch, bIndex) => (
                      <option key={bIndex} value={batch.value}>
                        {batch.name}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className='mockSelector'>
                  <label htmlFor='student_id'>Student Name:</label>
                  <Field
                    name="student_id"
                    as="select"
                    title="Student Name"
                    onChange={(e) => setStudentID(e.target.value)}
                    value={studentID}
                  >
                    {studentOptions.map((student, sIndex) => (
                      <option key={sIndex} value={student.value}>
                        {student.name}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className='mockSelector'>
                  <label htmlFor='template_id'>Template Name:</label>
                  <Field
                    name="template_id"
                    as="select"
                    title="Template Name"
                    onChange={(e) => setTemplateID(e.target.value)}
                    value={templateID}
                  >
                    {templateOptions.map((template, tIndex) => (
                      <option key={tIndex} value={template.value}>
                        {template.name}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="fPIcons flex mt-3 justify-content-center width-100">
                  <button
                    title="Preview Template"
                    onClick={() =>
                      history.push(
                        `/mock/preview/feedback/${interviewerID}/${batchID}/${templateID}/${studentID}`
                      )
                    }
                  >
                    <img src={preview_icon} />
                  </button>
                  </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}


export default NewMockPopup;
