import React from "react";
import { Field } from "formik";

function CheckboxControl(props) {
    return (
        <div className="TextStyle">
            <label htmlFor="">{props.label}</label>
            <Field name={props.name}>
                {({ field }) => {
                    return props.checkbox_value.name((checkBox, index) => {
                        return (<div className="checkbox-input" key={index}>
                            <input {...field} type={props.componentType} value={checkBox.value} />
                            <label for={checkBox.label}>{checkBox.label}</label>
                        </div>
                        )
                    })
                }}
            </Field>
        </div>
    )
}
module.exports = CheckboxControl;