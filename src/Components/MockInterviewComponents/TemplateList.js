import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeTemplate, getTemplateList } from '../../Service/templateService';
import { deleteTemplateAction, saveAllTemplateFormsAction } from '../../redux/action/TemplateAction';

function TemplateList({ history }) {
    let templateForms = useSelector((state) => state.templateDetails.templateList);
    let dispatch = useDispatch();

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
        getTemplateList("get-template-list").then((result) => {
            if (result === undefined) return false;
            dispatch(saveAllTemplateFormsAction(result.templateList));
        });
    }, []);

    return (

        <div className="content">
            <div className="formComponent">
                <h4 className="text-align-center">List of Templates
                    {/* <strong onClick={() => history.push("/mock/template/new")} title="Click to Create New Template!" className="createIcon"><i className="fa fa-plus" aria-hidden="true"></i></strong> */}
                </h4>

                {templateForms.length === 0 ? <div>No Templates Found</div>
                    : <>
                        <div className="parent_card template_parent_card">
                            <div className="card template_card flex flex-direction-column">
                                <div className="flex justify-content-center templatePlusIcon" title="Create New Template">
                                    <Link to="/mock/template/new"><i className="fa fa-4x fa-plus" aria-hidden="true"></i></Link>
                                </div>
                            </div>
                            {templateForms.map((template, index) => {
                                return (
                                    <div
                                        className="card template_card flex flex-direction-column justify-content-space-between"
                                        key={index}
                                    >
                                        <Link to={`/mock/single/template/detail/${template._id}`}>
                                            <p className="template_form_details" title="Template Title">
                                                {template.template_title}
                                            </p>
                                            <p className="template_form_details">
                                                {/* {template.template_title} */}
                                                Created By: {template.createdBy}
                                            </p>

                                            {/* {() => {
                                            let date = template.templateCreationDate;
                                            var dd= String(date.getDate());
                                            var mm=String(date.getMonth());
                                            var yyyy = String(date.getYear());
                                            console.log(dd,mm,yyyy);
                                        }
                                        } */}
                                            <p className="template_form_details">
                                                {/* Created Date: 22-12-2021  */}
                                                Created Date: {template.templateCreationDate}

                                            </p>
                                        </Link>
                                        {/* <span className="questionSetIcon" title="Question Set"><i className="fa fa-list-alt" aria-hidden="true"></i></span> */}

                                        <div className="templateIcons">
                                            <span className="deleteIcon" title="DELETE" onClick={() => deleteTemplate(index, template._id)}>
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                            </span>
                                            <span className="editIcon" title="EDIT"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                            </span>
                                            <span className="assignIcon" title="SHARE" onClick={() =>
                                                assignTemplate(index, template._id)
                                            }>
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
                    </>}
            </div>
        </div >
    );
}

export default TemplateList;