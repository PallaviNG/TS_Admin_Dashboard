import React from "react";
import { Field } from "formik";

function RadioControl(props) {
    return (
        <div className="TextStyle">
            <label htmlFor="">{props.label}</label>
            <Field name={props.name}>
                {({ field }) => {
                    // console.log(field);
                    return props.radio_value.map((radio, index) => {
                        return(<div className="radio_style" key={index}>
                            <input {...field} type={props.componentType} value={radio.value} />
                            <label htmlFor="">{radio.label}</label>
                        </div>);
                    });
                }}
            </Field>
        </div>
    )
}

export default RadioControl;