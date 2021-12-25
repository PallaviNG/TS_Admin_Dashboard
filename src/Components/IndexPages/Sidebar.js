import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <Link className="active accordion" to="/">
          {/* <div className="flex"><span><i className="fa fa fa-home" aria-hidden="true"></i></span> */}
          <span className="parentAccordion">Home</span>
          {/* </div> */}
          <div className="panel">
            <Link to="/overview">Overview</Link>
            <Link to="#">Updates</Link>
            <Link to="#">Reports</Link>
          </div>
        </Link>

        <Link className="accordion" to="#">
          {/* <div className="flex"> */}
            {/* <span><i className="fa fa-list-alt" aria-hidden="true"></i></span> */}
          <span className="flex justify-content-center">MOCK INTERVIEW</span>
          {/* </div> */}
          <div className="panel">
            <Link to="/mock/template/new">Create Template</Link>
            <Link to="/mock/template/list">Templates List</Link>
            <Link to="/mock/student/new">Add Student</Link>
            <Link to="/mock/student/list">List of Students</Link>
            <Link to="/mock/template/interviewer/new">Add Interviewer</Link>
            <Link to="/mock/template/interviewer/list">List of Interviewers</Link>
          </div>
        </Link>

        <Link className="accordion" to="#">
          <span>Batch</span>
          <div className="panel">
            <Link to="/batch/new">Create Batch</Link>
            {/* <Link to="/batch/edit">Edit Batch</Link> */}
            {/* <Link to="/batch/delete">Delete Batch</Link> */}
            <Link to="/batch/list">List of Batches</Link>
          </div>
        </Link>

        {/* <Link className="accordion" to="#">
          <span>Course</span>
          <div className="panel">
            <Link to="/course/new">Create Course</Link>
            <Link to="/course/list">List of Courses</Link>
          </div>
        </Link> */}


        <Link className="accordion" to="#">
          <span>Trainer</span>
          <div className="panel">
            <Link to="/trainer/new">Add Trainer</Link>
            <Link to="/trainer/list">Trainer List</Link>
          </div>
        </Link>

        <Link className="accordion" to="#">
          <span>Others</span>
          <div className="panel">
            <Link to="/">Home</Link>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Sidebar;