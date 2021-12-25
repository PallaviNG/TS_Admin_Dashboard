import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import React from "react";
import { createNewCourse } from './../../../Service/courseService';
import { addNewCourseAction } from "../../../redux/action/CourseAction";
import { useDispatch } from 'react-redux';
import InputError from './../../InputError';
import { toast } from "react-toastify";

function NewCourse({ history }) {
    let initialValues = {
        course_name: "",
        domain_name: "",
    };

    let validationSchema = yup.object().shape({
        course_name: yup.string().min(3,"Too Short!").max(30,"Too Long").required("Course Name is required"),
        domain_name: yup.string().min(3,"Too Short!").max(30,"TOo Long").required("Domain Name is required"),
    });

    let dispatch= useDispatch();

    let onSubmit = (values, onSubmitProps) => {
        createNewCourse("create-new-course", values).then((result) => {
            if (result === undefined) {
                toast.error("Unable to Create New Course")
            }
            dispatch(addNewCourseAction(result.result));
            // history.push("/course/list");
            onSubmitProps.resetForm();
        });
    };

    return (
        <div className="content">
            <div className="formComponent">
                <h4 className="text-align-center">Create New Batch</h4>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    <Form>
                        <div className="form-group">
                            <Field
                                name="course_name"
                                id="course_name"
                                placeholder="Course Name"
                            />
                            <ErrorMessage name="course_name" className="error" component={InputError} />
                        </div>
                        <div className="form-group">
                            <Field
                                name="domain_name"
                                id="domain_name"
                                placeholder="Domain Name"
                            />
                            <ErrorMessage name="domain_name" className="error" component={InputError} />
                        </div>

                        <div className="form-buttons">
                            <button type="submit">Save New Course</button>
                            <button onClick={() => history.push("/course/list")}>
                                View Course List
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div >
    );
}

export default NewCourse;