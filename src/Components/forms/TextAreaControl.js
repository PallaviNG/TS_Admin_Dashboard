import React from "react";
import { Field } from "formik";

function TextAreaControl(props) {
    return (
        <div className="TextStyle TextAreaStyle flex flex-wrap">
            <label htmlFor="" title="Question">{props.question}</label>
            <Field as={props.componentType} name={props.name} title="Answer" placeholder="Type your answer" />
        </div>
    );
}

export default TextAreaControl;