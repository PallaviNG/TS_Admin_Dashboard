import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { getStudentByID } from "../../Service/studentService";
import FeedbackPopup from "./FeedbackPopup";

function MockStudentDetails({ history, match }) {

    // console.log(match.param.student_id);
  let [initialValues, setInitialValues] = useState({
    student_name: "Pallavi",
    email_id: "pallavi@gmail.com",
    phone_number: "787457577",
    fees_details: "Paid",
    // batches:[]
  });

  let [openPopup, setOpenPopup] = useState(false);
  useEffect(() => {
    let _studentID = match.params.id;
    // console.log(_studentID);

    getStudentByID("get-student-by-id", _studentID).then((result) => {
      if (result === undefined) return false;
      // console.log(result);
      setInitialValues({ ...initialValues });
      initialValues = result.students[0];
      // console.log(initialValues);
      setInitialValues({ ...initialValues });
    });
  }, []);

  return (
    <div className="content">
      <div className="formComponent  flex flex-direction-column align-items-center justify-content-center">
        <h4 className="text-align-center">Student Details</h4>
        <Formik initialValues={initialValues}>
          <div className="studentDetailsContainer">
            <div className="studentData">
              <label>Student Name</label>
              <div>{initialValues.student_name}</div>
            </div>
            <div className="studentData">
              <label>Email ID</label>
              <div>{initialValues.email_id}</div>
            </div>
            <div className="studentData">
              <label>Phone Number</label>
              <div>{initialValues.phone_number}</div>
            </div>
            <div className="studentData">
              <label>Fees Details</label>
              <div>{initialValues.fees_details}</div>
            </div>
            <div className="flex justify-content-center mx-2 px-2">
              <button type="submit" className="btn btn-info pxy-2" onClick={()=>setOpenPopup(true)}>
                Feedback
              </button>
            </div>
              {openPopup?<FeedbackPopup open = {openPopup} >
                  <button className="btn btn-danger" onClick={()=>setOpenPopup(false)}>X</button>
              </FeedbackPopup>:null}
          </div>
        </Formik>
      </div>
    </div>
  );
}

export default MockStudentDetails;
