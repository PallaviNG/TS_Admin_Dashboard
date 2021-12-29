import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { saveAllInterviewersAction } from "../../redux/action/InterviewerAction";
import {
    getInterviewerDetailsByID,
    getInterviewerList,
    updateInterviewerBatches,
    updateInterviewerByID,
} from "./../../Service/interviewerService";
import { saveAllTemplateFormsAction } from "../../redux/action/TemplateAction";
import { getTemplateList } from "./../../Service/templateService";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { getBatchList, getBatchByID } from './../../Service/batchService';
import { saveAllBatchDetailsAction } from './../../redux/action/BatchAction';

function InterviewerBatchAssignment({ history, match }) {
    let batchList = useSelector((state) => state.batchDetails.batches);
    let dispatch = useDispatch();

    let [batchOptions, setBatchOptions] = useState([]);

    let [interviewerDetails, setInterviewerDetails] = useState({});
    let [batches, setBatches] = useState([]);

    let [interviewerID, setInterviewerID] = useState(undefined);
    let [batchID, setBatchID] = useState(undefined);

    let [iBatchAssignments, setIBatchAssignments] = useState([]);

    let initialValues = {
        batch_id: "",
    };

    let [updatedInterviewerDetails, setUpdatedInterviewerDetails] = useState({});

    useEffect(() => {
        console.log(match.params.id);
        let _interviewerID = match.params.id;
        getInterviewerDetailsByID("get-interviewer-by-id", _interviewerID).then((result) => {
            if (result === undefined) return false;
            let _interviewerDetails = result.interviewers[0];
            if (interviewerDetails === {}) {
                toast.error("No Interviewer Found")
                history.replace("/mock/template/interviewer/list");
            }
            else {
                interviewerDetails = [];
                interviewerDetails = result.interviewers[0];
                setInterviewerDetails({ ...interviewerDetails });
                console.log(interviewerDetails);
            }
        });
    }, []);

    useEffect(() => {
        getBatchList("get-batch-list").then((result) => {
            if (result === undefined) return false;
            batches = [];
            batches = result.batchList;
            setBatches([...batches]);
            dispatch(saveAllBatchDetailsAction(result.batchList));
        });

        console.log(batchList)
        console.log(batches);
        batchOptions = [];
        batchOptions.push({ value: 0, name: "-Select Batch-" });
        if (batchList.length === 0)
            batchOptions.push({ value: undefined, name: "No Batch found!" });
        else {
            batchList.forEach((batch) => {
                batchOptions.push({
                    value: batch._id,
                    name: batch.batch_name,
                });
            });
        }
        setBatchOptions([...batchOptions]);
    }, []);


    let onSubmit = () => {
        console.log(batchID);
        console.log(interviewerDetails);

        iBatchAssignments=[];
        iBatchAssignments = interviewerDetails.batches;
        setIBatchAssignments([...iBatchAssignments]);

        getBatchByID("get-batch-by-id", batchID).then((result) => {
            if (result === undefined) return false;
            let batchDetails = result.batches;

            console.log(batchDetails);
            console.log(batchDetails[0]._id);
            console.log(batchDetails[0].batch_name);

            console.log(iBatchAssignments);

            var batchMatchDetails = iBatchAssignments.filter(
                (batch) => batch.batch_id === batchID
            );
            console.log(batchMatchDetails);
            if (batchMatchDetails.length === 0) {
                iBatchAssignments.push({ batch_id: batchDetails[0]._id, batch_name: batchDetails[0].batch_name });
                setIBatchAssignments([...iBatchAssignments]);
            }

            console.log(iBatchAssignments);
            let updatedInterviewerData = { ...updatedInterviewerDetails };
            console.log(updatedInterviewerData);
            updatedInterviewerData = {
                _id: interviewerDetails._id,
                interviewer_name: interviewerDetails.interviewer_name,
                batches: iBatchAssignments,
            };
            updatedInterviewerDetails = updatedInterviewerData;
            setUpdatedInterviewerDetails({ ...updatedInterviewerDetails });

            console.log(updatedInterviewerDetails);
            updateInterviewerBatches("assign-batch-to-interviewer", updatedInterviewerDetails)
                .then((result) => {
                    if (result === undefined) return false;
                    if (result.status === true && result.result.modifiedCount > 0 && result.result.matchedCount === 1) {
                        toast.success("Updated details!!");
                        history.push("/mock/template/interviewer/list");
                    }
                    else if (result.status === true && result.result.modifiedCount === 0 && result.result.matchedCount === 1)
                        toast.info("No changes made!!");
                    history.push("/mock/template/interviewer/list");
                });

        });
    }

    return (
        <div className="content">
            <div className="formComponent flex flex-direction-column align-items-center justify-content-center">
                <h4 className="text-align-center">Batch Assignment Form</h4>

                {interviewerDetails ? (
                    <h5>Interviewer Name: {interviewerDetails.interviewer_name}</h5>
                ) : null}
                <div className="pop-up-container flex flex-direction-column align-content-center mt-3">
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        <Form>
                            <div className="pop-up-selector flex justify-content-center">
                                <Field
                                    name="batch_id"
                                    as="select"
                                    title="Batch Name"
                                    onChange={(event) => setBatchID(event.target.value)}
                                    value={batchID}
                                >
                                    {batchOptions.map((batch, bIndex) => (
                                        <option key={bIndex} value={batch.value}>
                                            {batch.name}
                                        </option>
                                    ))}
                                </Field>
                            </div>

                            <div className="templateIcons">
                                <Link to="/mock/template/interviewer/list"><span className="assignIcon" title="Back to Interviewer List"><i className="fa fa-list-alt" aria-hidden="true"></i></span></Link>
                                <Link to="/mock/template/interviewer/new"><span className="assignIcon" title="Add New Interviewer"><i className="fa fa-user-plus" aria-hidden="true"></i></span></Link>
                                <button type="submit" title="Save"><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default InterviewerBatchAssignment;
