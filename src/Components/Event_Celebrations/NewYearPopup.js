import React from 'react'
import HNY_bg from "../../assets/images/Events/HNY.gif";

function NewYearPopup(props) {
    return (
        <div className="eventParentContainer">

            <div className='event_popup_Container'>
                <div className='feedbackHeading'>
                    <div className='feedbackChild'>{props.children}</div>
                </div>
                <img src={HNY_bg} />

            </div>

        </div>
    )
}

export default NewYearPopup;
