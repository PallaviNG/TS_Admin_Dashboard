import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FormControl from "./../forms/FormControl";
import { useDispatch } from "react-redux";
import { createNewTemplate, getTemplateList } from "./../../Service/templateService";
import { addNewTemplateAction,deleteQuestionSet } from "./../../redux/action/TemplateAction";


function SharableTemplateForm({ history }) {
  let templateInputs = useSelector((state) => state.templateDetails.templateQuestionSet);

  let [initialValues, setInitialValues] = useState({
    sample: "",
    template_title:""
  });

  useEffect(() => {
    // let iObject = {};
    // templateInputs.forEach((_input) => {
    //   iObject[_input.name] = _input.value;
    // });
    // console.log(iObject);
    // setInitialValues(iObject);
  }, []);


  let onSubmit = (values, onSubmitProps) => {
      console.log(values);
    // var sendData = {
    //   template_title: templateName,
    //   questionSets: templateInputs,
    // };

    // createNewTemplate("create-new-template", sendData).then((result) => {
    //   if (result === undefined) return false;
    //   dispatch(addNewTemplateAction(result.result));
    //   history.push("/mock/template/list");
    //   onSubmitProps.resetForm();
    // });
  };

  return (
    <div className="content">
      <div className="formComponent">
        <h4 className="text-align-center">Mock Template</h4>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize
        >
          <Form>
            <div className="titleComponent dc TextStyle">
              <Field
                name="template_title"
                autoComplete="off"
                placeholder="Untitled Template"
                value="Default Template"
              />
            </div>
            
            {/* {templateInputs.map((field, index) => {
              return (
                <div key={index} className="previewTemplate flex align-items-center justify-content-center">
                  <FormControl {...field} />
                  <div className="previewTemplateIcons deleteIcon flex justify-content-space-around align-items-center">
                      <span onClick={() => deleteComponent(index)}>
                        <i className="fa fa-2x fa-trash" aria-hidden="true"></i>
                      </span>
                  </div>
                </div>
              );
            })} */}

            <div className="form-buttons">
              <button type="submit">EDIT</button>
              <button>
                SHARE
              </button>
              <button onClick={() => history.push("/mock/template/list")}>
                View Template List
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default SharableTemplateForm;