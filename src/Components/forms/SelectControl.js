import React from 'react';
import { Field } from 'formik';

function SelectControl(props) {
    return (
        <div className="TextStyle subComponents">
            {/* <label htmlFor="">{props.label}</label> */}
            <Field name={props.name} as={props.componentType}>
                {
                    props.options.map((option, index) =>
                        <option key={index} value={option.value}>{option.label}</option>)
                }
            </Field>
        </div>
    )
};

export default SelectControl;