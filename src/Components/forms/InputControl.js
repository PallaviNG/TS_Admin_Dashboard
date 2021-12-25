import React from "react";
import { Field } from "formik";

function InputControl(props) {

    return (
        <div className="TextStyle flex flex-wrap align-items-center">
            <label htmlFor="">{props.question}</label>
            <Field type={props.componentType} name={props.name} autoComplete="off" placeholder={props.placeholder ? props.placeholder : "Type your Answer" }  />
            
        </div>
    )
}

export default InputControl;