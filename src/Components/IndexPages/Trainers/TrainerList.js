import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteTrainerAction, saveAllTrainerDetailsAction } from "../../../redux/action/TrainerAction";
import { getTrainerList, removeTrainer } from "../../../Service/trainerService";

function TrainerList({ history }) {
    let trainerList = useSelector((state) => state.trainerDetails.trainers);
    let dispatch = useDispatch();

    let deleteTrainer = (index, _id) => {
        removeTrainer("delete-trainer-by-id", _id).then((result) => {
            if (
                result.status === true &&
                result.result.deletedCount === 1 &&
                result !== undefined
            ) {
                dispatch(deleteTrainerAction(index));
            } else toast.error("Unable to delete trainer");
        });
    };


    // const [loading, setLoading] = useState(false);


    useEffect(() => {
        getTrainerList("get-trainer-list").then((result) => {
            console.log(result.trainerList);
            if (result === undefined) return false;

            dispatch(saveAllTrainerDetailsAction(result.trainerList));
            // loading ? <LoaderEffect /> : trainerList

        });
    }, []);
    return (
        <div className="content">
            <div className="formComponent">
                <h4 className="text-align-center">List of Trainers 
                <strong onClick={() => history.push("/trainer/new")} title="Click to Add New Trainer" className="createIcon"><i className="fa fa-plus" aria-hidden="true"></i></strong></h4>
                {trainerList.length===0?<>
                    <div>Trainer List is Empty!</div>
                    {/* <div><Link to = "/trainer/new">Add New Trainer</Link></div> */}
                </>:
                <>
                <div className="parent_card">
                    {trainerList.map((trainer, index) => {
                        return (
                            <div
                                className="card trainer_card flex flex-direction-column"
                                key={index}
                            >
                                <p className="batch_details" title="Trainer Name">
                                    {trainer.trainer_name}
                                </p>
                                <p className="batch_details" title="Phone Number">
                                    {trainer.phone_number}
                                </p>
                                <p className="batch_details" title="Emil ID">
                                    {trainer.email_id}
                                </p>
                                {/* <p className="batch_details" title="Trainer ID">{batch.trainer_id}</p> */}
                                <p className="batch_details" title="Course Name">
                                    {trainer.course_name}
                                </p>
                                <p className="batch_details" title="Batch Name">
                                    {trainer.batch_name}
                                </p>
                                <div className="form-buttons">
                                    <button onClick={() => deleteTrainer(index, trainer._id)}>
                                        DELETE
                                    </button>
                                    <button
                                        className="edit"
                                        onClick={() => {
                                            //   history.push("/trainer/edit/" + batch._id);
                                            history.push("/trainer/edit/" + trainer._id);
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

export default TrainerList;