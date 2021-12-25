import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteCourseAction, saveAllCourseDetailsAction } from './../../../redux/action/CourseAction';
import { getCourseList, removeCourse } from './../../../Service/courseService';
import { Link } from 'react-router-dom';

function CourseList({ history }) {
    let courseList = useSelector((state) => state.courseDetails.courses);
    let dispatch = useDispatch();

    let deleteCourse = (index, _id) => {
        removeCourse("delete-course-by-id", _id).then((result) => {
            if (
                result.status === true &&
                result.result.deletedCount === 1 &&
                result !== undefined
            ) {
                dispatch(deleteCourseAction(index));
            } else toast.error("Unable to delete course");
        });
    };


    // const [loading, setLoading] = useState(false);


    useEffect(() => {
        getCourseList("get-course-list").then((result) => {
            console.log(result.courseList);
            if (result === undefined) return false;

            dispatch(saveAllCourseDetailsAction(result.courseList));
            // loading ? <LoaderEffect /> : courseList

        });
    }, []);

    return (
        <div className="content">
            <div className="formComponent">
                <h4 className="text-align-center">List of Courses
                <strong onClick={() => history.push("/course/new")} title="Click to Add New Course!" className="createIcon"><i className="fa fa-plus" aria-hidden="true"></i></strong>
                </h4>
                {courseList.length === 0 ? <>
                    <div>Course List is Empty</div>
                    <div><Link to="/course/new">Add New Course</Link></div>
                </> : <>
                    <div className="parent_card">
                        {courseList.map((course, index) => {
                            return (
                                <div
                                    className="card course_card flex flex-direction-column"
                                    key={index}
                                >
                                    <p className="batch_details" title="Course Name">
                                        {course.course_name}
                                    </p>
                                    <p className="batch_details" title="Domain Name">
                                        {course.domain_name}
                                    </p>
                                    <div className="form-buttons">
                                        <button onClick={() => deleteCourse(index, course._id)}>
                                            DELETE
                                        </button>
                                        <button
                                            className="edit"
                                            onClick={() => {
                                                history.push("/course/edit/" + course._id);
                                            }}
                                        >
                                            EDIT
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>}
            </div>
        </div>
    );
}

export default CourseList;