import { Field, Form, Formik,ErrorMessage } from "formik";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateCourse } from "../../../Service/courseService";
import InputError from './../../InputError';

function EditCourse({ match, history }) {
  let courseList = useSelector((state) => state.courseDetails.courses);
  let [initialValues, setInitialValues] = useState({
    course_name: "",
    domain_name: "",
    _id: ""
  });

  let validationSchema = yup.object().shape({
    course_name: yup.string().min(3, "Too Short!").max(30, "Too Long").required("Course Name is required"),
    domain_name: yup.string().min(3, "Too Short!").max(30, "TOo Long").required("Domain Name is required"),
  });

  let onSubmit = (values, onSubmitProps) => {
    updateCourse("update-course-details", values).then((result) => {
      if (result === undefined) return false;
      toast.success("Course details are updated successfully");
      history.push("/course/list");
    });
    onSubmitProps.resetForm();
  };

  useEffect(() => {
    var singleCourseDetails = courseList.filter(
      (course) => course._id === match.params.id
    );
    if (singleCourseDetails.length === 0) {
      toast.error("Course Not Found");
      history.replace("/course/list");
    } else {
      setInitialValues(singleCourseDetails[0]);
    }
  }, []);

  return (
    <div className="content">
      <div className="formComponent">
        <h4 className="text-align-center">Edit Course Details</h4>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form>
            <div className="form-group">
              <Field
                name="course_name"
                id="course_name"
                title="Course Name"
                placeholder="Course Name"
              />
              <ErrorMessage name="course_name" className="error" component={InputError} />
            </div>
            <div className="form-group">
              <Field
                name="domain_name"
                id="domain_name"
                title="Domain Name"
                placeholder="Domain Name"
              />
              <ErrorMessage name="domain_name" className="error" component={InputError} />
            </div>

            <div className="form-group">
              <Field
                name="_id"
                id="_id"
                readOnly
                title="Course ID"
                placeholder="Course ID"
              />
            </div>

            <div className="form-buttons">
              <button type="submit">Update Course</button>
              <button onClick={() => history.push("/course/list")}>
                View Course List
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default EditCourse;