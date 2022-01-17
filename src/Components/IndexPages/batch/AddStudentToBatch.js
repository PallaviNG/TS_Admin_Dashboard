import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { getBatchList, updateBatchStudent } from "../../../Service/batchService";
import { saveAllBatchDetailsAction } from "../../../redux/action/BatchAction";
import { getStudentList, getStudentByID } from './../../../Service/studentService';
import { saveAllMockStudentDetailsAction } from './../../../redux/action/MockStudentAction';

function AddStudentToBatch({ history, match }) {
    let studentList = useSelector((state) => state.studentDetails.students);
    let dispatch = useDispatch();

    let [studentOptions, setStudentOptions] = useState([]);

    let [batchDetails, setBatchDetails] = useState({});
    let [batches, setBatches] = useState([]);

    let [studentID, setStudentID] = useState(undefined);

    let [batchAddStudent, setBatchAddStudent] = useState([]);

    let initialValues = {
        student_id: "",
    };

    let [updatedBatchDetails, setUpdatedBatchDetails] = useState({});

    useEffect(() => {
        getBatchList("get-batch-list").then((result) => {
            if (result === undefined) return false;
            batches = result.batchList;
            setBatches([...batches]);
            dispatch(saveAllBatchDetailsAction(result.batchList));

            if (batches.length > 0) {
                var singleBatchDetails = batches.filter(
                    (batch) => batch._id === match.params.id
                );
                console.log(singleBatchDetails);
                if (singleBatchDetails.length === 0) {
                    toast.error("No Batch Found");
                    history.replace("/batch/list");
                } else {
                    setBatchDetails({ ...batchDetails });
                    batchDetails = singleBatchDetails[0];
                    setBatchDetails({ ...batchDetails });
                }
            }
            console.log(batchDetails);
        });
    }, []);

    useEffect(() => {
        getStudentList("get-student-list").then((result) => {
            if (result === undefined) return false;
            dispatch(saveAllMockStudentDetailsAction(result.studentList));

            studentOptions = [];
            studentOptions.push({ value: 0, name: "-Select Student-" });
            if (studentList.length === 0)
                studentOptions.push({ value: undefined, name: "No Student found!" });
            else {
                studentList.forEach((student) => {
                    studentOptions.push({
                        value: student._id,
                        name: student.student_name,
                    });
                });
            }
            setStudentOptions([...studentOptions]);
        });
    }, []);


    let onSubmit = (values) => {
        console.log(values);
        console.log(studentID)
        getStudentByID("get-student-by-id", studentID).then(
            (result) => {
                if (result === undefined) return false;
                if (result.students.length > 0) {
                    let _studentDetails = result.students[0];
                    console.log(_studentDetails);
                    console.log(batchDetails);
                    batchAddStudent = batchDetails.students;
                    setBatchAddStudent([...batchAddStudent]);
                    console.log(batchAddStudent);

                    var studentMatchDetails = batchAddStudent.filter(
                        (student) => student._id === _studentDetails._id
                    );

                    if (studentMatchDetails.length === 0) {
                        batchAddStudent.push(_studentDetails);
                        setBatchAddStudent([...batchAddStudent]);
                    }

                    console.log(batchAddStudent);
                    let updatedBatchData = { ...updatedBatchDetails };
                    console.log(updatedBatchData);
                    updatedBatchData = {
                        _id: batchDetails._id,
                        batch_name: batchDetails.batch_name,
                        students: batchAddStudent,
                        no_of_student: batchAddStudent.length
                    };
                    console.log(updatedBatchData);
                    updatedBatchDetails = updatedBatchData;
                    setUpdatedBatchDetails({ ...updatedBatchDetails });
                    console.log(updatedBatchDetails);
                }


                updateBatchStudent("update-batch-with-student-details", updatedBatchDetails)
                    .then((result) => {
                        if (result === undefined) return false;
                        if (result.status === true && result.result.modifiedCount > 0 && result.result.matchedCount === 1) {
                            toast.success("Updated details!!");
                            history.push("/batch/list");
                        }
                        else if (result.status === true && result.result.modifiedCount === 0 && result.result.matchedCount === 1)
                            toast.info("Student Already exist!!");
                        history.push("/batch/list");
                    });

            });
    }

    return (
        <div className="content">
            <div className="formComponent flex flex-direction-column align-items-center justify-content-center">
                <h4 className="text-align-center">Add Student to Batch</h4>

                {batchDetails ? (
                    <h5>Batch Name: {batchDetails.batch_name}</h5>
                ) : null}
                <div className="pop-up-container flex flex-direction-column align-content-center mt-3">
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        <Form>
                            <div className="pop-up-selector flex justify-content-center">
                                <Field
                                    name="student_id"
                                    as="select"
                                    title="Student Name"
                                    onChange={(e) => setStudentID(e.target.value)}
                                    value={studentID}
                                >
                                    {studentOptions.map((student, index) => (
                                        <option key={index} value={student.value}>
                                            {student.name}
                                        </option>
                                    ))}
                                </Field>
                            </div>

                            <div className="templateIcons">
                                <Link to="/batch/list"><span className="assignIcon" title="Back to Batch List"><i className="fa fa-list-alt" aria-hidden="true"></i></span></Link>
                                <Link to="/mock/student/new"><span className="assignIcon" title="Add New Student"><i className="fa fa-user-plus" aria-hidden="true"></i></span></Link>
                                <button type="submit" title="Save Student"><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default AddStudentToBatch;