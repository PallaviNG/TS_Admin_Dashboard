import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { saveAllTemplateFormsAction } from "../../redux/action/TemplateAction";
import { getTemplateList } from './../../Service/templateService';

function TemplateDetail({ history, match }) {
  let templateForms = useSelector((state) => state.templateDetails.templateList);

  let [initialValues, setInitialValues] = useState({
    template_title: "",
    questionSets: [],
  });

  let [templates, setTemplates] = useState([]);
  let dispatch = useDispatch();

  useEffect(() => {
      getTemplateList("get-template-list").then((result) => {
        if (result === undefined) return false;
        templates = result.templateList;
        setTemplates([...templates]);
        dispatch(saveAllTemplateFormsAction(result.templateList));

        if (templates.length > 0) {
          var singleTemplateDetails = templates.filter(
            (template) => template._id === match.params.id
          );
          if (singleTemplateDetails.length === 0) {
            toast.error("No Template Found");
            history.replace("/mock/template/list");
          } else {
            setInitialValues({...initialValues});
            initialValues = singleTemplateDetails[0];
            setInitialValues({ ...initialValues });
          }
        }
      });
    },[]);
  // },[initialValues,templates]);

  return (
    <div className="content">
      <div className="formComponent flex flex-direction-column align-items-center justify-content-center">
        <h4 className="text-align-center">Template Details</h4>

        <div className="titleComponent dc TextStyle">
          <p className="template_form_details" title="Template Title" >
            {initialValues.template_title}
          </p>
        </div>

        <div className="template_form_question_answer_details" title="Question Answer Set">
          {initialValues.questionSets.map((questionSet, qIndex) => {
            return (<div className="questionSetCard" key={qIndex}>
              <p className="question_answer_set_details" title="Question">
                {qIndex + 1} {questionSet.question}
              </p>
              <p className="question_answer_set_details" title="Answer">
                {questionSet.answer}
              </p>
            </div>)
          })
          }
        </div>
        <div className="count_details">No. of Questions: {initialValues.questionSets.length}</div>
        <div className="form-buttons">
          <button onClick={() => history.push("/mock/template/list")}>
            <span className="backIcon"><i className="fa fa-hand-o-left" aria-hidden="true"></i> </span> Template List
          </button>
          <button onClick={() => history.push("/mock/template/interviewer/list")}>
            <span className="backIcon"><i className="fa fa-hand-o-left" aria-hidden="true"></i> </span> Interviewer List
          </button>
        </div>
      </div>
    </div>
  );
}

/*useEffect(() => {
  console.log(history.location.pathname);
  let historyPathname = history.location.pathname;
  let templateID = historyPathname.substring( historyPathname.lastIndexOf('/')+1,historyPathname.length);
  console.log(templateID);
});
return (
  <div className="content">
    <div className="formComponent flex flex-direction-column align-items-center justify-content-center">
      <h4 className="text-align-center">Template Details</h4>
      </div></div>);
}*/

export default TemplateDetail;
