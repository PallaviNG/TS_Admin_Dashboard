import React, {  useEffect } from "react";
import preview_icon from "../../assets/images/buttonIcons/preview_template.png";
import save_icon from "../../assets/images/buttonIcons/backup.png"
import { Formik, Form } from "formik";
import FormControl from "./../forms/FormControl";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { saveAllTemplateDetailsAction } from './../../redux/action/TemplateAction';

function CreateTemplate({ history }) {
  let templateInputs = useSelector((state) => state.templateDetails.templateQuestionSet);
  let dispatch = useDispatch();
  let initialValues = {
    select_component: "",
    question: "",
    componentType: "",
  };

  let formFields = [
    {
      componentType: "text",
      name: "question",
      value: "",
      question: "Question",
      placeholder: "Type your Question",
    },
    {
      componentType: "select",
      name: "select_component",
      options: [
        {
          label: "--Multiple Choice--",
          value: "",
        },
        {
          label: "TextBox",
          value: "text",
        },
        {
          label: "TextArea",
          value: "textarea",
        },
        {
          label: "Email",
          value: "email",
        },
        {
          label: "Number",
          value: "number",
        },
        {
          label: "Password",
          value: "password",
        },
      ],
    },
  ];

  let onSubmit = (values, onSubmitProps) => {
    let input = {
      question: values.question,
      name: values.question.toLowerCase().split(" ").join("").replace('?', ''),
      value: "",
      componentType: values.select_component,
      otherOption: [],
    };
    let _templateInputs = [...templateInputs];
    _templateInputs.push(input);
    dispatch(saveAllTemplateDetailsAction(_templateInputs));
    onSubmitProps.resetForm();
  };

  useEffect(() => {
    console.log(templateInputs);
  }, [templateInputs]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <div className="outerComponent parentComponent content formComponent">
              <div className="form-group dc">
                <h4 className="text-align-center">Add Questions to Template</h4>
                <div className="mainComponent">
                  {formFields.map((field, index) => {
                    return <FormControl key={index} {...field} />
                  })}
                </div>
              </div>
              <div className="create_template_icons">
                <button type="submit" className="bg-transparent border-none" title="Save"><img src={save_icon} /></button>
                <button className='mr-4' title='Preview Template' className="bg-transparent border-none" onClick={() => history.push("/mock/template/preview")}><img src={preview_icon} /></button>
              
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CreateTemplate;