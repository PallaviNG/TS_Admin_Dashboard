import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

function Interviewer_Batch_Students({ batch_id, children }) {
  let [initialValues, setInitialValues] = useState({
    student_name:"",

  });

  let [batchID,setBatchID] = useState();

  useEffect(() => {
      batchID = batch_id;
      setBatchID(batchID);
      console.log(batch_id);
  }, []);


  return (
    <div className="fParentContainer">
      <div className="feedbackPopupContainer">
        <div className="feedbackHeading">
          <h4>FeedBack Prompt</h4>
          <div className="feedbackChild">{children}</div>
        </div>
        {/* <div className="flex justify-content-center align-items-center">
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                  <button type="submit" title="Share Template">
                    <i
                      className="fa font-size-x-large fa-share-square-o"
                      aria-hidden="true"
                    ></i>
                  </button> */}
                {/* </div>
              </div>
            </Form>
          </Formik>
        </div> */}
      </div>
    </div>
  );
}

export default Interviewer_Batch_Students;
