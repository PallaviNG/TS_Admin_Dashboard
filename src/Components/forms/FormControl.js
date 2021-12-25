import React from 'react';
import InputControl from './InputControl';
import TextAreaControl from './TextAreaControl';
import RadioControl from './RadioControl';
import SelectControl from './SelectControl';

function FormControl(props) {
    return (
        <>
            {(() => {
                switch (props.componentType) {
                    case 'textarea':
                        return <TextAreaControl {...props} />
                    case 'radio':
                        return <RadioControl {...props} />
                    case 'select':
                        return <SelectControl {...props} />
                    default:
                        return <InputControl {...props} />

                }
            })()}
        </>
    )
}

export default FormControl;