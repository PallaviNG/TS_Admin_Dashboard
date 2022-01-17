import React,{useState} from "react";
import { Field } from "formik";

function InputControl(props) {

    let [iValue,setIValue] = useState({});
    console.log(props);
    // let onChange= (event) => {
    //     console.log("onChange");
    //     console.log(event.target.value);
    //     setIValue({});
    //     iValue=event.target.value;
    //     setIValue({...iValue});
    //     // props.value=iValue;
    // }
    return (
        <div className="TextStyle flex flex-wrap align-items-center">
            <label htmlFor={props.name}>{props.question}</label>
            {/* <Field type={props.componentType} name={props.name} onChange={(event) => setIValue(event.target.value)} autoComplete="off" placeholder={props.placeholder ? props.placeholder : "Type your Answer" }  /> */}
            <Field type={props.componentType} name={props.name} autoComplete="off" placeholder={props.placeholder ? props.placeholder : "Type your Answer" }  />
            
        </div>
    )
}

export default InputControl;