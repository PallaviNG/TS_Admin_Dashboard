import React from "react";

function InputError(props) {
    console.log(props);
    // return <span className="error">Error</span>
    return <p className="error">{props.children}</p>
}

export default InputError;