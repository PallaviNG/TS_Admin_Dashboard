import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { getTemplateList } from "../../Service/templateService";
import preview_icon from "../../assets/images/buttonIcons/preview_template.png";
import { toast } from "react-toastify";
import { sendMockFeedbackFormToEmail, sendTextMessage } from './../../Service/mockFeedbackService';

function FeedbackPopup({history, children, user, batch_id, student_id }) {
  let [initialValues, setInitialValues] = useState({
    template_id: undefined,
  });

  let [templateOptions, setTemplateOptions] = useState([]);
  let [templateID, setTemplateID] = useState();

  let [interviewerID, setInterviewerID] = useState();
  let [studentID, setStudentID] = useState();
  let [batchID, setBatchID] = useState();

  useEffect(() => {
    interviewerID = user.id;
    setInterviewerID(interviewerID);
    studentID = student_id;
    setStudentID(studentID);
    batchID = batch_id;
    setBatchID(batchID);

    getTemplateList("get-template-list").then((result) => {
      if (result === undefined) return false;
      let _templateList = result.templateList;
      // dispatch(saveAllTemplateDetailsAction)

      templateOptions = [];
      setTemplateOptions([]);
      templateOptions.push({ value: 0, name: "-Select Template" });
      if (_templateList.length === 0)
        templateOptions.push({ value: undefined, name: "No Template Found" });
      else {
        _templateList.forEach((template) => {
          templateOptions.push({
            value: template._id,
            name: template.template_title,
          });
        });
      }
      setTemplateOptions([...templateOptions]);
    });
  }, []);

  let onChange = (event) => {
    setTemplateID(event.target.value);
  };

  return (
    <div className="fParentContainer">
      <div className="feedbackPopupContainer">
        <div className="feedbackHeading">
          <h4>FeedBack Prompt</h4>
          <div className="feedbackChild">{children}</div>
        </div>
        <div className="flex justify-content-center align-items-center">
          <Formik initialValues={initialValues}>
            <Form>
              <div className="pop-up-selector flex flex-direction-column justify-content-center align-items-center">
                <Field
                  name="template_id"
                  as="select"
                  title="Template Name"
                  onChange={(e) => onChange(e)}
                  value={templateID}
                >
                  {templateOptions.map((template, index) => (
                    <option key={index} value={template.value}>
                      {template.name}
                    </option>
                  ))}
                </Field>
                <div className="fPIcons mt-4">
                  <button
                    className="mr-4"
                    title="Preview Template"
                    onClick={() =>
                      history.push(
                        `/mock/preview/feedback/${interviewerID}/${batchID}/${templateID}/${studentID}`
                      )
                    }
                  >
                    <img src={preview_icon} />
                  </button>
                  {/* <button type="submit" title="Share Template">
                    <i
                      className="fa font-size-x-large fa-share-square-o"
                      aria-hidden="true"
                    ></i>
                  </button> */}
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPopup;
