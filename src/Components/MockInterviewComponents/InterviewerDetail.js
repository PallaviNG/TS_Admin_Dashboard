import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { getInterviewerList, updateInterviewerByID } from './../../Service/interviewerService';
import { saveAllInterviewersAction, saveAllTemplateFormAssignmentAction } from "../../redux/action/InterviewerAction";
import { Link } from 'react-router-dom';

function InterviewerDetail({ history, match }) {
    let interviewerList = useSelector(
        (state) => state.template_interviewerDetails.interviewers
    );
    let dispatch = useDispatch();

    let [initialValues, setInitialValues] = useState({
        interviewer_name: "",
        email_id: "",
        phone_number: "",
        templateAssignmentFormsList: []
    });

    let [interviewers, setInterviewers] = useState([]);

    let [iTemplateAssignmentForms, setITemplateAssignmentForms] = useState([]);

    let [updatedInterviewerDetails, setUpdatedInterviewerDetails] = useState({});

    let removeAssignedTemplateFromList = (index) => {
        let assignedTemplateList = initialValues.templateAssignmentFormsList;
        iTemplateAssignmentForms = assignedTemplateList;
        setITemplateAssignmentForms(iTemplateAssignmentForms);
        iTemplateAssignmentForms.splice(index, 1);
        // dispatch(deleteTemplateAssignmentAction(index));
        setITemplateAssignmentForms(iTemplateAssignmentForms);

        let updatedInterviewerData = {};
        updatedInterviewerData = {
            _id: initialValues._id,
            interviewer_name: initialValues.interviewer_name,
            templateAssignmentFormsList: iTemplateAssignmentForms
        };
        updatedInterviewerDetails = updatedInterviewerData;
        setUpdatedInterviewerDetails({ ...updatedInterviewerDetails });

        updateInterviewerByID("update-interviewer-details", updatedInterviewerDetails)
            .then((result) => {
                if (result === undefined) return false;
                if (result.status === true && result.result.modifiedCount > 0 && result.result.matchedCount === 1) {
                    toast.success("Updated details!!");
                }
                else if (result.status === true && result.result.modifiedCount === 0 && result.result.matchedCount === 1)
                    toast.info("No changes made!!");
            });
    }


    useEffect(() => {
        getInterviewerList("get-interviewer-list").then((result) => {
            if (result === undefined) return false;

            interviewers = result.interviewerList;
            setInterviewers([...interviewers]);

            dispatch(saveAllInterviewersAction(result.interviewerList));

            if (interviewers.length > 0) {
                var singleInterviewerDetails = interviewers.filter(
                    (interviewer) => interviewer._id === match.params.id
                );
                if (singleInterviewerDetails.length === 0) {
                    toast.error("No Interviewer Found");
                    history.replace("/mock/template/interviewer/list");
                } else {
                    setInitialValues({ ...initialValues });
                    initialValues = singleInterviewerDetails[0];
                    setInitialValues({ ...initialValues });
                    dispatch(saveAllTemplateFormAssignmentAction(initialValues.templateAssignmentFormsList));
                }
            }
        });
        console.log(initialValues);
    }, []);

    return (
        <div className="content">
            <div className="formComponent  flex flex-direction-column align-items-center justify-content-center">
                <h4 className="text-align-center">Interviewer Details</h4>
                <div className="interviewerDetailParentContainer flex flex-direction-column align-items-center">
                    <div className="details"><label>Name:</label>
                        <p className="single_interviewer_details detail_heading" title="Interviewer Name" >
                            {initialValues.interviewer_name}
                        </p>
                    </div>

                    <div className="details">
                        <label>Email ID:</label>
                        <p className="single_interviewer_details sub_detail_heading" title="Email ID" >
                            {initialValues.email_id}
                        </p>
                    </div>

                    <div className="details">
                        <label>Phone Number:</label>
                        <p className="single_interviewer_details" title="Phone Number" >
                            {initialValues.phone_number}
                        </p>
                    </div>

                    <div className="interviewer_templates_container flex flex-direction-column justify-content-center align-items-flex-start" title="Template Assignment Set">
                        <div className="mxy-2">Template Details</div>
                        {initialValues.templateAssignmentFormsList.sort((a, b) => b.templateAssignmentDate - a.templateAssignmentDate).map((templateSet, tIndex) => {
                            return (
                                <div className="templateSetCard border-white" key={tIndex}>
                                    <div className="templateCardHeading" title="Template Name">
                                        <Link to={`/mock/single/template/detail/${templateSet._id}`}>
                                            {tIndex + 1} {templateSet.template_title}
                                        </Link>
                                    </div>
                                    <div className="flex flex-no-wrap justify-content-flex-end align-content-center">
                                        <span className="deleteIcon" onClick={() => removeAssignedTemplateFromList(tIndex)} title="Delete Template"><i className="fa fa-minus-circle" aria-hidden="true"></i></span>
                                    </div>
                                </div>)
                        })
                        }
                        <div className="count_details bg-info">Total No. of Templates: {initialValues.templateAssignmentFormsList.length}</div>
                    </div>

                        {/* <div className="interviewerBatchContainer flex flex-direction-column align-content-center" title="Template Assignment Set">
                            <div className="mxy-2">Batch Details</div>
                            { initialValues.batches.map((batch, bIndex) => {
                                    return (
                                        <div key={bIndex}>
                                            <div className="templateCardHeading primary-color" title="Template Name">

                                                {bIndex + 1} {batch.batch_name}

                                            </div>
                                        </div>)
                                })
                            }
                        </div> */}


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
        </div>
    );
}

export default InterviewerDetail;