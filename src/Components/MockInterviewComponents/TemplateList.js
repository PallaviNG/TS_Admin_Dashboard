import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeTemplate, getTemplateList } from "../../Service/templateService";
import {
  deleteTemplateAction,
  saveAllTemplateFormsAction,
} from "../../redux/action/TemplateAction";
import { getInterviewerDetailsByID } from "../../Service/interviewerService";

function TemplateList({ history, user }) {
  let templateForms = useSelector(
    (state) => state.templateDetails.templateList
  );
  let dispatch = useDispatch();

  let [interviewerTemplates, setInterviewerTemplates] = useState([]);

  let assignTemplate = (index, _id) => {
    history.push("/mock/template/interviewer/assignment/" + _id);
  };

  let deleteTemplate = (index, _id) => {
    removeTemplate("delete-template-by-id", _id).then((result) => {
      if (
        result.status === true &&
        result.result.deletedCount === 1 &&
        result !== undefined
      ) {
        dispatch(deleteTemplateAction(index));
        history.push("/mock/template/list");
      } else toast.error("Unable to delete template");
    });
  };

  useEffect(() => {
    if (user.admin_role === "admin") {
      getTemplateList("get-template-list").then((result) => {
        if (result === undefined) return false;
        dispatch(saveAllTemplateFormsAction(result.templateList));
      });
    } else if (user.admin_role === "interviewer") {
      console.log(user.admin_role);

      getInterviewerDetailsByID("get-interviewer-by-id", user.id).then(
        (result) => {
          if (result === undefined) return false;
          interviewerTemplates = [];
          interviewerTemplates =
            result.interviewers[0].templateAssignmentFormsList;
          console.log(interviewerTemplates);
          setInterviewerTemplates([]);
          setInterviewerTemplates([...interviewerTemplates]);
          // console.log(result.interviewers[0].templateAssignmentFormsList);
        }
      );
    }
  }, []);

  useEffect(()=> {
      console.log(interviewerTemplates);
  },[interviewerTemplates]);

  return (
    <div className="content">
      <div className="formComponent">
        <h4 className="text-align-center">
          List of Templates
          {/* <strong onClick={() => history.push("/mock/template/new")} title="Click to Create New Template!" className="createIcon"><i className="fa fa-plus" aria-hidden="true"></i></strong> */}
        </h4>

        {user.admin_role === "admin" ? (
          templateForms.length === 0 ? (
            <div>No Templates Found</div>
          ) : (
            <>
              <div className="parent_card template_parent_card">
                <div className="card template_card flex flex-direction-column">
                  <div
                    className="flex justify-content-center templatePlusIcon"
                    title="Create New Template"
                  >
                    <Link to="/mock/template/new">
                      <i className="fa fa-4x fa-plus" aria-hidden="true"></i>
                    </Link>
                  </div>
                </div>
                {templateForms.map((template, index) => {
                  return (
                    <div
                      className="card template_card flex flex-direction-column justify-content-space-between"
                      key={index}
                    >
                      <Link to={`/mock/single/template/detail/${template._id}`}>
                        <div className="template_content">
                          <p
                            className="template_form_details"
                            title="Template Title"
                          >
                            {template.template_title}
                          </p>
                          <p className="template_form_details">
                            {/* {template.template_title} */}
                            Created By: {template.createdBy}
                          </p>

                          <p className="template_form_details">
                            Created Date:{" "}
                            {template.templateCreationDate.substr(
                              0,
                              template.templateCreationDate.indexOf("T")
                            )}
                          </p>
                        </div>
                      </Link>

                      <div className="templateIcons">
                        <span
                          className="deleteIcon"
                          title="DELETE"
                          onClick={() => deleteTemplate(index, template._id)}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </span>
                        <span className="editIcon" title="EDIT">
                          <i
                            className="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </span>
                        <span
                          className="assignIcon"
                          title="SHARE"
                          onClick={() => assignTemplate(index, template._id)}
                        >
                          <i className="fa fa-share" aria-hidden="true"></i>
                        </span>
                        {/* <span className="assignIcon" title="ASSIGN" onClick={() => {setShowPopup(!showPopup);}}>
                                        <i className="fa fa-2x fa-user-plus" aria-hidden="true"></i>
                                    </span> */}
                      </div>
                      {/* {showPopup===true ? <PopupDialog /> : null} */}
                    </div>
                  );
                })}
              </div>
            </>
          )
        ) : null}

        {user.admin_role === "interviewer" ? (
          interviewerTemplates.length === 0 ? (
            <div>No Templates Found</div>
          ) : (
            <>
              <div className="parent_card template_parent_card">
                {interviewerTemplates.map((template, index) => {
                  return (
                    <div
                      className="card template_card flex flex-direction-column justify-content-space-between"
                      key={index}
                    >
                      <Link to={`/mock/single/template/detail/${template._id}`}>
                        <div className="template_content">
                          <p
                            className="template_form_details"
                            title="Template Title"
                          >
                            {template.template_title}
                          </p>
                          <p className="template_form_details">
                            Created By: {template.createdBy}
                          </p>
                          <p className="template_form_details">
                            Created Date:{" "}
                            {template.templateCreationDate.substr(
                              0,
                              template.templateCreationDate.indexOf("T")
                            )}
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </>
          )
        ) : null}
      </div>
    </div>
  );
}

export default TemplateList;
